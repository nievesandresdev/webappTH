<template>
  <div class="page-transition-wrapper">
    <Transition 
      name="page" 
      mode="out-in"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div v-if="loading !== null && loading" class="skeleton-wrapper">
        <component :is="getSkeletonComponent()" />
      </div>
      <div v-else class="content" :class="{ 'content-enter': isEntering, 'content-leave': isLeaving }">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from "vue";
import { useLoadingSections } from "@/composables/useLoadingSections";

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  module: {
    type: String,
    default: null,
  },
  componentName: {
    type: String,
    default: 'SkeletonGlobal',
  },
});

const { isLoading } = useLoadingSections();
const loading = computed(() => isLoading(`${props.name ?? props.module}_global`).value);

const isEntering = ref(false);
const isLeaving = ref(false);

// Carga el skeleton general de la página
const getSkeletonComponent = () => {
  return defineAsyncComponent(() => import(`@/components/Skeletons/${props.module}/${props.componentName}.vue`));
};

// Hooks de transición
const beforeEnter = () => {
  isEntering.value = true;
};

const enter = () => {
  // Se puede agregar lógica adicional durante la entrada
};

const afterEnter = () => {
  isEntering.value = false;
};

const beforeLeave = () => {
  isLeaving.value = true;
};

const leave = () => {
  // Se puede agregar lógica adicional durante la salida
};

const afterLeave = () => {
  isLeaving.value = false;
};
</script>

<style scoped>
.page-transition-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100%;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.5s ease-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.content {
  transition: all 0.5s ease-out;
}

.content-enter {
  animation: slideInUp 0.5s ease-out;
}

.content-leave {
  animation: slideOutDown 0.5s ease-out;
}

@keyframes slideInUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideOutDown {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style> 