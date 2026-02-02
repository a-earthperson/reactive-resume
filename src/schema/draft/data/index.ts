/**
 * @packageDocumentation
 *
 * @remarks
 * Barrel module that provides a stable import surface for Draft schema and types.
 * Keep consumers pointed at `@/schema/draft/data` so internal file layout can evolve
 * without causing widespread refactors.
 *
 * Caveats and usage notes:
 * - Schema-first contract: runtime validation lives in `draft.schema.ts`; types are inferred in `draft.types.ts`.
 * - If you introduce Zod transforms/coercions, choose between `z.input` and `z.output` typings deliberately.
 * - Avoid circular dependencies: this barrel should only re-export; do not import it from schema/type files.
 *
 * @see {@link ./data.schema | Draft schema}
 * @see {@link ./data.types | Draft types}
 */
export * from "./draft.schema.ts";
export * from "./draft.types.ts";
export * from "./factory";
