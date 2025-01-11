<template>
    <BottomModal :isOpen="isScheduleModalOpen" @update:isOpen="closeModal">
        <div class="flex items-center gap-1">
            <img class="w-5 sp:w-8 h-5 sp:h-8" src="/assets/icons/WA.Clock.svg" alt="">
            <h2 class="lato text-sm sp:text-[20px] font-bold leading-[14px] sp:leading-[28px]">{{ $t('chat.horary-title') }}</h2>
        </div>
        <div class="mt-[18px] sp:mt-[28px] border border-color-secondary rounded-[14px] sp:rounded-[20px] py-3 sp:py-4">
            <div class="flex flex-col gap-1.5 sp:gap-3">
            <!-- card -->
                <div 
                    class="flex justify-between items-center h-7 sp:h-10 px-2 sppx-4" 
                    v-for="(schedule, index) in hotelStore.chatHours" 
                    :key="schedule"
                    :class="{'border-b border-color-secondary':(hotelStore.chatHours.length - 1) > index}"
                >
                    <h2 class="lato text-xs sp:text-base font-bold">{{ $t('chat.nameDay'+schedule.day) }}</h2>
                    <div class="flex items-center">
                        <p 
                            class="lato text-[10px] sp:text-sm" 
                            v-for="hour in schedule.horary" :key="hour"
                            :class="{'ml-3 sp:ml-6': schedule.horary.length < 3,'ml-1': schedule.horary.length > 2}"
                        >
                            {{ hour.start }} - {{ hour.end}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- {{guestSelected}} -->
    </BottomModal>
</template>
<script setup>
import { computed, ref, onMounted, toRefs, inject } from 'vue'
import BottomModal from '@/components/Modal/GeneralBottomSheet.vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
//store
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
const { hotelData } = hotelStore;


const isScheduleModalOpen = inject('isScheduleModalOpen');




// onMounted(async() => {
//     console.log('horary',hotelStore.chatHours)
// })


const closeModal = (e) => {
    isScheduleModalOpen.value = false;
};

</script>