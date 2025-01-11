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
  // const timeout = 1500; // Tiempo de espera en ms antes de redirigir al enlace web
  // let openWeb = true;

  // // Crea un iframe "invisible" para intentar abrir el esquema en iOS
  // // (En Android normalmente con window.location basta, pero esta técnica es comúnmente utilizada)
  // const iframe = document.createElement('iframe');
  // iframe.style.display = 'none';
  // document.body.appendChild(iframe);

  // const timer = setTimeout(() => {
  //   if (openWeb) {
  //     window.open(webUrl, '_blank');
  //   }
  // }, timeout);

  // // Intenta abrir el deep link
  // // En iOS se suele usar el iframe, en Android puede funcionar con window.location.
  // // Se puede hacer un try con window.location primero:
  // window.location = deepLinkUrl;

  // // Adicionalmente para algunos casos iOS se necesita el iframe:
  // // iframe.src = deepLinkUrl;
  
  // // Si la app se abre, el control se pierde de la web y no se ejecuta el timeout.
  // // Si no se abre, el timeout vence y se abre el enlace web.
  
  // // Opcionalmente, para algunos navegadores, se podrían utilizar eventos de visibilidad para detectar cambios,
  // // pero este método suele ser suficiente para la mayoría de los casos.
  
  
  window.open(webUrl, '_blank');
}

const onInstagramClick = () => {
  const deepLink = "instagram://user?username=tuUsuario";
  const webLink = ensureAbsoluteUrl(hotelData.instagram_url);
  openWithFallback(deepLink, webLink);
}

const onFacebookClick = () => {
  const deepLink = "fb://profile/tuPaginaID";
  const webLink = ensureAbsoluteUrl(hotelData.facebook_url);
  openWithFallback(deepLink, webLink);
}

const onPinterestClick = () => {
  const deepLink = "pinterest://user/tuUsuario";
  const webLink = ensureAbsoluteUrl(hotelData.pinterest_url);
  openWithFallback(deepLink, webLink);
}

const onTwitterClick = () => {
  const deepLink = "twitter://user?screen_name=tuUsuario";
  const webLink = ensureAbsoluteUrl(hotelData.x_url);
  openWithFallback(deepLink, webLink);
}



</script>