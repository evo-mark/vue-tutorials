import Components from "unplugin-vue-components/vite";
import Vue from "@vitejs/plugin-vue";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import Fonts from "unplugin-fonts/vite";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import { resolve, dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		plugins: [
			Vue({
				template: { transformAssetUrls },
			}),
			// https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
			Vuetify(),
			Components(),
			Fonts({
				fontsource: {
					families: [
						{
							name: "Roboto",
							weights: [100, 300, 400, 500, 700, 900],
							styles: ["normal", "italic"],
						},
					],
				},
			}),
		],
		optimizeDeps: {
			exclude: ["vuetify"],
		},
		define: { "process.env": {} },
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("src", import.meta.url)),
				"vue-tutorials": mode === "development" ? resolve(__dirname, "../src") : "vue-tutorials",
			},
			extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
		},
		server: {
			port: 3000,
		},
		css: {
			preprocessorOptions: {
				sass: {
					api: "modern-compiler",
				},
				scss: {
					api: "modern-compiler",
				},
			},
		},
	};
});
