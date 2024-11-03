// src/composables/useShareStay.js
import { ref, computed } from 'vue';
import { handleToast } from '@/composables/useToast';
const { toastSuccess } = handleToast();

export function useShareStay(hotelName, shareUrl) {
  const isModalOpen = ref(false);
  const shareLinkInput = ref(null);

  const shareMessage = computed(() => `¡Únete a nuestra estancia en ${hotelName}!\n\n${shareUrl}`);
  const whatsappShareUrl = computed(() => `https://wa.me/?text=${encodeURIComponent(shareMessage.value)}`);
  const mailtoShareUrl = computed(() => `mailto:?subject=Únete a nuestra estancia&body=${encodeURIComponent(shareMessage.value)}`);
  const smsShareUrl = computed(() => `sms:?&body=${encodeURIComponent(shareMessage.value)}`);
  const telegramShareUrl = computed(() => `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`¡Únete a nuestra estancia en ${hotelName}!`)}`);

  const openModalShared = () => {
    isModalOpen.value = true;
  };

  const copyToClipboard = () => {
    if (shareLinkInput.value) {
      navigator.clipboard.writeText(shareLinkInput.value.value).then(() => {
        toastSuccess("Enlace copiado");
      });
    }
  };

  return {
    isModalOpen,
    shareLinkInput,
    shareMessage,
    whatsappShareUrl,
    mailtoShareUrl,
    smsShareUrl,
    telegramShareUrl,
    openModalShared,
    copyToClipboard
  };
}
