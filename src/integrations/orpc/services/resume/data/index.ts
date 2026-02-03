import { ORPCError } from "@orpc/client";
import { type DeepMergeLeafURI, deepmergeCustom } from "deepmerge-ts";
import { and, desc, eq } from "drizzle-orm";
import { isPlainObject } from "es-toolkit";
import z from "zod";
import { schema } from "@/integrations/drizzle";
import { db } from "@/integrations/drizzle/client";
import { type DraftData, draftDataSchema, draftFactory } from "@/schema/resume/data";
import type { DraftOperation } from "@/schema/resume/data/operations";
import { generateId } from "@/utils/string";
import { applyItemOpsOperation } from "./item-ops";
import { applySetFieldOperation } from "./set-field";

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
 * @remarks Validates data identifiers to avoid database casting failures.
 * @example "019c1665-d23b-716a-91db-0e703e598084"
 */
const draftIdSchema = z.string().uuid();

/**
 * @remarks Guards data lookups against malformed identifiers.
 * @param id - The data identifier provided by the caller.
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
 * @remarks Deeply merges a partial payload onto a base data shape.
 * @param base - The canonical empty data payload.
 * @param patch - The partial payload to overlay.
 * @returns A merged data candidate for validation.
 */
const mergeDraftData = (base: DraftData, patch: unknown): DraftData => {
	const safePatch = isPlainObject(patch) ? patch : {};
	return deepmergeDraft(base, safePatch) as DraftData;
};

/**
 * @remarks Normalizes a partial data payload into a full DraftData structure.
 * @param data - The partial payload provided by the client.
 * @returns A validated DraftData payload.
 * @throws ORPCError - Thrown when the merged payload is invalid.
 */
const normalizeDraftCreateData = (data?: unknown): DraftData => {
	const base = draftFactory.draft.empty();
	const merged = mergeDraftData(base, data ?? {});
	const validation = draftDataSchema.safeParse(merged);

	if (!validation.success) {
		throw new ORPCError("DRAFT_INVALID_CREATE", {
			status: 400,
			data: validation.error.issues,
			message: "Draft create payload produced an invalid data.",
		});
	}

	return validation.data;
};

/**
 * @remarks Represents the minimal shape returned for data listings.
 * @example { id: "uuid", createdAt: new Date(), updatedAt: new Date() }
 */
export type DraftListItem = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
};

/**
 * @remarks Represents a fully loaded data record for API responses.
 * @example { id: "uuid", data: { picture: { url: "" }, basics: { name: "", headline: "", email: "", phone: "", location: "", website: { label: "", url: "" }, customFields: [] }, summary: { title: "", content: "" }, sections: { profiles: { title: "", items: [] }, experience: { title: "", items: [] }, education: { title: "", items: [] }, projects: { title: "", items: [] }, skills: { title: "", items: [] }, languages: { title: "", items: [] }, interests: { title: "", items: [] }, awards: { title: "", items: [] }, certifications: { title: "", items: [] }, publications: { title: "", items: [] }, volunteer: { title: "", items: [] }, references: { title: "", items: [] } }, customSections: [], metadata: { notes: "" } }, createdAt: new Date(), updatedAt: new Date() }
 */
export type DraftRecord = {
	id: string;
	data: DraftData;
	createdAt: Date;
	updatedAt: Date;
};

/**
 * @remarks Applies a single data operation to an existing data payload.
 * @param draft - The current data payload.
 * @param operation - The operation to apply.
 * @returns The updated data payload.
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
 * @remarks Applies and validates a batch of operations against a base data payload.
 * @param base - The data payload that receives the operation batch.
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
 * @remarks Provides CRUD operations for Draft Resume data scoped to a user.
 * @see DraftData
 */
