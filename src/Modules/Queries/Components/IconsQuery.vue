<template>
    <div class="hshadow md:shadow-none rounded-[6px] sp:p-4 p-2 md:p-0 sp:mb-4 mb-2 md:mb-0">
        <h1 class="text-xs sp:text-base md:text-[21px] font-medium md:font-normal leading-[150%]">
            <template v-if="data?.period == 'post-stay'">
                {{ $t('query.form.thanksAll') }} 
                {{ !$utils.isMockup() ? guestStore.guestData.name : 'Huésped'}}
            </template>
            <template v-else>
                ¿{{ $t('query.form.whatsup') }} 
                {{ !$utils.isMockup() ? guestStore.guestData.name : 'Huésped'}}?
            </template>
        </h1>
        <p class="mt-2 sp:mt-4 md:mt-6 text-[10px] sp:text-sm md:text-[36px] font-medium md:font-semibold md:leading-10">
            {{ $t('query.settings.question'+data?.period)}}
        </p>
        <div class="mt-4 md:mt-10">
            <FormSurveyContentTabEmojis :userFor="data?.period == 'post-stay' ? 'queries-poststay' : 'queries-stay'"/>
        </div>
        <div class="mt-4 md:mt-6" v-if="form.type" :class="{'hidden': form.type == 'GOOD' && data?.period == 'post-stay'}">
            <p class="text-sm md:text-[21px] md:leading-[120%]">
                {{ settings[thanksHoster].es }}
            </p>
        </div>
        <div class="mt-4 md:mt-6" v-if="form.type" :class="{'hidden': form.type == 'GOOD' && data?.period == 'post-stay'}">
            <TextareaAutogrow 
                :id="'textarea1'"
                v-model="textarea" 
                :wordLimit="300"
                :placeholder="settings[commentHoster].es"
                showWordLimit
                customClasses="min-h-[120px] md:text-[21px] md:min-h-[250px]"
            />
        </div>
        <div class="text-right mt-3 sp:mt-6 md:mt-8">
            <!-- :disabled="!form.type" -->
            <button 
            class="hbtn-cta py-1.5 sp:py-3 px-2 sp:px-4 text-[10px] md:text-base sp:text-sm font-medium"
                :class="{'cta-disabled' : !form.type}"
                :disabled="!form.type"
                @click="submit"
            >
                {{ $t('query.form.send') }} 
            </button>
        </div>
    </div>
</template>
<script setup>
import { reactive, provide, computed, ref } from 'vue';
import FormSurveyContentTabEmojis from '@/Modules/Home/Components/FormSurveyContentTabEmojis'
import TextareaAutogrow from '@/components/TextareaAutogrow.vue'
import { useToast } from "vue-toastification";
import { useI18n } from 'vue-i18n';
import { useGuestStore } from '@/stores/modules/guest';
import { useQueryStore } from '@/stores/modules/query';

const toast = useToast();
const emit = defineEmits(['loadReponses','showFeedback']);
const { t } = useI18n();
const queryStore = useQueryStore();

const props = defineProps({
    settings:{
        type: Object,
        default:{}
    },
    data:{
        type: Object,
        default:{}
    },
})
const guestStore = useGuestStore();
const textarea = ref(null);
const form = reactive({
    type:null
})
provide('form',form)

async function submit(){
    let params = {
        queryId : props.data.id,
        comment : textarea.value,
        qualification : form.type,
        stayId : props.data.stay_id,
    }
    let response = await queryStore.$saveResponse(params);
    if(response){
        emit('loadReponses')
        //se envia solo para post-stay igual a GOOD
        if(form.type !== 'GOOD' && props.data?.period == 'post-stay'){
            emit('showFeedback',null);
        }
        setTimeout(() => {
            toast(t('query.textToast.sendQueryText'), {
                toastClassName: "warning-toast",
                bodyClassName: "warning-toast-body",
                position: "top-right",
                icon: false,
                closeButton: false,  
                hideProgressBar: true,
            });
        }, 1000);
    }
}

const thanksHoster = computed(() => {
    let thanks =  '_thanks_good'
    if(form.type.includes('WRONG') || form.type.includes('NORMAL')){
        thanks = '_thanks_normal';
    }
    return modifiedPeriod.value+thanks;
})

const commentHoster = computed(() => {
    return modifiedPeriod.value+'_comment';
})

const modifiedPeriod = computed(() => {
    let modifiedString;
    
    if(props.data?.period){
        modifiedString = props.data?.period.replace("-", "_")
    }
    return modifiedString;
})
</script>
<style>
@media (min-width:767px){
    #textarea1::placeholder{
        font-size: 21px;
    }
}
</style>