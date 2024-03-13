<template>
    <div class="hshadow rounded-[6px] p-2 sp:p-4 mb-2 sp:mb-4">
        <h1 class="text-xs sp:text-base font-medium leading-[150%]">
            {{ $t('query.form.hello') }} 
            <template v-if="!$utils.isMockup()" >
                {{ guestStore?.guestData?.name}},
            </template>
            <template v-else>
                Huésped
            </template>
        </h1>
        <p class="mt-2 sp:mt-4 text-[10px] sp:text-sm font-medium">
            {{ $t('query.settings.question'+data?.period)}}
        </p>
        <div class="mt-2 sp:mt-4">
            <TextareaAutogrow 
                :id="'textarea1'"
                v-model="textarea" 
                :wordLimit="300"
                :placeholder="settings?.pre_stay_comment?.es"
                showWordLimit
                customClasses="min-h-[70px] sp:min-h-[120px]"
            />
        </div>
        <div class="text-right mt-3 sp:mt-6">
            <button 
                class="hbtn-cta py-1.5 sp:py-3 px-2 sp:px-4 text-[10px] sp:text-sm"
                :class="{'cta-disabled' : !textarea}"
                :disabled="!textarea"
                @click="saveQuery"
            >
            {{ $t('query.form.send') }} 
            </button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import TextareaAutogrow from '@/components/TextareaAutogrow.vue'
import { useToast } from "vue-toastification";
import { useI18n } from 'vue-i18n';
import { useGuestStore } from '@/stores/modules/guest';
import { useQueryStore } from '@/stores/modules/query';

const toast = useToast();
const emit = defineEmits(['showFeedback']);
const { t } = useI18n();
const queryStore = useQueryStore();

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
const textarea = ref(null);
const guestStore = useGuestStore();

async function saveQuery(){
    let params = {
        queryId : props.data.id,
        comment : textarea.value,
        stayId : props.data.stay_id,
    }
    let response = await queryStore.$saveResponse(params);
    if(response){
        emit('showFeedback',props.settings.pre_stay_thanks.es);
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

</script>