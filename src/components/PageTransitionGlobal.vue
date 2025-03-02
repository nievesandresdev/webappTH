<template>
  <!-- transition container -->
  <div>
    <Transition name="fade">
      <div v-if="loading !== null && loading" class="skeleton-wrapper">
      <!-- <div v-if="true" class="skeleton-wrapper"> -->
        <component :is="getSkeletonComponent()" />
      </div>
      <div v-else class="content">
        <slot></slot>
      </div>
    </Transition>
  </div>
  <!-- end transition container -->
</template>

<script setup>
import { computed, defineAsyncComponent, watch } from "vue";
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
  }
});

const { isLoading } = useLoadingSections();
const loading = computed(() => isLoading(`${props.name ?? props.module}_global`).value);

watch(loading, (val) => {
    console.log()
});

// Carga el skeleton general de la página
const getSkeletonComponent = () => {
  return defineAsyncComponent(() => import(`@/components/Skeletons/${props.module}/${props.componentName}.vue`));
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

/* .content {
  opacity: 0;
  animation: fadeIn 0.8s ease-in-out forwards;
} */

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>