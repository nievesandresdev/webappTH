<template>
    <div>
        <THInputText
            iconLeft="/assets/icons/WA.mail.svg"
            :placeholder="$t('auth.log-or-register.input')"
            :type="'email'"
            v-model="form.email"
            @handleError="emailError = $event"
            @blur="inputActive = false"
            @keyupInput="inputActive = true"
            :textError="$t('auth.log-or-register.text-error')"
        />
        <!-- $t('guest.guestLog.email.error') -->
        <PrimaryButton 
            classes="text-center py-2.5 rounded-[10px] text-base font-bold leading-[20px] w-full shadow-guest mt-4"
            :isLoading="loading"
            :disabled="!validSubmitButton || loading"
            @click="goRegisterOrLoginEmail()"
        >
            {{$t('auth.log-or-register.continue-button')}}
        </PrimaryButton> 
        <!-- :conditionClases="{'primary-disabled':!validSubmitButton}" -->
        <!-- separator -->
        <div class="mt-6 h-[17px] flex items-center">
            <div class="w-[143px] h-[1px] bg-[#E9E9E9]"></div>
            <p class="text-xs font-bold leading-[16px] mx-auto">o</p>
            <div class="w-[143px] h-[1px] bg-[#E9E9E9]"></div>
        </div>
        <!-- login with -->
        <button 
            class="mt-4 bg-white border hborder-black-100 shadow-hoster py-2 flex items-center justify-center w-full rounded-[10px] shadow-guest focus-hborder-black-100"
            @click="goRegisterOrLogin('google')"
        >
            <img class="w-6 h-6 mr-2" src="/assets/icons/1.TH.GOOGLE.svg" alt="icon google">
            <p class="text-sm font-bold leading-[16px]">{{$t('auth.log-or-register.continue-google')}}</p>
        </button>
        
        <button 
            @click="goRegisterOrLogin('facebook')"
            class="mt-4 bg-white border hborder-black-100 shadow-hoster py-2 flex items-center justify-center w-full rounded-[10px] shadow-guest focus-hborder-black-100"
        >
            <img class="w-6 h-6 mr-2" src="/assets/icons/WA.facebook.svg" alt="icon google">
            <p class="text-sm font-bold leading-[16px]">{{$t('auth.log-or-register.continue-fb')}}</p>
        </button>
        <p class="mt-4 text-sm font-medium leading-[16px] htext-alert-negative" v-if="route.query.error">
            {{ $t('auth.log-or-register.'+route.query.error) }}
        </p>
    </div>
</template>
<script setup>
import { reactive, ref, computed, inject, onMounted  } from 'vue';
import THInputText from '@/components/THInputText.vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import { navigateTo } from '@/utils/navigation'
//router
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
//stores
import { useChainStore } from '@/stores/modules/chain'
const chainStore = useChainStore()
import { useAuthStore } from '@/stores/modules/auth'
const authStore = useAuthStore()
import { useGuestStore } from '@/stores/modules/guest'
const guestStore = useGuestStore()
import { useStayStore } from '@/stores/modules/stay'
const stayStore = useStayStore()
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
const { hotelData } = hotelStore
import { useLocaleStore } from '@/stores/modules/locale'
const localeStore = useLocaleStore()

const emit = defineEmits(['enterPasswordToLogin','next'])

const emailError = ref(false)
const inputActive = ref(false)
const loading = ref(false)
const form = inject('form')

async function goRegisterOrLogin(type){
    loading.value = true;
    let params = { 
        type, 
        email: form.email, 
        subdomain : hotelStore.hotelData?.subdomain ?? null,
        hotelId : hotelStore.hotelData?.id ?? null,
        stayId : stayStore.stayData?.id,
    }
    await authStore.$registerOrLoginSN(params);
    loading.value = false;
}

async function goRegisterOrLoginEmail(){
    loading.value = true;
    let params = { 
        guestEmail: form.email,
        chainId : chainStore.chainData?.id,
        hotelId : hotelStore.hotelData?.id,
        language : localeStore.localeCurrent
    }
    let hasData = await guestStore.saveAndFindValidLastStay(params)
    if(hasData?.stay && hasData.guest?.hasPassword){
        form.id = hasData.guest.id;
        emit('enterPasswordToLogin')
    }else{
        if(localStorage.getItem('subdomain') && hasData.guest?.id){
            navigateTo('Home',{},{ g: hasData.guest?.id, acform : 'complete' })
        }else{
            //logica para cuando no se halla cargado un hotel
            router.push({ name : 'ChainLanding', query:{ g: hasData.guest.id, acform : 'complete' }});
        }    
    }
    emit('next');
    loading.value = false;
}

const validSubmitButton = computed(()=>{
    return !emailError.value && Boolean(form.email.trim());
})
</script>