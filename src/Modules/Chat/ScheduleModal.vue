<template>
    <Modal 
            :openModal="scheduleModalIsOpen" 
            @closeModal="scheduleModalIsOpen = false"
            :customClasess="'max-w-[500px]'"
        >
        <p class="relative text-center p-4 text-lg font-medium border-b">
            <img 
                class="w-5 h-5 absolute left-4 top-5 cursor-pointer" 
                src="/assets/icons/1.TH.CLOSE.svg" alt=""
                @click="scheduleModalIsOpen = false"
            >
            {{$utils.capitalize($t('chat.scheduleTitle'))}}
        </p>
        <div class="px-4 pb-4 overflow-y-auto max-h-[400px]">
            <template v-for="schedule in hotelStore.chatHours" :key="schedule">
                <div v-if="schedule.active" class="flex items-start">
                    <p class="w-24 text-sm font-medium mt-4 text-left">{{ schedule.day }}</p>
                    <div class="">
                        <p class="text-sm font-medium mt-4" v-for="hour in schedule.horary" :key="hour">
                            {{ hour.start }}-{{ hour.end}}
                        </p>
                    </div>
                </div>
            </template>
            <p class="text-xs mt-4 text-left">{{$utils.capitalize($t('chat.scheduleNote'))}}</p>
        </div>
    </Modal>
</template>
<script setup>
    import { ref, inject } from 'vue'
    import Modal from '@/components/Modal.vue'
    import { useHotelStore } from '@/stores/modules/hotel';

    const scheduleModalIsOpen = inject('scheduleModalIsOpen')
    const hotelStore = useHotelStore();
    const { hotelData } = hotelStore;


    defineExpose({
        open
    });
    
</script>