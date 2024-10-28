<template>
    <div class="flex items-center justify-end relative gap-2">
        <img 
            v-if="goBack" 
            class="w-6 h-6 mr-auto" 
            src="/assets/icons/WA.chevron.svg"
            @click="goBack"
        >
        <h1 :class="titleClasses">{{ text }}</h1>
        <DropdownChangeLanguage />
    </div>
</template>
<script setup>
import DropdownChangeLanguage from '@/components/Dropdowns/DropdownChangeLanguage.vue'
const emit = defineEmits(['goBack'])
defineProps({
    text:String,
    goBack:Boolean,
    titleClasses:{
        type:Boolean,
        default: 'h-[28px] lato text-[20px] font-bold leading-[28px] w-[255px] text-center'
    },
})

const goBack = () =>{
    emit('goBack')
}
</script>
