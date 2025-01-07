<template>
  <section :class="{'mb-5 sp:mb-10' : hotelData.show_facilities === 0}">
      <div v-if="hotelData.checkin && hotelData.checkout" class="flex justify-between mb-[5px] mb-[10px]">
        <div class="flex flex-col gap-1 gap-2">
          <div class="flex gap-1 sp:gap-2">
            <img src="/assets/icons/WA.check-in.svg" class="size-2.5 sp:size-5" alt="Check-in Icon" />
            <p class="text-[8px] sp:text-sm font-bold text-[#333333] lato">Check-in</p>
            <span class="font-medium text-[8px] sp:text-sm lato">{{ hotelData.checkin }}hs</span>
          </div>
          <div class="flex justify-end gap-1 sp:gap-2" v-show="hotelData.checkin_until">
            <p class="text-[7px] sp:text-[12px] font-medium text-[#333333] lato">{{ $t('hotel.utils.to') }}</p>
            <span class="font-medium text-[7px] sp:text-[12px] lato">{{ hotelData.checkin_until }}hs</span>
          </div>
        </div>
        <div class="flex flex-col gap-1 sp:gap-2">
          <div class="flex gap-1 sp:gap-2">
            <img src="/assets/icons/WA.check-out.svg" class="size-2.5 sp:size-5" alt="Check-out Icon" />
            <p class="text-[8px] sp:text-sm font-bold text-[#333333] lato">Check-out</p>
            <span class="font-medium text-[8px] sp:text-sm lato">{{ hotelData.checkout }}hs</span>
          </div>
          <div class="flex justify-end gap-1 sp:gap-2" v-show="hotelData.checkout_until">
            <p class="text-[7px] sp:text-[12px] font-medium text-[#333333] lato">{{ $t('hotel.utils.to') }}</p>
            <span class="font-medium text-[7px] sp:text-[12px] lato">{{ hotelData.checkout_until }}hs</span>
          </div>
        </div>
      </div>
    
      <div class="border-t my-3 sp:my-6 border-[#E9E9E9]"></div>
    
      <div class="flex justify-between gap-1 sp:gap-2">
        <div class="flex gap-1 sp:gap-2 items-center w-1/2">
          <img src="/assets/icons/WA.pointer.svg" class="size-2.5 sp:size-5" alt="Ubicación Icon" />
          <p class="text-[8px] sp:text-[14px] font-bold text-[#333333] lato">{{ hotelData.address }}</p>
        </div>
        
        <!-- copiar la dirección -->
        <div class="flex gap-1 sp:gap-2 items-center cursor-pointer justify-end w-1/2" @click="copyText(hotelData.address)">
          <img src="/assets/icons/WA.copy.svg" class="h-4 w-5" alt="Copy Icon" />
          <span class="text-[8px] sp:text-[14px] font-bold underline text-[#333333] lato">{{ $t('hotel.utils.copy') }}</span>
        </div>
      </div>

      <div class="mt-3 sp:mt-6 ">
        <BaseMap  :center="coordCenter" 
                  :zoom="15" 
                  :height-map="windowWidth >= 250 ? '168px' : '90px'" 
                  :showExpand="true"
                  :transition="false"
        >
          <template v-slot:controls>
            <!-- Marcador en la Ubicación del Hotel -->
            <MapboxMarker :lng-lat="coordCenter">
              <img src="/assets/icons/WA.MAP.POINTER.svg" class="size-10 sp:size-12" alt="Hotel Location Marker" />
            </MapboxMarker>
          </template>
        </BaseMap>
      </div>
      

    <section class="no-transition">
      <div class="border-t my-3 sp:my-6 border-[#E9E9E9]" v-show="hotelData.email"></div>
    
      <!-- Sección de Email -->
      <div class="flex justify-between gap-1 sp:gap-2" v-show="hotelData.email">
        <div class="flex gap-1 sp:gap-2 items-center w-1/2">
          <img src="/assets/icons/WA.mail.svg" class="size-2.5 sp:size-5" alt="Email Icon" />
          <p class="text-[8px] sp:text-[14px] font-bold text-[#333333] lato">{{ hotelData.email }}</p>
        </div>
    
        <!-- copiar el email -->
        <div class="flex gap-1 sp:gap-2 items-center cursor-pointer justify-end w-1/2" @click="copyText(hotelData.email)">
          <img src="/assets/icons/WA.copy.svg" class="size-2.5 sp:size-5" alt="Copy Icon" />
          <span class="text-[8px] sp:text-[14px] font-bold underline text-[#333333] lato">{{ $t('hotel.utils.copy') }}</span>
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
    
      <div class="border-t my-3 sp:my-6 border-[#E9E9E9]" v-show="hotelData.phone"></div>
    
      <!-- Sección de Teléfono Principal -->
      <div class="flex justify-between gap-1 sp:gap-2" v-show="hotelData.phone">
        <div class="flex gap-1 sp:gap-2 items-center w-1/2">
          <img src="/assets/icons/WA.llamar.svg" class="size-2.5 sp:size-5" alt="Phone Icon" />
          <p class="text-[8px] sp:text-[14px] font-bold text-[#333333] lato">{{ hotelData.phone }}</p>
        </div>
    
        <!-- copiar el teléfono principal -->
        <div class="flex gap-1 sp:gap-2 items-center cursor-pointer justify-end w-1/2" @click="copyText(hotelData.phone)">
          <img src="/assets/icons/WA.copy.svg" class="size-2.5 sp:size-5" alt="Copy Icon" />
          <span class="text-[8px] sp:text-[14px] font-bold underline text-[#333333] lato">{{ $t('hotel.utils.copy') }}</span>
        </div>
      </div>
    
      <div class="border-t my-3 sp:my-6 border-[#E9E9E9]" v-show="hotelData.phone_optional"></div>
    
    
      <!-- Sección de Teléfono Opcional -->
      <div class="flex justify-between gap-1 sp:gap-2"  v-show="hotelData.phone_optional">
        <div class="flex gap-1 sp:gap-2 items-center w-1/2">
          <img src="/assets/icons/WA.llamar.svg" class="size-2.5 sp:size-5" alt="Phone Icon" />
          <p class="text-[8px] sp:text-[14px] font-bold text-[#333333] lato">{{ hotelData.phone_optional }}</p>
        </div>
    
        <!-- copiar el teléfono opcional -->
        <div class="flex gap-1 sp:gap-2 items-center cursor-pointer justify-end w-1/2" @click="copyText(hotelData.phone_optional)">
          <img src="/assets/icons/WA.copy.svg" class="size-2 sp:size-4" alt="Copy Icon" />
          <span class="text-[8px] sp:text-[14px] font-bold underline text-[#333333] lato">{{ $t('hotel.utils.copy') }}</span>
        </div>
      </div>
    </section>
  </section>
  
    
  
    <!-- <div class="border-t mt-6 mb-6 border-[#E9E9E9]"></div> -->
  
  </template>
  
  <script setup>
  import { defineProps, computed } from 'vue';
  import { MapboxMap, MapboxMarker, MapboxCluster, MapboxImage } from '@studiometa/vue-mapbox-gl';
  import BaseMap from '@/components/Maps/BaseMap.vue';

  import { handleToast } from '@/composables/useToast';
  const { toastSuccess } = handleToast();
    import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  
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
      toastSuccess(t('messageRequest.copiedClipboard'));
    }).catch(err => {
      console.error("Error al copiar el texto: ", err);
    });
  };

  
  </script>
  <style scope>
  .no-transition {
      transition: none !important;
  }
  </style>