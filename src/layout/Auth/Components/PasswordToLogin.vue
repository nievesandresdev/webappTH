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
            <button 
                class="hbtn-primary text-center py-2.5 rounded-[10px] text-base font-bold leading-[20px] w-full shadow-guest"
                :class="{'primary-disabled':!form.password}"
                :disabled="!form.password"
                @click="submit"
            >
                Continuar
            </button>
            <router-link 
                class="mt-4 lato text-sm font-bold leading-[16px] underline"
                :to="{name : 'ResetPassword', query: { email : form.email}}"
            >
                ¿Has olvidado tu contraseña?
            </router-link>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, inject } from 'vue'
import { navigateTo } from '@/utils/navigation'
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
        await guestStore.findAndValidLastStayAndLogHotel({guestId : form.id, chainId : chainStore.chainData.id})
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
</script>