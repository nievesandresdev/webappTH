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

const onInstagramClick = () => window.location.assign(ensureAbsoluteUrl(hotelData.instagram_url));
const onFacebookClick = () => window.location.assign(ensureAbsoluteUrl(hotelData.facebook_url));
const onPinterestClick = () => window.location.assign(ensureAbsoluteUrl(hotelData.pinterest_url));
const onTwitterClick = () => window.location.assign(ensureAbsoluteUrl(hotelData.x_url));


</script>