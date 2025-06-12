<template>
    <SectionBar :title="$t('profile.account')" />
    <div class="px-2 sp:px-4 sp:my-[100px] my-[50px]">
        <div class="flex flex-col items-center mt-6">
            <!-- <div class="flex justify-center items-center border border-black rounded-full overflow-hidden"
            :style="{ backgroundImage: `url(${profileImageUrl})` }"> 
            </div> -->
            <div v-if="!$utils.isMockup()" class="flex justify-center items-center border border-black rounded-full overflow-hidden"
                 style="width: 40px; height: 40px;">
                <img :src="$formatImage({url: guestData.avatar, type: guestData.avatar_type})" class="object-cover" :class="{'w-6 h-6' : !guestData.avatar}" alt="User Avatar">
            </div>

            <div v-if="$utils.isMockup()" class="flex justify-center items-center border border-black rounded-full overflow-hidden"
                 style="width: 40px; height: 40px;">
                <img :src="$formatImage({url: '', type: ''})" class="object-cover" :class="{'w-6 h-6' : false}" alt="User Avatar">
            </div>
            <p  v-if="!$utils.isMockup()" class="text-[#333333] text-[15px] sp:text-[20px] font-bold lato sp:mt-2 mt-1">
                {{ $t('profile.greeting', { name: guestData.name }) }}
            </p>
            <p  v-if="$utils.isMockup()" class="text-[#333333] text-[15px] sp:text-[20px] font-bold lato sp:mt-2 mt-1">
                {{ $t('profile.greeting', { name: 'Huesped' }) }}
            </p>
        </div>


        <!-- Contenedor de hotel y estancia boton compartir -->
        <div class="sp:mt-6 mt-2">
            <StayCard 
                :hotel="hotelStore.hotelData" 
                :stay="stayStore.stayData" 
                @sharedStay="isModalOpen = true"
                :isLoading="false"
                showQueryButton
                showButtonShared
                @stayClick="goMyStay"
                v-if="!$utils.isMockup()"
            />
            <FakeStayCard v-if="$utils.isMockup()"/>
        </div>
        <!-- Sección "Mis estancias" -->
        <div class="mt-4">
            <WACardBanner 
                @click="handleMyStays"
                :title="$t('profile.my_stays.title')"
                :subtitle="isCheckoutPast ?  $t('profile.my_stays.subtitle_inactive') : $t('profile.my_stays.subtitle_active')"
                :active-custom="isCheckoutPast"
            />
        </div>

        <div class="w-full h-[1px] bg-[#E9E9E9] mt-4"></div>
        <!-- seccion buzon-->
        <div class="flex items-center mt-4 sp:gap-2 gap-1" @click="handleInbox">
            <img src="/assets/icons/WA.inbox.svg" class="sp:w-6 sp:h-6 w-4 h-4" />
            <span class="sp:text-[16px] text-[12px] font-medium lato leading-[20px] mr-auto">{{ $t('profile.inbox.title') }}</span>
            <BaseBadge
                size="medium"
                :showBadge="queryStore.hasPendingQuery"
                classes="border-[1.2px] rounded-full"
            />
            <img src="/assets/icons/WA.chevron.svg" class="w-6 h-6 transform rotate-180 self-center" alt="Chevron Icon" />
        </div>

        <!-- Sección "Información personal" -->
        <div class="flex items-center mt-6 sp:gap-2 gap-1" @click="handlePersonalInfo">
            <img src="/assets/icons/WA.id.svg" class="sp:w-6 sp:h-6 w-4 h-4" alt="ID Icon" />
            <span class="sp:text-[16px] text-[12px] font-medium lato leading-[20px] mr-auto">{{ $t('profile.personal_info.title') }}</span>
            <img src="/assets/icons/WA.chevron.svg" class="w-6 h-6 transform rotate-180 self-center" alt="Chevron Icon" />
        </div>

        <!-- Sección "Idioma" -->
        <div class="flex items-center mt-6 sp:gap-2 gap-1" @click="selectLanguage">
            <img :src="`/assets/icons/languages/${localeStore.localeCurrent}.svg`" class="sp:w-6 sp:h-6 w-4 h-4" />
            <span class="sp:text-[16px] text-[12px] font-medium lato leading-[20px] mr-auto">{{ $t('profile.language.title') }}</span>
            <span class="sp:text-[14px] text-[10px] font-medium lato leading-[16px] text-[#777]">{{ $utils.capitalize($t('language.'+localeStore.localeCurrent)) }}</span>
            <img src="/assets/icons/WA.chevron.svg" class="w-6 h-6 transform rotate-180 self-center" alt="Chevron Icon" />
        </div>

        <!-- Sección "REservacion" -->
        <div class="flex items-center mt-6 sp:gap-2 gap-1" @click="handleReservationStay">
            <img src="/assets/icons/Wa.reserva.svg" class="sp:w-6 sp:h-6 w-4 h-4" alt="ID Icon" />
            <span class="sp:text-[16px] text-[12px] font-medium lato leading-[20px] mr-auto">{{ $t('profile.book_next_stay.title') }}</span>
            <img src="/assets/icons/WA.chevron.svg" class="w-6 h-6 transform rotate-180 self-center" alt="Chevron Icon" />
        </div>

        <!-- Sección "referido" -->
        <div class="flex items-center mt-6 sp:gap-2 gap-1" @click="openModalRewards" v-show="hotelStore.hotelData?.show_referrals && !hotelStore.hotelData?.offer_benefits">
            <img src="/assets/icons/WA.referido.svg" class="sp:w-6 sp:h-6 w-4 h-4" alt="ID Icon" />
            <span class="sp:text-[16px] text-[12px] font-medium lato leading-[20px] mr-auto">{{ $t('profile.rewards.title') }}</span>
            <img src="/assets/icons/WA.chevron.svg" class="w-6 h-6 transform rotate-180 self-center" alt="Chevron Icon" />
        </div>
         <!-- Sección "referente y referido" -->
         <div class="flex items-center mt-6 sp:gap-2 gap-1" @click="openModalRewards" v-show="hotelStore.hotelData?.show_referrals && hotelStore.hotelData?.offer_benefits">
            <img src="/assets/icons/WA.referente.svg" class="sp:w-6 sp:h-6 w-4 h-4" alt="ID Icon" />
            <span class="sp:text-[16px] text-[12px] font-medium lato leading-[20px] mr-auto">{{ $t('profile.rewards.titleReferentProfile') }}</span>
            <img src="/assets/icons/WA.chevron.svg" class="w-6 h-6 transform rotate-180 self-center" alt="Chevron Icon" />
        </div>
    
        <!-- Cerrar sesión -->
        <div class="flex items-center justify-center sp:mt-[40px] mt-[30px] gap-2 cursor-pointer mb-10">
            <span class="sp:text-[14px] text-[11px] font-bold lato text-[#333333] underline cursor-pointer" @click="handleLogoutGuest">{{ $t('profile.logout') }}</span>
        </div>

        <ShareStayModal />
        <BottomSheetReferrals :hotelRewards="hotelRewards" />
        <BottomSheetReferent :hotelRewards="hotelRewards" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed, provide } from 'vue';
