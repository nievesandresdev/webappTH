<template>
    <div>
        <div class="flex items-center mb-2 gap-1">
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
        <div class="hshadow rounded-[14px] sp:rounded-[20px] p-2 sp:p-4  bg-gradient-h border border-color-secondary">
            <h1 class="lato text-xs sp:text-base font-medium leading-[14px] sp:leading-[20px]">
                {{ $t('query.form.hello') }} 
                <template v-if="!$utils.isMockup()" >
                    {{ guestStore?.guestData?.name}},
                </template>
                <template v-else>
                    Huésped
                </template>
            </h1>
            <p class="mt-2 sp:mt-3 lato text-[10px] sp:text-sm font-medium leading-[12px] sp:leading-[16px]">
                {{ $t('query.settings.question' + data?.period, { lodging: $formatTypeLodging() }) }}
            </p>
            <div class="mt-3 sp:mt-4">
                <!-- :placeholder="settings?.pre_stay_comment[localeStore.localeCurrent]" -->
                <TextareaAutogrow 
                    v-if="settings?.pre_stay_comment"
                    :id="'textarea1'"
                    v-model="textarea" 
                    :wordLimit="300"
                    placeholder=""
                    showWordLimit
                    customClasses="min-h-[48px] sp:min-h-[72px]"
                />
            </div>
            <div class="mt-3 sp:mt-6 flex items-center">
                <button 
                    v-if="EditPeriod == data?.period"
                    class="text-[8px] sp:text-xs font-semibold leading-[90%] sp:leading-[130%] underline"
                    @click="cancelChanges"
                >
                    Cancelar
                </button>
                <div class="ml-auto">
                    <PrimaryButton 
                        classes="text-center py-1.5 sp:py-2.5 px-2 sp:px-4 rounded-[7px] sp:rounded-[10px] lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] shadow-guest"
                        :disabled="!changes || sendingQuery"
                        :isLoading="sendingQuery"
                        @click="saveQuery"
                    >
                        {{ sendingQuery  ? $t('query.form.sending') : $t('query.form.send') }} 
                    </PrimaryButton> 
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, inject, computed } from 'vue'
import TextareaAutogrow from '@/components/TextareaAutogrow.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import IconCustomColor from '@/components/IconCustomColor.vue';
import { formatTimestampDate } from '@/utils/dateHelpers';
import { handleToast } from "@/composables/useToast"; 
const { toastSuccess } = handleToast();
import { useI18n } from 'vue-i18n';
import { useGuestStore } from '@/stores/modules/guest';
import { useQueryStore } from '@/stores/modules/query';
import { useLocaleStore } from '@/stores/modules/locale';
import { useHotelStore } from '@/stores/modules/hotel';


const emit = defineEmits(['reloadList']);
const { t } = useI18n();
const queryStore = useQueryStore();
const localeStore = useLocaleStore();
const hotelStore = useHotelStore();

const EditId = inject('EditId');
const EditPeriod = inject('EditPeriod');
const EditComment = inject('EditComment');
const EditQualification = inject('EditQualification');

const props = defineProps({
    settings:{
        type: Array,
        default:[]
    },
    data:{
        type: Object,
        default:{}
    },
})
const textarea = ref(EditComment.value);
const sendingQuery = ref(false);
const guestStore = useGuestStore();

async function saveQuery(){
    sendingQuery.value = true;
    let params = {
        queryId : props.data.id,
        comment : textarea.value,
        stayId : props.data.stay_id,
    }
    let response = await queryStore.$saveResponse(params);
    if(response){
        emit('reloadList')
        // emit('showFeedback',props.settings.pre_stay_thanks.es);
        let textRes = props.settings?.pre_stay_thanks[localeStore.localeCurrent];
        if(EditPeriod.value){
            textRes = 'query.textToast.updateQueryText';
        }
        cancelChanges();
        setTimeout(() => {
            toastSuccess(t(textRes)); 
            queryStore.$existingPendingQuery()
            emit('loadReponses');
            sendingQuery.value = true;
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
    return  textarea.value && textarea.value !== commment;                    
})
</script>