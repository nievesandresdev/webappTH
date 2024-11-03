<template>
    <div class="flex gap-4 justify-around">
      <!-- Wifi -->
      <RoundedButton
        v-if="showAll || buttonsHome.show_wifi"
        iconUrl="/assets/icons/WA.wifi.svg"
        label="Wifi"
        :showLabel="true"
        @click="onWifiClick"
      />
  
      <!-- Llamar -->
      <RoundedButton
        v-if="showAll || buttonsHome.show_call"
        iconUrl="/assets/icons/WA.llamar.svg"
        label="Llamar"
        :showLabel="true"
        @click="onCallClick"
      />
  
      <!-- Normas -->
      <RoundedButton
        v-if="!hotelData.legal && (showAll || buttonsHome.show_legal_text)"
        iconUrl="/assets/icons/WA.normas.svg"
        label="Normas"
        :showLabel="true"
        @click="onLegalClick"
      />
  
      <!-- Compartir Estancia -->
      <RoundedButton
        v-if="showAll"
        iconUrl="/assets/icons/arrow-up-from-bracket-small.svg"
        label="Compartir Estancia"
        :showLabel="true"
        @click="onShareClick"
      />
    </div>
  </template>
  
  <script setup>
  import RoundedButton from '@/components/Buttons/RoundedButton.vue';
  import { defineProps, defineEmits, computed } from 'vue';
  
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
  
  const emit = defineEmits(['wifi-click', 'call-click', 'legal-click', 'share-click']);
  
  const showAll = computed(() => props.buttonsHome?.show_all);
  const onWifiClick = () => emit('wifi-click');
  const onCallClick = () => emit('call-click');
  const onLegalClick = () => emit('legal-click');
  const onShareClick = () => emit('share-click');
  </script>
  