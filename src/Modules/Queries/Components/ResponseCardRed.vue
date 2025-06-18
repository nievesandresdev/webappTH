<template>
    <div :class="{'md:hidden': $currentPeriod() !== period || $currentPeriod() == period && ['GOOD','VERYGOOD'].includes(qualification)}">
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
        <div class="rounded-[20px] p-4 bg-gradient-h border border-[#E9E9E9]">
            <div class="flex">
                <h1 class="lato text-base font-bold leading-[20px]">
                    {{ $t('query.settings.question'+period, { lodging: $formatTypeLodging() ?? '', hotelName: hotelStore?.hotelData?.name ?? ''})}}
                </h1>
                <!-- <img class="w-6 h-6 ml-4" src="/assets/icons/WA.Check-circle.svg" alt="Checkcircle icon"> -->
            </div>
            <div class="mt-3 flex">
                <img v-if="period == 'pre-stay'" class="w-6 h-6 mr-2" src="/assets/icons/WA.Answer-revier.svg" alt="AnswerReview icon">
                <img v-else class="w-6 h-6 mr-2" :src="`/assets/icons/emojis/colors/1.TH.EMOJI.${qualification}.ACTIVE.svg`" alt="Emoji icon">
                <p class="lato text-sm leading-[16px]"> 
                    {{ period !== 'pre-stay'  ? $t(qualificationTranslate(qualification, period))+'.' : ''}} 
                    {{ response }}
                </p>
            </div>
            <div class="text-right mt-4">
                <button 
                    v-if="$currentPeriod() == period"
                    class="rounded-[10px] border hborder-black-100 hbg-gray-100 h-10 text-center px-3 py-2.5 lato text-sm font-bold leading-[16px] shadow-guest"
                    @click="editQuery(response, qualification)"
                >
                {{ $t('query.form.modify')}}
                </button>
            </div>
        </div>
    </div>
    <ThanksMsg 
        v-if="period == 'pre-stay' || showThanksMsg"
        :key="forceRender"
        :responseAt="responded_at"
        :period="period"
        :qualification="qualification"
    />
    <div v-else-if="showLinksReview" >
        <div class="flex items-center mb-2 gap-1 md:hidden" >
            <IconCustomColor
                class="transform rotate-180"
                name="arrow-back"
                color="#777777"
            />
            <span class="lato text-[10px] sp:text-sm leading-[12px] sp:leading-[16px] text-[#777777]">{{ $t('query.form.received-text') }} </span>
            <span class="lato text-[10px] sp:text-sm leading-[12px] sp:leading-[16px] text-[#777777]">
                {{ formatAnyDate(responded_at, 'dd/MM/yyyy - HH:mm')+'hs' }}
            </span>
        </div>
        <LinksReview 
            :period="period"
            :qualification="qualification"
        />
    </div>
</template>
<script setup>
import { inject, provide, computed, watch, ref } from 'vue';
import IconCustomColor from '@/components/IconCustomColor.vue';
import ThanksMsg from './ThanksMsg.vue';
import LinksReview from './LinksReviewRed.vue';
import { formatTimestampDate } from '@/utils/dateHelpers';
import { $currentPeriod } from '@/utils/helpers';
import { $formatNameLodging } from '@/utils/utils';
import { formatAnyDate } from '@/utils/dateHelpers';
//
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useQuerySettingsStore } from '@/stores/modules/querySettings';
const querySettingsStore = useQuerySettingsStore();

const EditId = inject('EditId');
const EditPeriod = inject('EditPeriod');
const EditComment = inject('EditComment');
const EditQualification = inject('EditQualification');

const props = defineProps({
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
    responded_at:{
        type:String,
        default:null
    },
})

const forceRender = ref(0);
watch(() => props.qualification, (newVal) => {
    forceRender.value++;
})


const editQuery = (res, qualif) => {
    EditId.value = props.id;
    EditPeriod.value = props.period;
    EditComment.value = res;
    EditQualification.value = qualif;
}

const qualificationTranslate = (qualification, period) => {
    if(!qualification) return 
    let keyPeriod = props.period == 'in-stay' ? 'stay' : 'poststay';
    let keyFeel = qualification.toLowerCase();
    return `query.form.btn-${keyFeel}-${keyPeriod}`;
}


const modifiedPeriod = computed(() => {
    let modifiedString;
    
    if(props.period){
        modifiedString = props.period.replace("-", "_")
    }
    return modifiedString;
})

const keyPeriodAndFeedback = computed(() => {
    if(!props.qualification) return '';
    return modifiedPeriod.value+'_'+props.qualification.toLowerCase();
})

const showThanksMsg = computed(() => {
    if(props.period == 'post-stay' && props.qualification == 'VERYGOOD'){
        return false;
    }
    let periodCondition = props.period == 'in-stay' || props.period == 'post-stay';
    let calculated = (
        (periodCondition && ['WRONG','VERYWRONG','NORMAL'].includes(props.qualification)) ||
        (periodCondition && ['GOOD','VERYGOOD'].includes(props.qualification)) && !querySettingsStore.settings[keyPeriodAndFeedback.value+'_request_activate']
    )
    return calculated;
})

const showLinksReview = computed(() => {
    if(props.period == 'post-stay' && props.qualification == 'VERYGOOD'){
        return true;
    }
    let periodCondition = props.period == 'in-stay' || props.period == 'post-stay';
    let calculated = (periodCondition && ['GOOD','VERYGOOD'].includes(props.qualification)) && querySettingsStore.settings[keyPeriodAndFeedback.value+'_request_activate']
    return calculated;
})

</script>