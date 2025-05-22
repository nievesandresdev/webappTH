<template>
    <SectionBar :title="$t('profile.inbox.title')" :fixed="false"/>
    <!-- pre-stay -->
    <PageTransitionGlobal module="query">
        <div class="flex flex-col gap-6 px-4 pt-6 pb-[114px]">
            <template v-for="(item,index) in combinedList" :key="index">
                <!-- {{ item._type }} - {{ item._date }} -->
                <TextQuery 
                    v-if="period == 'pre-stay' && item._type == 'query' && !item?.answered" 
                    :settings="querySettingsStore.settings"
                    :data="item"
                    @reloadList="reloadList"
                />
                <IconsQuery 
                    v-else-if="period !== 'pre-stay' && item._type == 'query' && !item?.answered"
                    :settings="querySettingsStore.settings"
                    :data="item"
                    @reloadList="reloadList"
                />
                <div v-else-if="showRequestReview && item._type == 'request'" >
                    <div class="flex items-center mb-2 gap-1">
                        <IconCustomColor
                            class="transform rotate-180"
                            name="arrow-back"
                            color="#777777"
                        />
                        <span class="lato text-[10px] sp:text-sm leading-[12px] sp:leading-[16px] text-[#777777]">{{ $t('query.form.received-text') }} </span>
                        <span class="lato text-[10px] sp:text-sm leading-[12px] sp:leading-[16px] text-[#777777]">
                            {{ formatAnyDate(item?._date, 'dd/MM/yyyy - HH:mm')+'hs' }}
                        </span>
                    </div>
                    <LinksReview />
                </div>
                <ResponseCard 
                    v-else-if="item._type == 'response' && EditPeriod !== item.period"
                    :response="item.comment ? item.comment[item.response_lang] : null"
                    :qualification="item.qualification"
                    :period="item.period"
                    :currentPeriod="period"
                    :responded_at="item.responded_at"
                    :id="item.id"
                />
                <template v-else-if="item._type == 'response' && EditPeriod == item.period">
                    <TextQuery 
                        v-if="EditPeriod == 'pre-stay'" 
                        @reloadList="reloadList"
                        :settings="querySettingsStore.settings"
                        :data="item"
                    />
                    <IconsQuery 
                        v-else
                        :settings="querySettingsStore.settings"
                        :data="item"
                        @reloadList="reloadList"
                    />    
                </template>
                <ContactEmailCard 
                    v-else-if="item._type == 'emails'"
                    :data="item"
                />
            </template>
        </div>
    </PageTransitionGlobal>
</template>
<script setup>
import { ref, onMounted, provide, computed } from 'vue'
import { DateTime } from 'luxon'
import utils from '@/utils/utils.js';
import SectionBar from '@/components/SectionBar.vue';
import TextQuery from './Components/TextQueryRed.vue';
import IconsQuery from './Components/IconsQueryRed.vue'
import ResponseCard from './Components/ResponseCardRed.vue';
import LinksReview from './Components/LinksReviewRed.vue'
import ContactEmailCard from './Components/ContactEmailCard.vue';
import IconCustomColor from '@/components/IconCustomColor.vue';
import { formatAnyDate } from '@/utils/dateHelpers';
//load
import PageTransitionGlobal from "@/components/PageTransitionGlobal.vue";
import { SECTIONS } from "@/constants/sections.js";
import { useLoadingSections } from "@/composables/useLoadingSections";
const { startLoading, stopLoading, loading } = useLoadingSections();
import {$currentPeriod} from '@/utils/helpers';
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
const requestTexts = ref(null);
const requestTo = ref(null);
const contactEmails = ref([]);
const combinedList = ref([]);
//
const EditId = ref(null);
const EditPeriod = ref(null);
const EditComment = ref(null);
const EditQualification = ref(utils.getUrlParam('fill') ?? null);
//
startLoading(SECTIONS.QUERY.GLOBAL);
//
onMounted(async() => {
    
    // await getQuerySettings();
    period.value = $currentPeriod();
    // if(period.value){
    //     await getCurrentQuery();
    // }
    await getResponses();
    await getContactEmailsByStayId();
    stopLoading(SECTIONS.QUERY.GLOBAL);
    // requestTexts.value = await requestSettingsStore.$getRequestData(period.value);
    // console.log('test requestTexts.value',requestTexts.value)
    requestTo.value = requestSettingsStore.requestData.request_to;
    getCombinedList();
    
})

