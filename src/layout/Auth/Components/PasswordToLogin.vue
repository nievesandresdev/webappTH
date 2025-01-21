<template>
    <div class="px-4">
        <THInputText
            type="password"
            :iconLeft="`/assets/icons/WA.lock.svg`"
            :placeholder="$t('auth.log.input-password')"
            v-model="form.password"
            :text-error="$t('auth.log.password-text-error')"
            :is-error="isError"
            @keyupInput="isError = false"
        />
        <div class="mt-4">
            <PrimaryButton 
                classes="text-center py-2.5 rounded-[10px] text-base font-bold leading-[20px] w-full shadow-guest"
                :disabled="!form.password"
                @click="submit"
            >
                {{ $t('auth.log.continue-button') }}
            </PrimaryButton> 
            <button 
                class="mt-4 lato text-sm font-bold leading-[16px] underline"
                @click="sendLinkToReset"
            >
                {{ $t('auth.log.forgot-question') }}
            </button>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, inject } from 'vue'
import { navigateTo } from '@/utils/navigation'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import { handleToast } from "@/composables/useToast"; 
const { toastSuccess } = handleToast();

  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();

import THInputText from '@/components/THInputText.vue';
//stores
import { useAuthStore } from '@/stores/modules/auth'
const authStore = useAuthStore()
import { useChainStore } from '@/stores/modules/chain'
const chainStore = useChainStore()
import { useGuestStore } from '@/stores/modules/guest'
const guestStore = useGuestStore()
import { useStayStore } from '@/stores/modules/stay'
const stayStore = useStayStore()
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
const { hotelData } = hotelStore
//router
import { useRouter } from 'vue-router';
const router = useRouter();

const isError = ref(false)
const form = inject('form')

async function submit(){
    let response = await authStore.$sendPasswordAndLogin(form);
    if(!response){
        isError.value = true;
    }else{
        //
        await authStore.$logIn(form.email);
        //
        form.password = '';
    }
}

async function sendLinkToReset(){
    let res = await authStore.$sendResetLinkEmail(form.email);
    if(res){
        toastSuccess(`${t('messageRequest.emailSuccess')}!`); 
    }
}

</script>