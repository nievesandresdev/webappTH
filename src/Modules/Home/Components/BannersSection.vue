<template>
    <!-- este banner nunca se encontrara al mismo tiempo con los demas solo aparece en pre stay -->
    <div 
        v-if="hotelStore.hotelData?.show_checkin_stay && $currentPeriod() == 'pre-stay' && hotelStore.hotelData?.checkin_service_enabled"
        class="px-3 sp:px-4 mt-4 sp:mt-6"
    >
        <WACardBanner 
            @click="goGuests"
            :title="$t('checkin.cardBanner.title')"
            :subtitle="$t('checkin.cardBanner.subtitle')"
            :active-custom="true"
            nameIconLeft="WA.checkin.user"
        />
    </div>

    <div class="flex items-center" :class="{'flex-row overflow-x-auto px-3 sp:px-4 gap-2': showSliderBanner, 'flex-col': !showSliderBanner}">
        <!-- banner query post stay -->
        <div 
            v-if="queryStore.hasPendingQuery && $currentPeriod() == 'post-stay'" 
            class="mt-4 sp:mt-6"
            :class="{'w-full px-3 sp:px-4': !showSliderBanner, 'w-[343px] flex-shrink-0': showSliderBanner}"
        >
            <div 
                class="flex items-center w-full h-[70px] rounded-[10px] bg-[linear-gradient(91deg,#9407FF_0.21%,#4402B6_39.83%,#540B63_99.27%)] shadow-guest"
                @click="queryStore.$setIsOpenPopUp(true)"
            >
                <div class="pl-4">
                    <h1 class="lato text-[16px] font-bold leading-[20px] text-[#fafafa]">{{ $t('query.popup.bannerHome-post-stay.title') }}</h1>
                    <p class="mt-[2px] lato text-sm font-medium leading-[16px] text-[#fafafa]">
                        {{ $t('query.popup.bannerHome-post-stay.subtitle') }}
                    </p>
                </div>
                <img src="/assets/img/noAnsweredQueryHomeImg.svg" alt="" class="w-[118px] h-full ml-auto">
            </div>
        </div>

        <div 
            class="mt-4 sp:mt-6"
            :class="{'w-full px-3 sp:px-4': !showSliderBanner, 'w-[343px] flex-shrink-0': showSliderBanner}"
            v-if="isCheckoutPast"
        >
            <WACardBanner 
                @click="handleMyStays"
                :title="$t('profile.my_stays.title')"
                :subtitle="$t('profile.my_stays.subtitle_inactive')"
                :active-custom="true"
            />
        </div>
    </div>
    <!-- banner query in stay -->
    <div v-if="queryStore.hasPendingQuery && $currentPeriod() == 'in-stay'" class="px-3 sp:px-4 mt-4 sp:mt-6">
        <div 
            class="flex items-center w-full h-[70px] rounded-[10px] bg-[linear-gradient(91deg,#0783FF_0.21%,#025CB6_39.83%,#0B6357_99.27%)] shadow-guest"
            @click="queryStore.$setIsOpenPopUp(true)"
        >
            <div class="pl-4">
                <h1 class="lato text-[16px] font-bold leading-[20px] text-[#fafafa]">{{ $t('query.popup.bannerHome-in-stay.title') }}</h1>
                <p class="mt-[2px] lato text-sm font-medium leading-[16px] text-[#fafafa]">
                    {{ $t('query.popup.bannerHome-in-stay.subtitle') }}
                </p>
            </div>
            <img src="/assets/img/noAnsweredQueryHomeImg.svg" alt="" class="w-[118px] h-full ml-auto">
        </div>
    </div>
    

    
    
</template>
<script setup>
import { computed } from 'vue';
import WACardBanner from '@/components/WACardBanner.vue';
import { $currentPeriod } from '@/utils/helpers';
import { DateTime } from 'luxon';
// stores
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();
import { useQueryStore } from '@/stores/modules/query';
const queryStore = useQueryStore();
import { useRouter } from 'vue-router';
const router = useRouter();

const isCheckoutPast = computed(() => {
if(!stayStore.stayData?.check_out) return
  const inputDate = DateTime.fromFormat(stayStore.stayData?.check_out, 'yyyy-MM-dd');
  const now = DateTime.now();
  return inputDate < now; // Retorna true si la fecha ya pasó
});

const showSliderBanner = computed(() => {
    return isCheckoutPast.value && queryStore.hasPendingQuery && $currentPeriod() == 'post-stay'
})

const handleMyStays = () => {
    router.push({ name: 'MyStays' });
};

const goGuests = () => {
    router.push({ name: 'Guests' });
};
</script>
