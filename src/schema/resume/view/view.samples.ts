import { sampleResumeData } from "../data/samples";
import { sampleResumeStyles } from "../styles/styles.samples";
import { resumeViewFactory } from "./factory";
import type { ResumeView } from "./view.types";

// zip data and styles
export const sampleResumeViews: ResumeView[] = [
	resumeViewFactory.zip({
		data: sampleResumeData[0],
		styles: sampleResumeStyles[0],
	}),
];

console.log(diffJson(sampleResumeViews[0], sampleResumeViews[1]));
