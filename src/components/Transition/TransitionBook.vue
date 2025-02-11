<template>
  <transition :name="transitionName">
    <slot />
  </transition>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const transitionName = ref("slide-left");

// Observa los cambios de ruta para definir la dirección de la transición
watch(() => route.name, (to, from) => {

  if (!from) return; // Si no hay una ruta anterior, no hacer nada

  // Alternar dirección según la ruta
  transitionName.value = to === "FacilityList" ? "slide-left" : "slide-right";
});

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
