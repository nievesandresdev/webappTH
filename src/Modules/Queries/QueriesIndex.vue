<template>
    <Head /> 

    <div class="queries-body h-[81vh] md:h-full overflow-y-auto px-2 md:px-0 py-6 md:py-8 md:w-[650px] md:mx-auto">
        
        
        <FlashFeedback 
            v-if="showFlashFeedback  && period == 'pre-stay'""
            :text="feedbackText"
        />
        <!-- feedback poststay desktop-->
        <ThanksDesktop v-if="showFlashFeedback && period == 'post-stay'"/>

        <!-- pre-stay -->
        <TextQuery 
            v-if="period == 'pre-stay' && currentQuery && !currentQuery?.answered" 
            :settings="settings"
            :data="currentQuery"
            @showFeedback="showFeedback"
        />
        <!-- in-stay & post-stay -->
        <div class="md:mt-12" v-if="(period == 'in-stay' || period == 'post-stay') && currentQuery &&  !currentQuery?.answered" >
            <IconsQuery 
                :settings="settings"
                :data="currentQuery"
                @loadReponses="loadReponses"
                @showFeedback="showFeedback"
            />
        </div>

        <template v-for="res in responses" :key="res?.id">
            <LinksReview v-if="res.period == 'post-stay' && res.qualification == 'GOOD'"
            />
            <ResponseCard 
                :response="res.comment ? res.comment[res.response_lang] : null"
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
import ThanksDesktop from './Components/ThanksDesktop.vue'
import LinksReview from './Components/LinksReview.vue'
import Head from './Components/HeadIndex.vue'
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
    // if(!guestStore?.guestData?.id){
    //     await stayStore.loadLocalStay();
    // }
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
}

async function getCurrentPeriod(){
    if(!stayStore?.stayData?.id){
        await stayStore.loadLocalStay();
    }
    let params = {
        stayId : stayStore?.stayData?.id
    }
    period.value = await queryStore.$getCurrentPeriod(params);
}

async function getCurrentQuery(){
    let params = {
        stayId : stayStore?.stayData?.id,
        guestId : guestStore?.guestData?.id,
        period : period.value,
    }
    currentQuery.value = await queryStore.$visited(params);
}

async function getResponses(){
    let params = {
        stayId : stayStore?.stayData?.id,
        guestId : guestStore?.guestData?.id,
    }
    responses.value = await queryStore.$getRecentlySortedResponses(params);
    console.log('responses.value',responses.value)
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
</script>