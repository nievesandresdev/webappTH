<template>
  <section :class="{'mb-10' : hotelData.show_facilities === 0}">
      <div v-if="hotelData.checkin && hotelData.checkout" class="flex justify-between mb-[10px]">
        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <img src="/assets/icons/WA.check-in.svg" class="w-5 h-5" alt="Check-in Icon" />
            <p class="text-sm font-bold text-[#333333] lato">Check-in</p>
            <span class="font-medium text-sm lato">{{ hotelData.checkin }}hs</span>
          </div>
          <div class="flex justify-end gap-2" v-show="hotelData.checkin_until">
            <p class="text-[12px] font-medium text-[#333333] lato">{{ $t('hotel.utils.to') }}</p>
            <span class="font-medium text-[12px] lato">{{ hotelData.checkin_until }}hs</span>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <img src="/assets/icons/WA.check-out.svg" class="w-5 h-5" alt="Check-out Icon" />
            <p class="text-sm font-bold text-[#333333] lato">Check-out</p>
            <span class="font-medium text-sm lato">{{ hotelData.checkout }}hs</span>
          </div>
          <div class="flex justify-end gap-2" v-show="hotelData.checkout_until">
            <p class="text-[12px] font-medium text-[#333333] lato">{{ $t('hotel.utils.to') }}</p>
            <span class="font-medium text-[12px] lato">{{ hotelData.checkout_until }}hs</span>
          </div>
        </div>
      </div>
    
      <div class="border-t mt-6 mb-6 border-[#E9E9E9]"></div>
    
      <div class="flex justify-between gap-2">
        <div class="flex gap-2 items-center w-1/2">
          <img src="/assets/icons/WA.pointer.svg" class="w-5 h-5" alt="Ubicación Icon" />
          <p class="text-[14px] font-bold text-[#333333] lato">{{ hotelData.address }}</p>
        </div>
        
        <!-- copiar la dirección -->
        <div class="flex gap-2 items-center cursor-pointer justify-end w-1/2" @click="copyText(hotelData.address)">
          <img src="/assets/icons/WA.copy.svg" class="h-4 w-5" alt="Copy Icon" />
          <span class="text-[14px] font-bold underline text-[#333333] lato">{{ $t('hotel.utils.copy') }}</span>
        </div>
      </div>

      <div class="mt-6">
        <BaseMap :center="coordCenter" :zoom="15" :heightMap="'168px'" :showExpand="true">
          <template v-slot:controls>
            <!-- Marcador en la Ubicación del Hotel -->
            <MapboxMarker :lng-lat="coordCenter">
              <img src="/assets/icons/WA.MAP.POINTER.svg" class="h-12 w-12 " alt="Hotel Location Marker" />
            </MapboxMarker>
          </template>
        </BaseMap>
      </div>
      

    
      <div class="border-t mt-6 mb-6 border-[#E9E9E9]" v-show="hotelData.email"></div>
    
      <!-- Sección de Email -->
      <div class="flex justify-between gap-2" v-show="hotelData.email">
        <div class="flex gap-2 items-center w-1/2">
          <img src="/assets/icons/WA.mail.svg" class="w-5 h-5" alt="Email Icon" />
          <p class="text-[14px] font-bold text-[#333333] lato">{{ hotelData.email }}</p>
        </div>
    
        <!-- copiar el email -->
        <div class="flex gap-2 items-center cursor-pointer justify-end w-1/2" @click="copyText(hotelData.email)">
          <img src="/assets/icons/WA.copy.svg" class="h-4 w-5" alt="Copy Icon" />
          <span class="text-[14px] font-bold underline text-[#333333] lato">{{ $t('hotel.utils.copy') }}</span>
        </div>
      </div>

      <!-- <div class="border-t mt-6 mb-6 border-[#E9E9E9]"></div>
    
      <div class="flex justify-between gap-2">
        <div class="flex gap-2 items-center w-1/2">
          <img src="/assets/icons/WA.website.svg" class="w-5 h-5" alt="Website Icon" />
          <p class="text-[14px] font-semibold underline text-[#333333] lato cursor-pointer" @click="copyText(hotelData.website_google)">
            {{ formattedWebsite }}
          </p>
        </div>
      </div> -->
    
      <div class="border-t mt-6 mb-6 border-[#E9E9E9]" v-show="hotelData.phone"></div>
    
      <!-- Sección de Teléfono Principal -->
      <div class="flex justify-between gap-2" v-show="hotelData.phone">
        <div class="flex gap-2 items-center w-1/2">
          <img src="/assets/icons/WA.llamar.svg" class="w-5 h-5" alt="Phone Icon" />
          <p class="text-[14px] font-bold text-[#333333] lato">{{ hotelData.phone }}</p>
        </div>
    
        <!-- copiar el teléfono principal -->
        <div class="flex gap-2 items-center cursor-pointer justify-end w-1/2" @click="copyText(hotelData.phone)">
          <img src="/assets/icons/WA.copy.svg" class="h-4 w-5" alt="Copy Icon" />
          <span class="text-[14px] font-bold underline text-[#333333] lato">{{ $t('hotel.utils.copy') }}</span>
        </div>
      </div>
    
      <div class="border-t mt-6 mb-6 border-[#E9E9E9]" v-show="hotelData.phone_optional"></div>
    
    
      <!-- Sección de Teléfono Opcional -->
      <div class="flex justify-between gap-2"  v-show="hotelData.phone_optional">
        <div class="flex gap-2 items-center w-1/2">
          <img src="/assets/icons/WA.llamar.svg" class="w-5 h-5" alt="Phone Icon" />
          <p class="text-[14px] font-bold text-[#333333] lato">{{ hotelData.phone_optional }}</p>
        </div>
    
        <!-- copiar el teléfono opcional -->
        <div class="flex gap-2 items-center cursor-pointer justify-end w-1/2" @click="copyText(hotelData.phone_optional)">
          <img src="/assets/icons/WA.copy.svg" class="h-4 w-5" alt="Copy Icon" />
          <span class="text-[14px] font-bold underline text-[#333333] lato">{{ $t('hotel.utils.copy') }}</span>
        </div>
      </div>

  </section>
  
    
  
    <!-- <div class="border-t mt-6 mb-6 border-[#E9E9E9]"></div> -->
  
  </template>
  
  <script setup>
  import { defineProps, computed } from 'vue';
  import { MapboxMap, MapboxMarker, MapboxCluster, MapboxImage } from '@studiometa/vue-mapbox-gl';
  import BaseMap from '@/components/Maps/BaseMap.vue';

  import { handleToast } from '@/composables/useToast';
  const { toastSuccess } = handleToast();
  
  const props = defineProps({
    hotelData: {
      type: Object,
      required: true,
    },
  });

  // Coordenadas Centrales para el Mapa
  const coordCenter = computed(() => [
    parseFloat(props.hotelData.longitude), 
    parseFloat(props.hotelData.latitude)
  ]);
  
  const formattedWebsite = computed(() => {
    const url = props.hotelData.website_google;
    return url ? url.replace(/^https?:\/\/(www\.)?/, '') : '';
  });
  
  const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toastSuccess('Copiado al portapapeles');
    }).catch(err => {
      console.error("Error al copiar el texto: ", err);
    });
  };

  
  </script>

  