/**
 * @packageDocumentation
 *
 * @remarks
 * Barrel module for Resume view contracts. Prefer importing from
 * `@/schema/resume/view` to avoid coupling to internal filenames.
 * Resume view contracts are composed from data and styles.
 *
 * @see {@link ./view | Resume View exports}
 * @see {@link ../data | Resume data}
 * @see {@link ../styles | Resume styles}
 * @see {@link ./view | Resume view}
 */

/**
 * @remarks Re-export Resume View factory helpers for consumers.
 */
export * from "./factory";
/**
 * @remarks Re-export Resume View runtime schemas for consumers.
 */
export * from "./view.schema";
/**
 * @remarks Re-export Resume View compile-time types for consumers.
 */
export * from "./view.types";
