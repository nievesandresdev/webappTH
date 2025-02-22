<template>
    <div class="fixed bottom-0 left-0 py-2.5 sp:py-4 px-4 sp:px-8 bg-gradient-h border-t border-white w-full">
        <div class="flex w-full h-full items-center">
            <button 
                v-if="currentStep > 1"
                @click="goToPreviousStep"
                class="flex items-center"
            >
                <img class="w-4 h-4 mr-2" src="/assets/icons/WA.chevron.svg" alt="">
                <span class="lato text-sm font-bold leading-[16px] underline">{{$t('checkin.form.changes-bar-previus')}}</span>
            </button>
            <div class="ml-auto">
                <PrimaryButton 
                    classes="shadow-guest-2 py-1.5 sp:py-2.5 px-2.5 sp:px-4 sp:h-10 border rounded-[6px] sp:rounded-[10px] text-center lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px]"
                    :disabled="!validForm || sendingQuery"
                    :isLoading="sendingQuery"
                    @click="goToNextStep"
                >
                    <template v-if="numberStepsEnabled == currentStep">
                        {{ sendingQuery ? $t('checkin.form.changes-bar-send-data') : $t('checkin.form.changes-bar-finish')}}
                    </template>
                    <template v-else>
                        {{$t('checkin.form.changes-bar-next')}}
                    </template>
                </PrimaryButton> 
            </div>
        </div>
    </div>
</template>

<script setup>
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
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
const currentGuestData = inject('currentGuestData');

const sendingQuery = ref(false);

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
            return true;
            break;
        default:
            stepSettings = {};
    }

    if (!stepSettings) return false;

    // Itera sobre cada campo del paso actual
    return Object.keys(stepSettings).every(fieldKey => {
        const field = stepSettings[fieldKey];
        // console.log('test fieldKey',fieldKey)
        // console.log('test field',field)
        if (field.visible && field.mandatory){
            const value = form[fieldKey];
            
            // Verifica si el valor está definido y no está vacío
            if (
                value === null || value === undefined || emailError.value || phoneError.value || secondLastnameError.value ||
                (docNumberError.value && currentStep.value == 2) ||
                (docSupportNumberError.value && currentStep.value == 2) ||
                fieldKey == 'phone' && field.mandatory && form.phone.length < 4
            ){
                return false;
            }
            if (typeof value === 'string' && value.trim() === ''){
                return false;
            }
            if (typeof value === 'object' && value !== null && Object.keys(value).length === 0){
                return false;
            }
            // console.log('test',true)
            return true;
        }
        return true; // Si no es visible o no es obligatorio, lo omite
    });
});

const submit = async () => {
    sendingQuery.value = true;
    form.comment = form.comment.trim();
    form.checkinEmail = form.email;
    form.docSupportNumber = form.docSupportNumber.toUpperCase();
    form.docNumber = form.docNumber.toUpperCase();
    form.email = currentGuestData.value.email;
    const response = await guestStore.$saveCheckinData(form);
    sendingQuery.value = false;
    localStorage.removeItem('formDataCheckin')
    router.push({ name: 'IsCompleteCheckin' })
};

// Método para ir al siguiente paso
const goToNextStep = () => {
    if(!validForm.value) return;

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
