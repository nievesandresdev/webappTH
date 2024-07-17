<template>
    <div class="hshadow rounded-[6px] p-4 mb-4 md:hidden">
        <div class="flex">
            <h1 class="text-sm font-medium">{{ $t('query.settings.question'+period)}}</h1>
            <img class="w-8 h-8 ml-4" src="/assets/icons/Checkcircle.svg" alt="Checkcircle icon">
        </div>
        <div class="mt-4 flex">
            <img class="w-6 h-6 mr-2" src="/assets/icons/1.TH.AnswerReview.svg" alt="AnswerReview icon">
            <p class="text-sm"> 
                {{ period !== 'pre-stay'  ? $t(qualificationTranslate(qualification, period))+'.' : ''}} 
                {{ response }}
            </p>
        </div>
        <div class="text-right mt-4">
            <button 
                class="hbtn-primary py-3 px-4 text-sm font-medium leading-[110%]"
                @click="editQuery"
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
})

const editQuery = () => {
    EditId.value = id;
    EditPeriod.value = period;
    EditComment.value = response;
    EditQualification.value = qualification;
}

const qualificationTranslate = (qualification, period) => {
    if(!qualification) return 
    let keyPeriod = period == 'in-stay' ? 'stay' : 'poststay';
    let keyFeel = qualification.toLowerCase();
    return `query.form.btn-${keyFeel}-${keyPeriod}`;
}
</script>