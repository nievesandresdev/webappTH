<template>
    <div 
        class="w-full sp:h-[76px] top-0 left-0 px-2 sp:px-4 py-3.5 sp:py-6 z-[2000] flex items-center justify-between bg-head bg-gradient-100"
        :class="{'fixed':fixed}"
    >
        <div class="flex items-center justify-center">
            <button @click="goBack" class="sp:w-6 sp:h-6 w-4 h-4 text-[#333333] sp:mr-2 mr-1">
                <img src="/assets/icons/WA.chevron.svg" alt="Chevron Icon" />
            </button>
            <span class="text-[12px] sp:text-[20px] font-bold lato">{{ title }}</span>
        </div>
        
        <button
            v-if="showButton"
            @click="onClickButton"
            class="lato flex items-center h-10 px-4 py-2 gap-2 rounded-[10px] border border-white  text-white text-sm font-bold hshadow-button"
            :style="{backgroundColor: chainStore.$bgColor0 ? chainStore.$bgColor0 : buttonColor}"
        >
            {{ buttonText }}
        </button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
//
import { useRouter } from 'vue-router';
const router = useRouter();
//
import { useHistoryStore } from '@/stores/modules/history';
const historyStore = useHistoryStore()

import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

const emit = defineEmits(['onClickButton'])
const props = defineProps({
    title: {
        type: String,
        default: 'Mi cuenta'
    },
    showButton: {
        type: Boolean,
        default: false
    },
    buttonText: {
        type: String,
        default: 'Crear estancias'
    },
    routeName: {
        type: String,
        default: null
    },
    viewNameBack: {
        type: String,
        default: null
    },
    buttonColor: {
        type: String,
        default: 'bg-[#333333]'
    },
    fixed: {
        type: Boolean,
        default: true
    }
});

const goBack = () => {
    if(props.viewNameBack){
        router.push({ name:props.viewNameBack })
    }else{
        // window.history.back();
        historyStore.$goBack(router);
    }
};



const onClickButton = () => {
    emit('onClickButton')
    // if (props.routeName) {
    //     console.log(`Navigating to route: ${props.routeName}`);
    //     // router.push({ name: props.routeName });
    // } else {
    //     console.log("Route not specified");
    // }
};
</script>
<style scoped>
.bg-head{
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
}
</style>