<template>
    <div class="px-4">
        <div class="mt-4">
            <THInputText
                iconLeft="/assets/icons/WA.user.svg"
                placeholder="Introduce tu nombre"
                v-model="form.name"
            />
        </div>
        <div class="mt-4">
            <THInputText
                :iconLeft="`/assets/icons/WA.mail${emailDisabled ? 'DISABLED' : ''}.svg`"
                :placeholder="$t('guest.guestLog.email.placeholder')"
                :type="'email'"
                v-model="form.email"
                @handleError="emailError = $event"
                :textError="$t('guest.guestLog.email.error')"
                :disabled="emailDisabled"
            />
        </div>
        <div class="mt-4">
            <THInputText
                type="password"
                :iconLeft="`/assets/icons/WA.lock${passDisabled ? 'DISABLED' : ''}.svg`"
                placeholder="Introduce una contraseña"
                v-model="form.password"
                :disabled="passDisabled"
            />
        </div>
        <p 
            class="mt-6 text-[10px] lato font-bold leading-[12px]"
        >Al seleccionar Aceptar y continuar, acepto la <a href="javascript:void(0)" class="underline">Política de Privacidad.</a></p>
        <div class="mt-4">
            <button 
                class="hbtn-primary text-center py-2.5 rounded-[10px] text-base font-bold leading-[20px] w-full shadow-guest"
                :class="{'primary-disabled':!validSubmitButton}"
                :disabled="!validSubmitButton"
                @click="submit"
            >
                Aceptar y continuar
            </button>
        </div>
        <div class="my-6 bg-border-secondary w-full h-[1px]"></div>
        <p class="lato text-[10px] font-bold leading-[12px]">Riu Hotels & Resorts te enviará comunicaciones comerciales y promociones personalizadas por correo electrónico, SMS u otros medios electrónicos sobre productos y servicios</p>
        <div class="mt-4 flex items-center">
            <input type="checkbox" class="hborder-black-100 w-4 h-4">
            <p class="lato text-[10px] font-bold leading-[12px] ml-1">No quiero recibir mensajes promocionales.</p>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import THInputText from '@/components/THInputText.vue';
import { getUrlParam } from '@/utils/utils'
import { useRouter } from 'vue-router';
//stores
import { useGuestStore } from '@/stores/modules/guest'
const guestStore = useGuestStore()
import { useAuthStore } from '@/stores/modules/auth'
const authStore = useAuthStore()
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
    form.name = guestData.name ?? '';
    form.email = guestData.email ?? '';
    if(method.value == 'google'){
        form.password = '123456789';
    }
})

async function submit(){
    if(method.value == 'google' && method.value == 'tripadvisor') form.password = null;
    let guestData = await authStore.$updateGuestById(form);
    guestStore.setLocalGuest(guestData)
    if(hotelStore.hotelData){
        
    }else{
        router.push({ name:'HotelsList' })
    }
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