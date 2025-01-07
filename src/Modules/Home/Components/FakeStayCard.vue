<template>
    <div 
      class="flex flex-col p-3 gap-1 w-full rounded-[16px] border border-color-secondary bg-gradient-to-r from-[#F3F3F3] to-[#FAFAFA] relative"
      :style="{ borderColor: colorBorder }"
      :class="{' hshadow-button' : shadowContainer}"
    >
        <!-- Skeleton Loader -->
        
        <div>
            <p class="text-xs font-bold lato leading-[16px] text-[#333333]">{{ hotelData ? hotelData.name : '-'}}</p>
            <div class="flex mt-1.5">
                <div>
                    <div class="flex items-center text-[14px] font-bold text-[#333333]">
                        <img src="/assets/icons/WA.pointer.svg" class="w-3 h-3 mr-0.5" alt="Location Icon" />
                        <span class="lato text-[10px] font-bold leading-[12px]">{{ hotelData ? hotelData.zone : '-'}}</span>
                    </div>
                    <div class="flex items-center mt-1">
                        <img src="/assets/icons/WA.calendar.svg" class="w-3 h-3 mr-0.5" alt="Calendar Icon" />
                        <span class="lato text-[10px] font-bold leading-[12px]">{{ dates }}</span>
                    </div>
                    <div class="flex items-center text-[14px] font-bold text-[#333333] space-x-2 mt-1">
                        <div class="flex items-center">
                            <img src="/assets/icons/WA.bed.svg" class="w-3 h-3 mr-0.5" alt="Bed Icon" />
                            <span class="lato text-[10px] font-bold leading-[12px]">{{ '-' }}</span>
                        </div>
                        <div class="flex items-center">
                            <img src="/assets/icons/WA.huespedes.svg" class="w-3 h-3 mr-0.5" alt="Guests Icon" />
                            <span class="lato text-[10px] font-bold leading-[12px]">{{ 1 }}</span>
                        </div>
                    </div>
                </div>
                <div class="mt-auto flex gap-1.5 sp:gap-3 ml-auto">
                <RoundedButton
                    id="open-query-modal"
                    iconUrl="/assets/icons/WA.feedback.svg"
                    sizeIcons="w-4 h-4"
                />
                <RoundedButton
                    id="open-shared-stay-modal"
                    iconUrl="/assets/icons/arrow-up-from-bracket.svg"
                    sizeIcons="w-4 h-4"
                />
            </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { computed, defineEmits, onMounted, ref, provide  } from 'vue';
import RoundedButton from '@/components/Buttons/RoundedButton.vue';
import { DateTime } from 'luxon';


import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore();
const { hotelData } = hotelStore

const dates = computed(()=>{
    const hoy = DateTime.now();
    const dosDiasAntes = hoy.minus({ days: 2 }).toFormat('d MMM');
    const manana = hoy.plus({ days: 1 }).toFormat('d MMM');

    return `${dosDiasAntes} - ${manana}`;
})
</script>

<style scoped>
.animate-pulse .bg-gray-300 {
    background-color: #e0e0e0; /* Color para el skeleton */
}
</style>
