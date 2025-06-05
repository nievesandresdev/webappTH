<template>
    <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[5000]" />
    <SectionBar :title="$t('profile.inbox.title')" :fixed="false"/>
    <div class="queries-body sp:h-[81vh] md:h-full overflow-y-auto px-2 sp:px-4 md:px-0 py-3 sp:py-6 md:py-8 md:w-[650px] md:mx-auto no-scrollbar mb-10 sp:mb-0 mt-1">
        <LinksReview/>
    </div>
</template>
<script setup>
import { ref, onMounted, provide } from 'vue'
import SectionBar from '@/components/SectionBar.vue';
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
    requestTexts.value = await requestSettingsStore.$getRequestData(props.paramsRouter.period, 'Huesped');
})

provide('period',props.paramsRouter.period)
provide('requestTexts',requestTexts)
</script>