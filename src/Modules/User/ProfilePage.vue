<template>
    <SectionBar :title="$t('profile.account')" />
  
    <div class="px-3" ref="pageContainer">
      <div class="flex flex-col items-center mt-6">
        <div
          class="flex justify-center items-center border border-black rounded-full overflow-hidden"
          style="width: 40px; height: 40px;"
        >
          <img
            :src="$formatImage({ url: guestData.avatar, type: 'STORAGE' })"
            class="object-cover"
            :class="{ 'w-6 h-6': !guestData.avatar }"
            alt="User Avatar"
          />
        </div>
        <p class="text-[#333333] text-[20px] font-bold lato mt-2">
          {{ $t('profile.greeting', { name: guestData.name }) }}
        </p>
      </div>
  
      <!-- Contenedor de hotel y estancia boton compartir -->
      <div class="mt-6">
        <StayCard
          :hotel="hotelData"
          :stay="stayStore.stayData"
          :showButtonShared="true"
          @sharedStay="isModalOpen = true"
          :isLoading="loading"
        />
      </div>
  
      <!-- Sección "Mis estancias" -->
      <div class="mt-4">
        <WACardBanner
          @click="handleMyStays"
          :title="$t('profile.my_stays.title')"
          :subtitle="
            isCheckoutPast
              ? $t('profile.my_stays.subtitle_active')
              : $t('profile.my_stays.subtitle_inactive')
          "
          :active-custom="isCheckoutPast"
        />
      </div>
  
      <div class="w-full h-[1px] bg-[#E9E9E9] mt-4"></div>
  
      <!-- Sección "Información personal" -->
      <div
        class="flex items-center justify-between mt-4 gap-2"
        @click="handlePersonalInfo"
      >
        <div class="flex items-center gap-2">
          <img src="/assets/icons/WA.id.svg" class="w-8 h-8" alt="ID Icon" />
          <div class="flex flex-col">
            <span class="text-[16px] font-medium lato text-[#333333]">{{
              $t('profile.personal_info.title')
            }}</span>
            <span class="text-[14px] font-normal lato text-[#333333]">{{
              $t('profile.personal_info.description')
            }}</span>
          </div>
        </div>
        <img
          src="/assets/icons/WA.chevron.svg"
          class="w-6 h-6 cursor-pointer transform rotate-180 self-center"
          alt="Chevron Icon"
        />
      </div>
  
      <!-- Cerrar sesión -->
      <div
        class="flex items-center justify-center mt-6 gap-2 cursor-pointer"
        @click="handleLogoutGuest"
      >
        <img src="/assets/icons/WA.logout.svg" class="w-4 h-4" alt="Logout Icon" />
        <span class="text-[14px] font-bold lato text-[#333333] underline cursor-pointer">
          {{ $t('profile.logout') }}
        </span>
      </div>
  
      <ShareStayModal />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, computed, provide } from 'vue';
  import SectionBar from '@/components/SectionBar.vue';
  import WACardBanner from '@/components/WACardBanner.vue';
  import ShareStayModal from './Components/ShareStayModal.vue';
  import StayCard from './Components/StayCard.vue';
  import { navigateTo } from '@/utils/navigation';
  import router from '@/router';
  import { DateTime } from 'luxon';
  
  import { useGuestStore } from '@/stores/modules/guest';
  const guestStore = useGuestStore();
  import { useAuthStore } from '@/stores/modules/auth';
  const authStore = useAuthStore();
  import { useHotelStore } from '@/stores/modules/hotel';
  const hotelStore = useHotelStore();
  import { useStayStore } from '@/stores/modules/stay';
  const stayStore = useStayStore();
  
  const isModalOpen = ref(false);
  
  const guestData = ref({});
  const hotelData = ref({});
  const stayData = ref({});
  const loading = ref(true);
  
  // Evitar desplazamiento cuando se abre el teclado
  const pageContainer = ref(null);
  
  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };
  
  const enableScroll = () => {
    document.body.style.overflow = '';
  };
  
  const handleKeyboardVisibility = () => {
    window.addEventListener('focusin', disableScroll); // Cuando un input recibe foco
    window.addEventListener('focusout', enableScroll); // Cuando el input pierde foco
  };
  
  onMounted(() => {
    guestData.value = guestStore.getLocalGuest();
    stayData.value = stayStore.stayData;
  
    getHotelbyId(stayData.value.hotel_id);
    handleKeyboardVisibility();
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('focusin', disableScroll);
    window.removeEventListener('focusout', enableScroll);
  });
  
  const getHotelbyId = async (id) => {
    hotelData.value = hotelStore.hotelData;
    loading.value = false;
  };
  
  const handleMyStays = () => {
    if (isCheckoutPast.value) {
      authStore.$logoutAndCreateStay();
    } else {
      router.push({ name: 'MyStays' });
    }
  };
  
  const handlePersonalInfo = () => {
    navigateTo('PersonalInfo');
  };
  
  const isCheckoutPast = computed(() => {
    if (!stayStore.stayData?.check_out) return false;
    const inputDate = DateTime.fromFormat(
      stayStore.stayData?.check_out,
      'yyyy-MM-dd'
    );
    const now = DateTime.now();
    return inputDate < now;
  });
  
  const handleLogoutGuest = () => {
    authStore.$logout();
  };
  
  const $formatImage = (payload) => {
    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;
    let { url, type, urlDefault } = payload;
  
    if (url && url.startsWith('blob:')) return url;
  
    if (!url || !URL_STORAGE) return '/assets/icons/WA.user.svg';
  
    if (urlDefault) return url;
  
    let type_d = url.includes('https://') ? 'CDN' : 'STORAGE';
    type = type ?? type_d;
  
    return type === 'CDN' || type === 'image-hotel-scraper'
      ? url
      : URL_STORAGE + url;
  };
  
  const profileImageUrl = computed(() =>
    $formatImage({ url: guestData.value.avatar, type: 'STORAGE' })
  );
  
  provide('isModalOpen', isModalOpen);
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
  