<template>
  <transition :name="transitionName">
    <div :key="route.name">
        <slot />
    </div>
  </transition>
</template>


<script setup>
import { ref, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

// PROPS
const props = defineProps({
  customTransitions: {
    type: Object,
    default: () => ({}),
  },
});

import { useRouteTransition } from "@/composables/useRouteTransition";
const { transitionName } = useRouteTransition(props.customTransitions);
// });
</script>


<style lang="scss" scoped>
/* Transición al avanzar (de izquierda a derecha) */
.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.5s ease-in-out, opacity 0.5s;
}

/* Avanzar → Se desliza hacia la izquierda */
.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Retroceder → Se desliza hacia la derecha */
.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
