import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  // ── Global ignores ─────────────────────────────────────────────────
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "workers/**",
      // Config / build files at the root – plain JS, no tsconfig coverage
      "*.config.js",
      "*.config.ts",
      "scripts/*.js",
    ],
  },

  // ── Base JS rules (applies to everything not ignored) ───────────────
  js.configs.recommended,

  // ── TypeScript type-checked rules for app source only ───────────────
  {
    files: ["src/**/*.{ts,tsx}", "api/**/*.{ts,tsx}", "scripts/**/*.ts"],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // React Hooks
      ...reactHooks.configs.recommended.rules,
      "react-hooks/exhaustive-deps": "warn",

      // React Refresh (Vite HMR)
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // TypeScript: downgrade to warnings where legitimate `any` may exist
      "@typescript-eslint/no-explicit-any": "warn",

      // Unused vars: error, but allow unused args prefixed with _
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  }
);
