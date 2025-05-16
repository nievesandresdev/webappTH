<template>
    <div class="px-3 sp:px-6 flex items-center justify-between">
        <!-- button checkin -->
        <div>
            <RoundedButton
                classContainer="mx-auto"
                id="checkin-button"
                iconUrl="/assets/icons/WA.checkin.user.svg"
                sizeIcons="w-8 h-8"
            />
            <span class="text-center lato text-xs font-bold leading-[16px] block mt-2">Check-in</span>
        </div>
        <!-- button call -->
        <div v-if="showPhoneButton">
            <RoundedButton
                classContainer="mx-auto"
                id="call-button"
                iconUrl="/assets/icons/WA.llamar.svg"
                sizeIcons="w-8 h-8"
                @click="goCall"
            />
            <span class="text-center lato text-xs font-bold leading-[16px] block mt-2">Llamar</span>
        </div>
        <!-- button wifi -->
        <div v-if="countWifi > 0">
            <RoundedButton
                classContainer="mx-auto"
                id="wifi-button"
                iconUrl="/assets/icons/WA.wifi.svg"
                sizeIcons="w-8 h-8"
                @click="isOpenWifi = true"
            />
            <span class="text-center lato text-xs font-bold leading-[16px] block mt-2">WiFi</span>
        </div>
        <!-- button rules --> 
        <div v-if="countRules > 0">
            <RoundedButton
                classContainer="mx-auto"
                id="rules-button"
                iconUrl="/assets/icons/WA.normas.svg"
                sizeIcons="w-8 h-8"
                @click="isOpenRules = true"
            />
            <span class="text-center lato text-xs font-bold leading-[16px] block mt-2">Normas</span>
        </div>
        <!-- button refered -->
        <div v-if="hotelStore.hotelData?.show_referrals && !hotelStore.hotelData?.offer_benefits">
            <RoundedButton
                classContainer="mx-auto"
                id="refered-button"
                iconUrl="/assets/icons/WA.referido.svg"
                sizeIcons="w-8 h-8"
                @click="openModalRewards"
            />
            <span class="text-center lato text-xs font-bold leading-[16px] block mt-2">Referir</span>
        </div>
        <!-- button refered -->
        <div v-if="hotelStore.hotelData?.show_referrals && hotelStore.hotelData?.offer_benefits">
            <RoundedButton
                classContainer="mx-auto"
                id="refered-button"
                iconUrl="/assets/icons/WA.referente.svg"
                sizeIcons="w-8 h-8"
                @click="openModalRewards"
            />
            <span class="text-center lato text-xs font-bold leading-[16px] block mt-2">Referir</span>
        </div>
    </div>
    <BottomRules :isOpen="isOpenRules" :scrollContentOnly="true" @update:isOpen="isOpenRules = $event" @update:count="countRules = $event" />
    <BottomSheetWifi :isOpen="isOpenWifi" :scrollContentOnly="true" @update:isOpen="isOpenWifi = $event" @update:count="countWifi = $event" />
    <BottomSheetReferrals :hotelRewards="hotelRewards" />
    <BottomSheetReferent :hotelRewards="hotelRewards" />
</template>
<script setup>
import { ref, computed, onMounted, provide } from 'vue';
import RoundedButton from '@/components/Buttons/RoundedButton.vue';
import BottomRules from '@/components/BottomsSheets/BottomSheetRules.vue';
import BottomSheetWifi from '@/components/BottomsSheets/BottomSheetWifi.vue';
import BottomSheetReferrals from '@/Modules/User/Components/Rewards/BottomSheetReferrals.vue';
import BottomSheetReferent from '@/Modules/User/Components/Rewards/BottomSheetReferent.vue';
//
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();

const isOpenRules = ref(false)
const countRules = ref(0)
const isOpenWifi = ref(false)
const countWifi = ref(0)
const hotelRewards = ref([])
const openModalReferrals = ref(false)
const openModalReferent = ref(false)

provide('openModalReferrals',openModalReferrals)
provide('openModalReferent',openModalReferent)

onMounted(async () => {
    const response = await hotelStore.$getRewardsByHotel();
    hotelRewards.value = response.data;
})

const showPhoneButton = computed(() => {
    return Boolean(hotelStore.hotelData?.phone) && Boolean(hotelStore.hotelData?.phone_optional);
})

const numberToCall = computed(() => {
    if (Boolean(hotelStore.hotelData?.phone))return hotelStore.hotelData?.phone;
    return hotelStore.hotelData?.phone_optional;
})

const goCall = () => {
    window.open(`tel:${numberToCall.value}`, '_blank');
}

const openModalRewards = () => {
    if(hotelStore?.hotelData?.show_referrals && !hotelStore?.hotelData?.offer_benefits) {
        openModalReferrals.value = true;
    } else if(hotelStore?.hotelData?.show_referrals && hotelStore?.hotelData?.offer_benefits) {
        openModalReferent.value = true;
    }
};
</script>
