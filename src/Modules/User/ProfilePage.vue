<template>
    <SectionBar title="Mi cuenta" />

    <div class="px-3">
        <div class="flex flex-col items-center mt-6">
            <div class="w-10 h-10 rounded-full bg-cover bg-center bg-lightgray shadow-profile"
                style="background-image: url('https://via.placeholder.com/40');">
            </div>
            <p class="text-[#333333] text-[20px] font-bold lato mt-2">¡Hola, {{guestData.name}}!</p>
        </div>

        <!-- Contenedor de hotel y estancia boton compartir -->
        <StayCard 
            :hotel="hotelData" 
            :stay="stayData" 
            :showButtonShared="true"
            @sharedStay="openModalShared"
            :isLoading="loading"
        />

        <!-- Sección "Mis estancias" -->
        <div class="flex p-4 gap-[1px] w-full mt-4 rounded-[10px] border border-white bg-gradient-to-r from-[#F3F3F3] to-[#FAFAFA] hshadow-button relative">
            <div class="flex flex-col justify-start w-full">
                <div class="flex items-center">
                    <img src="/assets/icons/WA.stay.svg" class="w-6 h-6 mr-1" alt="Stay Icon" />
                    <p class="text-[18px] font-bold lato text-[#333333]">Mis estancias</p>
                </div>
                <p class="text-[14px] font-medium lato text-[#333333]">Gestiona tus estancias</p>
            </div>
            <div class="flex">
                <img @click="handleMyStays" src="/assets/icons/WA.chevron.svg" class="w-6 h-6 cursor-pointer transform rotate-180 self-center" alt="Chevron Icon" />
            </div>
        </div>

        <div class="w-full h-[1px] bg-[#E9E9E9] mt-4"></div>

        <!-- Sección "Información personal" -->
        <div class="flex items-center justify-between mt-4 gap-2">
            <div class="flex items-center gap-2">
                <img src="/assets/icons/WA.id.svg" class="w-8 h-8" alt="ID Icon" />
                <div class="flex flex-col">
                    <span class="text-[16px] font-medium lato text-[#333333]">Información personal</span>
                    <span class="text-[14px] font-normal lato text-[#333333]">Configura tu información personal</span>
                </div>
            </div>
            <img @click="handleChevronClick" src="/assets/icons/WA.chevron.svg" class="w-6 h-6 cursor-pointer transform rotate-180 self-center" alt="Chevron Icon" />
        </div>

        <!-- Cerrar sesión -->
        <div class="flex items-center justify-center mt-6 gap-2 cursor-pointer">
            <img src="/assets/icons/WA.logout.svg" class="w-4 h-4" alt="Logout Icon" />
            <span class="text-[14px] font-bold lato text-[#333333] underline">Cerrar sesión</span>
        </div>

        <THInputText
            :textLabel="'sss'"
            :placeholder="'asdssd'"
            v-model="form.name"
            
        />

        <BottomModal :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event">
            <div class="flex flex-col items-start">
                <div class="flex items-center gap-2 mb-4 lato">
                    <img src="/assets/icons/arrow-up-from-bracket.svg" class="w-6 h-6" alt="Arrow Icon" />
                    <p class="text-[20px] font-bold text-[#333333] lato">Compartir estancia</p>
                </div>
                <a :href="whatsappShareUrl" target="_blank" class="flex items-center gap-2 mb-4 lato">
                    <img src="/assets/icons/WA.Whatsapp.svg" class="w-6 h-6" alt="Whatsapp Icon" />
                    <p class="text-[14px] font-medium text-[#333333] lato">Compartir vía Whatsapp</p>
                </a>
                <a :href="mailtoShareUrl" target="_blank" class="flex items-center gap-2 mb-4 lato">
                    <img src="/assets/icons/WA.mail.svg" class="w-6 h-6" alt="Email Icon" />
                    <p class="text-[14px] font-medium text-[#333333] lato">Compartir vía Email</p>
                </a>
                <a :href="smsShareUrl" target="_blank" class="flex items-center gap-2 mb-4 lato">
                    <img src="/assets/icons/WA.SMS.svg" class="w-6 h-6" alt="SMS Icon" />
                    <p class="text-[14px] font-medium text-[#333333] lato">Compartir vía SMS</p>
                </a>
                <a :href="telegramShareUrl" target="_blank" class="flex items-center gap-2 mb-4 lato">
                    <img src="/assets/icons/WA.Telegram.svg" class="w-6 h-6" alt="Telegram Icon" />
                    <p class="text-[14px] font-medium text-[#333333] lato">Compartir vía Telegram</p>
                </a>
                <p class="text-[14px] font-bold lato text-[#333333]">Link para compartir la estancia</p>
                <div class="relative mt-1 w-full">
                    <input
                        ref="shareLinkInput"
                        type="text"
                        disabled
                        :value="shareUrl"
                        class="w-full py-2 pl-4 pr-10 text-[14px] font-medium lato text-[rgba(51,51,51,0.25)] rounded-[10px] border border-[rgba(51, 51, 51, 0.25)] bg-[rgba(250, 250, 250, 0.50)] truncate"
                    />
                    <button @click="copyToClipboard" class="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <img src="/assets/icons/WA.copy.svg" class="w-5 h-5" alt="Copy Icon" />
                    </button>
                </div>
            </div>
        </BottomModal>
    </div>
