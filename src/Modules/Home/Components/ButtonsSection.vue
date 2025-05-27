<template>
    <div class="px-3 sp:px-4 mt-3 sp:mt-6" v-if="hotelStore.hotelData?.buttons_home">
        <ButtonsSectionCarousel
            v-if="activeButtonsCount > 4"
            @goCall="goCall"
            @isOpenWifi="isOpenWifi = true"
            @isOpenRules="isOpenRules = true"
            @openModalRewards="openModalRewards"
        />
        <div 
            v-else
            class="px-2 sp:px-6 flex items-start"
            :class="{'justify-between': activeButtonsCount > 2, 'justify-around': activeButtonsCount == 2, 'justify-center': activeButtonsCount == 1}"
        >
            <!-- button checkin -->
            <router-link v-if="showCheckinButton" :to="{name: 'Guests'}" class="block max-w-[76px]">
                <RoundedButton
                    classContainer="mx-auto"
                    id="checkin-button"
                    iconUrl="/assets/icons/WA.checkin.user.svg"
                    sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                />
                <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t('home.buttons.checkin') }}</span>
            </router-link>
            <!-- button call -->
            <div v-if="showPhoneButton" class="block max-w-[76px]">
                <RoundedButton
                    classContainer="mx-auto"
                    id="call-button"
                    iconUrl="/assets/icons/WA.llamar.svg"
                    sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                    @click="goCall"
                />
                <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t('home.buttons.call') }}</span>
            </div>
            <!-- button wifi -->
            <div v-if="showWifiButton" class="block max-w-[76px]">
                <RoundedButton
                    classContainer="mx-auto"
                    id="wifi-button"
                    iconUrl="/assets/icons/WA.wifi.svg"
                    sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                    @click="isOpenWifi = true"
                />
                <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t('home.buttons.wifi') }}</span>
            </div>
            <!-- button rules --> 
            <div v-if="showRulesButton" class="block max-w-[76px]">
                <RoundedButton
                    classContainer="mx-auto"
                    id="rules-button"
                    iconUrl="/assets/icons/WA.normas.svg"
                    sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                    @click="isOpenRules = true"
                />
                <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t('home.buttons.rules') }}</span>
            </div>
            <!-- button refered -->
            <div v-if="showReferedButton" class="block max-w-[76px]">
                <RoundedButton
                    classContainer="mx-auto"
                    id="refered-button"
                    iconUrl="/assets/icons/WA.referido.svg"
                    sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                    @click="openModalRewards"
                />
                <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t('home.buttons.refered') }}</span>
            </div>
            <!-- button refered -->
            <div v-if="showReferedButton2" class="block max-w-[76px]">
                <RoundedButton
                    classContainer="mx-auto"
                    id="refered-button"
                    iconUrl="/assets/icons/WA.referente.svg"
                    sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                    @click="openModalRewards"
                />
                <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t('home.buttons.refered') }}</span>
            </div>

            <router-link v-if="showReserveButton" :to="{name: 'ReservationStay'}" class="block max-w-[76px]">
                <RoundedButton
                    classContainer="mx-auto"
                    id="reserve-button"
                    iconUrl="/assets/icons/WA.bookyournextstay.svg"
                    sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                />
                <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t('home.buttons.reserve') }}</span>
            </router-link>
        </div>
    </div>
    <BottomRules :isOpen="isOpenRules" :scrollContentOnly="true" @update:isOpen="isOpenRules = $event" @update:count="countRules = $event" />
    <BottomSheetWifi :isOpen="isOpenWifi" :scrollContentOnly="true" @update:isOpen="isOpenWifi = $event" @update:count="countWifi = $event" />
    <BottomSheetReferrals :hotelRewards="hotelRewards" />
    <BottomSheetReferent :hotelRewards="hotelRewards" />
</template>
<script setup>
import { ref, computed, onMounted, provide, watch } from 'vue';
import RoundedButton from '@/components/Buttons/RoundedButton.vue';
import BottomRules from '@/components/BottomsSheets/BottomSheetRules.vue';
import BottomSheetWifi from '@/components/BottomsSheets/BottomSheetWifi.vue';
import BottomSheetReferrals from '@/Modules/User/Components/Rewards/BottomSheetReferrals.vue';
import BottomSheetReferent from '@/Modules/User/Components/Rewards/BottomSheetReferent.vue';
import ButtonsSectionCarousel from '@/Modules/Home/Components/ButtonsSectionCarousel.vue';
import { $currentPeriod } from '@/utils/helpers.js'
//
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
//
const isOpenRules = ref(false)
const countRules = ref(0)
const isOpenWifi = ref(false)
const countWifi = ref(0)
const hotelRewards = ref([])
const openModalReferrals = ref(false)
const openModalReferent = ref(false)
const responseButtons = ref([])

provide('openModalReferrals',openModalReferrals)
provide('openModalReferent',openModalReferent)

onMounted(() => {
    if(hotelStore.hotelData?.buttons_home && guestStore.guestData) {
        initData();
    }
})

const initData = async () => {
    const response = await hotelStore.$getRewardsByHotel();
    hotelRewards.value = response.data;
    responseButtons.value = await hotelStore.$getActiveHotelButtons();
}

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

const guestData = computed(() => guestStore.guestData)
watch(guestData, () => {
    initData();
}, { deep: true })

const showCheckinButton = computed(() => {
    return hotelStore.hotelData?.show_checkin_stay && $currentPeriod() == 'pre-stay' && 
    hotelStore.hotelData?.checkin_service_enabled && responseButtons.value?.find(button => button.name == "Check-In")
})

const showWifiButton = computed(() => {
    return responseButtons.value?.find(button => button.name == "Redes WiFi")  && countWifi.value > 0
})

const showRulesButton = computed(() => {
    return responseButtons.value?.find(button => button.name == "Normas del alojamiento") && countRules.value > 0
})

const showReferedButton = computed(() => {
    return responseButtons.value?.find(button => button.name == "Programa de referidos") &&
    hotelStore.hotelData?.show_referrals && !hotelStore.hotelData?.offer_benefits;
})

const showReferedButton2 = computed(() => {
    return responseButtons.value?.find(button => button.name == "Programa de referidos") &&
    hotelStore.hotelData?.show_referrals && hotelStore.hotelData?.offer_benefits;
})

const showReserveButton = computed(() => {
    return responseButtons.value?.find(button => button.name == "Reserva tu estancia")
})

const showPhoneButton = computed(() => {
    return responseButtons.value?.find(button => button.name == "Llamar") && (Boolean(hotelStore.hotelData?.phone) || Boolean(hotelStore.hotelData?.phone_optional));
})

const activeButtonsCount = computed(() => {
  const flags = [
    showCheckinButton.value,
    showPhoneButton.value,
    showRulesButton.value,
    showWifiButton.value,
    showReserveButton.value,
    // unifica ambos referidos en uno solo
    showReferedButton.value || showReferedButton2.value
  ]
  return flags.filter(Boolean).length
})

provide('showCheckinButton',showCheckinButton)
provide('showRulesButton',showRulesButton)
provide('showWifiButton',showWifiButton)
provide('showPhoneButton',showPhoneButton)
provide('showReserveButton',showReserveButton)
provide('showReferedButton',showReferedButton)
provide('showReferedButton2',showReferedButton2)
provide('activeButtonsCount',activeButtonsCount)
</script>
