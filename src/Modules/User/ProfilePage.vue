<template>
    <SectionBar title="Mi cuenta" />

    <div class="px-3">
        <div class="flex flex-col items-center mt-6">
            <div class="w-10 h-10 rounded-full bg-cover bg-center bg-lightgray shadow-profile"
                style="background-image: url('https://via.placeholder.com/40');">
            </div>
            <p class="text-[#333333] text-[20px] font-bold lato mt-2">¡Hola, Alejandro!</p>
        </div>

        <!-- Contenedor con información y botón de compartir -->
        <div class="flex flex-col p-4 gap-2 w-full mt-6 rounded-[20px] border border-[#E9E9E9] bg-gradient-to-r from-[#F3F3F3] to-[#FAFAFA] relative hshadow-button">
            <div>
                <p class="text-[16px] font-bold lato text-[#333333] mb-3">Riu Costa del Sol</p>
                <div class="flex items-center text-[14px] font-bold text-[#333333] mb-2">
                    <img src="/assets/icons/WA.pointer.svg" class="w-4 h-4 mr-1" alt="Location Icon" />
                    <span class="lato">Málaga</span>
                </div>
                <div class="flex items-center text-[14px] font-bold text-[#333333] space-x-2">
                    <div class="flex items-center">
                        <img src="/assets/icons/WA.calendar.svg" class="w-4 h-4 mr-1" alt="Calendar Icon" />
                        <span class="lato">12 Ago-19 Ago</span>
                    </div>
                    <div class="flex items-center">
                        <img src="/assets/icons/WA.bed.svg" class="w-4 h-4 mr-1" alt="Bed Icon" />
                        <span class="lato">12</span>
                    </div>
                    <div class="flex items-center">
                        <img src="/assets/icons/WA.huespedes.svg" class="w-4 h-4 mr-1" alt="Guests Icon" />
                        <span class="lato">2</span>
                    </div>
                </div>
            </div>
            <button @click="isModalOpen = true" class="absolute bottom-4 right-4 flex items-center p-2 gap-2 rounded-full border border-white bg-gradient-to-r from-[#F3F3F3] to-[#FAFAFA] shadow-md hshadow-button">
                <img src="/assets/icons/arrow-up-from-bracket.svg" class="w-6 h-6 p-0.5" alt="Arrow Icon" />
            </button>
        </div>

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
                <img @click="handleChevronClick" src="/assets/icons/WA.chevron.svg" class="w-6 h-6 cursor-pointer transform rotate-180 self-center" alt="Chevron Icon" />
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

        <BottomModal :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event">
            <div class="flex flex-col items-start">
                <div class="flex items-center gap-2 mb-4 lato">
                    <img src="/assets/icons/arrow-up-from-bracket.svg" class="w-6 h-6" alt="Arrow Icon" />
                    <p class="text-[20px] font-bold text-[#333333] lato">Compartir estancia</p>
                </div>
                <!-- Enlaces de compartir -->
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
import { ref, onMounted, computed } from 'vue';
import SectionBar from '@/components/SectionBar.vue';
import BottomModal from '@/components/BottomModal.vue';

import { handleToast } from "@/composables/useToast"; 
const { toastSuccess } = handleToast();

import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();

import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();

const isModalOpen = ref(false);
const shareUrl = "https://ejemplo.com/estancia/larga-url-que-se-trunca";

// URLs para compartir
const whatsappShareUrl = computed(() => `https://wa.me/?text=${encodeURIComponent(shareUrl)}`);
const mailtoShareUrl = computed(() => `mailto:?subject=Compartir Estancia&body=${encodeURIComponent(shareUrl)}`);
const smsShareUrl = computed(() => `sms:?&body=${encodeURIComponent(shareUrl)}`);
const telegramShareUrl = computed(() => `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=Compartir Estancia`);

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

const handleChevronClick = () => {
    console.log("Redirigiendo a la página de estancias...");
};

onMounted(() => {
    let guest = guestStore.getLocalGuest();
    console.log('home guest', guest);

    let stay = stayStore.getLocalStay();
    console.log('home stay', stay);
});
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
