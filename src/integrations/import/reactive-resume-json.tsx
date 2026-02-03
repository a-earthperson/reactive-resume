import { flattenError, ZodError } from "zod";
import { type ResumeView, resumeViewSchema } from "@/schema/resume";

export class ReactiveResumeJSONImporter {
	parse(json: string): ResumeView {
		try {
			return resumeViewSchema.parse(JSON.parse(json));
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = flattenError(error);
				throw new Error(JSON.stringify(errors));
			}

			throw error;
		}
	}
}
