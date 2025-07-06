import { type App, type Plugin, type Component } from "vue";
import { default as VTutorial } from "./component";
import { VUE_TUTORIALS_INJECTION_KEY } from "./constants";
import "./style.css";

export interface PluginOptions {
	viewCount: number;
	componentName: string;
	tutorials: Record<string, string | string[]>;
	overlayColour: string;
	target: string;
	global: boolean;
	as: string | Component;
	closeOnOutsideClick: boolean;
	contentClass: string;
	highlightedClass: string;
	position: string;
	offset: number;
}

const resolveOptions = (options: Partial<PluginOptions>): PluginOptions => {
	return {
		viewCount: (options.viewCount ??= 1),
		componentName: options.componentName ?? "VTutorial",
		tutorials: options.tutorials ?? {},
		overlayColour: options.overlayColour ?? "rgba(0, 0, 0, 0.6)",
		target: options.target ?? "body",
		global: options.global ?? true,
		as: options.as ?? "span",
		closeOnOutsideClick: options.closeOnOutsideClick ?? true,
		contentClass: options.contentClass ?? "",
		highlightedClass: options.highlightedClass ?? "",
		position: options.position ?? "bottom",
		offset: options.offset ?? 10,
	};
};

export const VueTutorials: Plugin = {
	install: (app: App, options: Partial<PluginOptions> = {}) => {
		const resolvedOptions = resolveOptions(options);

		app.provide(VUE_TUTORIALS_INJECTION_KEY, resolvedOptions);

		if (resolvedOptions.global) {
			app.component(resolvedOptions.componentName, VTutorial);
		}
	},
};
