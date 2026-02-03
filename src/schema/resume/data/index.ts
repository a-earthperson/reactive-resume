/**
 * @packageDocumentation
 *
 * @remarks
 * Barrel module that provides a stable import surface for resume's data schema and types.
 * Keep consumers pointed at `@/schema/resume` so internal file layout can evolve
 * without causing widespread refactors.
 *
 * Caveats and usage notes:
 * - Schema-first contract: runtime validation lives in `data.schema.ts`; types are inferred in `data.types.ts`.
 * - If you introduce Zod transforms/coercions, choose between `z.input` and `z.output` typings deliberately.
 * - Avoid circular dependencies: this barrel should only re-export; do not import it from schema/type files.
 *
 * @see {@link ./data.schema | Resume.Data schema}
 * @see {@link ./data.types | Resume.Data types}
 */

export * from "./data.factory";
export * from "./data.samples";
export * from "./data.schema";
export * from "./data.types";

export * from "./operations";
