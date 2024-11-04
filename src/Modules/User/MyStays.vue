<template>
    <SectionBar title="Mis estancias" :showButton="true" :button-text="'Crear estancia'" />
    <div class="px-3 pb-10">
        <!-- Renderiza la estancia activa si existe -->
        <StayCard 
            v-if="activeStay"
            :hotel="hotelData" 
            :stay="activeStay" 
            :isActive="true"
            :shadowContainer="true"
            :colorBorder="'#FFF'"
            @sharedStay="openModalShared"
            @stayClick="handleMyStays"
            :isLoading="loading"
            :hotelName="true"
        />

        <!-- Renderiza las demás estancias -->
        <div v-for="stay in otherStays" :key="stay.id">
            <StayCard 
                :hotel="hotelData" 
                :stay="stay" 
                :isActive="false"
                :shadowContainer="true"
                :colorBorder="'#FFF'"
                @sharedStay="openModalShared"
                @stayClick="handleMyStays"
                :isLoading="loading"
                :hotelName="true"
            />
        </div>
    </div>

    <BottomModal 
        :isOpen="isModalOpen" 
        @update:isOpen="isModalOpen = $event" 
        :showButton="true" 
        :buttonText="'Acceder a la estancia'"
        @handleClick="AccessToStay"
    >
        <div>
            <div class="flex justify-between">
                <p class="text-[20px] font-bold lato text-[#333333] mb-3">{{ dataModalStay.hotel_name }}</p>
            </div>
            
            <div class="flex items-center text-[14px] font-bold text-[#333333] mb-2">
                <img src="/assets/icons/WA.pointer.svg" class="w-4 h-4 mr-1" alt="Location Icon" />
                <span class="lato text-sm">{{ dataModalStay.zone }}</span>
            </div>
            <div class="flex items-center text-[14px] font-bold text-[#333333] space-x-2">
                <div class="flex items-center">
                    <img src="/assets/icons/WA.calendar.svg" class="w-4 h-4 mr-1" alt="Calendar Icon" />
                    <span class="lato text-sm">{{ dataModalStay.formatted_dates }}</span>
                </div>
                <div class="flex items-center">
                    <img src="/assets/icons/WA.bed.svg" class="w-4 h-4 mr-1" alt="Bed Icon" />
                    <span class="lato text-sm">{{ dataModalStay.rooms }}</span>
                </div>
                <div class="flex items-center">
                    <img src="/assets/icons/WA.huespedes.svg" class="w-4 h-4 mr-1" alt="Guests Icon" />
                    <span class="lato text-sm">{{ dataModalStay.guests }}</span>
                </div>
            </div>
        </div>
        <div class="flex w-full mb-6 mt-2">
            <button
                @click="handleEditStay"
                class="w-full lato flex justify-center items-center h-10 px-4 py-2 gap-2 rounded-[10px] border bg-white border-[#333333] text-[#333333] text-sm font-bold hshadow-button mt-4"
            >
                Editar estancia
            </button>
        </div>
    </BottomModal>

    
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SectionBar from '@/components/SectionBar.vue';
import StayCard from './Components/StayCard.vue';
import BottomModal from './Components/BottomModal.vue';
import { navigateTo } from '@/utils/navigation'

import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();

import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();

import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();

import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

const hotelData = ref({});
const activeStay = ref(null); 
const otherStays = ref([]); 
const stayData = ref({}); 
const guestData = ref({});
const chainData = ref({});
const loading = ref(true);

const isModalOpen = ref(false);
const dataModalStay = ref({});  

onMounted(() => {
    guestData.value = guestStore.getLocalGuest();
    stayData.value = stayStore.getLocalStay(); // Obtiene la estancia local
    chainData.value = chainStore.chainData;

    getStaysGuestByChain(guestData.value.id, stayData.value.id);
    getHotelbyId(stayData.value.hotel_id);
});

const getStaysGuestByChain = async (guestId, stayId) => {
    const response = await chainStore.$getStaysGuestByChain(guestId, stayId);


    if (response.ok) {
        activeStay.value = response.data.active_stay;
        otherStays.value = response.data.other_stays;
    } else {
        console.log('error', response);
    }

    loading.value = false;
};

const getHotelbyId = async (id) => {
    const response = await hotelStore.$findByIdApi(id);

    if (response.ok) {
        hotelData.value = response.data;
    } else {
        console.log('error', response);
    }
};

/* const handleMyStays = (data) => {
    console.log("click estancia...",data);

    isModalOpen.value = true;
}; */

function handleMyStays(data) {
    console.log("click estancia...",data);
    dataModalStay.value = data;
    isModalOpen.value = true;
}

const handleEditStay = () => {
    console.log("Redirigiendo a la página de edición de estancia...");
};

const AccessToStay = async () => {
    // console.log('test stayId',dataModalStay.value.stayId)
    await hotelStore.$changeCurrentHotelData(dataModalStay.value.hotelId, dataModalStay.value.hotelSubdomain);
    await stayStore.findByIdInSetLocalStay(dataModalStay.value.stayId)
    navigateTo('Home')
};
</script>
