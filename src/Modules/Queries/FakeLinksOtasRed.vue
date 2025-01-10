<template>
    <InboxHead /> 
    <div class="queries-body sp:h-[81vh] md:h-full overflow-y-auto px-0.5 sp:px-2 md:px-0 py-3 sp:py-6 md:py-8 md:w-[650px] md:mx-auto no-scrollbar mb-10 sp:mb-0">
        <LinksReview/>
    </div>
</template>
<script setup>
import { ref, onMounted, provide } from 'vue'
import InboxHead from '@/Modules/Queries/Components/InboxHead.vue'
import LinksReview from './Components/LinksReviewRed.vue'

import { useRequestSettingStore } from '@/stores/modules/requestSettings';
const requestSettingsStore = useRequestSettingStore();

const requestTexts = ref(null)
 
const props = defineProps({
    paramsRouter: {
        type: Object,
        default: () => ({})
    }
})

onMounted(async() => {
    requestTexts.value = await requestSettingsStore.$getRequestData(props.paramsRouter.period);
})

provide('period',props.paramsRouter.period)
provide('requestTexts',requestTexts)
</script>