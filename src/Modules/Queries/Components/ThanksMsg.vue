<template>
    <div class="md:hidden">
        <div class="flex items-center mb-2 gap-1">
            <IconCustomColor
                class="transform rotate-180"
                name="arrow-back"
                color="#777777"
            />
            <span class="lato text-[10px] sp:text-sm leading-[12px] sp:leading-[16px] text-[#777777]">{{ $t('query.form.received-text') }} </span>
            <span class="lato text-[10px] sp:text-sm leading-[12px] sp:leading-[16px] text-[#777777]">
                {{ formatTimestampDate(responseAt, 'dd/MM/yyyy - HH:mm')+'hs' }}
            </span>
        </div>
        <div class="rounded-[20px] p-6 bg-gradient-h border border-[#E9E9E9]">
            <h1 class="lato text-[20px] font-bold leading-[28px]">
                <template v-if="period === 'pre-stay'">
                    {{ $t('query.settings.thanks-title', { guestName: guestStore.guestData.name }) }}
                </template>
                <template v-else>
                    {{ titleThanks }}
                </template>
            </h1>
            <p 
                id="msg-thanks"
                class="mt-4 lato text-base font-bold leading-[20px]" 
                v-html="period === 'pre-stay' ? querySettingsStore.settings.pre_stay_comment : msgThanks"
            ></p>
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted, computed } from 'vue';
import IconCustomColor from '@/components/IconCustomColor.vue';
import { formatTimestampDate } from '@/utils/dateHelpers';
//
import { useQuerySettingsStore } from '@/stores/modules/querySettings';
const  querySettingsStore = useQuerySettingsStore();
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();


const props = defineProps({
    responseAt: {
        type: String,
        required: true
    },
    period: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    }
})

onMounted(() => {
//   console.log('test settings',querySettingsStore.settings)  
})



const keyPeriodAndFeedback = computed(() => {
    if(!props.qualification) return '';
    return props.period.replace("-", "_")+'_'+props.qualification.toLowerCase();
})

const titleKeyThanks = computed(() => {
    let key = props.period.replace("-", "_")+'_bad_response_title';
    if(['GOOD','VERYGOOD'].includes(props.qualification) && !querySettingsStore.settings[keyPeriodAndFeedback.value+'_request_activate']){
        key = keyPeriodAndFeedback.value+'_no_request_thanks_title';
    }
    return key;
})

const titleThanks = computed(() => {
    return querySettingsStore.settings[titleKeyThanks.value]
})

const msgKeyThanks = computed(() => {
    let key = props.period.replace("-", "_")+'_bad_response_msg';
    if(['GOOD','VERYGOOD'].includes(props.qualification) && !querySettingsStore.settings[keyPeriodAndFeedback.value+'_request_activate']){
        key = keyPeriodAndFeedback.value+'_no_request_thanks_msg';
    }
    return key;
})

const msgThanks = computed(() => {
    return querySettingsStore.settings[msgKeyThanks.value]
})
</script>
<style>
#msg-thanks > .ql-align-center{
    text-align: center !important;
}
</style>