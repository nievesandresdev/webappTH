<template>
    <Head /> 

    <div class="queries-body h-[81vh] md:h-full overflow-y-auto px-2 md:px-0 py-6 md:py-8 md:w-[650px] md:mx-auto">
        <FlashFeedback 
            v-if="showFlashFeedback  && period == 'pre-stay'"
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
            @loadReponses="loadReponses"
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

        <LinksReview v-if="showLinks" />
        
        <template v-for="res in responses" :key="res?.id">
            <ResponseCard 
                :response="res.comment ? res.comment[res.response_lang] : null"
                :qualification="res.qualification"
                :period="res.period"
                :currentPeriod="period"
                :id="res.id"
                v-if="EditPeriod !== res.period"
            /> 
            <!-- componentes para editar -->
            <template v-else>
                <TextQuery 
                    v-if="EditPeriod == 'pre-stay'" 
                    :settings="settings"
                    :data="res"
                    @showFeedback="showFeedback"
                />
                <div class="mb-2 sp:mb-4" v-else>
                    <IconsQuery 
                        :settings="settings"
                        :data="res"
                        @loadReponses="loadReponses"
                        @showFeedback="showFeedback"
                    />
                </div>      
            </template>
        </template>
        
    </div>
</template>
<script setup>
import { onBeforeMount, ref, computed, provide } from 'vue';
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
import { useRequestSettingStore } from '@/stores/modules/requestSettings';

const querySettingsStore = useQuerySettingsStore();
const queryStore = useQueryStore();
const stayStore = useStayStore();
const guestStore = useGuestStore();
const requestSettingsStore = useRequestSettingStore();

const router = useRouter();

const settings = ref([]);
const period = ref(null);
const currentQuery = ref(null);
const responses = ref([]);
const showFlashFeedback = ref(false);
const feedbackText = ref(null);
const requestTo = ref(null);
//
const EditId = ref(null);
const EditPeriod = ref(null);
const EditComment = ref(null);
const EditQualification = ref(null);

onBeforeMount(async ()=>{
    // queryStore.$setPendingQuery(false);
    await getQuerySettings();
    await getCurrentPeriod();
    if(period.value){
        await getCurrentQuery();
    }
    await getResponses();
    let response = await requestSettingsStore.$getRequestData();
    requestTo.value = response.request_to;
    // console.log('requestTo.value',requestTo.value)
})

async function getQuerySettings(){
    settings.value = await querySettingsStore.$getAll();
}

async function getCurrentPeriod(){
    if(!stayStore?.stayData?.id){
        await guestStore.loadLocalGuest();
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
        stayId :localStorage.getItem('stayId'),
        guestId :localStorage.getItem('guestId'),
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

//computed
const postStayQuery = computed(()=>{
    if(responses.value){
        return responses.value.find(item => item.period == 'post-stay');
    }
    return null  
})

const showLinks = computed(()=>{
    // console.log('requestTo.value',requestTo.value)
    if(!requestTo.value) return false;
    if(!postStayQuery.value && period.value == 'post-stay' && requestTo.value.includes('NOTANSWERED')){
        return true;
    }

    if(postStayQuery.value){
        let condition1 = period.value == 'post-stay' && 
                        postStayQuery.value.answered && 
                        ['GOOD','VERYGOOD'].includes(postStayQuery.value.qualification) && 
                        !requestTo.value.includes('NOTANSWERED'); 
        let condition2 = period.value == 'post-stay' &&
                        postStayQuery.value.answered && 
                        ['NORMAL','GOOD','VERYGOOD'].includes(postStayQuery.value.qualification) &&
                        requestTo.value.includes('NOTANSWERED');
        return condition1 || condition2;
    }
    return false;
                    
})

provide('EditId',EditId);
provide('EditPeriod',EditPeriod);
provide('EditComment',EditComment);
provide('EditQualification',EditQualification);
</script>