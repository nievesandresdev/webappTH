<template>
    <ModalNative 
        width="200px" @closeModal="queryStore.$setIsOpenPopUp(false)" :openProp="Boolean(route.query.openFakeMsg) && querySettingsStore.settings"
        customClasses="bottom-0"
        top="0"
    > 
        <div 
            class="p-3" 
            v-if="route.query.openFakeMsgActivate == 'false' || route.query.qualification == 'NORMAL' || route.query.period == 'pre-stay'"
        >
            <IconsQueryBadResponse 
                :period="route.query.period"
                :qualification="route.query.qualification"
            />
        </div>
        <div class="p-3" v-else>
            <div class="mb-1">
                <img src="/assets/icons/WA.close2.svg" class="w-[16px] h-[16px] ml-auto">
            </div>
            <LinksReview 
                :period="route.query.period"
                :qualification="route.query.qualification"
                inModal
            />
        </div>
    </ModalNative>

</template>

<script setup>
import { onMounted, computed } from 'vue'
import IconsQuery from '@/Modules/Queries/Components/IconsQueryRed.vue';
import IconsQueryBadResponse from '@/layout/Components/IconsQueryBadResponse.vue';
import LinksReview from '@/Modules/Queries/Components/LinksReviewRed.vue';
import ModalNative from '@/components/ModalNative.vue'
import { $currentPeriod } from '@/utils/helpers';
import { $formatNameLodging } from '@/utils/utils';
import { isMockup } from '@/utils/utils.js'
//stores
import { useRoute } from 'vue-router';
const route = useRoute();
import { useQueryStore } from '@/stores/modules/query';
const queryStore = useQueryStore();
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useQuerySettingsStore } from '@/stores/modules/querySettings';
const querySettingsStore = useQuerySettingsStore();
//data

onMounted(async() => {
    if(Boolean(route.query.openFakeMsg) && isMockup()){
        await querySettingsStore.$getAll();
        console.log('se monta',querySettingsStore.settings);
    }
})

const period = computed(() => {
    return route.query.period;
})

const modifiedPeriod = computed(() => {
    let modifiedString;
    
    if(period.value){
        modifiedString = period.value.replace("-", "_")
    }
    return modifiedString;
})

const keyPeriodAndFeedback = computed(() => {
    if(!route.query.qualification) return '';
    return modifiedPeriod.value+'_'+route.query.qualification.toLowerCase();
})

// const showThanksMsg = computed(() => {
//     if(route.query.period == 'pre-stay' || !querySettingsStore.settings)return true;
//     if(period.value == 'post-stay' && route.query.qualification == 'VERYGOOD'){
//         return false;
//     }
//     let calculated = (
//         (['WRONG','VERYWRONG','NORMAL'].includes(route.query.qualification)) ||
//         (['GOOD','VERYGOOD'].includes(route.query.qualification)) && !querySettingsStore.settings[keyPeriodAndFeedback.value+'_request_activate']
//     )
//     return calculated;
// })


</script>
