<template>
    <!-- Content container -->
    <div class="relative">
      <!-- Transition container -->
      <transition :name="transitionName" mode="out-in">
        <!-- Router view with position absolute for proper overlay -->
        <router-view :key="$route.fullPath" class="absolute inset-0 w-full h-full z-[900]" />
      </transition>
    </div>
  
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  tabs: {
    type: Array,
    required: true
  }
})

const activeTab = ref(route.name)
const lastIndex = ref(props.tabs.findIndex(t => t.name === route.name))
const transitionName = ref('slide-left')

function goView(obj) {
  if (obj.name === activeTab.value) return
  const newIndex = props.tabs.findIndex(t => t.name === obj.name)
  transitionName.value = newIndex > lastIndex.value ? 'slide-left' : 'slide-right'
  lastIndex.value = newIndex
  activeTab.value = obj.name
  router.push({ name: obj.name })
}

watch(() => route.name, (newName) => {
  console.log('newName', newName)
  if (newName && newName !== activeTab.value) {
    goView(newName)
  }
})

defineExpose({
    goView
})
</script>

<style>
.slide-left-enter-active, .slide-left-leave-active {
  transition: transform 0.3s ease;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.3s ease;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.slide-right-enter-from {
  transform: translateX(-100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
