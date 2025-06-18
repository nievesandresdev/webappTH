<template>
    <div class="max-w-[500px] mx-auto">
        <div class="flex items-center mb-2 gap-1 md:hidden" v-if="!inModal">
            <IconCustomColor
                class="transform rotate-180"
                name="arrow-back"
                color="#777777"
            />
            <span class="lato text-[10px] sp:text-sm leading-[12px] sp:leading-[16px] text-[#777777]">{{ $t('query.form.received-text') }} </span>
            <span class="lato text-[10px] sp:text-sm leading-[12px] sp:leading-[16px] text-[#777777]">
                {{ $utils.isMockup() ? '01/06 - 10:00' : formatTimestampDate(data?.created_at, 'dd/MM/yyyy - HH:mm')+'hs' }}
            </span>
        </div>
        <div 
            id="container-form"
            :class="{
                'hshadow md:shadow-none rounded-[20px] p-3 sp:p-6 md:p-0 bg-gradient-h border border-color-secondary': !inModal
            }"
        >
            <h1 
                class="lato text-sm sp:text-[20px] font-bold leading-[18px] sp:leading-[28px]"
                v-if="!inModal"
            >
                <template v-if="data?.period == 'post-stay'">
                    {{ $t('query.form.thanksAll') }} 
                </template>
                <template v-else>
                    ¿{{ $t('query.form.whatsup', {guestName: guestStore.guestData?.name}) }}
                </template>
            </h1>
            <p 
                v-if="!inModal"
                class="mt-3 sp:mt-6 lato text-[12px] sp:text-base md:text-[24px] font-bold md:font-semibold sp:leading-[20px] md:leading-[116%]"
            >
                {{ $t('query.settings.question'+data?.period, {lodging: $formatTypeLodging() ?? '', hotelName: hotelStore?.hotelData?.name ?? ''}) }}
            </p>
            <div class="mt-3 sp:mt-4 md:mt-8">
                <FormTabEmojisRed :userFor="data?.period == 'post-stay' ? 'queries-poststay' : 'queries-stay'"/>
            </div>
            <div  v-if="form.type" class="border-b border-color-secondary w-full mt-3 sp:mt-6 md:hidden"></div>
            <!-- :class="{'hidden': ['GOOD','VERYGOOD'].includes(form.type) && data?.period !== 'pre-stay'}" -->
            <div class="mt-3 sp:mt-4 md:mt-8" v-if="form.type">
                <p class="lato text-[10px] sp:text-sm md:text-base font-medium leading-[12px] sp:leading-[16px] md:leading-[125%]">
                    {{ $t('query.settings.'+commentToGuest) }}
                </p>
            </div>
            <div class="mt-3 sp:mt-4 md:mt-4" v-if="showTextarea">
                <TextareaAutogrow 
                    :id="'textarea1'"
                    v-model="textarea" 
                    :wordLimit="300"
                    :placeholder="placeholderTextarea"
                    showWordLimit
                    customClasses="min-h-[72px] md:min-h-[232px]"
                />
            </div>
            <div 
                class="flex items-center mt-3 sp:mt-6 md:mt-8"
                v-if="!inModal"
            >
                <button 
                    v-if="EditPeriod == data?.period"
                    class="text-xs font-semibold leading-[130%] underline"
                    @click="cancelChanges"
                >
                    Cancelar
                </button>
                <div class="ml-auto">
                    <PrimaryButton 
                        classes="text-center py-1.5 sp:py-2.5 md:py-[14px] rounded-[7px] sp:rounded-[10px] lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] shadow-guest px-2 sp:px-4"
                        :disabled="!changes || sendingQuery"
                        @click="submit"
                        :isLoading="sendingQuery"
                    >
                        {{ sendingQuery  ? $t('query.form.sending') : $t('query.form.send') }} 
                    </PrimaryButton> 
                </div>
            </div>
            <div v-else-if="inModal && changes" class="mt-4 sp:mt-6">
                <PrimaryButton
                    classes="text-center py-1.5 sp:py-2.5 rounded-[6px] sp:rounded-[10px] lato text-[12px] sp:text-base font-bold leading-[16px] sp:leading-[20px] w-full shadow-guest"
                    :disabled="!changes || sendingQuery"
                    :isLoading="sendingQuery"
                    @click="submit"
                >
                {{ sendingQuery  ? $t('query.form.sending') : $t('query.form.send') }} 
                </PrimaryButton> 
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, provide, computed, ref, inject, watch  } from 'vue';
import { formatTimestampDate } from '@/utils/dateHelpers';
import { $formatNameLodging } from '@/utils/utils';
import FormTabEmojisRed from './FormTabEmojisRed'
import TextareaAutogrow from '@/components/TextareaAutogrow.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import IconCustomColor from '@/components/IconCustomColor.vue';


