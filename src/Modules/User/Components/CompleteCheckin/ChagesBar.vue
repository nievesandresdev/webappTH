<template>
    <div class="fixed bottom-0 left-0 py-4 px-8 bg-gradient-h border-t border-white w-full">
        <div class="flex w-full h-full items-center">
            <button 
                v-if="currentStep > 1"
                @click="goToPreviousStep"
                class="flex items-center"
            >
                <img class="w-4 h-4 mr-2" src="/assets/icons/WA.chevron.svg" alt="">
                <span class="lato text-sm font-bold leading-[16px] underline">Paso anterior</span>
            </button>
            <button 
                class="shadow-guest-2 py-2.5 px-4 h-10 border rounded-[10px] text-center ml-auto"
                :class="{
                    'border-white hbg-black-100':validForm, 
                    'hborder-color-disabled hbg-disabled-1':!validForm
                }"
                @click="goToNextStep"
            >
                <span 
                    class="lato text-sm font-bold leading-[16px] block"
                    :class="{
                        'text-white':validForm, 
                        'disabled-text-2':!validForm
                    }"
                >
                <template v-if="numberStepsEnabled == currentStep">
                    Finalizar
                </template>
                <template v-else>
                    Siguiente
                </template>
                    
                </span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter();
//
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
// Inyecta las dependencias necesarias
const currentStep = inject('currentStep');
const form = inject('form');
const settings = inject('settings');
const numberStepsEnabled = inject('numberStepsEnabled');
const emailError = inject('emailError');
const phoneError = inject('phoneError');
const secondLastnameError = inject('secondLastnameError');
const docNumberError = inject('docNumberError');
const docSupportNumberError = inject('docSupportNumberError');

// Propiedad computada para validar el formulario
const validForm = computed(() => {
    if (!settings.value) return false;
    
    let stepSettings;
    switch(currentStep.value){
        case 1:
            stepSettings = settings.value.first_step;
            break;
        case 2:
            stepSettings = settings.value.second_step;
            break;
        case 3:
            // console.log()
            return form.comment.trim();
            break;
        default:
            stepSettings = {};
    }

    if (!stepSettings) return false;

    // Itera sobre cada campo del paso actual
    return Object.keys(stepSettings).every(fieldKey => {
        const field = stepSettings[fieldKey];
        // console.log('test field fieldKey',fieldKey)
        // console.log('test field',field)
        if (field.visible && field.mandatory){
            const value = form[fieldKey];
            
            // Verifica si el valor está definido y no está vacío
            if (
                value === null || value === undefined || emailError.value || phoneError.value || secondLastnameError.value ||
                (docNumberError.value && currentStep.value == 2) ||
                (docSupportNumberError.value && currentStep.value == 2)
            ){
                // console.log('test',false)
                return false;
            }
            if (typeof value === 'string' && value.trim() === ''){
                // console.log('test',false)
                return false;
            }
            if (typeof value === 'object' && value !== null && Object.keys(value).length === 0){
                // console.log('test',false)
                return false;
            }
            // console.log('test',true)
            return true;
        }
        return true; // Si no es visible o no es obligatorio, lo omite
    });
});

const submit = async () => {
    form.comment = form.comment.trim();
    const response = await guestStore.$saveCheckinData(form);
    router.push({ name: 'IsCompleteCheckin' })
};

// Método para ir al siguiente paso
const goToNextStep = () => {
    if(numberStepsEnabled.value == currentStep.value){
        submit()
        return;
    }
    if (validForm.value && currentStep.value < numberStepsEnabled.value){
        currentStep.value += 1;
    }
};

// Método para ir al paso anterior
const goToPreviousStep = () => {
    if (currentStep.value > 1){
        currentStep.value -= 1;
    }
};
</script>

<style scoped>
/* Añade tus estilos aquí */
</style>
