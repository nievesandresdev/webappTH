<template>
    <!-- Fondo oscuro detrás del modal -->
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end" @click.self="closeModal">
        <!-- Contenedor del modal que aparece desde abajo -->
        <div class="w-full py-3 px-4 rounded-t-[20px] border-t border-r border-l shadow-modal bg-gradient-to-r from-[#F3F3F3] to-[#FAFAFA]" @click.stop>
            <!-- Línea SVG centrada arriba del modal -->
            <div class="flex justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="4" viewBox="0 0 49 4" fill="none">
                    <rect x="0.5" width="48" height="4" rx="2" fill="#777777"/>
                </svg>
            </div>
            <!-- Contenido dinámico del modal -->
            <slot></slot>

            <!-- Botón opcional al final del modal -->
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

const emit = defineEmits(['update:isOpen']);

// Función para cerrar el modal
const closeModal = () => {
    emit('update:isOpen', false);
};

// Función para manejar la acción del botón
const handleSubmit = () => {
    console.log("Botón del modal clickeado");
};
</script>

<style scoped>
.shadow-modal {
    box-shadow: 0px -4px 6px 0px rgba(0, 0, 0, 0.13);
}
</style>
