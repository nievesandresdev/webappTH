<template>
  <div class="page-transition-wrapper">
    <!-- Skeleton con slide-in y fade-out -->
    <Transition name="skeleton" mode="out-in">
      <div v-if="loading !== null && loading" key="skeleton" class="skeleton-wrapper">
        <component :is="getSkeletonComponent()" />
      </div>
    </Transition>

    <!-- Contenido real con fade-in y slide-left al salir -->
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
      <div
        v-if="!loading"
        key="content"
        class="content"
        :class="{ 'content-enter': isEntering, 'content-leave': isLeaving }"
      >
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from "vue";
import { useLoadingSections } from "@/composables/useLoadingSections";

const props = defineProps({
  name: String,
  module: String,
  componentName: {
    type: String,
    default: 'SkeletonGlobal',
  },
});

const { isLoading } = useLoadingSections();
const loading = computed(() => isLoading(`${props.name ?? props.module}_global`).value);

const isEntering = ref(false);
const isLeaving = ref(false);

const getSkeletonComponent = () =>
  defineAsyncComponent(() =>
    import(`@/components/Skeletons/${props.module}/${props.componentName}.vue`)
  );

const beforeEnter = () => (isEntering.value = true);
const enter = () => {};
const afterEnter = () => (isEntering.value = false);
const beforeLeave = () => (isLeaving.value = true);
const leave = () => {};
const afterLeave = () => (isLeaving.value = false);
</script>

<style scoped>
.page-transition-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100%;
}

/* ===== Skeleton animations ===== */
.skeleton-enter-active {
  animation: skeletonSlideIn 0.4s ease-out forwards;
}
.skeleton-leave-active {
  animation: skeletonFadeOut 0.3s ease-out forwards;
}

@keyframes skeletonSlideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
}

@keyframes skeletonFadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* ===== Content animations ===== */
.page-enter-active,
.page-leave-active {
  transition: all 0.5s ease-out;
}

.page-enter-from {
  opacity: 0;
}
.page-enter-to {
  opacity: 1;
}
.page-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.page-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.content {
  transition: all 0.5s ease-out;
}

/* Puedes controlar adicionalmente con clases si quieres */
.content-enter {
  /* opcional si usas animaciones personalizadas aquí */
}
.content-leave {
  /* opcional si usas animaciones personalizadas aquí */
}

</style>
