<template>
    <div v-if="isOpen || isClosing" class="fixed inset-0 flex items-end z-[6000]">
        <div 
            class="absolute inset-0 bg-black bg-opacity-50" 
            @click.self="closeModal"
            @touchstart="startTouch"
            @touchmove.capture.prevent="moveTouch"
            @touchend="endTouch"
        ></div>
        <div 
            class="relative w-full max-h-[80vh] py-3 overflow-hidden rounded-t-[20px] border-t border-r border-l shadow-modal bg-gradient-h pb-6"
            :class="{'dialog-enter-active': !isClosing, 'dialog-leave-active': isClosing, 'sp:px-4 overflow-y-auto': !scrollContentOnly}"
            @click.stop
            ref="modalContainer"
            @touchstart="startTouch"
            @touchmove.capture.prevent="moveTouch"
            @touchend="endTouch"
        >
        
            <div class="h-1 w-[48px] bg-[#777777] rounded-full mx-auto mb-3"></div>
            <!-- Imagen centrada si imgHeader tiene una URL -->
            <div v-if="imgHeader" class="flex justify-center mb-4">
                <img 
                    :src="imgHeader" 
                    alt="Header Image" 
                    class="sp:w-auto sp:h-[100px] h-[40px] object-contain"
                />
            </div>
             <!-- SI scrollContentOnly está activo, dividimos header + contenido -->
            <template v-if="scrollContentOnly">
                <div class="transition-shadow duration-200 w-full px-4 pb-3 relative" :class="{'shadow-md': headerShadow}">
                    <slot name="header" />
                </div>
                <div class="overflow-y-auto max-h-[calc(80vh-80px)] px-4" ref="scrollableContainer">
                    <slot />
                </div>
            </template>

            <!-- Si no está activo, usamos todo el slot como hasta ahora -->
            <template v-else>
                <slot />
            </template>
            <button
                v-if="showButton"
                @click="handleSubmit"
                :disabled="$utils.isMockup()"
                class="w-full lato flex justify-center items-center h-10 sp:px-4 px-1 py-2 gap-2 rounded-[10px] border border-white  text-white sp:text-sm text-[12px] font-bold hshadow-button mt-4"
                :style="{backgroundColor: customChain ? chainStore.$bgColor0 : '#333333'}"
            >
                <img v-if="showIconButton" :src="iconButton" class="sp:w-6 sp:h-6 h-5 w-5" alt="Icon Button" />
                {{ buttonText }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { defineProps, defineEmits } from 'vue';
import Icon from '../Icon.vue';
import { isMockup } from '@/utils/utils.js';
import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

const props = defineProps({
    isOpen: Boolean,
    showButton: Boolean,
    buttonText: {
        type: String,
        default: 'Acción'
    },
    showIconButton : {
        type: Boolean,
        default: false
    },
    iconButton : {
        type: String,
        default: ''
    },
    imgHeader: {
        type: String,
        default: ''
    },
    customChain: {
        type: Boolean,
        default: false
    },
    buttonColor: {
        type: String,
        default: 'bg-[#333333]'
    },
    scrollContentOnly: {
        type: Boolean,
        default: false
    }
});



const emit = defineEmits(['update:isOpen', 'handleClick']);

const isClosing = ref(false);
const touchStartY = ref(0);
const touchCurrentY = ref(0);
const isSwiping = ref(false);

const modalContainer = ref(null);

const scrollableContainer = ref(null);
const headerShadow = ref(false);


const handleScroll = () => {
  if (scrollableContainer.value) {
    console.log(scrollableContainer.value.scrollTop);
    headerShadow.value = scrollableContainer.value.scrollTop > 0;
  }
};

onMounted(() => {
  if (scrollableContainer.value) {
    scrollableContainer.value.addEventListener('scroll', handleScroll);
  }
});

onBeforeUnmount(() => {
  if (scrollableContainer.value) {
    scrollableContainer.value.removeEventListener('scroll', handleScroll);
  }
});





watch(() => props.isOpen, async (newValue) => {
  if (newValue) {
    // Modal abierto: desactiva scroll del body
    document.body.style.overflow = 'hidden';

    // Esperamos al render del DOM antes de aplicar el scroll listener
    await nextTick();
    if (scrollableContainer.value && props.scrollContentOnly) {
      scrollableContainer.value.addEventListener('scroll', handleScroll);
      handleScroll(); // Llamamos inmediatamente por si ya hay scroll
    }

  } else {
    // Modal cerrado: reactiva scroll del body
    document.body.style.overflow = '';

    // Limpiamos listener y sombra si estaba activo
    if (scrollableContainer.value && props.scrollContentOnly) {
      scrollableContainer.value.removeEventListener('scroll', handleScroll);
    }
    headerShadow.value = false;
  }
});


const startTouch = (event) => {
    isSwiping.value = true;
    touchStartY.value = event.touches[0].clientY;
};

const moveTouch = (event) => {
    if (!isSwiping.value) return;

    event.preventDefault(); // Previene el comportamiento predeterminado
    touchCurrentY.value = event.touches[0].clientY;
    const touchDifference = touchCurrentY.value - touchStartY.value;

    if (touchDifference > 50) {
        isSwiping.value = false;
        closeModal();
    }
};

const endTouch = () => {
    isSwiping.value = false;
};

const closeModal = () => {
    if (isMockup()) {
        return; 
    }
    isClosing.value = true;
    setTimeout(() => {
        isClosing.value = false;
        emit('update:isOpen', false);
    }, 500);
};

const handleSubmit = () => {
    emit('handleClick');
};

</script>

<style scoped>
.shadow-modal {
    box-shadow: 0px -4px 6px 0px rgba(0, 0, 0, 0.13);
}

/* Animación de entrada */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(100%); }
    to { opacity: 1; transform: translateY(0); }
}

/* Animación de salida */
@keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(100%); }
}

.dialog-enter-active {
    animation: fadeIn 0.5s ease;
}

.dialog-leave-active {
    animation: fadeOut 0.5s ease;
    animation-fill-mode: forwards;
}
</style>

<!-- CSS global para deshabilitar el scroll en el body -->
<style>
.modal-open {
    overflow: hidden;
}
</style>