export const draftService = {
	/**
	 * @remarks Lists all data records for the owning user.
	 * @param input - The user identity used to scope the lookup.
	 * @returns An ordered list of data identifiers and timestamps.
	 */
	list: async (input: { userId: string }): Promise<DraftListItem[]> => {
		return db
			.select({
				id: schema.draft.id,
				createdAt: schema.draft.createdAt,
				updatedAt: schema.draft.updatedAt,
			})
			.from(schema.draft)
			.where(eq(schema.draft.userId, input.userId))
			.orderBy(desc(schema.draft.updatedAt));
	},

	/**
	 * @remarks Retrieves a single data by its identifier.
	 * @param input - The data and user identity to scope the lookup.
	 * @returns The matching data record.
	 * @throws ORPCError - Thrown when the data does not exist.
	 */
	getById: async (input: { id: string; userId: string }): Promise<DraftRecord> => {
		assertValidDraftId(input.id);

		const [draft] = await db
			.select({
				id: schema.draft.id,
				data: schema.draft.data,
				createdAt: schema.draft.createdAt,
				updatedAt: schema.draft.updatedAt,
			})
			.from(schema.draft)
			.where(and(eq(schema.draft.id, input.id), eq(schema.draft.userId, input.userId)));

		if (!draft) throw new ORPCError("NOT_FOUND");

		return draft;
	},

	/**
	 * @remarks Creates a new data record for a user.
	 * @param input - The partial data data to persist.
	 * @returns The identifier of the newly created data.
	 * @throws ORPCError - Thrown when the provided payload is invalid.
	 */
	create: async (input: { userId: string; data?: unknown }): Promise<string> => {
		const id = generateId();
		const data = normalizeDraftCreateData(input.data);

		await db.insert(schema.draft).values({
			id,
			userId: input.userId,
			data,
		});

		return id;
	},

	/**
	 * @remarks Creates a data by applying operations to an empty or partially seeded payload.
	 * @param input - The user identity, optional seed data, and operations to apply.
	 * @returns The identifier of the newly created data.
	 * @throws ORPCError - Thrown when the create payload or operations are invalid.
	 */
	createFromOperations: async (input: {
		userId: string;
		operations: DraftOperation[];
		data?: unknown;
	}): Promise<string> => {
		const id = generateId();
		const base = normalizeDraftCreateData(input.data);
		const data = applyOperationsToDraft(base, input.operations);

		await db.insert(schema.draft).values({
			id,
			userId: input.userId,
			data,
		});

		return id;
	},

	/**
	 * @remarks Updates a data by replacing its stored data payload.
	 * @param input - The data identifier, owner, and new data payload.
	 * @returns A void promise when the update is complete.
	 * @throws ORPCError - Thrown when the data does not exist.
	 */
	update: async (input: { id: string; userId: string; data: DraftData }): Promise<void> => {
		assertValidDraftId(input.id);

		const updated = await db
			.update(schema.draft)
			.set({ data: input.data })
			.where(and(eq(schema.draft.id, input.id), eq(schema.draft.userId, input.userId)))
			.returning({ id: schema.draft.id });

		if (updated.length === 0) throw new ORPCError("NOT_FOUND");
	},

	/**
	 * @remarks Deletes a data record by its identifier.
	 * @param input - The data identifier and owner to scope deletion.
	 * @returns A void promise when deletion is complete.
	 * @throws ORPCError - Thrown when the data does not exist.
	 */
	delete: async (input: { id: string; userId: string }): Promise<void> => {
		assertValidDraftId(input.id);

		const deleted = await db
			.delete(schema.draft)
			.where(and(eq(schema.draft.id, input.id), eq(schema.draft.userId, input.userId)))
			.returning({ id: schema.draft.id });

		if (deleted.length === 0) throw new ORPCError("NOT_FOUND");
	},

	/**
	 * @remarks Applies an ordered list of data operations to a data payload.
	 * @param input - The data identifier, owner, and list of operations.
	 * @returns A void promise when the data has been updated.
	 * @throws ORPCError - Thrown when the data does not exist.
	 * @throws ORPCError - Thrown when the resulting data payload is invalid.
	 */
	applyOperations: async (input: { id: string; userId: string; operations: DraftOperation[] }): Promise<void> => {
		assertValidDraftId(input.id);

		const current = await draftService.getById({ id: input.id, userId: input.userId });
		const data = applyOperationsToDraft(current.data, input.operations);

		await db
			.update(schema.draft)
			.set({ data })
			.where(and(eq(schema.draft.id, input.id), eq(schema.draft.userId, input.userId)));
	},
};
