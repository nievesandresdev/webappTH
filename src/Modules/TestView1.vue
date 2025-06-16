<template>
  <div>
    <div class="flex items-center justify-center text-white text-4xl font-bold w-full bg-green-500 h-[100px]" >
      view 1
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const title = computed(() => {
  if (route.name === 'view1') return 'Vista 1'
  if (route.name === 'view2') return 'Vista 2'
  return 'Vista 3'
})

const bgColor = computed(() => {
  if (route.name === 'view1') return 'bg-red-500'
  if (route.name === 'view2') return 'bg-green-500'
  return 'bg-blue-500'
})
</script>
