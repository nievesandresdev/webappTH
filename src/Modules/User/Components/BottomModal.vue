<template>
    <div v-if="isOpen || isClosing" class="fixed inset-0 flex items-end z-[2500]">
        <div 
            class="absolute inset-0 bg-black bg-opacity-50" 
            @click.self="closeModal"
        ></div>

        <div 
            class="relative w-full py-3 px-4 rounded-t-[20px] border-t border-r border-l shadow-modal bg-gradient-to-r from-[#F3F3F3] to-[#FAFAFA]" 
            :class="{'dialog-enter-active': !isClosing, 'dialog-leave-active': isClosing}"
            @click.stop
            @touchstart="startTouch" 
            @touchmove="moveTouch"  
        >
            <div class="flex justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="4" viewBox="0 0 49 4" fill="none">
                    <rect x="0.5" width="48" height="4" rx="2" fill="#777777"/>
                </svg>
            </div>
            
            <slot></slot>

            <button
                v-if="showButton"
                @click="handleSubmit"
                class="w-full lato flex justify-center items-center h-10 px-4 py-2 gap-2 rounded-[10px] border border-white bg-[#333333] text-white text-sm font-bold hshadow-button mt-4"
            >
                {{ buttonText }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    showButton: {
        type: Boolean,
        default: false
    },
    buttonText: {
        type: String,
        default: 'Acción'
    }
});

const emit = defineEmits(['update:isOpen', 'handleClick']);

const isClosing = ref(false);
const touchStartY = ref(0); // Posición inicial del toque en el eje Y
const touchCurrentY = ref(0); // Posición actual del toque en el eje Y

const closeModal = () => {
    isClosing.value = true;
    setTimeout(() => {
        isClosing.value = false;
        emit('update:isOpen', false);
    }, 500);
};

// Detecta la posición Y cuando el usuario inicia el toque
const startTouch = (event) => {
    touchStartY.value = event.touches[0].clientY;
};

// Detecta el deslizamiento hacia abajo y cierra el modal si supera el umbral
const moveTouch = (event) => {
    touchCurrentY.value = event.touches[0].clientY;
    const touchDifference = touchCurrentY.value - touchStartY.value;

    if (touchDifference > 50) {
        closeModal();
    }
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
    animation-fill-mode: forwards; /* Mantiene el último estado de la animación */
}
</style>
