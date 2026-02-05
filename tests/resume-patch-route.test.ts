import { ORPCError } from "@orpc/client";
import type { User } from "better-auth";
import { afterEach, describe, expect, test, vi } from "vitest";
import * as authHelpers from "@/integrations/orpc/helpers/auth";
import { applyResumePatch } from "@/integrations/orpc/helpers/resume-patch";
import { resumeService } from "@/integrations/orpc/services/resume";
import { patchHandler } from "@/routes/api/resume/$id";
import { defaultResumeData } from "@/schema/resume/data";

type ResumeResponse = Awaited<ReturnType<typeof resumeService.patch>>;
type ResumeStoreRecord = Omit<ResumeResponse, "isLocked"> & { userId: string; isLocked: boolean };

const mockUser = {
	id: "user-123",
	name: "Test User",
	email: "test@example.com",
	emailVerified: true,
	createdAt: new Date(),
	updatedAt: new Date(),
} as User;

const createResumeResponse = (overrides: Partial<ResumeResponse> = {}): ResumeResponse => ({
	id: "resume-123",
	name: "Test Resume",
	slug: "test-resume",
	tags: [],
	data: structuredClone(defaultResumeData),
	isPublic: false,
	isLocked: false,
	hasPassword: false,
	...overrides,
});

const createStoreResume = (overrides: Partial<ResumeStoreRecord> = {}): ResumeStoreRecord => ({
	...createResumeResponse(),
	userId: mockUser.id,
	isLocked: false,
	...overrides,
});

const createRequest = (body: BodyInit | null, contentType?: string | null) =>
	new Request("http://localhost/api/resume/resume-123", {
		method: "PATCH",
		headers: contentType ? { "content-type": contentType } : undefined,
		body,
	});

const createJsonRequest = (payload: unknown, contentType = "application/json-patch+json") =>
	createRequest(JSON.stringify(payload), contentType);

const mockAuth = (user: User | null) => vi.spyOn(authHelpers, "resolveUserFromHeaders").mockResolvedValue(user);

const setupPatchStore = (resumes: ResumeStoreRecord[]) => {
	const store = new Map(resumes.map((resume) => [resume.id, resume]));
	const patchSpy = vi.spyOn(resumeService, "patch").mockImplementation(async ({ id, userId, patch }) => {
		const resume = store.get(id);
		if (!resume || resume.userId !== userId) {
			throw new ORPCError("NOT_FOUND", { status: 404 });
		}
		if (resume.isLocked) {
			throw new ORPCError("RESUME_LOCKED", { status: 400 });
		}

		const patched = applyResumePatch({
			target: {
				name: resume.name,
				slug: resume.slug,
				tags: resume.tags,
				isPublic: resume.isPublic,
				data: resume.data,
			},
			patch,
		});

		const nextResume = { ...resume, ...patched };
		store.set(id, nextResume);
		return {
			id: nextResume.id,
			name: nextResume.name,
			slug: nextResume.slug,
			tags: nextResume.tags,
			data: nextResume.data,
			isPublic: nextResume.isPublic,
			isLocked: false,
			hasPassword: nextResume.hasPassword,
		};
	});

	return { store, patchSpy };
};

afterEach(() => {
	vi.restoreAllMocks();
});

