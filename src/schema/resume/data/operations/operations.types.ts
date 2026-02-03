/**
 * @packageDocumentation
 *
 * @remarks
 * Type-only module for DraftResume command/operation payloads.
 * Types are inferred from the runtime schemas in `operations.schema.ts`
 * to keep validation and typing aligned.
 *
 * @see {@link ./operations.schema | DraftResume operation schema}
 */
import type { infer as ZodInfer } from "zod";
import type { draftOperationListSchema, draftOperationSchema } from "./operations.schema";

/**
 * @remarks Represents a single data operation that mutates a data payload.
 */
export type DraftOperation = ZodInfer<typeof draftOperationSchema>;

/**
 * @remarks Represents an ordered list of data operations.
 */
export type DraftOperationList = ZodInfer<typeof draftOperationListSchema>;
