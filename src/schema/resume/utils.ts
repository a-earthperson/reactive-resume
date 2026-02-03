import z from "zod";

export type WithSuffix<T extends Record<string, z.ZodTypeAny>, Suffix extends string> = {
    [K in keyof T as `${K & string}${Suffix}`]: z.infer<T[K]>;
};

export const enum FIELDS {
    picture,
    basics,
    summary,
    sections,
    customSections,
    metadata,
}

export const FIELD_MAP = {

}
