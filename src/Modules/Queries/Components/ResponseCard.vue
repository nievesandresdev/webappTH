<template>
    <div class="hshadow rounded-[6px] p-4 mb-4">
        <div class="flex">
            <h1 class="text-sm font-medium">{{ $t('query.settings.question'+period)}}</h1>
            <img class="w-8 h-8 ml-4" src="/assets/icons/Checkcircle.svg" alt="Checkcircle icon">
        </div>
        <div class="mt-4 flex">
            <img class="w-6 h-6 mr-2" src="/assets/icons/1.TH.AnswerReview.svg" alt="AnswerReview icon">
            <p class="text-sm"> {{ qualificationTranslate(qualification) }} {{ response }}</p>
        </div>
    </div>
</template>
<script setup>
import { reactive, provide, computed, ref } from 'vue';

const { qualification } = defineProps({
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
})

const qualificationTranslate = () => {
    console.log('qualificationTranslate',qualification)
    if(!qualification) return 

    let string;
    qualification == 'GOOD' ? string = 'Muy buena.' : '';
    qualification == 'NORMAL' ? string = 'Normal.' : '';
    qualification == 'WRONG' ? string = 'Muy mala.' : '';

    return string;
}
</script>