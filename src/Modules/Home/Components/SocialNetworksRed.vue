<template>
    <section 
        class="mt-6 px-4"
        v-if="hotelData.instagram_url || hotelData.facebook_url || hotelData.pinterest_url || hotelData.x_url"
    >
        <div class="flex items-center gap-4">
            <h3 class="lato text-base font-bold leading-[20px]">Nuestras redes</h3>
            <div class="flex-grow border-t border-color-secondary"></div>
        </div>
        
        <div class="mt-4 flex justify-around">
            <!-- Instagram -->
            <RoundedButton
                v-if="hotelData.instagram_url"
                iconUrl="/assets/icons/WA.instagram.svg"
                @click="onInstagramClick"
            />
        
            <!-- Facebook -->
            <RoundedButton
                v-if="hotelData.facebook_url"
                iconUrl="/assets/icons/WA.facebook.svg"
                @click="onFacebookClick"
            />
        
            <!-- Pinterest -->
            <RoundedButton
                v-if="hotelData.pinterest_url"
                iconUrl="/assets/icons/WA.pinterest.svg"
                @click="onPinterestClick"
            />
        
            <!-- Twitter -->
            <RoundedButton
                v-if="hotelData.x_url"
                iconUrl="/assets/icons/WA.twitter.svg"
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