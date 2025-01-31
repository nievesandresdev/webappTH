<template>
    <div class="">
        <p class="lato text-sm font-bold leading-[16px]">
            {{ $t('query.settings.questionpre-stay', { lodging: $formatTypeLodging() }) }}
        </p>
        <div class="mt-1">
            <TextareaAutogrow 
                :id="'textarea1'"
                v-model="form.comment" 
                :wordLimit="300"
                :placeholder="''"
                customClasses="min-h-[48px] sp:min-h-[72px]"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, inject, computed } from 'vue'
import TextareaAutogrow from '@/components/TextareaAutogrow.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
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
const form = inject('form');
const guestStore = useGuestStore();

async function saveQuery(){
    
    // let params = {
    //     queryId : props.data.id,
    //     comment : textarea.value,
    //     stayId : props.data.stay_id,
    // }
    // let response = await queryStore.$saveResponse(params);
    // if(response){
    //     emit('reloadList')
    //     // emit('showFeedback',props.settings.pre_stay_thanks.es);
    //     let textRes = props.settings?.pre_stay_thanks[localeStore.localeCurrent];
    //     if(EditPeriod.value){
    //         textRes = 'query.textToast.updateQueryText';
    //     }
    //     cancelChanges();
    //     setTimeout(() => {
    //         toastSuccess(t(textRes)); 
    //         queryStore.$existingPendingQuery()
    //         emit('loadReponses');
    //     }, 1000);
    // }
}

// const changes = computed(()=>{
//     let commment  = props.data.comment ? props.data.comment[props.data.response_lang] : null;
//     return  textarea.value && textarea.value !== commment;                    
// })
</script>