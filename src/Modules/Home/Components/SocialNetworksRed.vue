<template>
    <section 
        class="px-3 sp:px-4 mt-4 sp:mt-6"
        v-if="hotelData.instagram_url || hotelData.facebook_url || hotelData.pinterest_url || hotelData.x_url"
    >
        <div class="flex items-center gap-3 sp:gap-4">
            <h3 class="lato tex-xs sp:text-base font-bold leading-[16px] sp:leading-[20px]">Nuestras redes</h3>
            <div class="flex-grow border-t border-color-secondary"></div>
        </div>
        
        <div class="mt-3 sp:mt-4 flex justify-around">
            <!-- Instagram -->
            <RoundedButton
                v-if="hotelData.instagram_url"
                iconUrl="/assets/icons/WA.instagram.svg"
                sizeIcons="w-[22px] sp:w-[32px] h-[22px] sp:h-[32px]"
                @click="onInstagramClick"
            />
        
            <!-- Facebook -->
            <RoundedButton
                v-if="hotelData.facebook_url"
                iconUrl="/assets/icons/WA.facebook.svg"
                sizeIcons="w-[22px] sp:w-[32px] h-[22px] sp:h-[32px]"
                @click="onFacebookClick"
            />
        
            <!-- Pinterest -->
            <RoundedButton
                v-if="hotelData.pinterest_url"
                iconUrl="/assets/icons/WA.pinterest.svg"
                sizeIcons="w-[22px] sp:w-[32px] h-[22px] sp:h-[32px]"
                @click="onPinterestClick"
            />
        
            <!-- Twitter -->
            <RoundedButton
                v-if="hotelData.x_url"
                iconUrl="/assets/icons/WA.twitter.svg"
                sizeIcons="w-[22px] sp:w-[32px] h-[22px] sp:h-[32px]"
                @click="onTwitterClick"
            />
        </div>
    </section>
</template>
<script setup>
import RoundedButton from '@/components/Buttons/RoundedButton.vue';
//
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore();
const { hotelData } = hotelStore

// Función para asegurar que la URL tenga prefijo absoluto
const ensureAbsoluteUrl = (url) => {
    return url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
};

function openWithFallback(deepLinkUrl, webUrl) {
  window.open(webUrl, '_blank');
}

function openWithFallbackNew(deepLinkUrl, webUrl, fallbackTimeout = 1500) {
  // Creamos un iframe invisible
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  // Guardamos la hora de inicio
  const startTime = Date.now();

  // Al cabo de cierto tiempo (fallbackTimeout), verificamos
  setTimeout(() => {
    const endTime = Date.now();
    // Si el tiempo transcurrido es menor o igual al fallbackTimeout,
    // asumimos que no se abrió la app y hacemos el fallback al enlace web
    if (endTime - startTime < fallbackTimeout + 200) {
      window.open(webUrl, '_blank');
    }
    // Limpieza: remover el iframe
    document.body.removeChild(iframe);
  }, fallbackTimeout);

  // Intentamos abrir el deep link:
  iframe.src = deepLinkUrl;
}


const onInstagramClick = () => {
  const deepLink = ensureAbsoluteUrl(hotelData.instagram_url);
  const webLink = ensureAbsoluteUrl(hotelData.instagram_url);
  openWithFallbackNew(deepLink, webLink);
}

const onFacebookClick = () => {
  const deepLink = "fb://profile/taykohotels";
  const webLink = ensureAbsoluteUrl(hotelData.facebook_url);
  window.open(webLink, '_blank');}

const onPinterestClick = () => {
  const deepLink = ensureAbsoluteUrl(hotelData.pinterest_url);
  const webLink = ensureAbsoluteUrl(hotelData.pinterest_url);
  openWithFallbackNew(deepLink, webLink);
}

const onTwitterClick = () => {
  const deepLink = ensureAbsoluteUrl(hotelData.x_url);
  const webLink = ensureAbsoluteUrl(hotelData.x_url);
  openWithFallbackNew(deepLink, webLink);
}



</script>