<template>
    <div class="flex gap-4 justify-around">
      <!--  Wifi --> 
      <RoundedButton
        v-if="hotelData.with_wifi"
        iconUrl="/assets/icons/WA.wifi.svg"
        :label="$t('hotel.buttons_home.wifi')"
        :showLabel="true"
        @click="onWifiClick"
      />
  
      <!--  Llamar -->
      <RoundedButton
        v-if="hotelData.phone"
        iconUrl="/assets/icons/WA.llamar.svg"
        :label="$t('hotel.buttons_home.call')"
        :showLabel="true"
        @click="onCallClick"
      />
  
      <!--  Normas -->
      <RoundedButton
        v-if="!hotelData.legal && buttonsHome.show_legal_text"
        iconUrl="/assets/icons/WA.normas.svg"
        :label="$t('hotel.buttons_home.standards')"
        :showLabel="true"
        @click="onLegalClick"
      />
  
      <RoundedButton
        iconUrl="/assets/icons/arrow-up-from-bracket-small.svg"
        :label="$t('hotel.buttons_home.share_stay')"
        :showLabel="true"
        @click="onShareClick"
      />
    </div>
  
    <PrimaryButton
      classes="text-center py-2.5 rounded-[10px] text-sm font-bold leading-[20px] w-full shadow-guest bg-[#333333] text-[#FFF] lato"
      @click="onShareClick"
    >
      {{ $t('hotel.buttons_home.share_stay') }}
    </PrimaryButton>
  </template>
  
<script setup>
import { ref, onMounted } from 'vue';

  import RoundedButton from '@/components/Buttons/RoundedButton.vue';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
  import { defineProps, defineEmits, computed } from 'vue';

  import { useHotelStore } from '@/stores/modules/hotel';
  const hotelStore = useHotelStore();
  import { useStayStore } from '@/stores/modules/stay';
  const stayStore = useStayStore();

  import { useShare } from "@/composables/useShare";
  const { shareContent } = useShare();

  import { useI18n } from 'vue-i18n';
const { t } = useI18n();
  
  const props = defineProps({
    hotelData: {
      type: Object,
      required: true,
    },
    buttonsHome: {
      type: Object,
      required: true,
    },
  });

  const shareUrl = ref(null);

  onMounted(async ()  => {
    shareUrl.value = await hotelStore.$buildUrlWebApp(hotelStore.hotelData?.subdomain,null,`e=${stayStore.stayData?.id}&guestPerStay=true`);
  });
  
  const emit = defineEmits(['wifi-click', 'call-click', 'legal-click', 'share-click']);
  
  const showAll = computed(() => props.buttonsHome?.show_all ?? false);
  
  const onWifiClick = () => emit('wifi-click');
  const onCallClick = () => emit('call-click');
  const onLegalClick = () => emit('legal-click');

  function onShareClick () {
    let data = {
      title: t('stay.share.title', { hotel: hotelStore.hotelData.name }),
      text: t('stay.share.text'),
      url: shareUrl.value,
    }
    shareContent(data);
  }
  </script>
  