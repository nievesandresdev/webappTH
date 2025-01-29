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
import { ref, provide, reactive, onMounted, computed, watch } from 'vue'
//
import { useCheckinStore } from '@/stores/modules/checkin';
const checkinStore = useCheckinStore();

const form = reactive({
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
    test:null
})

const settings = ref(null);
const currentStep = ref(2);
const emailError = ref(false);
const phoneError = ref(false);

onMounted(async() => {
    settings.value = await checkinStore.$getAllSettings();
    console.log('test settings',settings.value)
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

provide('form',form)
provide('numberStepsEnabled',numberStepsEnabled)
provide('currentStep',currentStep)
provide('settings',settings)
provide('isMinor',isMinor)
provide('emailError',emailError)
provide('phoneError',phoneError)
</script>
