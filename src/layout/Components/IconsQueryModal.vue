<template>
    <ModalNative 
        width="343px" @closeModal="queryStore.$setIsOpenPopUp(false)" :openProp="queryStore.isOpenPopUp"
        customClasses="bottom-0"
        top="0"
    > 
        <div v-if="queryStore.currentQuery && queryStore.hasPendingQuery" class="p-6">
            <div class="flex justify-between items-center">
                <h1 class="lato text-[20px] font-bold leading-[28px]">
                    <template v-if="$currentPeriod() == 'post-stay'">
                        {{ $t('query.form.thanksAll') }}
                        <!-- {{ !$utils.isMockup() ? guestStore.guestData.name : 'Huésped'}} -->
                    </template>
                    <template v-else>
                        ¿{{ $t('query.form.whatsup', {guestName: guestStore.guestData?.name}) }} 
                    </template>
                </h1>
                <button @click="queryStore.$setIsOpenPopUp(false)">
                    <img src="/assets/icons/WA.close2.svg" class="w-[24px] h-[24px]">
                </button>
            </div>
            <p 
                class="mt-6 lato text-base font-bold leading-[20px]"
            >
                {{ $t('query.settings.question'+$currentPeriod(), {lodging: $formatTypeLodging() ?? '', hotelName: hotelStore.hotelData?.name}) }}
            </p>
            <IconsQuery 
                :settings="querySettingsStore.settings"
                :data="queryStore.currentQuery"
                @reloadList="reloadQuery"
                inModal
            />
        </div>
        <template v-else>
            <div 
                class="p-6" 
                v-if="showThanksMsg"
            >
                <IconsQueryBadResponse 
                    :period="queryStore.currentQuery?.period"
                    :qualification="queryStore.currentQuery?.qualification"
                />
            </div>
            <div class="pt-3 px-4 pb-6" v-else>
                <div class="mb-2">
                    <img src="/assets/icons/WA.close2.svg" class="w-[24px] h-[24px] ml-auto" @click="queryStore.$setIsOpenPopUp(false)">
                </div>
                <LinksReview 
                    :period="period"
                    :qualification="queryStore.currentQuery?.qualification"
                    inModal
                />
            </div>
        </template>
        
    </ModalNative>

</template>

<script setup>
import { ref, provide, watch, computed } from 'vue'
import IconsQuery from '@/Modules/Queries/Components/IconsQueryRed.vue';
import IconsQueryBadResponse from '@/layout/Components/IconsQueryBadResponse.vue';
import LinksReview from '@/Modules/Queries/Components/LinksReviewRed.vue';
import ModalNative from '@/components/ModalNative.vue'
import { $currentPeriod } from '@/utils/helpers';
import { $formatNameLodging } from '@/utils/utils';
//stores
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
const EditId = ref(null);
const EditPeriod = ref(null);
const EditComment = ref(null);
const EditQualification = ref(null);

provide('EditId',EditId);
provide('EditPeriod',EditPeriod);
provide('EditComment',EditComment);
provide('EditQualification',EditQualification);

const period = computed(() => {
    return $currentPeriod();
})

const modifiedPeriod = computed(() => {
    let modifiedString;
    
    if(period.value){
        modifiedString = period.value.replace("-", "_")
    }
    return modifiedString;
})

const keyPeriodAndFeedback = computed(() => {
    if(!queryStore.currentQuery?.qualification) return '';
    return modifiedPeriod.value+'_'+queryStore.currentQuery?.qualification.toLowerCase();
})

const showThanksMsg = computed(() => {
    if(period.value == 'post-stay' && queryStore.currentQuery?.qualification == 'VERYGOOD'){
        return false;
    }
    let calculated = (
        (['WRONG','VERYWRONG','NORMAL'].includes(queryStore.currentQuery?.qualification)) ||
        (['GOOD','VERYGOOD'].includes(queryStore.currentQuery?.qualification)) && !querySettingsStore.settings[keyPeriodAndFeedback.value+'_request_activate']
    )
    return calculated;
})

// const showLinksReview = computed(() => {
//     let calculated = (['GOOD','VERYGOOD'].includes(queryStore.currentQuery?.qualification)) && querySettingsStore.settings[keyPeriodAndFeedback.value+'_request_activate']
//     return calculated;
// })

</script>
