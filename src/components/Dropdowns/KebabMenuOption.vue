<template>
    <div 
        @click="handleClick" 
        class="py-4 px-3 flex items-center w-full"
        :class="{'border-b border-color-secondary':borderb}"
    >
        <slot></slot>
    </div>
</template>
<script setup>
import { inject } from 'vue'
defineProps({
    borderb:{
        type:Boolean,
        default:false
    }
})

// Inyectamos la función para cerrar el menú
const closeMenu = inject('closeMenu');

const handleClick = (event) => {
    // Aquí podrías ejecutar otras acciones propias de la opción,
    // por ejemplo emitir un evento o llamar a una función.

    // Llamamos a la función inyectada para cerrar el menú.
    if (closeMenu) {
        closeMenu();
    }
};
</script>
