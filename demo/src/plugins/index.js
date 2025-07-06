import vuetify from "./vuetify";
import { VueTutorials } from "vue-tutorials";

export function registerPlugins(app) {
	app.use(vuetify);
	app.use(VueTutorials, {
		viewCount: 1000,
		overlayColour: "rgb(0 0 0 / 0.8)",
		contentClass: "bg-white pa-4 rounded",
		tutorials: {
			feature: ["Testing the central map out"],
		},
		target: "#app",
	});
}
