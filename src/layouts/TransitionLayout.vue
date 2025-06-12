<template>
  <div class="transition-wrapper">
    <RouterView v-slot="{ Component }">
      <Transition 
        name="page" 
        mode="out-in"
      >
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>
.transition-wrapper {
  position: relative;
  min-height: 100vh;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style> 