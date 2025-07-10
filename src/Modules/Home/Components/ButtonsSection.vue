<template>
    <div class="px-3 sp:px-4 mt-3 sp:mt-6">
        <ButtonsSectionCarousel
            v-if="activeButtonsCount > 4 && buttonsMap.length > 0"
            @goCall="goCall"
            @isOpenWifi="openModalWifi"
            @openModalRules="openModalRules"
            @openModalRewards="openModalRewards"
            @goReserve="goReserve"
            @goCheckin="goCheckin"
        />
        <div 
            v-else
            class="px-2 sp:px-6 flex items-start"
            :class="{'justify-between': activeButtonsCount > 2, 'justify-around': activeButtonsCount == 2, 'justify-center': activeButtonsCount == 1}"
        >
            <template v-for="button in buttonsMap" :key="button.name">
                <div v-if="button.show" class="block max-w-[76px]">
                    <RoundedButton
                        classContainer="mx-auto"
                        :id="`call-button-${button.name}`"
                        :iconUrl="button.iconUrl"
                        sizeIcons="w-5 sp:w-8 h-5 sp:h-8"
                        @click="button.action"
                    />
                    <span class="text-center lato text-[9px] sp:text-xs font-bold leading-[16px] block mt-1 sp:mt-2">{{ $t(button.translate) }}</span>
                </div>
            </template>
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
import { useRouter } from 'vue-router';
const router = useRouter();
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useGuestStore } from '@/stores/modules/guest';
import { isMockup } from '@/utils/utils';
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
    if(hotelStore.hotelData?.buttons_home && guestStore.guestData || hotelStore.hotelData?.buttons_home && isMockup()) {
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

const goCheckin = () => {
    router.push({name: 'Guests'})
}

const goReserve = () => {
    router.push({name: 'ReservationStay'})
}

const openModalRewards = () => {
    if(hotelStore?.hotelData?.show_referrals && !hotelStore?.hotelData?.offer_benefits) {
        openModalReferrals.value = true;
    } else if(hotelStore?.hotelData?.show_referrals && hotelStore?.hotelData?.offer_benefits) {
        openModalReferent.value = true;
    }
};

const openModalRules = () => {
    isOpenRules.value = true;
}

const openModalWifi = () => {
    isOpenWifi.value = true;
}

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
    return Boolean(responseButtons.value?.find(button => button.name == "Reserva tu estancia"))
})

const showPhoneButton = computed(() => {
    /* return responseButtons.value?.find(button => button.name == "Llamar") && (Boolean(hotelStore.hotelData?.phone) || Boolean(hotelStore.hotelData?.phone_optional)); */
    return responseButtons.value?.find(button => button.name == "Llamar")
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

const buttonsData = computed(() => {
    return {
        'Check-In' : {
            iconUrl:'/assets/icons/WA.checkin.user.svg',
            show:showCheckinButton.value,
            act:goCheckin,
            translate: 'home.buttons.checkin'
        },
        'Llamar' : {
            iconUrl:'/assets/icons/WA.llamar.svg',
            show:showPhoneButton.value,
            act:goCall,
            translate: 'home.buttons.call'
        },
        'Redes WiFi' : {
            iconUrl:'/assets/icons/WA.wifi.svg',
            show:showWifiButton.value,
            act:openModalWifi,
            translate: 'home.buttons.wifi'
        },
        'Normas del alojamiento' : {
            iconUrl:'/assets/icons/WA.normas.svg',
            show:showRulesButton.value,
            act:openModalRules,
            translate: 'home.buttons.rules'
        },
        'Programa de referidos' : {
            iconUrl:'/assets/icons/WA.referido.svg',
            show: Boolean(showReferedButton.value || showReferedButton2.value),
            act:openModalRewards,
            translate: 'home.buttons.refered'
        },
        'Reserva tu estancia' : {
            iconUrl:'/assets/icons/WA.bookyournextstay.svg',
            show:showReserveButton.value,
            act:goReserve,
            translate: 'home.buttons.reserve'
        },
    }
})

const buttonsMap = computed(() => {
    let buttons = responseButtons.value.map(button => {
        return {
            name: button.name,
            iconUrl: buttonsData.value[button.name].iconUrl,
            show: buttonsData.value[button.name].show,
            translate: buttonsData.value[button.name].translate,
            action: buttonsData.value[button.name].act,
        }
    })
    console.log('test buttonsMap', buttons)
    return buttons.filter(button => button.show) ?? [];
})


provide('buttonsMap',buttonsMap)
provide('activeButtonsCount',activeButtonsCount)
</script>
