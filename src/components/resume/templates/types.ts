import type z from "zod";
import type { pageLayoutSchema } from "@/schema/resume/styles";

export type TemplateProps = {
	pageIndex: number;
	pageLayout: z.infer<typeof pageLayoutSchema>;
};
