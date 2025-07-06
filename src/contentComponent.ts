import { defineComponent, h, normalizeClass, PropType } from "vue";

export default defineComponent({
	props: {
		id: {
			type: String,
			required: true,
		},
		content: {
			type: [String, Array] as PropType<string | string[]>,
			default: null,
		},
		style: {
			type: Object,
			default: () => ({}),
		},
		class: {
			type: String,
			default: "",
		},
	},
	emits: ["close"],
	setup(props, { slots, emit }) {
		return () =>
			h(
				"span",
				{
					style: {
						...props.style,
					},
					class: normalizeClass([props.class]),
				},
				slots?.default ? slots.default({ closeTutorial: () => emit("close") }) : props.content,
			);
	},
});
