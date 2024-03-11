<template>
    <div class="queries-head hshadow p-4 relative">
        <img 
            @click="goBack"
            class="absolute top-4 left-4" src="/assets/icons/1.TH.BACK.svg" alt="BACK icon"
        >
        <h1 class="text-center text-base font-medium">Consultas</h1>
    </div>

    <div class="queries-body h-[81vh] overflow-y-auto px-4 py-6">

        <FlashFeedback 
            v-if="showFlashFeedback"
            :text="feedbackText"
        />

        <!-- pre-stay -->
        <TextQuery 
            v-if="period == 'pre-stay' && currentQuery && !currentQuery?.answered" 
            :settings="settings"
            :data="currentQuery"
            @showFeedback="showFeedback"
        />
        <!-- in-stay & post-stay -->
        <IconsQuery 
            v-if="(period == 'in-stay' || period == 'post-stay') && currentQuery &&  !currentQuery?.answered" 
            :settings="settings"
            :data="currentQuery"
            @loadReponses="loadReponses"
            @showFeedback="showFeedback"
        />

        <template v-for="res in responses" :key="res?.id">
            <ResponseCard 
                :response="res.comment"
                :qualification="res.qualification"
                :period="res.period"
            /> 
        </template>
    </div>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import TextQuery from './Components/TextQuery.vue';
import IconsQuery from './Components/IconsQuery.vue'
import ResponseCard from './Components/ResponseCard.vue';
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

const router = useRouter();

onBeforeMount(async ()=>{
    queryStore.$setPendingQuery(false);
    await getQuerySettings();
    await getCurrentPeriod();
    if(!guestStore?.guestData?.id){
        await stayStore.loadLocalStay();
    }
    if(period.value){
        await getCurrentQuery();
    }
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
    if(!stayStore?.stayData?.id){
        await stayStore.loadLocalStay();
    }
    let params = {
        stayId : stayStore?.stayData?.id
    }
    period.value = await queryStore.$getCurrentPeriod(params);
    console.log('period.value',period.value)
}

async function getCurrentQuery(){
    let params = {
        stayId : stayStore?.stayData?.id,
        guestId : guestStore?.guestData?.id,
        period : period.value,
    }
    currentQuery.value = await queryStore.$visited(params);
    // console.log('currentQuery.value',currentQuery.value)
}

async function getResponses(){
    let params = {
        stayId : stayStore?.stayData?.id,
        guestId : guestStore?.guestData?.id,
    }
    responses.value = await queryStore.$getRecentlySortedResponses(params);
    // console.log('responses.value',responses.value)
}

function showFeedback(text){
    showFlashFeedback.value = true;
    feedbackText.value = text;
    loadReponses();
}

function loadReponses(){
    getCurrentQuery();
    getResponses();
}

function goBack() {
  router.go(-1);
}
</script>