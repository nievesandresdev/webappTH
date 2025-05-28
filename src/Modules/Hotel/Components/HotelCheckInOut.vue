<template>
    <div class="border-t my-3 sp:my-6 border-[#E9E9E9]"></div>
    <section >
        <div class="flex justify-between mb-[5px]">
          <div class="flex flex-col gap-1">
            <div class="flex gap-1 sp:gap-2">
              <img src="/assets/icons/WA.check-in.svg" class="size-2.5 sp:size-5" alt="Check-in Icon" />
              <p class="text-[10px] sp:text-sm font-bold text-[#333333] lato">Check-in</p>
              <span class="font-medium text-[10px] sp:text-sm lato">{{ hotelData.checkin }}hs</span>
            </div>
            <div class="flex justify-end gap-1 sp:gap-2" v-show="hotelData.checkin_until">
              <p class="text-[10px] sp:text-[12px] font-medium text-[#333333] lato">{{ $t('hotel.utils.to') }}</p>
              <span class="font-medium text-[10px] sp:text-[12px] lato">{{ hotelData.checkin_until }}hs</span>
            </div>
          </div>
          <div class="flex flex-col gap-1 sp:gap-2">
            <div class="flex gap-1 sp:gap-2">
              <img src="/assets/icons/WA.check-out.svg" class="size-2.5 sp:size-5" alt="Check-out Icon" />
              <p class="text-[9px] sp:text-sm font-bold text-[#333333] lato">Check-out</p>
              <span class="font-medium text-[9px] sp:text-sm lato">{{ hotelData.checkout }}hs</span>
            </div>
            <div class="flex justify-end gap-1 sp:gap-2" v-show="hotelData.checkout_until">
              <p class="text-[9px] sp:text-[12px] font-medium text-[#333333] lato">{{ $t('hotel.utils.to') }}</p>
              <span class="font-medium text-[9px] sp:text-[12px] lato">{{ hotelData.checkout_until }}hs</span>
            </div>
          </div>
        </div>
       
    </section>
    
      
    
      <!-- <div class="border-t mt-6 mb-6 border-[#E9E9E9]"></div> -->
    
    </template>
    
    <script setup>
    import { defineProps, computed } from 'vue';
 
      import { useI18n } from 'vue-i18n';
    const { t } = useI18n();
    
    const props = defineProps({
      hotelData: {
        type: Object,
        required: true,
      },
    });

  
    
    </script>
    <style scope>
    .no-transition {
        transition: none !important;
    }
    </style>