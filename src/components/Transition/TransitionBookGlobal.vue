<template>
  <transition :name="transitionName">
    <div :key="route.name" class="transition-container">
      <slot />
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

// Lista de rutas que deberían tener transición
const ROUTES_WITH_TRANSITION = ['Profile', 'Home','MyStays','HotelsList','CreateStay','CreateStayFromChain'];

// Definir la jerarquía de navegación
const NAVIGATION_HIERARCHY = {
  Home: 1,
  Profile: 2,
  MyStays: 3,
  HotelsList: 4,
  CreateStay: 5,
  CreateStayFromChain: 6,
};

const transitionName = ref("slide-left");
const historyState = ref(window.history.state?.position);

// Detectar si estamos navegando hacia atrás
watch(() => route.name, async (to, from) => {
  if (!from) return; // Evita la transición en la primera carga
  
  // Si la ruta actual no debe tener transición, no hacer nada
  if (!ROUTES_WITH_TRANSITION.includes(to)) {
    transitionName.value = '';
    return;
  }

  // Obtener los niveles de jerarquía
  const fromLevel = NAVIGATION_HIERARCHY[from] || 0;
  const toLevel = NAVIGATION_HIERARCHY[to] || 0;

  // Si vamos a Home, siempre es "back"
  if (to === 'Home') {
    transitionName.value = "slide-right";
  }
  // Si el nivel de destino es mayor, es "forward"
  else if (toLevel > fromLevel) {
    transitionName.value = "slide-left";
  }
  // Si el nivel de destino es menor, es "back"
  else if (toLevel < fromLevel) {
    transitionName.value = "slide-right";
  }
  // Si estamos en el mismo nivel, usar el historial
  else {
    const currentPosition = window.history.state?.position;
    const isGoingBack = currentPosition < historyState.value;
    historyState.value = currentPosition;
    transitionName.value = isGoingBack ? "slide-right" : "slide-left";
  }
});
</script>

<style lang="scss" scoped>
.transition-container {
  width: 100%;
  height: 100%;
  position: relative;
}

/* Transición al avanzar (de izquierda a derecha) */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  position: absolute;
  width: 100%;
  transition: transform 400ms cubic-bezier(0, 0.55, 0, 1), opacity 400ms cubic-bezier(0, 0.55, 0, 1);
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