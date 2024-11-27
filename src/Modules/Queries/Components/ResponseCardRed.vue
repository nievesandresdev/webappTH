<template>
    <div class="hshadow rounded-[20px] p-4 mb-4 bg-gradient-h">
        <div class="flex">
            <h1 class="lato text-sm font-medium leading-[16px]">{{ $t('query.settings.question'+period)}}</h1>
            <img class="w-6 h-6 ml-4" src="/assets/icons/WA.Check-circle.svg" alt="Checkcircle icon">
        </div>
        <div class="mt-4 flex">
            <img class="w-6 h-6 mr-2" src="/assets/icons/WA.Answer-revier.svg" alt="AnswerReview icon">
            <p class="lato text-sm leading-[16px]"> 
                {{ period !== 'pre-stay'  ? $t(qualificationTranslate(qualification, period))+'.' : ''}} 
                {{ response }}
            </p>
        </div>
        <div class="text-right mt-4">
            <button 
                v-if="currentPeriod == period"
                class="rounded-[10px] border hborder-black-100 hbg-gray-100 h-10 text-center px-3 py-2.5 lato text-sm font-bold leading-[16px] shadow-guest"
                @click="editQuery(response, qualification)"
            >
                Modificar
            </button>
        </div>
    </div>
</template>
<script setup>
import { inject } from 'vue';

const EditId = inject('EditId');
const EditPeriod = inject('EditPeriod');
const EditComment = inject('EditComment');
const EditQualification = inject('EditQualification');

const { qualification, period, response, id } = defineProps({
    period:{
        type:String,
        default:null
    },
    response:{
        type:String,
        default:null
    },
    qualification:{
        type:String,
        default:null
    },
    id:{
        type:String,
        default:null
    },
    currentPeriod:{
        type:String,
        default:null
    },
})

const editQuery = (res, qualif) => {
    EditId.value = id;
    EditPeriod.value = period;
    EditComment.value = res;
    EditQualification.value = qualif;
}

const qualificationTranslate = (qualification, period) => {
    if(!qualification) return 
    let keyPeriod = period == 'in-stay' ? 'stay' : 'poststay';
    let keyFeel = qualification.toLowerCase();
    return `query.form.btn-${keyFeel}-${keyPeriod}`;
}
</script>