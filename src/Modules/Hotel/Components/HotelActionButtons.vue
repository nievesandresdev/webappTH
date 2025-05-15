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
        v-if="hotelData?.policies?.length > 0"
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
        v-show="!showAll"
      />
    </div>
  
    <PrimaryButton
      v-if="showAll"
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

import { useChainStore } from '@/stores/modules/chain'
const chainStore = useChainStore();
  
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
  const logoHotel = ref(null)
  const customData = ref(null)

  onMounted(async ()  => {
    shareUrl.value = await hotelStore.$buildUrlWebApp(hotelStore.hotelData?.subdomain,null,`e=${stayStore.stayData?.id}&guestPerStay=true`);
  });
  
  const emit = defineEmits(['wifi-click', 'call-click', 'legal-click', 'share-click']);
  
  //const showAll = computed(() => props.buttonsHome?.show_all ?? false);
  const showAll = computed(() => {
    return !props.hotelData.phone && !props.hotelData.with_wifi && props.hotelData.policies.length == 0;
  });
  
  const onWifiClick = () => emit('wifi-click');
  const onCallClick = () => emit('call-click');
  const onLegalClick = () => emit('legal-click');

/*   function onShareClick () {
    customData.value = chainStore.customizationData;
   
    logoHotel.value = hotelStore.$loadImage({type : 'gallery', url : customData.value?.logo})

    console.log(logoHotel.value, 'imgData')
    let data = {
      title: t('stay.share.title', { hotel: hotelStore.hotelData.name }),
      text: t('stay.share.text'),
      url: shareUrl.value,
    }
    shareContent(data);
  } */

  function onShareClick () {
  // Obtener los datos personalizados y la URL de la imagen del logo
  customData.value = chainStore.customizationData;
  logoHotel.value = hotelStore.$loadImage({ type: 'gallery', url: customData.value?.logo });

  //console.log(logoHotel.value, 'imgData');  // Verifica que la imagen esté correctamente cargada

  // Preparar los datos de compartir
  const data = {
    title: t('stay.share.title', { hotel: hotelStore.hotelData.name }),  // Título dinámico
    //text: t('stay.share.text'),  // Texto dinámico
    url: shareUrl.value,  // URL que se compartirá
    image: logoHotel.value,  // La imagen que se compartirá
  };

  // Actualizar los metadatos de Open Graph con los datos de la imagen, título, etc.
  updateOpenGraphMeta(data);

  // Llamar a la función que maneja el compartir
  shareContent(data);
}

// Función para actualizar dinámicamente las etiquetas Open Graph
function updateOpenGraphMeta(data) {
  document.querySelector('meta[property="og:title"]').setAttribute('content', data.title);
  document.querySelector('meta[property="og:description"]').setAttribute('content', data.text);
  document.querySelector('meta[property="og:image"]').setAttribute('content', data.image);
  document.querySelector('meta[property="og:url"]').setAttribute('content', data.url);
}
  </script>
  