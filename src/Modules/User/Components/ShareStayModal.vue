<template>
    <BottomModal :isOpen="isModalOpen" @update:isOpen="closeModal">
        <div class="flex flex-col items-start">
            <div @click="addNumberGuest" class="flex items-center gap-2 mb-4 lato">
                <img src="/assets/icons/arrow-up-from-bracket.svg" class="w-6 h-6" alt="Arrow Icon" />
                <p class="text-[20px] font-bold text-[#333333] lato">Compartir estancia</p>
            </div>
            <a @click="addNumberGuest" :href="whatsappShareUrl" target="_blank" class="flex items-center gap-2 mb-4 lato">
                <img src="/assets/icons/WA.Whatsapp.svg" class="w-6 h-6" alt="Whatsapp Icon" />
                <p class="text-[14px] font-medium text-[#333333] lato">Compartir vía Whatsapp</p>
            </a>
            <a @click="addNumberGuest" :href="mailtoShareUrl" target="_blank" class="flex items-center gap-2 mb-4 lato">
                <img src="/assets/icons/WA.mail.svg" class="w-6 h-6" alt="Email Icon" />
                <p class="text-[14px] font-medium text-[#333333] lato">Compartir vía Email</p>
            </a>
            <a @click="addNumberGuest" :href="smsShareUrl" target="_blank" class="flex items-center gap-2 mb-4 lato">
                <img src="/assets/icons/WA.SMS.svg" class="w-6 h-6" alt="SMS Icon" />
                <p class="text-[14px] font-medium text-[#333333] lato">Compartir vía SMS</p>
            </a>
            <a @click="addNumberGuest" :href="telegramShareUrl" target="_blank" class="flex items-center gap-2 mb-4 lato">
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
</template>
<script setup>
import { computed, ref, onMounted, toRefs, inject } from 'vue'
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();

import BottomModal from '@/components/Modal/GeneralBottomSheet.vue';
//store
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();
import { handleToast } from "@/composables/useToast"; 
const { toastSuccess } = handleToast();

const isModalOpen = inject('isModalOpen');

const shareLinkInput = ref(null);
const shareUrl = ref(null);



onMounted(async() => {
    shareUrl.value = await hotelStore.$buildUrlWebApp(hotelStore.hotelData?.subdomain,null,`e=${stayStore.stayData?.id}&guestPerStay=true`);  
})

// Definimos shareMessage como un valor computed para que tome hotelData.name cuando esté disponible
const shareMessage = computed(() => `¡Únete a nuestra estancia en ${hotelStore.hotelData.name}!\n\n${shareUrl.value}`);

const whatsappShareUrl = computed(() => `https://wa.me/?text=${encodeURIComponent(shareMessage.value)}`);
const mailtoShareUrl = computed(() => `mailto:?subject=Únete a nuestra estancia&body=${encodeURIComponent(shareMessage.value)}`);
const smsShareUrl = computed(() => `sms:?&body=${encodeURIComponent(shareMessage.value)}`);
const telegramShareUrl = computed(() => `https://t.me/share/url?url=${encodeURIComponent(shareUrl.value)}&text=${encodeURIComponent(`¡Únete a nuestra estancia en ${hotelStore.hotelData.name}!`)}`);

const addNumberGuest = async (id) => {
    let num = Number(stayStore.stayData.number_guests) + 1;
    let params = { stayId: stayStore.stayData.id, numberGuests: num}
    let response = await stayStore.updateStayAndGuests(params)
};

// Función para copiar el link 
const copyToClipboard = () => {
    if (shareLinkInput.value) {
        navigator.clipboard.writeText(shareLinkInput.value.value).then(() => {
            toastSuccess(t('messageRequest.urlClipboard'));
        }, 2000);

        //isModalOpen.value = false;
    }
};

const closeModal = (e) => {
    isModalOpen.value = false;
};


</script>