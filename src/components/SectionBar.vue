<template>
    <div class="w-full h-[76px] px-4 py-6 flex items-center justify-between bg-head bg-gradient-100">
        <div class="flex items-center justify-center">
            <button @click="goBack" class="w-6 h-6 text-[#333333] mr-2">
                <img src="/assets/icons/WA.chevron.svg" alt="Chevron Icon" />
            </button>
            <span class="text-[20px] font-bold lato">{{ title }}</span>
        </div>
        
        <button
            v-if="showButton"
            @click="onClickButton"
            class="lato flex items-center h-10 px-4 py-2 gap-2 rounded-[10px] border border-white bg-[#333333] text-white text-sm font-bold hshadow-button"
        >
            {{ buttonText }}
        </button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

const router = useRouter();

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
        default: 'Crear estancia'
    },
    routeName: {
        type: String,
        default: null
    },
    viewNameBack: {
        type: String,
        default: null
    }
});

const goBack = () => {
    if(props.viewNameBack){
        router.push({ name:props.viewNameBack })
    }else{
        window.history.back();
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