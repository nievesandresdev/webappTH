<template>
    <div v-if="openBottomSheet" class="relative shadow-guest-2">
        <!-- Full-screen container to center the panel -->
        <div 
            class="fixed left-0 bottom-0 flex w-screen items-center justify-center z-[9500]" 
            :class="openBottomSheet ? 'dialog-enter-active' : 'dialog-leave-active'"
        >
            <!-- The actual dialog panel -->
            <div class="w-full bg-white rounded-t-[20px] relative pb-14">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { toRefs } from 'vue';
const props = defineProps({
    openBottomSheet: Boolean,
})

const { openBottomSheet } = toRefs(props)

</script>   
<style scoped>
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

.dialog-enter-active {
    animation: fadeIn 0.5s ease;
}

.dialog-leave-active {
    animation: fadeOut 0.5s ease;
}
</style>



