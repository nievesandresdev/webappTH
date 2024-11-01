<template>
    <div :class="classContainer">
        <button 
            :class="[
                classes, 
                bgButton,
                conditionClases,
            ]"
            :disabled="disabled"
        >
            <slot></slot>
        </button>
    </div>
</template>
<script setup>
import { computed, toRefs } from 'vue'
import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

const props = defineProps({
    classContainer:{
        type:String,
        default:''
    },
    classes:{
        type:String,
        default:''
    },
    conditionClases:{
        type:String,
        default:''
    },
    disabled:{
        type:String,
        default:''
    },
})

const { disabled } = toRefs(props)

const bgButton = computed(()=>{
    let classbgButton;
    let primaryClasess = `bg-[${chainStore.customizationData?.colors[0].cod_hex}] text-[${chainStore.customizationData?.colors[0].contrast_color}]`;
    classbgButton = disabled.value ? 'primary-disabled' : primaryClasess;
    return classbgButton;
})
</script>