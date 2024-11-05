<template>
    <div v-if="open" class="relative" :class="classContainer">
        <!-- Full-screen container to center the panel -->
        <div 
            class="fixed left-0 flex w-screen items-center justify-center z-[2500] transition-bottom" 
            :style="{ bottom: positionBottom }"
        >
            <!-- The actual dialog panel -->
            <div class="w-full  rounded-t-[20px] relative h-full bg-white">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { toRefs } from 'vue';
const props = defineProps({
    open: Boolean,
    positionBottom: {
        type: String,
        default: '0px',
    },
    classContainer: String,
});

const { open } = toRefs(props)

</script>   
<style scoped>

/* Transición para suavizar el cambio de bottom */
.transition-bottom {
    transition: bottom 0.3s ease-in-out; /* Agrega una transición suave para la propiedad bottom */
}

</style>



