<template>
    
        <Transition>    
        <div  v-if="modalNativeIsOpen" class="fixed bg-[#00000080] w-screen h-screen z-[1000]" @click="modalNativeIsOpen = false"></div>
        </Transition>
        <Transition>    
        <div 
            v-if="modalNativeIsOpen"
            :class="`absolute m-auto bg-white left-0 right-0 z-[1010] rounded-[10px] ${customClasses}`"
            :style="{ width: width, top: top}"
        >
            <slot></slot>
        </div>
        </Transition>
</template>
<script setup>
import { ref, inject } from 'vue'

const props = defineProps({
    width:{
        type:String,
        default: '300px'
    },
    top:{
        type:String,
        default: '40%'
    },
    customClasses:{
        type:String,
        default: ''
    },
})

const modalNativeIsOpen = inject('modalNativeIsOpen');

</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>