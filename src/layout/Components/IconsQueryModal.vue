<template>
    <ModalNative 
        width="343px" @closeModal="queryStore.$setIsOpenPopUp(false)" :openProp="queryStore.isOpenPopUp"
        customClasses="bottom-0"
        top="0"
    >   
        <div v-if="queryStore.currentQuery && !queryStore.currentQuery.answered" class="p-6">
            <div class="flex justify-between items-center">
                <h1 class="lato text-[20px] font-bold leading-[28px]">
                    <template v-if="period == 'post-stay'">
                        {{ $t('query.form.thanksAll') }}
                        <!-- {{ !$utils.isMockup() ? guestStore.guestData.name : 'Huésped'}} -->
                    </template>
                    <template v-else>
                        ¿{{ $t('query.form.whatsup') }} 
                    </template>
                </h1>
                <button @click="queryStore.$setIsOpenPopUp(false)">
                    <img src="/assets/icons/WA.close2.svg" class="w-[24px] h-[24px]">
                </button>
            </div>
            <p 
                class="mt-6 lato text-base font-bold leading-[20px]"
            >
                {{ $t('query.settings.question'+period, {lodging: hotelStore.hotelData?.name}) }}
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
                v-if="queryStore.currentQuery?.qualification !== 'GOOD' && queryStore.currentQuery?.qualification !== 'VERYGOOD'"
            >
                <IconsQueryBadResponse />
            </div>
            <div class="pt-3 px-4 pb-6" v-else>
                <div class="mb-2">
                    <img src="/assets/icons/WA.close2.svg" class="w-[24px] h-[24px] ml-auto">
                </div>
                <LinksReview inModal/>
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
const period = ref(null);
const EditId = ref(null);
const EditPeriod = ref(null);
const EditComment = ref(null);
const EditQualification = ref(null);

provide('EditId',EditId);
provide('EditPeriod',EditPeriod);
provide('EditComment',EditComment);
provide('EditQualification',EditQualification);


const hotelData = computed(() => hotelStore.hotelData);

watch(hotelData, (newValue, oldValue) => {
    if(newValue){
        period.value = $currentPeriod()
        queryStore.$getCurrentAndSettingsQuery(stayStore.stayData.id, guestStore.guestData.id, $currentPeriod(), guestStore.guestData.name)
    }
}, { immediate: true });


// const hotelData = computed(() => hotelStore.hotelData);

// onMounted(async () => {

// });

// watch(hotelData, (valueCurrent, valueOld) => {
//     if (!valueOld && valueCurrent) {
//         loadData();
//     }
// }, { immediate: true });
</script>
