<template>
    <div>
        <div class="flex items-center mb-2 gap-1">
            <IconCustomColor
                class=""
                name="arrow-back"
                color="#777777"
            />
            <span class="lato text-[10px] sp:text-sm leading-[12px] sp:leading-[16px] text-[#777777]">{{ $t('query.form.sent-text') }} </span>
            <span class="lato text-[10px] sp:text-sm leading-[12px] sp:leading-[16px] text-[#777777]">
                {{ formatTimestampDate(responded_at, 'dd/MM/yyyy - HH:mm')+'hs' }}
            </span>
        </div>
        <div class="rounded-[20px] p-4 bg-gradient-h">
            <div class="flex">
                <h1 class="lato text-sm font-medium leading-[16px]">
                    {{ $t('query.settings.question'+period, { lodging: $formatTypeLodging() })}}
                </h1>
                <img class="w-6 h-6 ml-4" src="/assets/icons/WA.Check-circle.svg" alt="Checkcircle icon">
            </div>
            <div class="mt-4 flex">
                <img class="w-6 h-6 mr-2" src="/assets/icons/WA.Answer-revier.svg" alt="AnswerReview icon">
                <p class="lato text-sm"> 
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
                {{ $t('query.form.modify')}}
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject } from 'vue';
import IconCustomColor from '@/components/IconCustomColor.vue';
import { formatTimestampDate } from '@/utils/dateHelpers';

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
    responded_at:{
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