<template>
    <div :class="[classContainer, containerDesignClass]">
        <!-- left container  -->
        <div class="">
            <div class="flex items-center">
                <!-- <img :src="iconLeft"  alt="Stay Icon" /> -->
                <IconCustomColor :class="classIconLeft" :name="nameIconLeft" :color="iconDesignClass" only-change-background />
                <p  :class="[classTitle, textDesignClass]">{{title}}</p>
            </div>
            <p  :class="[classSubtitle, textDesignClass]">{{subtitle}}</p>
        </div>
        <!-- icon right  -->
        <IconCustomColor 
            :class="classIconRight" 
            :name="nameIconRight" 
            :color="iconDesignClass" 
            only-change-background 
        />
    </div>
</template>
<script setup>
import { computed, toRefs } from 'vue'
import IconCustomColor from './IconCustomColor.vue';
import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

const props = defineProps({
    classContainer:{
        type:String,
        default: 'flex justify-between items-center p-4 w-full rounded-[10px] border shadow-guest relative'
    },
    nameIconRight:{
        type: String,
        default: 'WA.chevron'
    },
    classIconRight:{
        type: String,
        default: 'w-6 h-6 transform rotate-180 self-center'
    },
    nameIconLeft:{
        type: String,
        default: 'WA.stay'
    },
    classIconLeft:{
        type: String,
        default: 'w-6 h-6 mr-1'
    },
    title:{
        type: String,
        default: ''
    },
    classTitle:{
        type: String,
        default: 'lato text-lg font-bold leading-[28px]'
    },
    subtitle:{
        type: String,
        default: ''
    },
    classSubtitle:{
        type: String,
        default: 'lato text-sm font-medium leading-[16px] mt-[2px]'
    },
    activeCustom:{
        type: String,
        default: false
    },
})

const { activeCustom } = toRefs(props)



const containerDesignClass = computed(() => {
    let customizationData = chainStore.customizationData;
    if(!activeCustom.value){
        return "border-white bg-gradient-100";
    }
    let bg = customizationData?.colors[1]?.cod_hex;
    let contrast = customizationData?.colors[1]?.contrast_color;
    return `bg-[${bg.toUpperCase()}] border-[${contrast}]`
});

const textDesignClass = computed(() => {
    if(!activeCustom.value) return
    let customizationData = chainStore.customizationData;
    let contrast = customizationData?.colors[1]?.contrast_color;
    return `text-[${contrast}]`
});

const iconDesignClass = computed(() => {
    if(!activeCustom.value) return
    return chainStore.customizationData?.colors[1]?.contrast_color;
});
</script>