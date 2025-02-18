<template>
    <div v-if="$utils.isMockup()" class="fixed top-0 left-0 z-[10000] w-screen h-screen"></div>
    <Head />
    <div class="pt-4 sp:pt-6 pb-[100px] px-2 sp:px-4 relative">
        <div :class="{'min-h-container':currentStep == numberStepsEnabled}">
            <SecondStep v-if="secondStepEnabled && currentStep == 2" /> 
            <ThirdStep v-else-if="!secondStepEnabled && currentStep == 2 || currentStep == 3" /> 
            <FirstStep v-else /> 
            <div 
                class="my-3 sp:my-6 text-center"
                v-if="currentStep < 3"
            >
                <button 
                    @click="isWhyModalOpen = true"
                    class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] underline"
                >
                    ¿Por qué pedimos estos datos?
                </button>
            </div>
        </div>
        <div 
            v-if="currentStep == numberStepsEnabled" 
        >
            <p class="lato text-[8px] sp:text-xs leading-[12px] sp:leading-[16px] font-medium">
                Al presionar el botón “Finalizar”, declaro que acepto las 
                <span class="font-bold underline" @click="isPoliciesOpen = true">políticas y normas </span>
                del alojamiento
            </p>
        </div>
    </div>
    <ChagesBar />
    <ModalNative width="327px" top="18%" @closeModal="isWhyModalOpen = false" :openProp="isWhyModalOpen">
        <div class="p-6">
            <h2 class="lato text-lg font-bold leading-[20px]">¿Por qué pedimos estos datos?</h2>
            <ul class="mt-6 pl-6">
                <li class="lato text-sm leading-[16px] list-disc">
                    La ley local exige que los alojamientos turísticos registren a todos sus huéspedes.
                </li>
                <li class="lato text-sm leading-[16px] list-disc mt-3">
                    Por eso, necesitamos algunos datos personales básicos y obligatorios.
                </li>
                <li class="lato text-sm leading-[16px] list-disc mt-3">
                    Completar el check-in online antes de tu llegada te ahorrará tiempo, evitando tener que proporcionar esta información en el alojamiento.
                </li>
                <li class="lato text-sm leading-[16px] list-disc mt-3">
                    Tus datos se procesarán de manera segura y conforme al Reglamento General de Protección de Datos (RGPD). 
                </li>
                <li class="lato text-sm leading-[16px] list-disc mt-3">
                    Puedes obtener más detalles en nuestra política de privacidad.
                </li>
            </ul>
            <PrimaryButton 
                classes="shadow-guest-2 py-3 w-full h-10 border rounded-[10px] text-center lato text-sm font-bold leading-[16px]"
                classContainer="mt-6"
                @click="isWhyModalOpen = false"
            >
                Entendido
            </PrimaryButton> 
            <div class="mt-4 text-center">
                <button class="underline lato text-sm font-bold leading-[16px]" @click="goPolices">
                    Ver política de privacidad
                </button>
            </div>
        </div>
    </ModalNative>
    <!-- bottom sheet politicas y normas -->
    <BottomModal 
        :isOpen="isPoliciesOpen"
        @update:isOpen="isPoliciesOpen = $event" 
    >
        <div class="flex items-center">
            <img class="w-8 h-8 mr-1" src="/assets/icons/WA.normas.svg" alt="">
            <h1 class="lato text-[20px] font-bold leading-[28px]">Políticas y Normas</h1>
        </div>
        <div class="mt-[28px]">
            <div 
                class="border border-color-secondary rounded-[20px] p-4"
                v-for="(item ,index) in norms" :key="item"
                :class="{'mt-4': index > 0 }"
            >
                <h2 class="lato text-base font-bold leading-[20px]">{{item.title}}</h2>
                <p class="mt-2 lato text-sm leading-[16px]">
                    {{item.description}}
                </p>
                <div v-if="item.penalization" class="my-2 border-b border-color-secondary"></div>
                <p v-if="item.penalization" class="lato text-sm leading-[16px]">
                    <span class="font-bold">Penalización:</span>
                    {{item.penalization_details}}
                </p>
            </div>
        </div>
    </BottomModal>
