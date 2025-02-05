<template>
    <div class="px-4" :class="{'pt-5':numberStepsEnabled > 1,'py-6':numberStepsEnabled == 1}">
        <div class="flex items-center">
            <img 
                @click="goBack" 
                class="w-6 h-6" 
                :class="{'mr-4':numberStepsEnabled > 1,'mr-2':numberStepsEnabled == 1}"
                src="/assets/icons/WA.chevron.svg"
            >
            <img v-if="numberStepsEnabled > 1" class="w-10 h-10 mr-2" :src="`/assets/icons/${iconSections[currentStep-1]}.svg`" alt="">
            <div class="py-1" v-if="numberStepsEnabled > 1">
                <h2 class="roboto text-[10px] font-bold leading-[7px] text-[#777]">
                    Check-in {{ currentStep }}/{{ numberStepsEnabled }}
                </h2>
                <h1 class="mt-1 lato text-base font-medium leading-[20px]">
                    {{titleSections[currentStep-1]}}
                </h1>
            </div>
            <h2 v-else class="lato text-[20px] font-bold leading-[18px]">
                Check-in
            </h2>
        </div>
        <div v-if="numberStepsEnabled > 1" class="mt-3 h-[4px] rounded-full bg-[#C9C9C9]">
            <div 
                class="rounded-full h-full bg-[#333]"
                :style="{ width:currentPercentageBar+'%'}"
            ></div>
        </div>
    </div>

    <ModalNative width="327px" @closeModal="closeExistsChangesModal" :openProp="existsChangesModalisOpen">
        <div class="p-6">
            <h2 class="lato text-lg font-bold leading-[20px]">¿Salir de Check-in?</h2>
            <p class="mt-6 lato text-sm font-medium leading-[16px]">
                Si sales del proceso ahora, la información que has ingresado no se guardará
            </p>
            <PrimaryButton 
                classes="shadow-guest-2 py-3 w-full h-10 border rounded-[10px] text-center lato text-sm font-bold leading-[16px]"
                classContainer="mt-6"
                @click="navigateTo('Guests')"
            >
                Salir
            </PrimaryButton> 
            <div class="mt-4 text-center">
                <button class="underline lato text-sm font-bold leading-[16px]" @click="closeExistsChangesModal">
                    Continuar con el Check-in   
                </button>
            </div>
        </div>
    </ModalNative>
</template>
<script setup>
import { inject, ref, computed } from 'vue'
import { navigateTo } from '@/utils/navigation'

import ModalNative from '@/components/ModalNative.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';

const numberStepsEnabled = inject('numberStepsEnabled');
const currentStep = inject('currentStep');
const existsChanges = inject('existsChanges');

const existsChangesModalisOpen = ref(false)

const percentageBySection = computed(()=>{
    return 100/numberStepsEnabled.value;
})

const currentPercentageBar = computed(()=>{
    return currentStep.value*percentageBySection.value;
})


function openExistsChangesModal(){
    existsChangesModalisOpen.value = true;
}

function closeExistsChangesModal(){
    existsChangesModalisOpen.value = false;
}

const titleSections = [
    'Datos personales',
    'Datos de identificación',
    'Encuesta',
]

const iconSections = [
    'iconFormFirstStep',
    'iconFormSecondStep',
    'iconFormThirdStep',
]

const goBack = () =>{
    if(existsChanges.value){
        openExistsChangesModal()
    }else{
        navigateTo('Guests');
    }
}
</script>