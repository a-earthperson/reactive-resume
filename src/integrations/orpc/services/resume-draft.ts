import { ORPCError } from "@orpc/client";
import { type DeepMergeLeafURI, deepmergeCustom } from "deepmerge-ts";
import { and, eq } from "drizzle-orm";
import { isPlainObject } from "es-toolkit";
import z from "zod";
import { schema } from "@/integrations/drizzle";
import { db } from "@/integrations/drizzle/client";
import { type DraftData, draftDataSchema, sectionTypeSchema } from "@/schema/draft/data";
import type { DraftOperation } from "@/schema/draft/operations";
import { type ResumeView, resumeViewFactory } from "@/schema/resume/view";
import { applyItemOpsOperation } from "./draft/item-ops";
import { applySetFieldOperation } from "./draft/set-field";

/**
 * @remarks Deep merge function that replaces arrays instead of concatenating them.
 */
const deepmergeDraft = deepmergeCustom<
	unknown,
	{
		DeepMergeArraysURI: DeepMergeLeafURI;
	}
>({
	mergeArrays: false,
});

/**
 * @remarks Validates draft identifiers to avoid database casting failures.
 * @example "019c1665-d23b-716a-91db-0e703e598084"
 */
const draftIdSchema = z.string().uuid();

/**
 * @remarks Guards draft lookups against malformed identifiers.
 * @param id - The draft identifier provided by the caller.
 * @throws ORPCError - Thrown when the identifier is not a valid UUID.
 */
const assertValidDraftId = (id: string): void => {
	const validation = draftIdSchema.safeParse(id);

	if (!validation.success) {
		throw new ORPCError("DRAFT_INVALID_ID", {
			status: 400,
			data: validation.error.issues,
			message: "Draft ID is malformed.",
		});
	}
};

/**
 * @remarks Deeply merges a partial payload onto a base draft shape.
 * @param base - The existing draft payload.
 * @param patch - The partial payload to overlay.
 * @returns A merged draft candidate for validation.
 */
const mergeDraftData = (base: DraftData, patch: unknown): DraftData => {
	const safePatch = isPlainObject(patch) ? patch : {};
	return deepmergeDraft(base, safePatch) as DraftData;
};

/**
 * @remarks Determines whether a custom section type is supported by DraftData.
 * @param value - The custom section type to inspect.
 * @returns True when the value is a DraftData section type.
 */
const isDraftSectionType = (
	value: ResumeView["customSections"][number]["type"],
): value is DraftData["customSections"][number]["type"] => sectionTypeSchema.safeParse(value).success;

/**
 * @remarks Preserves custom sections that are not representable in DraftData.
 * @param nextSections - Custom sections derived from DraftData.
 * @param previousSections - Custom sections from the original ResumeView.
 * @returns A merged list that preserves original ordering when possible.
 */
const mergeCustomSections = (
	nextSections: ResumeView["customSections"],
	previousSections: ResumeView["customSections"],
): ResumeView["customSections"] => {
	const nextById = new Map(nextSections.map((section) => [section.id, section]));
	const viewOnlySections = previousSections.filter((section) => !isDraftSectionType(section.type));
	const viewOnlyById = new Map(viewOnlySections.map((section) => [section.id, section]));
	const merged: ResumeView["customSections"] = [];
	const seen = new Set<string>();

	for (const section of previousSections) {
		const nextSection = nextById.get(section.id);
		if (nextSection) {
			merged.push(nextSection);
			seen.add(section.id);
			continue;
		}

		const viewOnlySection = viewOnlyById.get(section.id);
		if (viewOnlySection) {
			merged.push(viewOnlySection);
			seen.add(section.id);
		}
	}

	for (const section of nextSections) {
		if (seen.has(section.id)) continue;
		merged.push(section);
		seen.add(section.id);
	}

	for (const section of viewOnlySections) {
		if (seen.has(section.id)) continue;
		merged.push(section);
	}

	return merged;
};

/**
 * @remarks Reads a resume view for draft-specific operations.
 * @param input - The resume identifier and user identity.
 * @returns The resume view payload for draft reads.
 */
const getResumeViewForDraftRead = async (input: { id: string; userId: string }) => {
	assertValidDraftId(input.id);

	const [resume] = await db
		.select({
			id: schema.resume.id,
			data: schema.resume.data,
			createdAt: schema.resume.createdAt,
			updatedAt: schema.resume.updatedAt,
		})
		.from(schema.resume)
		.where(and(eq(schema.resume.id, input.id), eq(schema.resume.userId, input.userId)));

	if (!resume) throw new ORPCError("NOT_FOUND");

	return resume;
};

/**
 * @remarks Applies a single draft operation to an existing draft payload.
 * @param draft - The current draft payload.
 * @param operation - The operation to apply.
 * @returns The updated draft payload.
 */
