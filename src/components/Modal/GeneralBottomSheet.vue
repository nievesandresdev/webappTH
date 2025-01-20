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
            class="relative w-full max-h-[80vh] py-3 px-4 overflow-y-auto rounded-t-[20px] border-t border-r border-l shadow-modal bg-gradient-h pb-6"
            :class="{'dialog-enter-active': !isClosing, 'dialog-leave-active': isClosing}"
            @click.stop
            ref="modalContainer"
            @touchstart="startTouch"
            @touchmove.capture.prevent="moveTouch"
            @touchend="endTouch"
        >
            <div class="h-1 w-[48px] bg-[#777777] rounded-full mx-auto mb-3"></div>
            <!-- Contenido del modal -->
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
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    showButton: Boolean,
    buttonText: {
        type: String,
        default: 'Acción'
    }
});

const emit = defineEmits(['update:isOpen', 'handleClick']);

const isClosing = ref(false);
const touchStartY = ref(0);
const touchCurrentY = ref(0);
const isSwiping = ref(false);

const modalContainer = ref(null);

watch(() => props.isOpen, (newValue) => {
    if (newValue) {
        // Modal está abierto, deshabilita el scroll del body
        document.body.style.overflow = 'hidden';
    } else {
        // Modal está cerrado, habilita el scroll del body
        document.body.style.overflow = '';
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
