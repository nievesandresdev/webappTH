<template>
    <div class="px-4">
        <div class="mt-4">
            <THInputText
                iconLeft="/assets/icons/WA.user.svg"
                :placeholder="$t('auth.register.input-name')"
                v-model="form.name"
            />
        </div>
        <div class="mt-4">
            <THInputText
                :iconLeft="`/assets/icons/WA.mail${emailDisabled ? 'DISABLED' : ''}.svg`"
                :placeholder="$t('auth.register.input-email')"
                :type="'email'"
                v-model="form.email"
                @handleError="emailError = $event"
                :textError="$t('auth.register.input-email-error')"
                :disabled="emailDisabled"
            />
        </div>
        <div class="mt-4">
            <THInputText
                type="password"
                :iconLeft="`/assets/icons/WA.lock${passDisabled ? 'DISABLED' : ''}.svg`"
                :placeholder="$t('auth.register.input-password')"
                v-model="form.password"
                :disabled="passDisabled"
            />
        </div>
        <p 
            class="mt-6 text-[10px] lato font-bold leading-[12px]"
        >
        {{$t('auth.register.policies-text')}}    
        <router-link :to="{name:'PrivacyPolicies'}"  class="underline">{{$t('auth.register.policies-title')}}</router-link>
        </p>
        <div class="mt-4">
            <PrimaryButton 
                classes="text-center py-2.5 rounded-[10px] text-base font-bold leading-[20px] w-full shadow-guest"
                :disabled="!validSubmitButton"
                @click="submit"
            >
                {{$t('auth.register.continue-button')}}
            </PrimaryButton> 
        </div>
        <div class="my-6 bg-border-secondary w-full h-[1px]"></div>
        <p class="lato text-[10px] font-bold leading-[12px]">
            {{hotelStore.hotelData ? hotelStore.hotelData.name : (chainStore.$name ?? $t('auth.register.the-chain'))}}
            {{$t('auth.register.text-info-1')}}
        </p>
        <div class="mt-4 flex items-center">
            <input type="checkbox" class="hborder-black-100 w-4 h-4">
            <p class="lato text-[10px] font-bold leading-[12px] ml-1">{{$t('auth.register.text-info-2')}}</p>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import THInputText from '@/components/THInputText.vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import { navigateTo } from '@/utils/navigation'
import { getUrlParam } from '@/utils/utils'
import { useRouter } from 'vue-router';
import { handleToast } from "@/composables/useToast"; 
const { toastSuccess } = handleToast();

  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();

//stores
import { useGuestStore } from '@/stores/modules/guest'
const guestStore = useGuestStore()
import { useAuthStore } from '@/stores/modules/auth'
const authStore = useAuthStore()
import { useChainStore } from '@/stores/modules/chain'
const chainStore = useChainStore()
import { useStayStore } from '@/stores/modules/stay'
const stayStore = useStayStore()
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()

const router = useRouter();

const emailError = ref(false)
const method = ref(null)
const form = reactive({
    id:'',
    name:'',
    email:'',
    password: ''
})

onMounted(async () => {
    form.id = getUrlParam('g');
    method.value = getUrlParam('m');
    let guestData = await guestStore.findById(form.id);
    form.email = guestData?.email ?? '';
    if(method.value == 'google'){
        form.name = guestData?.name ?? '';
        form.password = '123456789';
    }
})

async function submit(){
    if(method.value == 'google' && method.value == 'facebook') form.password = null;
    let guestData = await authStore.$updateGuestById(form);
    guestStore.setLocalGuest(guestData)

    if(!stayStore?.stayData){
        //aqui entra solo si no hay una estancia cargada antes de culminar registro
        await guestStore.findAndValidLastStayAndLogHotel({guestEmail : guestData.email, chainId : chainStore.chainData?.id, hotelId : hotelStore.hotelData?.id})
    }else{
        //aqui entra si ya hay una estancia cargada (viene por url)
        if(Boolean(sessionStorage.getItem('guestPerStay'))){
            let response = await guestStore.createAccessInStay()
                if(response?.stay){
                    //actualizar estancia
                    await stayStore.setStayData(response.stay)
                    await hotelStore.$setAndLoadLocalHotel(response.stay.hotelSubdomain)
                }
        }else{
            //sino elimina la estancia actual para que el huesped tenga que crear una
            await stayStore.deleteLocalStayData()
        }
    }

    //limpiar
    sessionStorage.removeItem('guestPerStay')
    if(stayStore.stayData){
            navigateTo('Home')
    }else{
        if(hotelStore.hotelData){
            navigateTo('Home',{},{ acform : 'createstay' })
        }else{
            //logica para cuando no se halla cargado un hotel
            router.push({ name:'HotelsList' })
        }
    }
    toastSuccess(t('messageRequest.recordSuccess')); 
}

const passDisabled = computed(()=>{
    return method.value == 'google';
})

const emailDisabled = computed(()=>{
    return method.value == 'google';
})

const validSubmitButton = computed(()=>{
    return !emailError.value && 
            Boolean(form.name.trim()) && 
            Boolean(form.email.trim()) && 
            Boolean(form.password.trim()) && form.password.length > 6;
    
})
</script>