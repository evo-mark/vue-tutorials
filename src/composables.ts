import { computed, ComputedRef, inject } from "vue";
import { VUE_TUTORIALS_INJECTION_KEY } from "./constants";
import type { PluginOptions } from "./plugin";
import { omitBy } from "es-toolkit";

export const useMergedConfig = (componentProps: Record<string, unknown>): ComputedRef<PluginOptions> | null => {
	const provided = inject(VUE_TUTORIALS_INJECTION_KEY, null);
	if (!provided) {
		return null;
	}

	return computed(() =>
		Object.assign(
			{},
			provided,
			omitBy(componentProps, (value) => value === null),
		),
	);
};
