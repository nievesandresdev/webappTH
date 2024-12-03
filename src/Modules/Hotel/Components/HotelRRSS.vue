<template>
    <div v-if="showAll" class="flex gap-4 justify-around mb-[105px]">
      <!-- Instagram -->
      <RoundedButton
        v-if="hotelData.instagram_url"
        iconUrl="/assets/icons/WA.instagram.svg"
        label="Instagram"
        :showLabel="true"
        @click="onInstagramClick"
      />
  
      <!-- Facebook -->
      <RoundedButton
        v-if="hotelData.facebook_url"
        iconUrl="/assets/icons/WA.facebook.svg"
        label="Facebook"
        :showLabel="true"
        @click="onFacebookClick"
      />
  
      <!-- Pinterest -->
      <RoundedButton
        v-if="hotelData.pinterest_url"
        iconUrl="/assets/icons/WA.pinterest.svg"
        label="Pinterest"
        :showLabel="true"
        @click="onPinterestClick"
      />
  
      <!-- Twitter -->
      <RoundedButton
        v-if="hotelData.x_url"
        iconUrl="/assets/icons/WA.twitter.svg"
        label="Twitter"
        :showLabel="true"
        @click="onTwitterClick"
      />
    </div>
  </template>
  
  <script setup>
  import RoundedButton from '@/components/Buttons/RoundedButton.vue';
  import { defineProps, computed } from 'vue';
  
  const props = defineProps({
    hotelData: {
      type: Object,
      required: true,
    }
  });
  
  const showAll = computed(() => {
    // Mostrar el componente solo si al menos una URL de redes sociales está presente
    return (
      props.hotelData.instagram_url ||
      props.hotelData.facebook_url ||
      props.hotelData.pinterest_url ||
      props.hotelData.x_url // Twitter URL
    );
  });
  
  // Función para asegurar que la URL tenga prefijo absoluto
  const ensureAbsoluteUrl = (url) => {
    return url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
  };
  
  // Emitir eventos para cada botón con URLs absolutas
  const onInstagramClick = () => window.location.assign(ensureAbsoluteUrl(props.hotelData.instagram_url));
  const onFacebookClick = () => window.location.assign(ensureAbsoluteUrl(props.hotelData.facebook_url));
  const onPinterestClick = () => window.location.assign(ensureAbsoluteUrl(props.hotelData.pinterest_url));
  const onTwitterClick = () => window.location.assign(ensureAbsoluteUrl(props.hotelData.x_url));
  </script>
  