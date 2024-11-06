<template>
    <div :class="['rounded-full flex gap-1 items-center px-2',heightClass, extraClasess]">
        <IconCustomColor 
            width="16"
            height="16"
            :name="iconName" 
            :color="iconColor" 
            only-change-background 
        />
        <h1 :class="[titleClasess]">{{ title }}</h1>
    </div>
</template>
<script setup>
import IconCustomColor from './IconCustomColor.vue';

const props = defineProps({
    heightClass:{
        type: String,
        default: 'h-4'
    },
    title:{
        type: String,
        default: 'Label'
    },
    titleClasess:{
        type: String,
        default: 'roboto text-xs font-bold uppercase text-white'
    },
    extraClasess:{
        type: String,
        default: 'hbg-green-600'
    },
    iconName:{
        type: String,
        default: 'WA.circle-check-black'
    },
    iconColor:{
        type: String,
        default: '#fff'
    },
})
</script>