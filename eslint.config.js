import configPrettier from "eslint-config-prettier";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import js from "@eslint/js";
import { globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default tseslint.config([
	globalIgnores([".gitignore", "dist", "demo/dist"]),
	{
		files: ["src/**/*.ts", "src/**/*.js", "src/**/*.vue"],
	},
	js.configs.recommended,
	tseslint.configs.recommended,
	...pluginVue.configs["flat/recommended"],
	configPrettier,
	{
		languageOptions: {
			globals: {
				...globals.es2021,
				...globals.browser,
			},
		},
	},
]);
