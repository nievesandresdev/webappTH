<template>
  <div
    ref="sheet"
    class="bottom-sheet"
    :style="{ height: sheetHeight }"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <div class="handlebar"></div>

    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch, defineEmits } from 'vue';

const emits = defineEmits(['changeCurrentHeight']);

const props = defineProps({
  position: {
    type: String,
    default: 'top',
  }
});

const { position } = toRefs(props);

// Define las tres alturas en porcentajes
const heights = ['25%', '58%', '79%'];
const currentHeightIndex = ref(1);
const sheetHeight = ref(heights[currentHeightIndex.value]); // Altura actual del bottom sheet

let startY = 0;
let isDragging = false;

watch(position, (value) => {

  if (position.value === 'top') {
    currentHeightIndex.value = 2;
  }
  if (position.value === 'medium') {
    currentHeightIndex.value = 1;
  }
  if (position.value === 'bottom') {
    currentHeightIndex.value = 0;
  }
  // Actualiza la altura del bottom sheet
  sheetHeight.value = heights[currentHeightIndex.value];
});
watch(currentHeightIndex, (value) => {
  emits('changeCurrentHeight', currentHeightIndex.value);
});

// Inicia el arrastre del bottom sheet
function startDrag(event) {
  isDragging = true;
  startY = event.touches ? event.touches[0].clientY : event.clientY;

  // Agrega listeners para movimiento y fin del arrastre
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('touchmove', onDrag);
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);
}

// Mueve el bottom sheet a la nueva altura
function onDrag(event) {
  if (!isDragging) return;

  const currentY = event.touches ? event.touches[0].clientY : event.clientY;
  const deltaY = currentY - startY;

  // Cambia a la siguiente altura si el delta es suficiente
  if (deltaY < -50 && currentHeightIndex.value < heights.length - 1) {
    // Desliza hacia arriba (incrementa la altura)
    currentHeightIndex.value += 1;
    sheetHeight.value = heights[currentHeightIndex.value];
    isDragging = false;
  } else if (deltaY > 50 && currentHeightIndex.value > 0) {
    // Desliza hacia abajo (reduce la altura)
    currentHeightIndex.value -= 1;
    sheetHeight.value = heights[currentHeightIndex.value];
    isDragging = false;
  }
}

// Finaliza el arrastre y limpia los listeners
function endDrag() {
  isDragging = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('mouseup', endDrag);
  document.removeEventListener('touchend', endDrag);
}
</script>

<style scoped>
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: height 0.3s ease-in-out;
  background: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 1000;
}

.handlebar {
  width: 40px;
  height: 5px;
  background-color: #ccc;
  border-radius: 10px;
  margin: 10px auto;
  cursor: grab;
}

.content {
  /* padding: 16px; */
  /* overflow-y: auto; */
}
</style>
