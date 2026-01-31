import { ORPCError } from "@orpc/client";
import { and, desc, eq } from "drizzle-orm";
import { schema } from "@/integrations/drizzle";
import { db } from "@/integrations/drizzle/client";
import type { DraftData } from "@/schema/draft/data";
import { generateId } from "@/utils/string";

/**
 * @remarks Represents the minimal shape returned for draft listings.
 * @example { id: "uuid", createdAt: new Date(), updatedAt: new Date() }
 */
export type DraftListItem = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
};

/**
 * @remarks Represents a fully loaded draft record for API responses.
 * @example { id: "uuid", data: { picture: { url: "" }, basics: { name: "", headline: "", email: "", phone: "", location: "", website: { label: "", url: "" }, customFields: [] }, summary: { title: "", content: "" }, sections: { profiles: { title: "", items: [] }, experience: { title: "", items: [] }, education: { title: "", items: [] }, projects: { title: "", items: [] }, skills: { title: "", items: [] }, languages: { title: "", items: [] }, interests: { title: "", items: [] }, awards: { title: "", items: [] }, certifications: { title: "", items: [] }, publications: { title: "", items: [] }, volunteer: { title: "", items: [] }, references: { title: "", items: [] } }, customSections: [], metadata: { notes: "" } }, createdAt: new Date(), updatedAt: new Date() }
 */
export type DraftRecord = {
	id: string;
	data: DraftData;
	createdAt: Date;
	updatedAt: Date;
};

/**
 * @remarks Provides CRUD operations for Draft Resume data scoped to a user.
 * @see DraftData
 */
export const draftService = {
	/**
	 * @remarks Lists all draft records for the owning user.
	 * @param input - The user identity used to scope the lookup.
	 * @returns An ordered list of draft identifiers and timestamps.
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
	 * @remarks Retrieves a single draft by its identifier.
	 * @param input - The draft and user identity to scope the lookup.
	 * @returns The matching draft record.
	 * @throws ORPCError - Thrown when the draft does not exist.
	 */
	getById: async (input: { id: string; userId: string }): Promise<DraftRecord> => {
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
	 * @remarks Creates a new draft record for a user.
	 * @param input - The draft data to persist.
	 * @returns The identifier of the newly created draft.
	 */
	create: async (input: { userId: string; data: DraftData }): Promise<string> => {
		const id = generateId();

		await db.insert(schema.draft).values({
			id,
			userId: input.userId,
			data: input.data,
		});

		return id;
	},

	/**
	 * @remarks Updates a draft by replacing its stored data payload.
	 * @param input - The draft identifier, owner, and new data payload.
	 * @returns A void promise when the update is complete.
	 * @throws ORPCError - Thrown when the draft does not exist.
	 */
	update: async (input: { id: string; userId: string; data: DraftData }): Promise<void> => {
		const updated = await db
			.update(schema.draft)
			.set({ data: input.data })
			.where(and(eq(schema.draft.id, input.id), eq(schema.draft.userId, input.userId)))
			.returning({ id: schema.draft.id });

		if (updated.length === 0) throw new ORPCError("NOT_FOUND");
	},

	/**
	 * @remarks Deletes a draft record by its identifier.
	 * @param input - The draft identifier and owner to scope deletion.
	 * @returns A void promise when deletion is complete.
	 * @throws ORPCError - Thrown when the draft does not exist.
	 */
	delete: async (input: { id: string; userId: string }): Promise<void> => {
		const deleted = await db
			.delete(schema.draft)
			.where(and(eq(schema.draft.id, input.id), eq(schema.draft.userId, input.userId)))
			.returning({ id: schema.draft.id });

		if (deleted.length === 0) throw new ORPCError("NOT_FOUND");
	},
};
