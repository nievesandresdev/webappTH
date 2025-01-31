<template>
    <Head />
    <div class="pt-6 pb-[100px] px-4">
        <SecondStep v-if="currentStep == 2" /> 
        <ThirdStep v-else-if="currentStep == 3" /> 
        <FirstStep v-else /> 
        <ChagesBar />
    </div>
    
    
</template>
<script setup>
import Head from './Components/CompleteCheckin/Head.vue'
import FirstStep from './Components/CompleteCheckin/FirstStep.vue'
import SecondStep from './Components/CompleteCheckin/SecondStep.vue'
import ThirdStep from './Components/CompleteCheckin/ThirdStep.vue'
import ChagesBar from './Components/CompleteCheckin/ChagesBar.vue'
//
import { ref, provide, reactive, onMounted, computed, watch, toRefs } from 'vue'
//
import { useCheckinStore } from '@/stores/modules/checkin';
const checkinStore = useCheckinStore();
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();

const props = defineProps({
    paramsRouter: {
        type: Object,
        default: () => ({})
    }
})
const { paramsRouter } = toRefs(props)

const form = reactive({
    id:null,//id del huesped actual
    name:null,
    lastname:null,
    secondLastname:null,
    birthdate:null,
    gender:null,
    phone:null,
    email:null,
    responsibleAdult:null,
    kinshipRelationship:null,
    //
    nationality:null,
    docType:null,
    docSupportNumber:null,
    docNumber:null,
    countryResidence:null,
    postalCode:null,
    municipality:null,
    addressResidence:null,
    //
    comment:'',
    stayId: localStorage.getItem('stayId')
})

const settings = ref(null);
const currentStep = ref(1);
const emailError = ref(false);
const phoneError = ref(false);

onMounted(async() => {
    settings.value = await checkinStore.$getAllSettings();
    loadDataGuest();
    form.id = paramsRouter.value.id;
    // console.log('test paramsRouter',paramsRouter.value.id)
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

function loadDataGuest(dateStr) {
    form.name = guestStore.guestData.name;
    form.lastname = guestStore.guestData.lastname;
    form.email = guestStore.guestData.email;
}

// Función para parsear la fecha en formato DD/MM/YYYY
function parseDate(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return new Date(year, month - 1, day);
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

</script>
