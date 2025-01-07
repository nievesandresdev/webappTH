<template>
    <!-- resources/js/Components/Favicon.vue -->
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useHotelStore } from '@/stores/modules/hotel';

const hotelStore = useHotelStore()
const { hotelData } = hotelStore;

const urlStorage = process.env.VUE_APP_STORAGE_URL;
const defaultFavicon = "/assets/faviconwFILL.svg";
const Favicon = ref(hotelData?.favicon ? urlStorage+hotelData.favicon : defaultFavicon);


onMounted(()=>{
    const faviconLink = document.querySelector("#appFavicon");
    faviconLink.href = Favicon.value;
})




</script>
