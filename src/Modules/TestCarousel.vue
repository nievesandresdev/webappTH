<template>
  
    <!-- Tab menu -->
    <nav class="flex bg-gray-200 sticky top-0 left-0 w-full">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        @click="go(tab.name)"
        :class="['flex-1 py-3 text-center', $route.name === tab.name ? 'bg-blue-600 text-white' : '']"
      >
        {{ tab.label }}
      </button>
    </nav>

    <SlideTransition ref="slideTransition" :tabs="tabs" />
  
</template>

<script setup>
import { ref } from 'vue'
import SlideTransition from '@/components/Transition/SlideTransition.vue'

const tabs = [
  { name: 'module-view1', label: 'Vista 1' },
  { name: 'module-view2', label: 'Vista 2' },
  { name: 'module-view3', label: 'Vista 3' },
]

const slideTransition = ref(null)

const go = (name) => {
  slideTransition.value.goView({name})
}

</script>