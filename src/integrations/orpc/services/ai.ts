import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createGateway, generateText, Output } from "ai";
import { createOllama } from "ai-sdk-ollama";
import { match } from "ts-pattern";
import type { ZodError } from "zod";
import z, { flattenError } from "zod";
import docxParserSystemPrompt from "@/integrations/ai/prompts/docx-parser-system.md?raw";
import docxParserUserPrompt from "@/integrations/ai/prompts/docx-parser-user.md?raw";
import pdfParserSystemPrompt from "@/integrations/ai/prompts/pdf-parser-system.md?raw";
import pdfParserUserPrompt from "@/integrations/ai/prompts/pdf-parser-user.md?raw";
import { type ResumeView, resumeViewFactory, resumeViewSchema } from "@/schema/resume/view";

export const aiProviderSchema = z.enum(["ollama", "openai", "gemini", "anthropic", "vercel-ai-gateway"]);

export type AIProvider = z.infer<typeof aiProviderSchema>;

export type GetModelInput = {
	provider: AIProvider;
	model: string;
	apiKey: string;
	baseURL: string;
};

function getModel(input: GetModelInput) {
	const { provider, model, apiKey } = input;
	const baseURL = input.baseURL || undefined;

	return match(provider)
		.with("openai", () => createOpenAI({ apiKey, baseURL }).languageModel(model))
		.with("ollama", () => createOllama({ apiKey, baseURL }).languageModel(model))
		.with("anthropic", () => createAnthropic({ apiKey, baseURL }).languageModel(model))
		.with("vercel-ai-gateway", () => createGateway({ apiKey, baseURL }).languageModel(model))
		.with("gemini", () => createGoogleGenerativeAI({ apiKey, baseURL }).languageModel(model))
		.exhaustive();
}

export const aiCredentialsSchema = z.object({
	provider: aiProviderSchema,
	model: z.string(),
	apiKey: z.string(),
	baseURL: z.string(),
});

export const fileInputSchema = z.object({
	name: z.string(),
	data: z.string(), // base64 encoded
});

export type TestConnectionInput = z.infer<typeof aiCredentialsSchema>;

export async function testConnection(input: TestConnectionInput): Promise<boolean> {
	const RESPONSE_OK = "1";

	const result = await generateText({
		model: getModel(input),
		output: Output.choice({ options: [RESPONSE_OK] }),
		messages: [{ role: "user", content: `Respond with "${RESPONSE_OK}"` }],
	});

	return result.output === RESPONSE_OK;
}

export type ParsePdfInput = z.infer<typeof aiCredentialsSchema> & {
	file: z.infer<typeof fileInputSchema>;
};

export async function parsePdf(input: ParsePdfInput): Promise<ResumeView> {
	const model = getModel(input);
	const defaults = resumeViewFactory.defaults();

	const result = await generateText({
		model,
		output: Output.object({ schema: resumeViewSchema }),
		messages: [
			{
				role: "system",
				content: pdfParserSystemPrompt,
			},
			{
				role: "user",
				content: [
					{ type: "text", text: pdfParserUserPrompt },
					{
						type: "file",
						filename: input.file.name,
						mediaType: "application/pdf",
						data: input.file.data,
					},
				],
			},
		],
	});

	return resumeViewSchema.parse({
		...result.output,
		customSections: [],
		picture: defaults.picture,
		metadata: defaults.metadata,
	});
}

export type ParseDocxInput = z.infer<typeof aiCredentialsSchema> & {
	file: z.infer<typeof fileInputSchema>;
	mediaType: "application/msword" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
};

export async function parseDocx(input: ParseDocxInput): Promise<ResumeView> {
	const model = getModel(input);
	const defaults = resumeViewFactory.defaults();

	const result = await generateText({
		model,
		output: Output.object({ schema: resumeViewSchema }),
		messages: [
			{ role: "system", content: docxParserSystemPrompt },
			{
				role: "user",
				content: [
					{ type: "text", text: docxParserUserPrompt },
					{
						type: "file",
						filename: input.file.name,
						mediaType: input.mediaType,
						data: input.file.data,
					},
				],
			},
		],
	});

	return resumeViewSchema.parse({
		...result.output,
		customSections: [],
		picture: defaults.picture,
		metadata: defaults.metadata,
	});
}

export function formatZodError(error: ZodError): string {
	return JSON.stringify(flattenError(error));
}

export const aiService = {
	testConnection,
	parsePdf,
	parseDocx,
};
