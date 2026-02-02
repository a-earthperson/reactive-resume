import { sampleDraftData } from "@/schema/draft/data/index";
import { sampleResumeStyles } from "../styles/styles.samples";
import { resumeViewFactory } from "./factory";
import type { ResumeView } from "./view.types";

/**
 * @remarks
 * The intent is to enumerate the full Cartesian product of sample draft data and
 * sample styles, producing a comprehensive set of synthesized resume views that
 * exercise the renderer across all combinations.
 *
 * @returns
 * An ordered list of view-models, grouped by draft and expanded by style.
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
