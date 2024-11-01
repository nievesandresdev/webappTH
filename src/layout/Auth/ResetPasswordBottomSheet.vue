<template>
    <BottomSheet :open-bottom-sheet="open && !$utils.isMockup()">
        <img 
            v-if="route.name !== 'Home'"
            class="absolute top-[-89px] w-full h-[189px] z-[-1]" src="/assets/icons/EllipseCHAINHOME.svg"
        >
        <div class="px-4 pt-6">
            <div :class="{'mt-2':route.name == 'Home'}">
                <HeadInChain 
                    text="Cambiar contraseña"
                    title-classes="h-[31px] lato text-[20px] font-bold leading-[30px] w-[243px] text-center"
                />
                <div class="mt-10">
                    <div class="">
                        <THInputText
                            type="password"
                            :iconLeft="`/assets/icons/WA.lock.svg`"
                            placeholder="Introduce tu nueva contraseña"
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
                                Cambiar contraseña
                            </PrimaryButton> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BottomSheet>
</template>
<script setup>
import { ref, reactive, onMounted, toRefs } from 'vue'
import { getUrlParam } from '@/utils/utils'
import BottomSheet from '@/components/Modal/BottomSheet.vue'
import THInputText from '@/components/THInputText.vue';
import HeadInChain from '@/Modules/Chain/Components/HeadInChain.vue';
import { handleToast } from "@/composables/useToast"; 
const { toastSuccess } = handleToast();
//store
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
const { hotelData } = hotelStore
import { useAuthStore } from '@/stores/modules/auth'
const authStore = useAuthStore()
//router
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const props = defineProps({
    open:{
        type: Boolean,
        default: false
    }
})

const { open } = toRefs(props)

const isError = ref(false)
const token = ref(null)

const form = reactive({
    id:'',
    email:'',
    type: null,
    password: null
})


onMounted(async () => {
    token.value = getUrlParam('token');
    if(!token.value){
        router.push({ name: hotelData ? 'Home' : 'ChainLanding'})
    }
})

async function submit(){
    let res = await authStore.$resetPassword(token.value, form.password)
    if(res){
        toastSuccess("Contraseña actualizada!"); 
        router.push({ name: hotelData ? 'Home' : 'ChainLanding'})
    }
}



</script>