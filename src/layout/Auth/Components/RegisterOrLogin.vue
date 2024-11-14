<template>
    <div>
        <THInputText
            iconLeft="/assets/icons/WA.mail.svg"
            :placeholder="$t('guest.guestLog.email.placeholder')"
            :type="'email'"
            v-model="form.email"
            @handleError="emailError = $event"
            @blur="inputActive = false"
            @keyupInput="inputActive = true"
            textError="El formato de correo electrónico introducido no es correcto"
        />
        <!-- $t('guest.guestLog.email.error') -->
        <PrimaryButton 
            classes="text-center py-2.5 rounded-[10px] text-base font-bold leading-[20px] w-full shadow-guest block mt-4"
            :disabled="!validSubmitButton"
            @click="goRegisterOrLoginEmail()"
        >
            Continuar
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
            class="mt-4 bg-white hborder-black-100 shadow-hoster py-2 flex items-center justify-center w-full rounded-[10px] shadow-guest focus-hborder-black-100"
            @click="goRegisterOrLogin('google')"
        >
            <img class="w-6 h-6 mr-2" src="/assets/icons/1.TH.GOOGLE.svg" alt="icon google">
            <p class="text-sm font-bold leading-[16px]">Continuar con Google</p>
        </button>
        <!-- @click="goRegisterOrLogin('facebook')" -->
        <button 
            class="mt-4 bg-white hborder-black-100 shadow-hoster py-2 flex items-center justify-center w-full rounded-[10px] shadow-guest focus-hborder-black-100"
        >
            <img class="w-6 h-6 mr-2" src="/assets/icons/WA.facebook.svg" alt="icon google">
            <p class="text-sm font-bold leading-[16px]">Continuar con Facebook</p>
        </button>
        
    </div>
</template>
<script setup>
import { reactive, ref, computed, inject  } from 'vue';
import THInputText from '@/components/THInputText.vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import { navigateTo } from '@/utils/navigation'
//router
import { useRouter } from 'vue-router';
const router = useRouter();
//stores
import { useAuthStore } from '@/stores/modules/auth'
const authStore = useAuthStore()
import { useGuestStore } from '@/stores/modules/guest'
const guestStore = useGuestStore()
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
const { hotelData } = hotelStore

const emit = defineEmits(['enterPasswordToLogin'])

const emailError = ref(false)
const inputActive = ref(false)
const form = inject('form')

async function goRegisterOrLogin(type){
    let params = { type, email: form.email, subdomain : hotelData?.subdomain ?? null}
    await authStore.$registerOrLogin(params);
}

async function goRegisterOrLoginEmail(){
    let params = { email: form.email}
    let find = await guestStore.findByEmail(params);
    if(find && find.name && find.hasPassword){
        form.id = find.id;
        emit('enterPasswordToLogin')
    }else{
        let save = await guestStore.saveOrUpdateByEmail(params);
        if(!save) return
        if(hotelData){
            navigateTo('Home',{},{ g: save.id, acform : 'complete' })
        }else{
            //logica para cuando no se halla cargado un hotel
            router.push({ name : 'ChainLanding', query:{ g: save.id, acform : 'complete' }});
        }
    }
    
    // console.log('test goRegisterOrLoginEmail',res)
}

const validSubmitButton = computed(()=>{
    return !emailError.value && Boolean(form.email.trim());
    // && !inputActive.value;
})
</script>