<template>
    <div 
        id="container-form"
        :class="{
            'hshadow md:shadow-none rounded-[20px] p-2 sp:p-4 md:p-0 mb-2 sp:mb-4 md:mb-0 bg-gradient-h border border-color-secondary': !inModal
        }"
    >
        <h1 
            class="lato text-xs sp:text-base font-medium leading-[12px] sp:leading-[20px]"
            v-if="!inModal"
        >
            <template v-if="data?.period == 'post-stay'">
                {{ $t('query.form.thanksAll') }} 
                {{ !$utils.isMockup() ? guestStore.guestData.name : 'Huésped'}}
            </template>
            <template v-else>
                ¿{{ $t('query.form.whatsup') }} 
                {{ !$utils.isMockup() ? guestStore.guestData.name : 'Huésped'}}?
            </template>
        </h1>
        <p 
            v-if="!inModal"
            class="mt-2 sp:mt-3 md:mt-6 lato text-[10px] sp:text-sm md:text-[24px] font-medium md:font-semibold leading-[16px] md:leading-[116%]"
        >
            {{ $t('query.settings.question'+data?.period)}}
        </p>
        <div class="mt-3 sp:mt-4 md:mt-8">
            <FormTabEmojisRed :userFor="data?.period == 'post-stay' ? 'queries-poststay' : 'queries-stay'"/>
        </div>
        <div  v-if="form.type" class="border-b border-color-secondary w-full mt-3 sp:mt-4 md:hidden"></div>
        <!-- :class="{'hidden': ['GOOD','VERYGOOD'].includes(form.type) && data?.period !== 'pre-stay'}" -->
        <div class="mt-3 sp:mt-4 md:mt-8" v-if="form.type">
            <p class="lato text-[10px] sp:text-sm md:text-base md:font-medium leading-[12px] sp:leading-[16px] md:leading-[125%]">
                {{ settings[thanksHoster][localeStore.localeCurrent] }}
            </p>
        </div>
        <div class="mt-3 sp:mt-4 md:mt-4" v-if="form.type">
            <TextareaAutogrow 
                :id="'textarea1'"
                v-model="textarea" 
                :wordLimit="300"
                :placeholder="assessmentComment"
                showWordLimit
                customClasses="min-h-[72px] md:min-h-[232px]"
            />
        </div>
        <!-- <pre>
            {{ settings }}
        </pre> -->
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
                    classes="text-center py-1.5 sp:py-2.5 md:py-[14px] rounded-[7px] sp:rounded-[10px] lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] w-[48px] sp:w-[71px] md:w-[82px] shadow-guest"
                    :disabled="!changes"
                    @click="submit"
                >
                    {{ $t('query.form.send') }} 
                </PrimaryButton> 
            </div>
        </div>
        <div v-else class="mt-4 sp:mt-6">
            <PrimaryButton 
                    classes="text-center py-1.5 sp:py-2.5 rounded-[6px] sp:rounded-[10px] lato text-[12px] sp:text-base font-bold leading-[16px] sp:leading-[20px] w-full shadow-guest"
                :disabled="!changes"
                @click="submit"
            >
                {{ $t('query.form.send') }} 
            </PrimaryButton> 
        </div>
    </div>
</template>
<script setup>
import { reactive, provide, computed, ref, inject, watch  } from 'vue';
import FormTabEmojisRed from './FormTabEmojisRed'
import TextareaAutogrow from '@/components/TextareaAutogrow.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';

import { useToast } from "vue-toastification";
import { useI18n } from 'vue-i18n';
import { useGuestStore } from '@/stores/modules/guest';
import { useQueryStore } from '@/stores/modules/query';
import { useLocaleStore } from '@/stores/modules/locale';

import { handleToast } from "@/composables/useToast"; 
const { toastSuccess } = handleToast();

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
    let params = {
        queryId : props.data.id,
        comment : textarea.value,
        qualification : form.type,
        stayId : props.data.stay_id,
    }
    let response = await queryStore.$saveResponse(params);
    if(response){
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
            queryStore.$existingPendingQuery()
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

const thanksHoster = computed(() => {
    let thanks =  '_thanks_good';
    if(['WRONG','VERYWRONG','NORMAL'].includes(form.type)){
        thanks = '_thanks_normal';
    }
    return modifiedPeriod.value+thanks;
})

const assessmentComment = computed(() => {
    
    let assessment =  '_assessment_good';
    let assessmentShow = '_assessment_good_activate';
    
    // console.log('')
    if(['WRONG','VERYWRONG','NORMAL'].includes(form.type)){
        assessment = '_assessment_normal';
        assessmentShow = '_assessment_normal_activate';
    }
    // console.log('test assessmentShow',assessmentShow)
    if(!props.settings[modifiedPeriod.value+assessmentShow]) return ''
    return props.settings[modifiedPeriod.value+assessment][localStorage.getItem('locale')];
})

const modifiedPeriod = computed(() => {
    let modifiedString;
    
    if(props.data?.period){
        modifiedString = props.data?.period.replace("-", "_")
    }
    return modifiedString;
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