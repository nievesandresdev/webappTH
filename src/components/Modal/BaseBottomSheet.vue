<template>
    <transition name="slide-fade">
        <div v-if="open" class="relative" :class="classContainer">
            <!-- Full-screen container to center the panel -->
            <div 
                class="fixed left-0 flex w-screen items-center justify-center z-[2500]" 
                :style="{ bottom: positionBottom }"
            >
                <!-- The actual dialog panel -->
                <div class="w-full  rounded-t-[20px] relative h-full bg-white">
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
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
})

const { open } = toRefs(props)

</script>   
<style scoped>

/* Transición para suavizar el cambio de bottom */
.transition-bottom {
    transition: bottom 0.3s ease-in-out;
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


</style>



