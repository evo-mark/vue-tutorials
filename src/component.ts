import { useStorage, useScrollLock, onClickOutside, MaybeElementRef, RemovableRef } from "@vueuse/core";
import { useActiveTutorial } from "./store";
import {
	h,
	ref,
	watch,
	useId,
	Teleport,
	computed,
	useTemplateRef,
	normalizeClass,
	defineComponent,
	type Component,
	type PropType,
} from "vue";
import { VUE_TUTORIALS_STORAGE_KEY } from "./constants";
import ContentComponent from "./contentComponent";
import { useMergedConfig } from "./composables";
import { pick } from "es-toolkit";

export default defineComponent({
	props: {
		id: {
			type: [String, Number],
			required: true,
		},
		as: {
			type: [String, Object, Function] as PropType<string | Component>,
			default: null,
		},
		class: {
			type: String,
			default: "",
		},
		target: {
			type: String as PropType<keyof HTMLElement>,
			default: null,
		},
		position: {
			type: String,
			default: null,
		},
		content: {
			type: [String, Array] as PropType<string | string[]>,
			default: null,
		},
		contentClass: {
			type: String,
			default: null,
		},
		highlightedClass: {
			type: String,
			default: null,
		},
		closeOnOutsideClick: {
			type: Boolean,
			default: null,
		},
		overlayColour: {
			type: String,
			default: null,
		},
	},
	setup(props, { slots }) {
		const id = useId();
		const show = ref(false);
		const wrapperRef = useTemplateRef<HTMLElement>("wrapper");
		const containerRef = useTemplateRef<HTMLElement>("container");
		const boundingTop = ref(0);
		const boundingLeft = ref(0);
		const boundingWidth = ref(0);
		const boundingHeight = ref(0);
		const boundingBottom = ref(0);
		const bodyIsLocked = useScrollLock(document.body);
		const _props = useMergedConfig(
			pick(props, ["overlayColour", "target", "as", "closeOnOutsideClick", "contentClass", "position"]),
		);

		if (!_props) {
			console.error("You must install the VueTutorials plugin in your app before using this component");
			return slots.default;
		}

		const state: RemovableRef<Record<string, number>> = useStorage(VUE_TUTORIALS_STORAGE_KEY, {});

		let stopOutsideClickListener: () => void;
		const closeTutorial = () => {
			stopOutsideClickListener();

			show.value = false;
			bodyIsLocked.value = false;
			makeTutorialInactive();
		};

		const listenForOutsideClick = () => {
			const { stop } = onClickOutside(
				containerRef as MaybeElementRef,
				async () => {
					if (!show.value || !isActiveTutorial.value || !_props.value.closeOnOutsideClick) {
						return;
					}

					closeTutorial();
				},
				{
					controls: true,
				},
			);
			stopOutsideClickListener = stop;
		};

		const { isActiveTutorial, hasActiveTutorial, makeActiveTutorial, makeTutorialInactive } = useActiveTutorial(id);

		const style = computed(() =>
			show.value
				? {
						position: "absolute",
						top: boundingTop.value + "px",
						left: boundingLeft.value + "px",
						width: boundingWidth.value + "px",
						height: boundingHeight.value + "px",
						zIndex: 10000,
						boxShadow: "0 0 0 9999px " + _props.value.overlayColour,
					}
				: {},
		);
		const cardStyle = computed(() => ({
			position: "absolute",
			top: boundingBottom.value + _props.value.offset + "px",
			left: boundingLeft.value + "px",
			zIndex: 10001,
		}));

		const updatePosition = (el: HTMLElement) => {
			const rect = el.getBoundingClientRect();
			boundingTop.value = rect.top;
			boundingLeft.value = rect.left;
			boundingWidth.value = rect.width;
			boundingHeight.value = rect.height;
			boundingBottom.value = rect.bottom;
		};

		const activateTutorial = (el: HTMLElement) => {
			makeActiveTutorial();
			updatePosition(el);

			show.value = true;
			bodyIsLocked.value = true;
			listenForOutsideClick();

			if (!state.value[props.id]) {
				state.value[props.id] = 0;
			}
			state.value[props.id]++;
			hasShownThisSession = true;
		};

		let hasShownThisSession = false;
		const checkShouldShow = (): boolean => {
			const shownCount = state.value[props.id] ?? 0;
			const maxCount = _props.value.viewCount;

			return hasShownThisSession === false && shownCount < maxCount;
		};

		watch(
			wrapperRef,
			(el) => {
				if (hasActiveTutorial.value || !el) return;
				else if (checkShouldShow()) activateTutorial(el);
			},
			{
				immediate: true,
			},
		);

		watch(hasActiveTutorial, (hasActive) => {
			if (hasActive || !wrapperRef.value) return;
			else if (checkShouldShow()) activateTutorial(wrapperRef.value);
		});

		return () =>
			h(
				_props.value.as,
				{
					ref: "wrapper",
					class: normalizeClass([props.class, "vue-tutorial__wrapper"]),
				},
				[
					show.value
						? h("div", {
								class: "vue-tutorial__placeholder",
								style: {
									width: boundingWidth.value + "px",
									height: boundingHeight.value + "px",
								},
							})
						: undefined,
					h(
						Teleport,
						{
							to: _props.value.target,
							defer: true,
							disabled: !show.value,
						},
						[
							h(
								"span",
								{
									ref: "container",
									class: "vue-tutorial__container",
								},
								[
									h(
										"span",
										{
											class: normalizeClass([
												"vue-tutorial__highlighted",
												_props.value.highlightedClass,
											]),
											style: style.value,
											ariaDescribedby: show.value ? `vue-tutorial__content--${id}` : undefined,
										},
										slots.default ? slots.default() : undefined,
									),
									show.value
										? h(
												ContentComponent,
												{
													id: id,
													class: _props.value.contentClass,
													style: cardStyle.value,
													content: props.content ?? _props.value.tutorials?.[props.id],
													onClose: closeTutorial,
												},
												{
													default: slots.content,
												},
											)
										: undefined,
								],
							),
						],
					),
				],
			);
	},
});
