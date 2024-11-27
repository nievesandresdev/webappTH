<template>
    <InboxHead />
    <!-- pre-stay -->
    <div class="mt-6 px-4">
        <TextQuery 
            v-if="period == 'pre-stay' && currentQuery && !currentQuery?.answered" 
            :settings="settings"
            :data="currentQuery"
        />
        <!-- in-stay & post-stay -->
        <div class="md:mt-12" v-if="(period == 'in-stay' || period == 'post-stay') && currentQuery &&  !currentQuery?.answered" >
            <IconsQuery 
                :settings="settings"
                :data="currentQuery"
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
                    @reloadList="reloadList"
                    :settings="settings"
                    :data="res"
                />
                <div class="mb-2 sp:mb-4" v-else>
                    <IconsQuery 
                        :settings="settings"
                        :data="res"
                        @showFeedback="showFeedback"
                    />
                </div>      
            </template>
        </template>
    </div>
</template>
<script setup>
import { ref, onMounted, provide } from 'vue'
import InboxHead from '@/Modules/Queries/Components/InboxHead.vue'
import TextQuery from './Components/TextQueryRed.vue';
import IconsQuery from './Components/IconsQueryRed.vue'
import ResponseCard from './Components/ResponseCardRed.vue';
import LinksReview from './Components/LinksReview.vue'
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
const requestTo = ref(null);
//
const EditId = ref(null);
const EditPeriod = ref(null);
const EditComment = ref(null);
const EditQualification = ref(null);

onMounted(async() => {
    // queryStore.$setPendingQuery(false);
    await getQuerySettings();
    await getCurrentPeriod();
    if(period.value){
        await getCurrentQuery();
    }
    await getResponses();
    let response = await requestSettingsStore.$getPostStayRequestData();
    requestTo.value = response.request_to;
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
    // console.log('test reloadList')
    getCurrentQuery();
    getResponses();
}


provide('EditId',EditId);
provide('EditPeriod',EditPeriod);
provide('EditComment',EditComment);
provide('EditQualification',EditQualification);
</script>