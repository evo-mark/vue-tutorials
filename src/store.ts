import { ref, toValue, computed } from "vue";

const activeTutorial = ref<string | null>(null);

export const useActiveTutorial = (checkId: string) => {
	const isActiveTutorial = computed(() => toValue(checkId) === activeTutorial.value);

	const makeActiveTutorial = () => {
		activeTutorial.value = checkId;
	};

	const makeTutorialInactive = () => {
		activeTutorial.value = null;
	};

	const hasActiveTutorial = computed(() => !!activeTutorial.value);

	return {
		activeTutorial,
		hasActiveTutorial,
		isActiveTutorial,
		makeActiveTutorial,
		makeTutorialInactive,
	};
};
