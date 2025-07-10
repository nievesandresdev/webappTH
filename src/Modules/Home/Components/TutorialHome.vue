<template>
<div>
    <div class="bg-[#FAFAFA] w-auto sp:h-[114px] h-[90px] rounded-[8px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] py-2 pr-2 pl-4 relative mt-[30px] mx-3" v-if="shouldShowTutorial">
        <BackgroundSvg :backgroundColor="chainStore.$bgColor0" />
        <img src="/images/home/phone2.png" alt="" class="absolute sp:-top-[10px] -top-[5px] z-10 sp:w-[59px] w-[40px] left-[5px] sp:left-[17px]">
        
        <div class=" absolute rounded-full  w-[7px] h-[7px] sp:bottom-[101px] bottom-[79px] sp:w-[9px] sp:h-[9px] left-[32.5px] sp:left-[59px] z-20" :style="{ backgroundColor: chainStore.$bgColor0 }"></div>
        
        <button 
            class="absolute sp:right-2 right-1 top-2 sp:w-6 w-4 sp:h-6 h-4 cursor-pointer z-20" 
            @click="closeAppTutorial"
        >
            <img 
                src="/assets/icons/WA.Close.svg" 
                alt="close" 
                class="sp:w-6 sp:h-6 w-4 h-4"
            >
        </button>
        <div class="relative z-10 sp:ml-[75px] ml-[39px]">
            <h3 class="sp:text-[14px] text-[10px] font-bold sp:mb-3 mb-1 lato">{{ $t('home.tutorial.title') }}</h3>
            <p class="sp:text-[12px] text-[9px] font-medium sp:mb-2 mb-1 lato">{{ $t('home.tutorial.description') }}</p>
            <div class="flex justify-end">
                <a href="#" class="sp:text-[14px] text-[10px] underline font-bold lato" @click.prevent="openTutorialModal">{{ $t('home.tutorial.link') }}</a>
            </div>
        </div>
    </div>

    <ModalTutorial :openProp="showModal" @closeModal="closeModal" />
</div>
</template>

<script setup>
import BackgroundSvg from './BackgroundSvg.vue';
import ModalTutorial from './ModalTutorial.vue';
import { ref, onMounted, computed } from 'vue';
import { useChainStore } from '@/stores/modules/chain';

const chainStore = useChainStore();
const showModal = ref(false);
const tutorialDismissed = ref(false);

// Clave para localStorage
const TUTORIAL_STORAGE_KEY = 'webapp_tutorial_dismissed';

const props = defineProps({
    showTutorial: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['closeAppTutorial']);

// Computed que determina si debe mostrarse el tutorial
const shouldShowTutorial = computed(() => {
    return props.showTutorial && !tutorialDismissed.value;
});

// Función para verificar si el tutorial fue cerrado
const checkTutorialStatus = () => {
    const dismissed = localStorage.getItem(TUTORIAL_STORAGE_KEY);
    tutorialDismissed.value = Boolean(dismissed);
};

// Función para marcar el tutorial como visto
const markTutorialAsDismissed = () => {
    localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
    tutorialDismissed.value = true;
};

const closeAppTutorial = () => {
    markTutorialAsDismissed();
    emit('closeAppTutorial');
};

const openTutorialModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

// Verificar el estado del tutorial al montar el componente
onMounted(() => {
    checkTutorialStatus();
});
</script>