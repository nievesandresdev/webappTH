<template>
    <h2 class="lato text-sm sp:text-[20px] font-bold leading-[20px] sp:leading-[28px]">
        {{ route.query.period == 'pre-stay' ? $t('query.settings.thanks-title', { guestName: '[nombreHuesped]' }) : titleThanks }}
    </h2>
    <p 
        class="lato text-[10px] sp:text-base font-bold leading-[14px] sp:leading-[20px] mt-2 sp:mt-4" 
        v-html="route.query.period == 'pre-stay' ? querySettingsStore.settings?.pre_stay_comment : msgThanks"
    > 
    </p>
    <!-- {{ $t(descriptionResponse) }} -->
    <PrimaryButton 
        @click="queryStore.$setIsOpenPopUp(false)"
        classes="block mt-3 text-center py-1.5 rounded-[6px] lato text-[10px] font-bold leading-[12px] w-full shadow-guest"
    >
        Entendido
    </PrimaryButton> 
</template>
<script setup>
import { computed } from 'vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import { useQueryStore } from '@/stores/modules/query';
const queryStore = useQueryStore();
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { useQuerySettingsStore } from '@/stores/modules/querySettings';
const querySettingsStore = useQuerySettingsStore();
import { useRoute } from 'vue-router';
const route = useRoute();

const props = defineProps({
    period: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    }
})

// const titleResponse = computed(() => {
//     if(queryStore.currentQuery?.qualification == 'GOOD' || queryStore.currentQuery?.qualification == 'VERY_GOOD'){
//         return 'query.popup.thanksResponse'
//     }
//     return 'query.popup.sorryResponse';
// })

// const descriptionResponse = computed(() => {
//     if(queryStore.currentQuery?.qualification == 'GOOD' || queryStore.currentQuery?.qualification == 'VERY_GOOD'){
//         return 'query.popup.sorryDescription';
//     }
//     return 'query.popup.sorryDescription';
// })


const keyPeriodAndFeedback = computed(() => {
    if(!props.qualification) return '';
    return props.period.replace("-", "_")+'_'+props.qualification.toLowerCase();
})

const titleKeyThanks = computed(() => {
    if(!querySettingsStore.settings)return '';
    let key = props.period.replace("-", "_")+'_bad_response_title';
    if(['GOOD','VERYGOOD'].includes(props.qualification) && !querySettingsStore.settings[keyPeriodAndFeedback.value+'_request_activate']){
        key = keyPeriodAndFeedback.value+'_no_request_thanks_title';
    }
    return key;
})

const titleThanks = computed(() => {
    if(!querySettingsStore.settings)return '';
    return querySettingsStore.settings[titleKeyThanks.value]
})

const msgKeyThanks = computed(() => {
    if(!querySettingsStore.settings)return '';
    let key = props.period.replace("-", "_")+'_bad_response_msg';
    if(['GOOD','VERYGOOD'].includes(props.qualification) && !querySettingsStore.settings[keyPeriodAndFeedback.value+'_request_activate']){
        key = keyPeriodAndFeedback.value+'_no_request_thanks_msg';
    }
    return key;
})

const msgThanks = computed(() => {
    if(!querySettingsStore.settings)return '';
    return querySettingsStore.settings[msgKeyThanks.value]
})
</script>