import { type InjectionKey } from "vue";
import { type PluginOptions } from "./plugin";

export const VUE_TUTORIALS_STORAGE_KEY = "vue-tutorials__data";
export const VUE_TUTORIALS_INJECTION_KEY = Symbol.for("vue-tutorials-injection") as InjectionKey<PluginOptions>;
