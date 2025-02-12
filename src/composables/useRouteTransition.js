import { ref, watch, nextTick } from "vue";
import { useRoute } from "vue-router";

export function useRouteTransition() {
  const route = useRoute();
  const transitionName = ref("slide-left");
  const lastDirection = ref("slide-left"); // Almacena la última transición usada

watch(() => route.name, async (to, from) => {
  await nextTick();

  if (!from) return; // Evita la transición en la primera carga

  transitionName.value = lastDirection.value === "slide-left" ? "slide-right" : "slide-left";
  lastDirection.value = transitionName.value;
});

  return { transitionName };
}
