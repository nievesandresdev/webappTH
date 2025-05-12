<template>
    <BottomModal :isOpen="isOpenSentEmailModal" @update:isOpen="isOpenSentEmailModal = $event">
        <div class="flex items-center gap-1 lato">
            <img src="/assets/icons/WA.MENU.DEFAULT.MENSAJES.svg" class="w-8 h-8 text-[#333333]" alt="Normas Icon" />
            <p class="text-[16px] sp:text-[20px] font-bold text-[#333333] lato leading-[26px] sp:leading-[28px]">{{ $t('contact.sent-email-form.title') }}</p>
        </div>
        <div class="mt-[16px] sp:mt-[28px]">
            <p 
                class="text-[10px] sp:text-[14px] font-medium lato leading-[14px] sp:leading-[19px]"
                v-html="$t('contact.sent-email-form.description')"
            ></p>
        </div>
        <div class="mt-2 sp:mt-4">
            <TextareaAutogrow 
                :id="'textarea1'"
                v-model="textarea" 
                :placeholder="$t('contact.sent-email-form.placeholder-textarea')"
                customClasses="min-h-[72px] sp:min-h-[158px]"
            />
        </div>
        <div class="mt-2 sp:mt-4 text-right">
            <PrimaryButton 
                classes="text-center py-2.5 rounded-[10px] text-sm font-bold leading-[16px] shadow-guest inline px-4 ml-auto"
                :isLoading="loading"
                :disabled="!validSubmitButton || loading"
                @click="submit"
            >
                {{ loading ? $t('contact.sent-email-form.button-submit-loading') : $t('contact.sent-email-form.button-submit')}}
            </PrimaryButton> 
        </div>
    </BottomModal>
</template>
<script setup>
import { inject, ref, computed } from 'vue';
import BottomModal from '@/components/Modal/GeneralBottomSheet.vue';
import TextareaAutogrow from '@/components/TextareaAutogrow.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
//
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore()
import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore()
import { handleToast } from '@/composables/useToast';
const { toastSuccess } = handleToast();
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const isOpenSentEmailModal = inject('isOpenSentEmailModal')
const textarea = ref(null)
const loading = ref(false)

const submit = async () => {
    loading.value = true
    const response = await guestStore.$sendContactEmail({
        guestId: guestStore.guestData.id,
        stayId: stayStore.stayData.id,
        message: textarea.value
    })
    if(response.ok){
        isOpenSentEmailModal.value = false
        textarea.value = null
        toastSuccess(t('contact.sent-email-form.success-message'), 'bottom-toast-over-menu');
    }else{
        toastError(t('contact.sent-email-form.error-message'), 'bottom-toast-over-menu');
    }
    loading.value = false
}

const validSubmitButton = computed(() => {
    return Boolean(textarea.value?.trim())
})
</script>