</template>
<script setup>
import Head from './Components/CompleteCheckin/Head.vue'
import FirstStep from './Components/CompleteCheckin/FirstStep.vue'
import SecondStep from './Components/CompleteCheckin/SecondStep.vue'
import ThirdStep from './Components/CompleteCheckin/ThirdStep.vue'
import ChagesBar from './Components/CompleteCheckin/ChagesBar.vue'
import ModalNative from '@/components/ModalNative.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import BottomModal from '@/components/Modal/GeneralBottomSheet.vue';
//
import { ref, provide, reactive, onMounted, computed, watch, toRefs } from 'vue'
import { navigateTo } from '@/utils/navigation'
//
import { useRouter } from 'vue-router'
const router = useRouter();
import { useCheckinStore } from '@/stores/modules/checkin';
const checkinStore = useCheckinStore();
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { useLegalStore } from '@/stores/modules/legal';
const legalStore = useLegalStore();

const props = defineProps({
    paramsRouter: {
        type: Object,
        default: () => ({})
    }
})
const { paramsRouter } = toRefs(props)

const form = reactive({
    id:null,//id del huesped actual
    name:'',
    lastname:'',
    secondLastname:'',
    birthdate:null,
    gender:'',
    phone:'',
    email:'',
    checkinEmail:'filled@email.com',
    responsibleAdult:'',
    kinshipRelationship:'',
    //
    nationality:'',
    docType:'',
    docSupportNumber:'',
    docNumber:'',
    countryResidence:'',
    postalCode:'',
    municipality:'',
    addressResidence:'',
    //
    comment:'',
    stayId: localStorage.getItem('stayId')
})

const settings = ref(null);
const currentStep = ref(1);
const currentGuestData = ref(1);
const emailError = ref(false);
const phoneError = ref(false);
const isWhyModalOpen = ref(false);
const isPoliciesOpen = ref(false);
const norms = ref([]);

onMounted(async() => {
    settings.value = await checkinStore.$getAllSettings();
    loadDataGuest(paramsRouter.value.id);
    form.id = paramsRouter.value.id;
    norms.value = await legalStore.$getNormsByHotel();
    // console.log('test settings',settings.value)
})

const secondStepEnabled = computed(() => {
  if (!settings.value)return false
  return Object.values(settings.value.second_step).some(field => {
    return field.dependence === false && field.visible === true
  })
})

const numberStepsEnabled = computed(() => {
  let sum = 1;
  if (!settings.value) return sum;
  if(secondStepEnabled.value) sum++;
  if(settings.value.show_prestay_query) sum++;
  return sum
})

async function loadDataGuest(id) {
    if(!id) return;
    currentGuestData.value = await guestStore.findById(id)
    form.name = currentGuestData.value.name;
    form.lastname = currentGuestData.value.lastname;
    form.email = currentGuestData.value.email;
}

// Función para parsear la fecha en formato DD/MM/YYYY
function parseDate(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return new Date(year, month - 1, day);
}

function goPolices(dateStr) {
    router.push({ name:'PrivacyPolicies' })
}
// Propiedad computada para verificar si es menor de edad
const isMinor = computed(() => {
    if (!form.birthdate) {
        return false; // Asume que no es menor si no hay fecha de nacimiento
    }

    const birthDate = parseDate(form.birthdate);

    // Verificar si la fecha es válida
    if (isNaN(birthDate.getTime())) {
        console.warn('Fecha de nacimiento inválida:', form.birthdate);
        return false; // Asume que no es menor si la fecha es inválida
    }

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Ajusta la edad si el mes actual es anterior al mes de nacimiento
    // O si es el mismo mes pero el día actual es anterior al día de nacimiento
    if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age < 18;
});

