import { ref, watch, nextTick } from "vue";
import { useRoute } from "vue-router";

export function useRouteTransition(customTransitions) {
  const route = useRoute();
  const transitionName = ref("slide-left");

watch(() => route.name, async (to, from) => {
  // await nextTick();
  if (!from) return; // Evita la transición en la primera carga
  const positionTo = customTransitions[to];
  const positionFrom = customTransitions[from];
  if (positionTo > positionFrom) {
    transitionName.value = "slide-right";
  } else {  
    transitionName.value = "slide-left";
  }
});

  return { transitionName };
}
