<template>
    <div 
      class="flex flex-col p-4 gap-2 w-full rounded-[20px] border border-color-secondary bg-gradient-to-r from-[#F3F3F3] to-[#FAFAFA] relative"
      :style="{ borderColor: colorBorder }"
      :class="{' hshadow-button' : shadowContainer}"
      @click="handleStayClick()"
    >
        <!-- Skeleton Loader -->
        <template v-if="isLoading">
            <div class="animate-pulse">
                <div class="bg-gray-300 h-6 w-3/4 rounded mb-3"></div>
                <div class="flex gap-2 items-center mb-2">
                    <div class="bg-gray-300 h-4 w-5 rounded"></div>
                    <div class="bg-gray-300 h-4 w-1/2 rounded"></div>
                </div>
                <div class="flex gap-2 items-center">
                    <div class="bg-gray-300 h-4 w-1/4 rounded"></div>
                    <div class="bg-gray-300 h-4 w-1/4 rounded"></div>
                    <div class="bg-gray-300 h-4 w-1/4 rounded"></div>
                </div>
            </div>
        </template>

        <!-- Datos Reales -->
        <template v-else>
            <div>
                <div class="flex justify-between">
                    <!-- Nombre del hotel -->
                    <p class="text-base font-bold lato leading-[20px] text-[#333333] mb-3">{{ hotelName ? stay.hotel_name : hotel.name }}</p>
                    <!-- Badge "Activo" -->
                    <span v-if="isActive" class="flex h-[20px] px-2 py-1 justify-center items-center gap-[4px] rounded-[18px] border border-white bg-[#34A98F]">
                        <span class="text-[12px] font-bold text-white roboto uppercase tracking-[0.6px]">Activo</span>
                    </span>
                </div>
                <div class="flex items-center text-[14px] font-bold text-[#333333] mb-2">
                    <img src="/assets/icons/WA.pointer.svg" class="w-4 h-4 mr-1" alt="Location Icon" />
                    <span class="lato text-sm font-bold leading-[16px]">{{ hotelName ? stay.hotel_zone : hotel.zone ?? '-'}}</span>
                </div>
                <div class="flex items-center text-[14px] font-bold text-[#333333] space-x-2">
                    <div class="flex items-center">
                        <img src="/assets/icons/WA.calendar.svg" class="w-4 h-4 mr-1" alt="Calendar Icon" />
                        <span class="lato text-sm font-bold leading-[16px]">{{ formattedDates }}</span>
                    </div>
                    <div class="flex items-center">
                        <img src="/assets/icons/WA.bed.svg" class="w-4 h-4 mr-1" alt="Bed Icon" />
                        <span class="lato text-sm font-bold leading-[16px]">{{ stay?.room ?? '-' }}</span>
                    </div>
                    <div class="flex items-center">
                        <img src="/assets/icons/WA.huespedes.svg" class="w-4 h-4 mr-1" alt="Guests Icon" />
                        <span class="lato text-sm font-bold leading-[16px]">{{ stay?.number_guests }}</span>
                    </div>
                </div>
            </div>
            <button v-if="showButtonShared" @click.stop="isModalOpen()" class="absolute bottom-4 right-4 flex items-center p-2 gap-2 rounded-full border border-white bg-gradient-h shadow-md hshadow-button">
                <img src="/assets/icons/arrow-up-from-bracket.svg" class="w-6 h-6 p-0.5" alt="Arrow Icon" />
            </button>
        </template>
    </div>
</template>

<script setup>
import { computed, defineEmits } from 'vue';

const emit = defineEmits(['sharedStay', 'stayClick']);

const props = defineProps({
    guest: Object,
    hotel: Object,
    stay: Object,
    colorBorder: {
        type: String,
        default: false
    },
    showButtonShared: {
        type: Boolean,
        default: false
    },
    shadowContainer: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isLoading: {
        type: Boolean,
        default: true 
    },
    hotelName  : {
        type: Boolean,
        default: false
    }
});

const formattedDates = computed(() => {
    const checkInDate = formatDate(props.stay?.check_in);
    const checkOutDate = formatDate(props.stay?.check_out);
    return `${checkInDate} - ${checkOutDate}`;
});

const formatDate = (dateString) => {
    const utcDate = new Date(dateString + 'T00:00:00Z');
    const options = { day: '2-digit', month: 'short', timeZone: 'Europe/Madrid' };
    return utcDate.toLocaleDateString('es-ES', options).replace(/\s+/g, ' ');
};

const isModalOpen = () => {
    emit('sharedStay');
};

function handleStayClick() {
    const data = {
        hotel_name: props.hotelName ? props.stay?.hotel_name : props.hotel.name,
        hotel_name: props.hotelName ? props.stay?.hotel_name : props.hotel.name,
        hotelSubdomain: props.stay?.hotel_subdomain,
        hotelId: props.stay?.hotel_id,
        zone:  props.hotelName ? props.stay?.hotel_zone : props.hotel.zone ,
        stayId: props.stay?.stayId,
        check_in: props.stay?.check_in,
        check_out: props.stay?.check_out,
        room: props.stay?.room ?? '-',
        guests: props.stay?.number_guests ?? '-',
        formatted_dates: formattedDates.value,
    };
    emit('stayClick', data);
}

</script>

<style scoped>
.animate-pulse .bg-gray-300 {
    background-color: #e0e0e0; /* Color para el skeleton */
}
</style>
