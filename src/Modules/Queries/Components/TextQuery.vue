<template>
    <div class="hshadow rounded-[6px] p-4">
        <h1 class="text-base font-medium leading-[150%]">Hola {{ guestStore.guestData.name }},</h1>
        <p class="mt-4 text-sm font-medium">
            ¿Hay algo que podamos hacer para tu llegada al hotel?
        </p>
        <div class="mt-4">
            <TextareaAutogrow 
                :id="'textarea1'"
                v-model="textarea" 
                :wordLimit="300"
                :placeholder="settings.pre_stay_comment.es"
                showWordLimit
                customClasses="min-h-[120px]"
            />
        </div>
        <div class="text-right mt-6">
            <button 
                class="hbtn-cta py-3 px-4 text-sm"
                :class="{'cta-disabled' : !textarea}"
                :disabled="!textarea"
                @click="saveQuery"
            >
                Enviar
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
    }
    console.log('params',params)
    let response = await queryStore.$saveResponse(params);
    console.log('saveQuery',response)
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