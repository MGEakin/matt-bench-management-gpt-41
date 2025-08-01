import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./setupTests.ts"],
    exclude: [
      "playwright/tests/**/*.spec.ts",
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
    ],
  },
});
