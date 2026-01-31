import { defineConfig } from "vitest/config";

/**
 * @remarks
 * Baseline Vitest configuration for unit-level checks that focus on schema contracts.
 * Keep this minimal so it remains portable across environments and CI hosts.
 *
 * @see {@link https://vitest.dev/config/ | Vitest configuration reference}
 */
export default defineConfig({
	test: {
		environment: "node",
		include: ["src/**/*.test.ts"],
	},
});
