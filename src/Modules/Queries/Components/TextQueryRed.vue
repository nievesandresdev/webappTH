<template>
    <div class="hshadow rounded-[20px] p-2 sp:p-4 mb-2 sp:mb-4 bg-gradient-h border border-color-secondary">
        <h1 class="lato text-xs sp:text-base font-medium sp:leading-[20px]">
            {{ $t('query.form.hello') }} 
            <template v-if="!$utils.isMockup()" >
                {{ guestStore?.guestData?.name}},
            </template>
            <template v-else>
                Huésped
            </template>
        </h1>
        <p class="mt-1.5 sp:mt-3 lato text-[10px] sp:text-sm font-medium sp:leading-[16px]">
            {{ $t('query.settings.question'+data?.period)}}
        </p>
        <div class="mt-2 sp:mt-4">
            <TextareaAutogrow 
                :id="'textarea1'"
                v-model="textarea" 
                :wordLimit="300"
                :placeholder="settings?.pre_stay_comment[localeStore.localeCurrent]"
                showWordLimit
                customClasses="min-h-[34px] sp:min-h-[72px]"
            />
        </div>
        <div class="mt-3 sp:mt-6 flex items-center">
            <button 
                v-if="EditPeriod == data?.period"
                class="text-xs font-semibold leading-[130%] underline"
                @click="cancelChanges"
            >
                Cancelar
            </button>
            <div class="ml-auto">
                <PrimaryButton 
                    classes="text-center py-2.5 rounded-[10px] lato text-sm font-bold leading-[16px] w-[71px] shadow-guest"
                    :disabled="!changes"
                    @click="saveQuery"
                >
                    {{ $t('query.form.send') }} 
                </PrimaryButton> 
            </div>
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


const emit = defineEmits(['reloadList']);
const { t } = useI18n();
const queryStore = useQueryStore();
const localeStore = useLocaleStore();

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
const guestStore = useGuestStore();

async function saveQuery(){
    
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