<template>
    <div
        ref="carousel"
        :class="[classes, isDragging ? 'cursor-grabbing' : 'cursor-grab']"
        @wheel="onWheel"
        @pointerdown="startDrag"
        @pointermove="onDrag"
        @pointerup="stopDrag"
        @pointerleave="stopDrag"
        @dragstart.prevent 
    >
        <slot></slot>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
  classes: {
    type: [String, Array, Object],
    default: ''
  },
  wheel: {
    type: Boolean,
    default: false
  }
})

 const carousel    = ref(null);
 const isDragging  = ref(false);
const startX      = ref(0);
const scrollStart = ref(0);

 const startDrag = (e) => {
     if (!carousel.value) return;
     isDragging.value = true;
     startX.value = e.pageX;
     scrollStart.value = carousel.value.scrollLeft;
     carousel.value.setPointerCapture(e.pointerId);
 }

 const onDrag = (e) => {
     if (!isDragging.value || !carousel.value) return;
     const delta = e.pageX - startX.value;
     carousel.value.scrollLeft = scrollStart.value - delta;
 }

 const stopDrag = (e) => {
     if (!carousel.value) return;
     isDragging.value = false;
     carousel.value.releasePointerCapture(e.pointerId);
 }

 const onWheel = (e) => {
     if (!carousel.value || !props.wheel) return;
     carousel.value.scrollLeft += e.deltaY;
 }
</script>

<style scoped>
.cursor-grab     { cursor: grab; }
.cursor-grabbing { cursor: grabbing; }
</style>