import { useToast } from "vue-toastification";
import { useI18n } from 'vue-i18n';
import { useGuestStore } from '@/stores/modules/guest';
import { useQueryStore } from '@/stores/modules/query';
import { useLocaleStore } from '@/stores/modules/locale';
import { useHotelStore } from '@/stores/modules/hotel';
import { useQuerySettingsStore } from '@/stores/modules/querySettings';

import { handleToast } from "@/composables/useToast"; 
const { toastSuccess } = handleToast();

const emit = defineEmits(['reloadList']);
const { t } = useI18n();
const queryStore = useQueryStore();
const localeStore = useLocaleStore();
const hotelStore = useHotelStore();
const querySettingsStore = useQuerySettingsStore();
const EditId = inject('EditId');
const EditPeriod = inject('EditPeriod');
const EditComment = inject('EditComment');
const EditQualification = inject('EditQualification');

const props = defineProps({
    settings:{
        type: Object,
        default:{}
    },
    data:{
        type: Object,
        default:{}
    },
    inModal:{
        type: Boolean,
        default:false
    },
})
const guestStore = useGuestStore();
const textarea = ref(EditComment.value);
const sendingQuery = ref(false);
const isUpdate = ref(false);
const form = reactive({
    type:EditQualification.value
})
provide('form',form)

watch(
  () => EditComment.value, 
  (newValue, oldValue) => {
    textarea.value = newValue;
    form.type = EditQualification.value;
  },
  { immediate: true } 
);

watch(
  () => EditId.value, 
  (newValue, oldValue) => {
    // console.log('test EditId', newValue)
    if(newValue && newValue !== oldValue){
        isUpdate.value = true;
    }
  },
  { immediate: true } 
);



async function submit(){
    sendingQuery.value = true;
    let params = {
        queryId : props.data.id,
        comment : textarea.value,
        qualification : form.type,
        stayId : props.data.stay_id,
    }
    let response = await queryStore.$saveResponse(params);
    if(response){
        queryStore.$setCurrentQuery(response)
        cancelChanges();
        emit('reloadList')
        //se envia solo para post-stay igual a GOOD
        // if(form.type !== 'GOOD' || form.type !== 'VERYGOOD' && props.data?.period == 'post-stay'){
        //     emit('showFeedback',null);
        // }
        let textRes = 'query.textToast.registerResponse';
        // console.log('test isUpdate.value',isUpdate.value)
        if(isUpdate.value){
            textRes = 'query.textToast.updateResponse';
        }
        setTimeout(() => {
            toastSuccess(t(textRes)); 
            queryStore.$setPendingQuery(false)
            sendingQuery.value = false;
        }, 1000);
    }
}

const cancelChanges = () =>{
    EditId.value = null;
    EditPeriod.value = null;
    EditComment.value = null;
    EditQualification.value = null;
}

const changes = computed(()=>{
    let commment  = props.data.comment ? props.data.comment[props.data.response_lang] : null;
    let qualification  = props.data.qualification ?? null;
    return  textarea.value && textarea.value !== commment || form.type && form.type !== qualification;                    
})

const commentToGuest = computed(() => {
    let commmet =  '-comment-good-feedback';
    if(['WRONG','VERYWRONG','NORMAL'].includes(form.type)){
        commmet = '-comment-bad-feedback';
    }
    return props.data?.period+commmet;
})

const modifiedPeriod = computed(() => {
    let modifiedString;
    
    if(props.data?.period){
        modifiedString = props.data?.period.replace("-", "_")
    }
    return modifiedString;
})

const showTextarea = computed(() => {
    if(form.type && 
        (
            form.type !== 'GOOD' && form.type !== 'VERYGOOD' || 
            !querySettingsStore.settings[keyPeriodAndFeedback.value+'_request_activate'] && querySettingsStore.settings[keyPeriodAndFeedback.value+'_no_request_comment_activate']
        )){
        return true
        }
    return false;
})

const keyPeriodAndFeedback = computed(() => {
    if(!form.type) return '';
    return modifiedPeriod.value+'_'+form.type.toLowerCase();
})


const placeholderTextarea = computed(() => {
    if(form.type && 
        (
            (form.type == 'GOOD' || form.type == 'VERYGOOD') && !querySettingsStore.settings[keyPeriodAndFeedback.value+'_request_activate'] && querySettingsStore.settings[keyPeriodAndFeedback.value+'_no_request_comment_activate']
        )){
        return querySettingsStore.settings[keyPeriodAndFeedback.value+'_no_request_comment_msg']
    }
    return t('query.settings.placeholder-bad-feedback')
})
</script>
<style scoped>
@media (min-width:767px){
    #textarea1::placeholder{
        font-size: 21px;
    }
    #container-form{
        background: #fff !important;
        border: none !important;
    }
}
</style>