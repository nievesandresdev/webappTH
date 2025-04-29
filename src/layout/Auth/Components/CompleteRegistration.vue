<template>
    <div class="px-4">
        <div class="">
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
        <p class="lato text-[10px] font-bold leading-[12px] mt-1">{{$t('auth.register.password-info')}}</p>
        <p 
            class="mt-4 text-[10px] lato font-bold leading-[12px]"
        >
        {{$t('auth.register.policies-text')}}    
        <span @click="navigateTo('PrivacyPolicies')"  class="underline">{{$t('auth.register.policies-title')}}</span>
        </p>
        <div class="mt-4">
            <PrimaryButton 
                classes="text-center py-2.5 rounded-[10px] text-base font-bold leading-[20px] w-full shadow-guest block"
                :isLoading="loading"
                :disabled="!validSubmitButton || loading"
                @click="submit"
            >
                {{ loading ? $t('auth.register.complete-register') : $t('auth.register.continue-button')}}
            </PrimaryButton> 
        </div>
        <!-- <div class="my-2 bg-border-secondary w-full h-[1px]"></div> -->
        <p class="lato text-[10px] font-bold leading-[12px] mt-2">
            {{hotelStore.hotelData ? hotelStore.hotelData.name : (chainStore.$name ?? $t('auth.register.the-chain'))}}
            {{$t('auth.register.text-info-1')}}
        </p>
        <div class="mt-2 flex items-center">
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
import { useLocaleStore } from '@/stores/modules/locale'
const localeStore = useLocaleStore()


const emit = defineEmits(['next'])

const router = useRouter();

const emailError = ref(false)
const loading = ref(false)
const method = ref(null)
const form = reactive({
    id:'',
    name:'',
    email:'',
    password: '',
    lang_web: localeStore.localeCurrent
})

onMounted(async () => {
    
    form.id = guestStore.guestData?.id;
    // console.log('test form.id',form.id)
    // console.log('test complete')
    if(!form.id){
        if(localStorage.getItem('subdomain')){
            navigateTo('Home',{},{ acform : 'log' })
        }else{
            router.push({ name:'ChainLanding'});
        }
        
    }
    method.value = getUrlParam('m');
    // let guestData = await guestStore.findById(form.id);
    form.email = guestStore.guestData?.email ?? '';
    if(method.value == 'google'){
        form.name = guestStore.guestData?.name ?? '';
        form.password = '123456789';
    }
})

async function submit(){
    loading.value = true;
    if(method.value == 'google' && method.value == 'facebook') form.password = null;
    let guestData = await authStore.$updateGuestById(form);
    guestStore.setLocalGuest(guestData)

    await authStore.$logIn(guestData.email);
    loading.value = false;
    toastSuccess(t('messageRequest.recordSuccess')); 
    emit('next')
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
            Boolean(form.password.trim()) && form.password.length > 7;
    
})
</script>