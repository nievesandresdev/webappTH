<template>
  <Transition name="fade">
    <!-- <div v-if="loading !== null && loading" class="skeleton-wrapper"> -->
    <div v-if="true" class="skeleton-wrapper">
      <component :is="getSkeletonComponent()" />
    </div>
    <div v-else class="content">
      <slot></slot>
    </div>
  </Transition>
</template>

<script setup>
import { computed, defineAsyncComponent } from "vue";
import { useLoadingSections } from "@/composables/useLoadingSections";

const props = defineProps({
  module: String,  // Define el módulo (ej: 'home', 'profile', etc.)
});

const { isLoading } = useLoadingSections();
const loading = computed(() => isLoading(`${props.module}_global`).value);

// Carga el skeleton general de la página
const getSkeletonComponent = () => {
  return defineAsyncComponent(() => import(`@/components/Skeletons/${props.module}/SkeletonGlobal.vue`));
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.skeleton-wrapper {
  /* padding: 10px; */
}

.content {
  opacity: 0;
  animation: fadeIn 0.8s ease-in-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>