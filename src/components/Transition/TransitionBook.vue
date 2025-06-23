<template>
  <transition 
    :name="transitionName"
    @before-leave="beforeLeave"
    @enter="enter"
    @after-enter="afterEnter"
  >
    <div :key="route.name" class="transition-container">
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

// Transition handlers
const beforeLeave = (el) => {
  el.style.position = 'absolute';
  el.style.width = '100%';
  el.style.top = '0';
  el.style.left = '0';
};

const enter = (el) => {
  el.style.position = 'absolute';
  el.style.width = '100%';
  el.style.top = '0';
  el.style.left = '0';
};

const afterEnter = (el) => {
  el.style.position = '';
  el.style.width = '';
  el.style.top = '';
  el.style.left = '';
};
</script>


<style lang="scss" scoped>
.transition-container {
  width: 100%;
  min-height: 100%;
}

/* Transición al avanzar (de izquierda a derecha) */
.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.4s cubic-bezier(0, 0.55, 0, 1);
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

/* Avanzar → Se desliza hacia la izquierda */
.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}

/* Retroceder → Se desliza hacia la derecha */
.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
