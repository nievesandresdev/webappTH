<template>
    <BottomModal :isOpen="queryModalisOpen" @update:isOpen="closeModal">
        
        <template v-if="showRequestReview">
            <LinksReview inModal/>
        </template>
        <template v-else>
            <h1 class="lato text-[20px] font-bold leading-[28px]">
                <template v-if="period == 'post-stay'">
                    {{ $t('query.form.thanksAll') }} {{ guestStore.guestData.name}}
                </template>
                <template v-else>
                    ¿{{ $t('query.form.whatsup') }} {{ guestStore.guestData.name}}?
                </template>
            </h1>
            <p class="mt-3 lato text-base font-bold leading-[20px] mb-4">
                {{ $t('query.settings.question'+period)}}
            </p>
            <IconsQuery 
                v-if="queryStore.currentQuery"
                :settings="querySettingsStore.settings"
                :data="queryStore.currentQuery"
                @reloadList="reloadQuery"
                inModal
            />
        </template>
    </BottomModal>
</template>
<script setup>
import { toRefs, ref, computed, provide, inject, onMounted } from 'vue';
import BottomModal from '@/components/Modal/GeneralBottomSheet.vue';
import IconsQuery from '@/Modules/Queries/Components/IconsQueryRed.vue';
import LinksReview from '@/Modules/Queries/Components/LinksReviewRed.vue';
//
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { useQueryStore } from '@/stores/modules/query';
const queryStore = useQueryStore();
import { useQuerySettingsStore } from '@/stores/modules/querySettings';
const querySettingsStore = useQuerySettingsStore();
import { useRequestSettingStore } from '@/stores/modules/requestSettings';
const requestSettingsStore = useRequestSettingStore();

const emit = defineEmits('closeModal')
const props = defineProps({
    period:{
        type: String,
        default:null
    },
    settings:{
        type: Object,
        default:null
    }
})

const EditId = inject('EditId');
const EditPeriod = inject('EditPeriod');
const EditComment = inject('EditComment');
const EditQualification = inject('EditQualification');

const { period, settings } = toRefs(props);

onMounted(async () => {
    requestTexts.value = await requestSettingsStore.$getRequestData(period.value);
    // console.log('test requestTexts',requestTexts.value)  

})

const requestTexts = ref(null);
const queryModalisOpen = inject('queryModalisOpen');


async function reloadQuery(){
    let params = {
        stayId : localStorage.getItem('stayId'),
        guestId : localStorage.getItem('guestId'),
        period : period.value,
    }
    queryStore.currentQuery = await queryStore.$visited(params);
    if(!showRequestReview.value){
        closeModal();
    }
    EditId.value = queryStore.currentQuery.id
    EditPeriod.value = queryStore.currentQuery.period
    EditComment.value = queryStore.currentQuery.comment ? queryStore.currentQuery.comment[queryStore.currentQuery.response_lang] : '';
    EditQualification.value = queryStore.currentQuery.qualification
}

function closeModal(){
    queryModalisOpen.value = false;
}

const showRequestReview = computed(()=>{
    if(!period.value || !requestTexts.value) return false;
    let requestTo = JSON.parse(requestTexts.value?.request_to)
    
    if(period.value == 'in-stay'){
        return queryStore.currentQuery?.answered && requestTexts.value.in_stay_activate && ['GOOD','VERYGOOD'].includes(queryStore.currentQuery.qualification)
    }

    if(period.value == 'post-stay'){
        return queryStore.currentQuery?.answered && requestTo.includes(queryStore.currentQuery.qualification) 
        // requestTo.includes('NOTANSWERED')
    }
    
    return false
})

provide('requestTexts',requestTexts)
</script>