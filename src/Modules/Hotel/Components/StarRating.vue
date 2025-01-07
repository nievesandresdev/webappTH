<template>
  <div v-if="category !== null" class="flex items-center">
    <img
      v-for="star in starCount"
      :key="star"
      src="/assets/icons/WA.star.svg"
      alt="Estrella"
      class="size-[10px] sp:size-4 mr-[2px] sp:mr-1"
    />
    <!--  "Gran Lujo" o "Superior" -->
    <span v-if="category == 7" class="text-[#333] text-[7px] sp:text-[14px] ml-0.5 sp:ml-1 font-normal lato">Gran Lujo</span>
    <span v-if="category == 6" class="text-[#333] text-[7px] sp:text-[14px] ml-0.5 sp:ml-1 font-normal lato">Superior</span>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue'

const props = defineProps({
  category: {
    type: Number,
    required: true
  }
})

const starCount = ref([])

onMounted(() => {
  let count = 0
  let starsToDisplay = 0
  if (props.category == 7 || props.category == 5) {
    starsToDisplay = 5 // 5 estrellas para "Gran Lujo" y 5 estrellas normales
  } else if (props.category == 6 || props.category == 4) {
    starsToDisplay = 4 // 4 estrellas para "Superior" y 4 estrellas normales
  } else {
    starsToDisplay = props.category 
  }


  //  array con el número adecuado de estrellas
  while (count < starsToDisplay) {
    starCount.value.push(count)
    count++
  }
})
</script>