const applyDraftOperation = (draft: DraftData, operation: DraftOperation): DraftData => {
	switch (operation.op) {
		case "setField":
			return applySetFieldOperation(draft, operation);
		case "itemOps":
			return applyItemOpsOperation(draft, operation);
		case "replacePicture":
			return { ...draft, picture: operation.data };
		case "replaceBasics":
			return { ...draft, basics: operation.data };
		case "replaceSummary":
			return { ...draft, summary: operation.data };
		case "replaceMetadata":
			return { ...draft, metadata: operation.data };
		case "replaceSection":
			return { ...draft, sections: { ...draft.sections, [operation.section]: operation.data } };
		case "replaceCustomSections":
			return { ...draft, customSections: operation.data };
		default: {
			const _exhaustive: never = operation;
			return _exhaustive;
		}
	}
};

/**
 * @remarks Applies and validates a batch of operations against a base draft payload.
 * @param base - The draft payload that receives the operation batch.
 * @param operations - The ordered list of operations to apply.
 * @returns A validated DraftData payload reflecting the applied operations.
 * @throws ORPCError - Thrown when operations yield an invalid payload.
 */
const applyOperationsToDraft = (base: DraftData, operations: DraftOperation[]): DraftData => {
	const nextDraft = operations.reduce(applyDraftOperation, base);
	const validation = draftDataSchema.safeParse(nextDraft);

	if (!validation.success) {
		throw new ORPCError("DRAFT_INVALID_OPERATION", {
			status: 400,
			data: validation.error.issues,
			message: "Draft operations produced an invalid payload.",
		});
	}

	return validation.data;
};

/**
 * @remarks Reads a resume view and ensures it is editable by the owner.
 * @param input - The resume identifier and user identity.
 * @returns The resume view payload for further draft mutations.
 */
const getResumeViewForDraftUpdate = async (input: { id: string; userId: string }): Promise<ResumeView> => {
	assertValidDraftId(input.id);

	const [resume] = await db
		.select({
			data: schema.resume.data,
			isLocked: schema.resume.isLocked,
		})
		.from(schema.resume)
		.where(and(eq(schema.resume.id, input.id), eq(schema.resume.userId, input.userId)));

	if (!resume) throw new ORPCError("NOT_FOUND");
	if (resume.isLocked) throw new ORPCError("NOT_FOUND");

	return resume.data;
};

export const resumeDraftService = {
	/**
	 * @remarks Retrieves the draft data slice for a resume record.
	 * @param input - The resume identifier and user identity.
	 * @returns The draft data payload and timestamps.
	 */
	getById: async (input: { id: string; userId: string }) => {
		const resume = await getResumeViewForDraftRead({ id: input.id, userId: input.userId });
		const { data } = resumeViewFactory.unzip(resume.data);

		return {
			id: resume.id,
			data,
			createdAt: resume.createdAt,
			updatedAt: resume.updatedAt,
		};
	},

	/**
	 * @remarks Patches the DraftData slice of a ResumeView payload.
	 * @param input - Resume identifier, owner, and patch payload.
	 * @returns A void promise when the resume has been updated.
	 */
	patch: async (input: { id: string; userId: string; data: unknown }): Promise<void> => {
		const view = await getResumeViewForDraftUpdate({ id: input.id, userId: input.userId });
		const { data, styles } = resumeViewFactory.unzip(view);
		const merged = mergeDraftData(data, input.data);
		const validation = draftDataSchema.safeParse(merged);

		if (!validation.success) {
			throw new ORPCError("DRAFT_INVALID_OPERATION", {
				status: 400,
				data: validation.error.issues,
				message: "Draft operations produced an invalid payload.",
			});
		}

		const nextView = resumeViewFactory.zip({ data: validation.data, styles });
		const mergedSections = mergeCustomSections(nextView.customSections, view.customSections);
		const updatedView = { ...nextView, customSections: mergedSections };

		await db
			.update(schema.resume)
			.set({ data: updatedView })
			.where(and(eq(schema.resume.id, input.id), eq(schema.resume.userId, input.userId)));
	},

	/**
	 * @remarks Applies an ordered list of draft operations to a ResumeView payload.
	 * @param input - Resume identifier, owner, and list of operations.
	 * @returns A void promise when the resume has been updated.
	 */
	applyOperations: async (input: { id: string; userId: string; operations: DraftOperation[] }): Promise<void> => {
		const view = await getResumeViewForDraftUpdate({ id: input.id, userId: input.userId });
		const { data, styles } = resumeViewFactory.unzip(view);
		const nextData = applyOperationsToDraft(data, input.operations);
		const nextView = resumeViewFactory.zip({ data: nextData, styles });
		const mergedSections = mergeCustomSections(nextView.customSections, view.customSections);
		const updatedView = { ...nextView, customSections: mergedSections };

		await db
			.update(schema.resume)
			.set({ data: updatedView })
			.where(and(eq(schema.resume.id, input.id), eq(schema.resume.userId, input.userId)));
	},
};
