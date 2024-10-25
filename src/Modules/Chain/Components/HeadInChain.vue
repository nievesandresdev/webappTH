<template>
    <div class="flex items-center justify-end relative gap-2">
        <img v-if="goBack" class="w-6 h-6 mr-auto" src="/assets/icons/WA.chevron.svg" alt="">
        <h1 :class="titleClasses">{{ text }}</h1>
        <DropdownChangeLanguage />
    </div>
</template>
<script setup>
import DropdownChangeLanguage from '@/components/Dropdowns/DropdownChangeLanguage.vue'
defineProps({
    text:String,
    goBack:Boolean,
    titleClasses:{
        type:Boolean,
        default: 'h-[28px] lato text-[20px] font-bold leading-[28px] w-[255px] text-center'
    },
})
</script>
<style scoped> 
.bg-head{
    background: linear-gradient(105deg, #F3F3F3 0%, #FAFAFA 100%);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
}

</style>