async function getQuerySettings(){
    settings.value = await querySettingsStore.$getAll();
    // console.log('test settings.value',settings.value)
}

// async function getCurrentPeriod(){
//     // if(!stayStore?.stayData?.id){
//     //     await guestStore.loadLocalGuest();
//     // }
//     let params = {
//         stayId : stayStore?.stayData?.id
//     }
//     period.value = await queryStore.$getCurrentPeriod(params);
// }


async function getResponses(){
    let params = {
        stayId :localStorage.getItem('stayId'),
        guestId :localStorage.getItem('guestId'),
    }
    let response = await queryStore.$getRecentlySortedResponses(params);
    if(response){
        responses.value = response;
    }
    
}

async function getContactEmailsByStayId(){
    let params = {
        stayId :localStorage.getItem('stayId'),
        guestId :localStorage.getItem('guestId'),
    }
    const { ok, data } = await guestStore.$getContactEmailsByStayId(params);
    if(ok){
        contactEmails.value = data;
    }
    // console.log('test contactEmails',contactEmails.value)
}
async function reloadList(){
    // console.log('test reloadList')
    await getResponses();
    getCombinedList();
}

const showRequestReview = computed(()=>{
    if(!period.value || !requestSettingsStore.requestData) return false;
    let requestTo = JSON.parse(requestSettingsStore.requestData?.request_to)
    
    if(period.value == 'in-stay'){
        return queryStore.currentQuery?.answered && requestSettingsStore.requestData.in_stay_activate && ['GOOD','VERYGOOD'].includes(queryStore.currentQuery.qualification)
    }

    if(period.value == 'post-stay'){
        return queryStore.currentQuery?.answered && requestTo.includes(queryStore.currentQuery.qualification) 
        // requestTo.includes('NOTANSWERED')
    }
    
    return false
})

const getCombinedList = () => {
  const items = []
//   console.log('test currentQuery',queryStore.currentQuery)
  // 1. La consulta actual (suponiendo que el campo de fecha es answeredAt)
  if (queryStore.currentQuery && !queryStore.currentQuery.answered) {
    items.push({
      ...queryStore.currentQuery,
      _type: 'query',
      _date: queryStore.currentQuery.created_at
    })
  }

//   console.log('test responses.value',responses.value)
  // 2. Todas las respuestas (suponiendo que el campo de fecha es createdAt)
  if(responses.value?.length > 0){
    items.push(...responses.value.map(r => ({
        ...r,
        _type: 'response',
        _date: r.responded_at
    })))
  }
  
  // 3. La solicitud al usuario (suponiendo que el campo de fecha es requestDate)
  if (responses.value.length > 0) {
    items.push({
      ...requestSettingsStore.requestData,
      _type: 'request',
      _date: responses.value.find(r => r.period == period.value)?.responded_at
    })
  }

  if(contactEmails.value.length > 0){
    items.push(...contactEmails.value.map(c => ({
      ...c,
      _type: 'emails',
      _date: c.created_at
    })))
  }
  // ordenar de más antiguo a más reciente
  combinedList.value = items.sort((a, b) => {
    // console.log('--------------------------------')
    // console.log('test a',a._date)
    // console.log('test b',b._date)
    const fa = formatAnyDate(a._date, 'dd/MM/yyyy - HH:mm')
    const fb = formatAnyDate(b._date, 'dd/MM/yyyy - HH:mm')
    const formatFa = DateTime.fromFormat(fa, 'dd/MM/yyyy - HH:mm')
    const formatFb = DateTime.fromFormat(fb, 'dd/MM/yyyy - HH:mm')
    return formatFa - formatFb
})

//   console.log('test combinedList',combinedList.value)
}

provide('EditId',EditId);
provide('EditPeriod',EditPeriod);
provide('EditComment',EditComment);
provide('EditQualification',EditQualification);
provide('period',period)
</script>