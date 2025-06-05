<template>
    <ModalNative width="327px" @closeModal="isOpenWhatsappModal = false" :openProp="isOpenWhatsappModal">
        <div class="p-6">
            <h2 class="lato text-lg font-bold leading-[20px]">
                {{ $t('contact.modal-whatsapp.title') }}
            </h2>
            <p class="mt-6 lato text-sm font-medium leading-[16px]" v-html="$t('contact.modal-whatsapp.description')"></p>
            <div class="mt-6">
                <PrimaryButton 
                    classes="shadow-guest-2 py-3 w-full h-10 border rounded-[10px] text-center lato text-sm font-bold leading-[16px]"
                    @click="openWhatsapp()"
                >
                    {{ $t('contact.modal-whatsapp.button-continue') }}
                </PrimaryButton> 
            </div>
            <div class="mt-4 text-center">
                <a href="#" class="underline lato text-sm font-bold leading-[16px]" @click="isOpenWhatsappModal = false">
                    {{ $t('contact.modal-whatsapp.button-cancel') }}
                </a>
            </div>
        </div>
    </ModalNative>
</template>
<script setup>
import { inject } from 'vue';
import ModalNative from '@/components/ModalNative.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';

import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();

const isOpenWhatsappModal = inject('isOpenWhatsappModal')

const openWhatsapp = () => {
    window.open(`https://wa.me/${hotelStore.hotelData?.contact_whatsapp_number}`, '_blank')
    isOpenWhatsappModal.value = false
}

</script>
