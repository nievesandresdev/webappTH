import { ref, watch, nextTick } from "vue";
import { useRoute } from "vue-router";

export function useRouteTransition(customTransitions) {
  const route = useRoute();
  const transitionName = ref("slide-left");

// watch(() => route.name, async (to, from) => {
//   await nextTick();

//   if (!from) return; // Evita la transición en la primera carga

//   transitionName.value = lastDirection.value === "slide-left" ? "slide-right" : "slide-left";
//   lastDirection.value = transitionName.value;
// });

watch(() => route.name, async (to, from) => {
  if (!from) return; // Evita la transición en la primera carga
  const positionTo = customTransitions[to];
  const positionFrom = customTransitions[from];
  await nextTick();
  if (positionTo > positionFrom) {
    transitionName.value = "slide-left";
  } else {  
    transitionName.value = "slide-right";
  }
});

  return { transitionName };
}