const secondLastnameError = computed(() => {
    return form.docType == 'NIE' && !form.secondLastname
});

const docNumberPattern = computed(() => {
  switch (form.docType) {
    case 'DNI español': return /^[0-9]{8}[A-Za-z]$/;
    case 'NIE':         return /^[XYZxyz]\d{7}[A-Za-z]$/;
    case 'Pasaporte':   return /^[A-Za-z0-9]{6,15}$/;
    default:            return null; 
  }
});

const docNumberError = computed(() => {
    
    if(form.docNumber && form.docType){
        return !docNumberPattern.value?.test(form.docNumber);
    }
    return false;
});

const docSupportNumberError = computed(() => {
    if(form.docSupportNumber && form.docType){
        return !docNumberPattern.value?.test(form.docSupportNumber);
    }
    return false;
});

const existsChanges = computed(() => {

    let fieldsFilled = form.name !== currentGuestData.value.name ||form.lastname !== currentGuestData.value.lastname || 
    form.email !== currentGuestData.value.email;
    //
    let firsStepRestant = form.secondLastname.trim() || form.birthdate || form.gender.trim() || form.phone.length > 4 || 
    form.responsibleAdult.trim() || form.kinshipRelationship.trim();
    //
    let seconStep = form.nationality || form.docType || form.docSupportNumber || form.docNumber || form.countryResidence ||
    form.postalCode || form.municipality ||form.addressResidence;

    // console.log('test fieldsFilled',fieldsFilled)
    // console.log('test firsStepRestant',firsStepRestant)
    // console.log('test seconStep',!!seconStep)

    return (!!fieldsFilled) || (!!firsStepRestant) || (!!seconStep);
});


// Observa los cambios en isMinor y actualiza la visibilidad de los campos correspondientes
watch(isMinor, (newVal) => {
    if (settings.value && settings.value.first_step) {
        // Actualiza la visibilidad de responsibleAdult
        if (settings.value.first_step.responsibleAdult) {
            settings.value.first_step.responsibleAdult.visible = newVal;
            settings.value.first_step.responsibleAdult.mandatory = newVal;
        }

        // Actualiza la visibilidad de kinshipRelationship
        if (settings.value.first_step.kinshipRelationship) {
            settings.value.first_step.kinshipRelationship.visible = newVal;
            settings.value.first_step.kinshipRelationship.mandatory = newVal;
        }
    }
});
// Observa los cambios en el tipo y actualiza la visibilidad de docSupportNumber y secondLastname
watch(() => form.docType,(newVal) => {
    if (settings.value && settings.value.second_step) {
      if (newVal == "NIE" || newVal == "DNI español" ) {
        settings.value.second_step.docSupportNumber.visible = true;
        settings.value.second_step.docSupportNumber.mandatory = true;
      }else{
        settings.value.second_step.docSupportNumber.visible = false;
        settings.value.second_step.docSupportNumber.mandatory = false;
      }
      if (newVal == "NIE") {
        settings.value.first_step.secondLastname.visible = true;
        settings.value.first_step.secondLastname.mandatory = true;
      }else{
        settings.value.first_step.secondLastname.visible = false;
        settings.value.first_step.secondLastname.mandatory = false;
      }
    }
  }
);


provide('form',form)
provide('numberStepsEnabled',numberStepsEnabled)
provide('currentStep',currentStep)
provide('settings',settings)
provide('isMinor',isMinor)
provide('emailError',emailError)
provide('phoneError',phoneError)
provide('secondLastnameError',secondLastnameError)
provide('docNumberError',docNumberError)
provide('docSupportNumberError',docSupportNumberError)
provide('existsChanges',existsChanges)
provide('currentGuestData',currentGuestData)
</script>
<style scoped>
.min-h-container{
    min-height: calc( 72vh - 32px);
}
</style>
