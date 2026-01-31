import { SmartCoercionPlugin } from "@orpc/json-schema";
import { OpenAPIGenerator } from "@orpc/openapi";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { RequestHeadersPlugin } from "@orpc/server/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { createFileRoute } from "@tanstack/react-router";
import router from "@/integrations/orpc/router";
import { env } from "@/utils/env";
import { getLocale } from "@/utils/locale";

const openAPIHandler = new OpenAPIHandler(router, {
	// interceptors: [
	// 	onError((error) => {
	// 		console.error(error);
	// 	}),
	// ],
	plugins: [
		new RequestHeadersPlugin(),
		new SmartCoercionPlugin({
			schemaConverters: [new ZodToJsonSchemaConverter()],
		}),
	],
});

const openAPIGenerator = new OpenAPIGenerator({
	schemaConverters: [new ZodToJsonSchemaConverter()],
});

async function handler({ request }: { request: Request }) {
	const locale = await getLocale();
	const url = new URL(request.url);
	const pathname = url.pathname;

	if (request.method === "GET" && pathname.endsWith("/spec.json")) {
		const spec = await openAPIGenerator.generate(router, {
			info: {
				title: "Reactive Resume",
				version: "5.0.0",
				description: "Reactive Resume API",
				license: { name: "MIT", url: "https://github.com/amruthpillai/reactive-resume/blob/main/LICENSE" },
				contact: { name: "Amruth Pillai", email: "hello@amruthpillai.com", url: "https://amruthpillai.com" },
			},
			servers: [{ url: `${env.APP_URL}/api/openapi` }],
			externalDocs: { url: "https://docs.rxresu.me", description: "Reactive Resume Documentation" },
			components: {
				securitySchemes: {
					apiKey: {
						type: "apiKey",
						name: "x-api-key",
						in: "header",
						description: "The API key to authenticate requests.",
					},
				},
			},
			security: [{ apiKey: [] }],
			filter: ({ contract }) => !contract["~orpc"].route.tags?.includes("Internal"),
		});

		return Response.json(spec);
	}

	if (request.method === "GET" && (pathname.endsWith("/docs") || pathname.endsWith("/docs/"))) {
		const specUrl = `${url.origin}/api/openapi/spec.json`;
		const html = `<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>Reactive Resume API Docs</title>
	<link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
	<style>
		body { margin: 0; }
	</style>
</head>
<body>
	<div id="swagger-ui"></div>
	<script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
	<script>
		window.ui = SwaggerUIBundle({
			url: "${specUrl}",
			dom_id: "#swagger-ui"
		});
	</script>
</body>
</html>`;

		return new Response(html, {
			headers: {
				"content-type": "text/html; charset=utf-8",
			},
		});
	}

	const { response } = await openAPIHandler.handle(request, {
		prefix: "/api/openapi",
		context: { locale, reqHeaders: request.headers },
	});

	if (!response) {
		return new Response("NOT_FOUND", { status: 404 });
	}

	return response;
}

export const Route = createFileRoute("/api/openapi/$")({
	server: {
		handlers: {
			ANY: handler,
		},
	},
});
