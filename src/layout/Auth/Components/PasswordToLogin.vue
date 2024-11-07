<template>
    <div class="px-4">
        <THInputText
            type="password"
            :iconLeft="`/assets/icons/WA.lock.svg`"
            placeholder="Introduce una contraseña"
            v-model="form.password"
            text-error="La contraseña introducida es incorrecta"
            :is-error="isError"
            @keyupInput="isError = false"
        />
        <div class="mt-4">
            <PrimaryButton 
                classes="text-center py-2.5 rounded-[10px] text-base font-bold leading-[20px] w-full shadow-guest"
                :disabled="!form.password"
                @click="submit"
            >
                Continuar
            </PrimaryButton> 
            <button 
                class="mt-4 lato text-sm font-bold leading-[16px] underline"
                @click="sendLinkToReset"
            >
                ¿Has olvidado tu contraseña?
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
        if(!stayStore?.stayData){
            //aqui entra solo si no hay una estancia cargada antes de culminar registro
            await guestStore.findAndValidLastStayAndLogHotel({guestId : form.id, chainId : chainStore.chainData.id})
        }else{
            //aqui entra si ya hay una estancia cargada (viene por url)
            if(Boolean(sessionStorage.getItem('guestPerStay'))){
                let response = await guestStore.createAccessInStay()
                console.log('test createAccessInStay',response)
                if(response?.stay){
                    //actualizar estancia
                    await stayStore.setStayData(response.stay)
                }
            }else{
                //sino elimina la estancia actual para que el huesped tenga que crear una
                await stayStore.deleteLocalStayData()
            }
        }
        form.password = '';
        if(stayStore.stayData){
            console.log('redirect to home')
            navigateTo('Home')
        }else{
            if(hotelData){
                console.log('redirect to create stay')
                navigateTo('Home',{},{ acform : 'createstay' })
            }else{
                console.log('redirect to otros')
                //logica para cuando no se halla cargado un hotel
                if(localStorage.getItem('subdomain')){
                    router.push({ name:'CreateStayFromChain' })
                }else{
                    router.push({ name:'HotelsList' })
                }
            }
        }
    }
}

async function sendLinkToReset(){
    let res = await authStore.$sendResetLinkEmail(form.email);
    if(res){
        toastSuccess("Correo enviado!"); 
    }
}

</script>