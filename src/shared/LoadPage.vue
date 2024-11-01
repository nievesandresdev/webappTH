<template>
  <div class="fixed inset-0 bg-white flex justify-center items-center z-50">
    <div class="dot-spinner">
      <div
        v-for="i in 12"
        :key="i"
        class="dot"
        :style="{ transform: `rotate(${30 * i}deg) translateX(26px)` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const dots = ref([]);

onMounted(() => {
  const dotElements = document.querySelectorAll('.dot');
  dots.value = Array.from(dotElements);
  // Aplicar tamaños y colores iniciales
  applySizesAndColors();
  animateDots();
});

function animateDots() {
  let sizes = [6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11];
  setInterval(() => {
    // Rotar el array de tamaños para la siguiente iteración
    sizes.unshift(sizes.pop());

    // Aplicar tamaños y colores actualizados
    applySizesAndColors(sizes);
  }, 200);
}

function applySizesAndColors(sizes = [6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11]) {
  // Asignar tamaños a los puntos
  for (let i = 0; i < dots.value.length; i++) {
    dots.value[i].style.width = `${sizes[i]}px`;
    dots.value[i].style.height = `${sizes[i]}px`;
  }

  // Determinar el tamaño umbral que separa los 6 puntos más pequeños
  let sortedSizes = [...sizes].sort((a, b) => a - b);
  let thresholdSize = sortedSizes[5]; // El sexto tamaño más pequeño

  // Asignar color de fondo según el tamaño
  for (let i = 0; i < dots.value.length; i++) {
    if (sizes[i] <= thresholdSize) {
      dots.value[i].style.backgroundColor = '#000'; // Mismo color que el borde
    } else {
      dots.value[i].style.backgroundColor = '#fff'; // Blanco
    }
  }
}
</script>

<style scoped>
.dot-spinner {
  width: 80px;
  height: 0;
  position: relative;
}

.dot {
  width: 12px;
  height: 12px;
  background-color: white;
  border: 2px solid #000;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 50%;
  transform-origin: 0 -30px;
  transition: width 0.2s, height 0.2s, background-color 0.2s;
}
</style>