import SectionBar from '@/components/SectionBar.vue';
import WACardBanner from '@/components/WACardBanner.vue';
import ShareStayModal from './Components/ShareStayModal.vue'
import StayCard from './Components/StayCard.vue';
import BottomSheetReferrals from './Components/Rewards/BottomSheetReferrals.vue';
import BottomSheetReferent from './Components/Rewards/BottomSheetReferent.vue';
import BaseBadge from '@/components/BaseBadge.vue';
import { navigateTo } from '@/utils/navigation'
import router from '@/router';
import FakeStayCard from '@/Modules/Home/Components/FakeStayCard.vue'
import { DateTime } from 'luxon';

import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { useAuthStore } from '@/stores/modules/auth';
const authStore = useAuthStore();
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useQueryStore } from '@/stores/modules/query';
const queryStore = useQueryStore();
import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();
import { useLocaleStore } from '@/stores/modules/locale'
const localeStore = useLocaleStore()

const urlParams = new URLSearchParams(window.location.search);
const referentUrl = urlParams.get('referent');
const referralsUrl = urlParams.get('referrals');

const openModalReferrals = ref(false);
const openModalReferent = ref(false);




//provides
provide('openModalReferrals',openModalReferrals)
provide('openModalReferent',openModalReferent)


const isModalOpen = ref(false);


const guestData = ref({});
const hotelData = ref({});
const stayData = ref({});
const loading = ref(true);
const hotelRewards = ref({});



const openModalRewards = () => {
    if(hotelStore?.hotelData?.show_referrals && !hotelStore?.hotelData?.offer_benefits) {
        openModalReferrals.value = true;
    } else if(hotelStore?.hotelData?.show_referrals && hotelStore?.hotelData?.offer_benefits) {
        openModalReferent.value = true;
    }
};


function goMyStay(){
    router.push({ name: 'MyStay', params: { stayId:stayStore.stayData.id } });
}

const handleMyStays = () => {
    router.push({ name: 'MyStays' });
};

const handlePersonalInfo = () => {
    navigateTo('PersonalInfo')
};

const selectLanguage = () => {
    navigateTo('SelectLanguage')
};

const handleReservationStay = () => {
    navigateTo('ReservationStay')
};

const handleInbox = () => {
    navigateTo('Inbox')
};

onMounted(async() => {
    guestData.value = guestStore.getLocalGuest();
    // stayStore.reloadLocalStay();
    stayData.value = stayStore.stayData;
    hotelData.value = hotelStore.hotelData;
    loading.value = false;
    const response = await hotelStore.$getRewardsByHotel();
    hotelRewards.value = response.data;

    if(referentUrl) {
        openModalReferent.value = true;
        openModalReferrals.value = false;
        
    }else if(referralsUrl) {
        openModalReferrals.value = true;
        openModalReferent.value = false;
    }


    // await getHotelbyId(stayData.value.hotel_id);
});



const isCheckoutPast = computed(() => {
if(!stayStore.stayData?.check_out) return
  const inputDate = DateTime.fromFormat(stayStore.stayData?.check_out, 'yyyy-MM-dd');
  const now = DateTime.now();
  return inputDate < now; // Retorna true si la fecha ya pasó
});


const handleLogoutGuest = () => {
    authStore.$logout();
};

const $formatImage = (payload) => {
    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;
    let { url, type, urlDefault } = payload;

    // Verifica si la URL es de tipo `blob:` (preview imagen)
    if (url && url.startsWith("blob:")) return url;

    if (!url || !URL_STORAGE) return '/assets/icons/WA.user.svg'; 

    if (urlDefault) return url;

    let type_d = url.includes('https://') ? 'CDN' : 'STORAGE';
    type = type ?? type_d;

    if(type == 'GOOGLE') {
        return url;
    }

    return type === 'CDN' || type === 'image-hotel-scraper' ? url : URL_STORAGE + url;
};


provide('isModalOpen',isModalOpen)
</script>

<style scoped>
.bg-lightgray {
    background-color: lightgray;
}

.shadow-profile {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
}

.rotate-90 {
    transform: rotate(90deg);
}
</style>
