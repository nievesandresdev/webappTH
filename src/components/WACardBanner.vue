<template>
    <div 
        :class="[classContainer, containerDesignClass]"
        :style="{
            backgroundColor: activeCustom ?  chainStore.$bgColor1 : '',
            borderColor: activeCustom ?  chainStore.$colorContrast1 : '#fff',
        }"
    >
        <!-- left container  -->
        <div class="">
            <div class="flex items-center">
                <!-- <img :src="iconLeft"  alt="Stay Icon" /> -->
                <IconCustomColor 
                    :class="classIconLeft" 
                    :name="nameIconLeft" 
                    :color="iconDesignClass" 
                    only-change-background 
                    :width=" !$utils.isMockup() ? '20' : '16'"
                    :height=" !$utils.isMockup() ? '20' : '16'"
                />
                <p  
                    :class="[classTitle]"
                    :style="{color: textDesignStyle}"
                >
                    {{title}}
                </p>
            </div>
            <p  
                :class="[classSubtitle]"
                :style="{color: textDesignStyle}"
            >{{subtitle}}</p>
        </div>
        <!-- icon right  -->
        <IconCustomColor 
            :class="classIconRight" 
            :name="nameIconRight" 
            :color="iconDesignClass" 
            only-change-background 
            :width=" !$utils.isMockup() ? '24' : '16'"
            :height=" !$utils.isMockup() ? '24' : '16'"
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
        default: 'flex justify-between items-center p-3 sp:p-4 w-full rounded-[10px] border shadow-guest relative'
    },
    nameIconRight:{
        type: String,
        default: 'WA.chevron'
    },
    classIconRight:{
        type: String,
        default: 'transform rotate-180 self-center'
    },
    nameIconLeft:{
        type: String,
        default: 'WA.stay'
    },
    classIconLeft:{
        type: String,
        default: 'mr-1'
    },
    title:{
        type: String,
        default: ''
    },
    classTitle:{
        type: String,
        default: 'lato text-xs sp:text-base font-bold leading-[20px]'
    },
    subtitle:{
        type: String,
        default: ''
    },
    classSubtitle:{
        type: String,
        default: 'lato text-[10px] sp:text-sm font-medium leading-[16px] mt-[2px]'
    },
    activeCustom:{
        type: String,
        default: false
    },
})

const { activeCustom } = toRefs(props)



const containerDesignClass = computed(() => {
    let customizationData = chainStore.customizationData;
    // console.log('test customizationData',customizationData)
    if(!activeCustom.value){
        return "border-white bg-gradient-100";
    }
    return '';
    // let bg = customizationData?.colors[1]?.cod_hex;
    // let contrast = customizationData?.colors[1]?.contrast_color;
    // return `bg-[${bg.toUpperCase()}] border-[${contrast}]`
});

const textDesignStyle = computed(() => {
    if(!activeCustom.value) return '#333'
    return chainStore.$colorContrast1
});

const iconDesignClass = computed(() => {
    if(!activeCustom.value) return
    return chainStore.customizationData?.colors[1]?.contrast_color;
});
</script>