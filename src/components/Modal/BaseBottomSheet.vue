<template>
  <div
    v-if="!isStepThree && open"
    class="w-screen h-screen fixed top-0 left-0 z-[2000]" style="background: rgba(0, 0, 0, 0.32);"
    @click="emitClose"
  />
  <transition name="slide-fade">
    <div
      
      ref="sheet"
      v-if="open"
      class="bottom-sheet relative pt-[6px] sp:pt-[12px]"
      :style="{ height: sheetHeight, zIndex: isFullFront ? '100000' : '2000' }"
    >
      
      <div
        class="flex justify-center py-[6px] sp:py-[12px] w-full absolute top-0 left-0"
        id="handlebar-content"
        @mousedown="startDrag"
        @touchstart="startDrag"
        @click="!isStepThree ? emitClose() : ''"
      >
        <div
          class="handlebar"
        />
      </div>
      <!-- {{ sheetHeight }} {{ isStepThree }} -->
      <div class="h-full">
        <div class="content pt-[12px] sp:pt-[24px] h-full">
          <slot name="content" />
        </div>
        <!-- <div class="footer">
          <slot name="footer" />
        </div> -->
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, toRefs, watch, defineEmits, onUpdated, onMounted } from 'vue';
import { updateGuestByIdApi } from '../../api/services/auth.services';

const emits = defineEmits(['changeCurrentHeight']);

const props = defineProps({
  isStepThree: {
    type: Boolean,
    default: false,
  },
  open: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String,
    default: 'top',
  },
  isFullFront: {
    type: Boolean,
    default: false,
  }
});

const { position, open, isStepThree } = toRefs(props);

// Alturas definidas para cada caso
const heights = {
  dragTwoStep: ['0%', '75%'],       // Solo permite desplazamiento entre 73% y 0% cuando isStepThree es false
  dragThreeStep: ['25%', '58%', '79%'], // Permite top, medium y bottom cuando isStepThree es true
};

// Inicia en la posición central
const currentHeightIndex = ref(isStepThree.value ? 1 : 1);
const sheetHeight = ref(isStepThree.value ? heights.dragThreeStep[currentHeightIndex.value] : heights.dragTwoStep[currentHeightIndex.value]);

let startY = 0;
let isDragging = false;

// Actualiza la altura del bottom sheet en función de `position`
watch(position, () => {
  if (!isStepThree.value) {
    currentHeightIndex.value = 1; // Inicia en 73% cuando isStepThree es false
  } else {
    // Cambia posición inicial solo si `dragThreeStep`
    if (position.value === 'top') {
      currentHeightIndex.value = 2;
    } else if (position.value === 'medium') {
      currentHeightIndex.value = 1;
    } else if (position.value === 'bottom') {
      currentHeightIndex.value = 0;
    }
  }
  sheetHeight.value = isStepThree.value ? heights.dragThreeStep[currentHeightIndex.value] : heights.dragTwoStep[currentHeightIndex.value];
});

watch(currentHeightIndex, () => {
  emits('changeCurrentHeight', currentHeightIndex.value);
  deleteReloadPageWithTouch();
});
watch(position, (valueNew, valueOld) => {
  // console.log(valueNew, valueOld, 'open watch');
});
onUpdated(() => {
  // console.log(sheetHeight.value, 'sheetHeight');
  // console.log(position.value, 'position');
  // console.log(open.value, 'open');
  // console.log(isStepThree.value, 'isStepThree');
  if (sheetHeight.value == '0%' && position.value == 'min-top' && open.value) {
    currentHeightIndex.value = 1;
    sheetHeight.value = '73%';
  }
});

onMounted(() => {
  deleteReloadPageWithTouch();
});
function deleteReloadPageWithTouch () {
  const bottomSheet = document.getElementById("handlebar-content");
  if (bottomSheet){
    bottomSheet.addEventListener("touchmove", (event) => {
      if (bottomSheet.scrollTop === 0 && event.touches[0].clientY > 0) {
        event.preventDefault();
      }
    });
  }
}

// Inicia el arrastre del bottom sheet
function startDrag(event) {
  if (!isStepThree.value) return;
  isDragging = true;
  startY = event.touches ? event.touches[0].clientY : event.clientY;
  // Agrega listeners para movimiento y fin del arrastre
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('touchmove', onDrag);
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);
}

// Mueve el bottom sheet en función de `isStepThree`
function onDrag(event) {

  const currentY = event.touches ? event.touches[0].clientY : event.clientY;
  const deltaY = currentY - startY;

  if (isStepThree.value) {
    // Caso `isStepThree` true: permite top, medium y bottom (25%, 58%, 79%)
    if (deltaY < -50 && currentHeightIndex.value < heights.dragThreeStep.length - 1) {
      currentHeightIndex.value += 1;
      sheetHeight.value = heights.dragThreeStep[currentHeightIndex.value];
      startY = currentY; // Reinicia el punto de inicio para evitar saltos
    } else if (deltaY > 50 && currentHeightIndex.value > 0) {
      currentHeightIndex.value -= 1;
      sheetHeight.value = heights.dragThreeStep[currentHeightIndex.value];
      startY = currentY; // Reinicia el punto de inicio para evitar saltos
    }
  } else {
    // Si `isStepThree` es false: permite solo desplazamiento entre 73% y 0%
    if (deltaY < -50 && currentHeightIndex.value < heights.dragTwoStep.length - 1) {
      currentHeightIndex.value += 1;
      sheetHeight.value = heights.dragTwoStep[currentHeightIndex.value];
      startY = currentY; // Reinicia el punto de inicio para evitar saltos
    } else if (deltaY > 50 && currentHeightIndex.value > 0) {
      currentHeightIndex.value -= 1;
      sheetHeight.value = heights.dragTwoStep[currentHeightIndex.value];
      startY = currentY; // Reinicia el punto de inicio para evitar saltos
    }
    // Cierra el bottom sheet solo cuando esté en `0%`
    if (currentHeightIndex.value === 0) {
      emitClose();
    }
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

// Cierra el bottom sheet
function emitClose() {
  sheetHeight.value = '0%';
  emits('changeCurrentHeight', 0);
}
</script>

<style scoped>
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: height 0.3s ease-in-out;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: linear-gradient(93deg, #F3F3F3 0%, #FAFAFA 100%);
  border: 1px solid #FFF;
}

.handlebar {
  width: 24px;
  height: 2px;
  background-color: #777777;
  border-radius: 10px;
  cursor: grab;
}

.slide-fade-enter-from, .slide-fade-leave-active {
  transform: translateY(100%);
  visibility: hidden;
}

.slide-fade-enter-to, .slide-fade-leave-from {
  transform: translateY(0);
  visibility: visible;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: transform 0.3s ease, visibility 0.3s ease;
}

@media (min-width:300px) {
  .handlebar {
    width: 48px;
    height: 4px;
  }
}

/* body, #bottom-sheet {
  overscroll-behavior: contain;
} */

</style>