</template>
<script setup>
import { ref, onMounted, computed,reactive } from 'vue';
import SectionBar from '@/components/SectionBar.vue';
import BottomModal from './Components/BottomModal.vue';
import StayCard from './Components/StayCard.vue';
import THInputText from '@/components/THInputText.vue';
import router from '@/router';

import { handleToast } from "@/composables/useToast"; 
const { toastSuccess } = handleToast();

import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();

import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();

import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();

const isModalOpen = ref(false);


const guestData = ref({});
const hotelData = ref({});
const stayData = ref({});
const loading = ref(true);

// Referencia al input para copiar el link
const shareLinkInput = ref(null);

// Función para copiar el link 
const copyToClipboard = () => {
    if (shareLinkInput.value) {
        navigator.clipboard.writeText(shareLinkInput.value.value).then(() => {
            toastSuccess("Enlace copiado");
        }, 2000);

        //isModalOpen.value = false;
    }
};

const openModalShared = () => {
    isModalOpen.value = true;
};

const form = reactive({
    name: '',
    email: ''
});

const handleMyStays = () => {
    console.log("Redirigiendo a la página de estancias...");
    router.push({ name: 'MyStays' });
};

onMounted(() => {
    guestData.value = guestStore.getLocalGuest();
    //console.log('home guest', guestData.id);

    stayData.value = stayStore.getLocalStay();
    //console.log('home stay', stay);

    console.log({
        stayData: stayData.value,
        guestData: guestData.value
    })

    getHotelbyId(stayData.value.hotel_id);

});




const getHotelbyId = async (id) => {
    const response = await hotelStore.$findByIdApi(id);

    if(response.ok){
        hotelData.value = response.data;
    }else{
        console.log('error', response);
    }

    loading.value = false;
    
};

/* const formattedDates = computed(() => {
    const checkInDate = formatDate(stayData.value.check_in);
    const checkOutDate = formatDate(stayData.value.check_out);
    return `${checkInDate} - ${checkOutDate}`;
});

const formatDate = (dateString) => {
    const utcDate = new Date(dateString + 'T00:00:00Z');
    const options = { day: '2-digit', month: 'short', timeZone: 'Europe/Madrid' };
    return utcDate.toLocaleDateString('es-ES', options).replace(/\s+/g, ' ');
}; */

// URLs para compartir
const shareUrl = "https://ejemplo.com/estancia/larga-url-que-se-trunca";

// Definimos shareMessage como un valor computed para que tome hotelData.name cuando esté disponible
const shareMessage = computed(() => `¡Únete a nuestra estancia en ${hotelData.value.name}!\n\n${shareUrl}`);

const whatsappShareUrl = computed(() => `https://wa.me/?text=${encodeURIComponent(shareMessage.value)}`);
const mailtoShareUrl = computed(() => `mailto:?subject=Únete a nuestra estancia&body=${encodeURIComponent(shareMessage.value)}`);
const smsShareUrl = computed(() => `sms:?&body=${encodeURIComponent(shareMessage.value)}`);
const telegramShareUrl = computed(() => `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`¡Únete a nuestra estancia en ${hotelData.value.name}!`)}`);


</script>

<style scoped>
.bg-lightgray {
    background-color: lightgray;
}

.shadow-profile {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
}

.rotate-90 {
    transform: rotate(90deg);
}
</style>