describe("PATCH /api/resume/:id", () => {
	test.each([
		{ label: "missing", contentType: null },
		{ label: "text/plain", contentType: "text/plain" },
	])("rejects unsupported content type: $label", async ({ contentType }) => {
		const request = createRequest("[]", contentType);
		const response = await patchHandler({ request, params: { id: "resume-123" } });
		expect(response.status).toBe(415);
		const payload = await response.json();
		expect(payload.code).toBe("UNSUPPORTED_MEDIA_TYPE");
	});

	test("rejects unauthenticated requests", async () => {
		mockAuth(null);
		const patchSpy = vi.spyOn(resumeService, "patch").mockResolvedValue(createResumeResponse());
		const request = createJsonRequest([{ op: "replace", path: "/name", value: "Updated" }]);
		const response = await patchHandler({ request, params: { id: "resume-123" } });
		expect(response.status).toBe(401);
		const payload = await response.json();
		expect(payload.code).toBe("UNAUTHORIZED");
		expect(patchSpy).not.toHaveBeenCalled();
	});

	test("rejects invalid JSON payloads", async () => {
		mockAuth(mockUser);
		const patchSpy = vi.spyOn(resumeService, "patch").mockResolvedValue(createResumeResponse());
		const request = createRequest("{ invalid json", "application/json");
		const response = await patchHandler({ request, params: { id: "resume-123" } });
		expect(response.status).toBe(400);
		const payload = await response.json();
		expect(payload.code).toBe("INVALID_JSON");
		expect(patchSpy).not.toHaveBeenCalled();
	});

	test("rejects non-array patch documents", async () => {
		mockAuth(mockUser);
		const patchSpy = vi.spyOn(resumeService, "patch").mockResolvedValue(createResumeResponse());
		const request = createJsonRequest({ op: "replace", path: "/name", value: "Updated" });
		const response = await patchHandler({ request, params: { id: "resume-123" } });
		expect(response.status).toBe(400);
		const payload = await response.json();
		expect(payload.code).toBe("INVALID_PATCH");
		expect(Array.isArray(payload.issues)).toBe(true);
		expect(patchSpy).not.toHaveBeenCalled();
	});

	test.each([
		"application/json-patch+json",
		"application/json; charset=utf-8",
	])("applies patch and returns updated resume (%s)", async (contentType) => {
		mockAuth(mockUser);
		const { patchSpy } = setupPatchStore([createStoreResume()]);
		const patch = [
			{
				op: "add",
				path: "/data/sections/experience/items/-",
				value: {
					company: "Acme Corp",
					position: "Engineer",
					location: "",
					period: "",
					description: "",
				},
			},
		];

		const request = createJsonRequest(patch, contentType);
		const response = await patchHandler({ request, params: { id: "resume-123" } });
		expect(response.status).toBe(200);
		const payload = await response.json();
		expect(payload.data.sections.experience.items).toHaveLength(1);
		expect(payload.data.sections.experience.items[0].company).toBe("Acme Corp");
		expect(payload.data.sections.experience.items[0].id).toBeTruthy();
		expect(payload.data.sections.experience.items[0].hidden).toBe(false);
		expect(patchSpy).toHaveBeenCalledWith({
			id: "resume-123",
			userId: mockUser.id,
			patch,
		});
	});

	test("returns not found when resume does not exist", async () => {
		mockAuth(mockUser);
		setupPatchStore([]);
		const request = createJsonRequest([{ op: "replace", path: "/name", value: "Updated" }]);
		const response = await patchHandler({ request, params: { id: "resume-123" } });
		expect(response.status).toBe(404);
		const payload = await response.json();
		expect(payload.code).toBe("NOT_FOUND");
	});

	test("returns not found for resumes owned by another user", async () => {
		mockAuth(mockUser);
		setupPatchStore([createStoreResume({ userId: "other-user" })]);
		const request = createJsonRequest([{ op: "replace", path: "/name", value: "Updated" }]);
		const response = await patchHandler({ request, params: { id: "resume-123" } });
		expect(response.status).toBe(404);
		const payload = await response.json();
		expect(payload.code).toBe("NOT_FOUND");
	});

	test("returns invalid patch path errors", async () => {
		mockAuth(mockUser);
		setupPatchStore([createStoreResume()]);
		const request = createJsonRequest([
			{
				op: "add",
				path: "/data/__proto__/polluted",
				value: "nope",
			},
		]);
		const response = await patchHandler({ request, params: { id: "resume-123" } });
		expect(response.status).toBe(400);
		const payload = await response.json();
		expect(payload.code).toBe("INVALID_PATCH_PATH");
	});

	test("returns patch target not found errors", async () => {
		mockAuth(mockUser);
		setupPatchStore([createStoreResume()]);
		const request = createJsonRequest([
			{
				op: "replace",
				path: "/data/sections/experience/items/id/missing-id/position",
				value: "Lead Engineer",
			},
		]);
		const response = await patchHandler({ request, params: { id: "resume-123" } });
		expect(response.status).toBe(404);
		const payload = await response.json();
		expect(payload.code).toBe("PATCH_TARGET_NOT_FOUND");
	});

	test("returns patch conflicts for failed test operations", async () => {
		mockAuth(mockUser);
		setupPatchStore([createStoreResume()]);
		const request = createJsonRequest([
			{
				op: "test",
				path: "/name",
				value: "Wrong Name",
			},
		]);
		const response = await patchHandler({ request, params: { id: "resume-123" } });
		expect(response.status).toBe(409);
		const payload = await response.json();
		expect(payload.code).toBe("PATCH_CONFLICT");
	});

	test("rejects patches for locked resumes", async () => {
		mockAuth(mockUser);
		setupPatchStore([createStoreResume({ isLocked: true })]);
		const request = createJsonRequest([{ op: "replace", path: "/name", value: "Updated" }]);
		const response = await patchHandler({ request, params: { id: "resume-123" } });
		expect(response.status).toBe(400);
		const payload = await response.json();
		expect(payload.code).toBe("RESUME_LOCKED");
	});

	test("returns internal server errors for unexpected failures", async () => {
		mockAuth(mockUser);
		vi.spyOn(resumeService, "patch").mockImplementation(async () => {
			throw new Error("boom");
		});

		const request = createJsonRequest([{ op: "replace", path: "/name", value: "Updated" }]);
		const response = await patchHandler({ request, params: { id: "resume-123" } });
		expect(response.status).toBe(500);
		const payload = await response.json();
		expect(payload.code).toBe("INTERNAL_SERVER_ERROR");
	});
});
