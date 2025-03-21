<template>
    <InboxHead />
    <!-- pre-stay -->
    <PageTransitionGlobal module="query">
        <div v-if="Boolean(requestTexts)" class="mt-6 md:mt-20 px-4 pb-[132px] md:w-[650px] md:mx-auto">
            <TextQuery 
                v-if="period == 'pre-stay' && currentQuery && !currentQuery?.answered" 
                :settings="settings"
                :data="currentQuery"
                @reloadList="reloadList"
            />
            <!-- in-stay & post-stay -->
            <div v-if="(period == 'in-stay' || period == 'post-stay') && currentQuery &&  !currentQuery?.answered" >
                <IconsQuery 
                    :settings="settings"
                    :data="currentQuery"
                    @reloadList="reloadList"
                />
            </div>

            <LinksReview v-if="showRequestReview" />
            <div 
                v-else-if="currentQuery && currentQuery?.answered"
                class="hidden md:block"
            >
                <img class="w-[64px] h-[64px] mx-auto" src="/assets/icons/WA.circle-check.BLACK.svg" alt="">
                <p class="mt-8 roboto text-[24px] font-medium leading-[116%] text-center">{{ $t('query.form.poststay-bad-thanks-title') }} </p>
                <p class="mt-4 roboto text-base font-medium leading-[125%] text-center">{{ $t('query.form.poststay-bad-thanks-subtitle') }}</p>
            </div>
            
            <div 
                v-for="res in responses" :key="res?.id"
                class="md:hidden"
            >
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
                        @reloadList="reloadList"
                        :settings="settings"
                        :data="res"
                    />
                    <div class="mb-2 sp:mb-4" v-else>
                        <IconsQuery 
                            :settings="settings"
                            :data="res"
                            @reloadList="reloadList"
                        />
                    </div>      
                </template>
            </div>
        </div>
    </PageTransitionGlobal>
</template>
<script setup>
import { ref, onMounted, provide, computed } from 'vue'
import utils from '@/utils/utils.js';
import InboxHead from '@/Modules/Queries/Components/InboxHead.vue'
import TextQuery from './Components/TextQueryRed.vue';
import IconsQuery from './Components/IconsQueryRed.vue'
import ResponseCard from './Components/ResponseCardRed.vue';
import LinksReview from './Components/LinksReviewRed.vue'
//load
import PageTransitionGlobal from "@/components/PageTransitionGlobal.vue";
import { SECTIONS } from "@/constants/sections.js";
import { useLoadingSections } from "@/composables/useLoadingSections";
const { startLoading, stopLoading, loading } = useLoadingSections();
//
//store
import { useQuerySettingsStore } from '@/stores/modules/querySettings';
const querySettingsStore = useQuerySettingsStore();
import { useQueryStore } from '@/stores/modules/query';
const queryStore = useQueryStore();
import { useStayStore } from '@/stores/modules/stay'
const stayStore = useStayStore();
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { useRequestSettingStore } from '@/stores/modules/requestSettings';
const requestSettingsStore = useRequestSettingStore();

 
const settings = ref([]);
const responses = ref([]);
const period = ref(null);
const currentQuery = ref(null);
const requestTexts = ref(null);
const requestTo = ref(null);
//
const EditId = ref(null);
const EditPeriod = ref(null);
const EditComment = ref(null);
const EditQualification = ref(utils.getUrlParam('fill') ?? null);
//
startLoading(SECTIONS.QUERY.GLOBAL);
//
onMounted(async() => {
    // queryStore.$setPendingQuery(false);
    await getQuerySettings();
    await getCurrentPeriod();
    if(period.value){
        await getCurrentQuery();
    }
    await getResponses();
    stopLoading(SECTIONS.QUERY.GLOBAL);
    requestTexts.value = await requestSettingsStore.$getRequestData(period.value);
    // console.log('test requestTexts.value',requestTexts.value)
    requestTo.value = requestTexts.value.request_to;
})

async function getQuerySettings(){
    settings.value = await querySettingsStore.$getAll();
    // console.log('test settings.value',settings.value)
}

async function getCurrentPeriod(){
    // if(!stayStore?.stayData?.id){
    //     await guestStore.loadLocalGuest();
    // }
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
    // console.log('test currentQuery',currentQuery.value)
}

async function getResponses(){
    let params = {
        stayId :localStorage.getItem('stayId'),
        guestId :localStorage.getItem('guestId'),
    }
    responses.value = await queryStore.$getRecentlySortedResponses(params);
    // console.log('test responses',responses.value)
}

function reloadList(){
    console.log('test reloadList')
    getCurrentQuery();
    getResponses();
}

const showRequestReview = computed(()=>{
    if(!period.value || !requestTexts.value) return false;
    let requestTo = JSON.parse(requestTexts.value?.request_to)
    
    if(period.value == 'in-stay'){
        return currentQuery.value?.answered && requestTexts.value.in_stay_activate && ['GOOD','VERYGOOD'].includes(currentQuery.value.qualification)
    }

    if(period.value == 'post-stay'){
        return currentQuery.value?.answered && requestTo.includes(currentQuery.value.qualification) 
        // requestTo.includes('NOTANSWERED')
    }
    
    return false
})

provide('EditId',EditId);
provide('EditPeriod',EditPeriod);
provide('EditComment',EditComment);
provide('EditQualification',EditQualification);
provide('period',period)
provide('requestTexts',requestTexts)
</script>