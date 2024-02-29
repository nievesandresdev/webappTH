<template>
    <div class="queries-head hshadow p-4 relative">
        <img class="absolute top-4 left-4" src="/assets/icons/1.TH.BACK.svg" alt="BACK icon">
        <h1 class="text-center text-base font-medium">Consultas</h1>
    </div>

    <div class="queries-body h-[81vh] overflow-y-auto px-4 py-6">

        <FlashFeedback 
            v-if="showFlashFeedback"
            :text="feedbackText"
        />

        <TextQuery 
            v-if="period == 'pre-stay' && !currentQuery?.answered" 
            :settings="settings"
            :data="currentQuery"
            @showFeedback="showFeedback"
        />
        <!-- <IconsQuery /> -->
        <!-- <ResponseCard />  -->
    </div>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue';
import TextQuery from './Components/TextQuery.vue';
// import IconsQuery from './Components/IconsQuery.vue'
// import ResponseCard from './Components/ResponseCard.vue';
import FlashFeedback from './Components/FlashFeedback.vue'
//stores
import { useQuerySettingsStore } from '@/stores/modules/querySettings';
import { useQueryStore } from '@/stores/modules/query';
import { useStayStore } from '@/stores/modules/stay'
import { useGuestStore } from '@/stores/modules/guest';

const querySettingsStore = useQuerySettingsStore();
const queryStore = useQueryStore();
const stayStore = useStayStore();
const guestStore = useGuestStore();

onBeforeMount(async ()=>{
    await getQuerySettings();
    await getCurrentPeriod();
    await getCurrentQuery();
    await getResponses();
})

const settings = ref([]);
const period = ref(null);
const currentQuery = ref(null);
const responses = ref([]);
const showFlashFeedback = ref(false);
const feedbackText = ref(null);

async function getQuerySettings(){
    settings.value = await querySettingsStore.$getAll();
    // console.log('settings',settings.value)
}

async function getCurrentPeriod(){
    let params = {
        stayId : stayStore.stayData.id
    }
    period.value = await queryStore.$getCurrentPeriod(params);
    // console.log('period.value',period.value)
}

async function getCurrentQuery(){
    let params = {
        stayId : stayStore.stayData.id,
        guestId : guestStore.guestData.id,
        period : period.value,
    }
    currentQuery.value = await queryStore.$firstOrCreate(params);
    // console.log('currentQuery.value',currentQuery.value)
}

async function getResponses(){
    let params = {
        stayId : stayStore.stayData.id,
        guestId : guestStore.guestData.id
    }
    // console.log('getResponses',params)
    responses.value = await queryStore.$getRecentlySortedResponses(params);
    // console.log('responses.value',responses.value)
}

function showFeedback(text){
    showFlashFeedback.value = true;
    feedbackText.value = text;
    getCurrentQuery();
    getResponses();
}
</script>