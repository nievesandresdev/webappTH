<template>
    <div v-if="showAll" class="flex gap-4 justify-around">
      <!-- Botón de Wifi -->
      <RoundedButton
        v-if="buttonsHome.show_wifi"
        iconUrl="/assets/icons/WA.wifi.svg"
        label="Wifi"
        :showLabel="true"
        @click="onWifiClick"
      />

  
      <!-- Botón de Llamar -->
      <RoundedButton
        v-if="buttonsHome.show_call && props.hotelData.phone"
        iconUrl="/assets/icons/WA.llamar.svg"
        label="Llamar"
        :showLabel="true"
        @click="onCallClick"
      />
  
      <!-- Botón de Normas -->
      <RoundedButton
        v-if="!hotelData.legal && buttonsHome.show_legal_text"
        iconUrl="/assets/icons/WA.normas.svg"
        label="Normas"
        :showLabel="true"
        @click="onLegalClick"
      />
  
      <!-- Botón de Compartir Estancia (versión RoundedButton cuando showAll es true) -->
      <RoundedButton
        iconUrl="/assets/icons/arrow-up-from-bracket-small.svg"
        label="Compartir Estancia"
        :showLabel="true"
        @click="onShareClick"
      />
    </div>
  
    <!-- Botón de Compartir Estancia (versión PrimaryButton cuando showAll es false) -->
    <PrimaryButton
      v-else
      classes="text-center py-2.5 rounded-[10px] text-sm font-bold leading-[20px] w-full shadow-guest bg-[#333333] text-[#FFF] lato"
      @click="onShareClick"
    >
      Compartir estancia
    </PrimaryButton>
  </template>
  
  <script setup>
  import RoundedButton from '@/components/Buttons/RoundedButton.vue';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
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
  
  // Variable computed para simplificar el acceso a `show_all`
  const showAll = computed(() => props.buttonsHome?.show_all ?? false);
  
  const onWifiClick = () => emit('wifi-click');
  const onCallClick = () => emit('call-click');
  const onLegalClick = () => emit('legal-click');
  const onShareClick = () => emit('share-click');
  </script>
  