import { sampleDraftData } from "@/schema/resume/data";
import { sampleResumeStyles } from "./styles/styles.samples.ts";
import { resumeViewFactory } from "./factory.ts";
import type { ResumeView } from "./view.types.ts";

/**
 * @remarks
 * The intent is to enumerate the full Cartesian product of sample data data and
 * sample styles, producing a comprehensive set of synthesized resume views that
 * exercise the renderer across all combinations.
 *
 * @returns
 * An ordered list of view-models, grouped by data and expanded by style.
 */
export const sampleResumeViews: ResumeView[] = sampleDraftData.flatMap((data) =>
	sampleResumeStyles.map((styles) =>
		resumeViewFactory.zip({
			data,
			styles,
		}),
	),
);

export const sampleResumeView = sampleResumeViews[0];
