<template>
    <div class="mt-6">
        <div class="">
            <THInputText
                type="password"
                :iconLeft="`/assets/icons/WA.lock.svg`"
                :placeholder="$t('auth.reset-pass.input-placeholder')"
                v-model="form.password"
                :text-error="$t('auth.reset-pass.input-error')"
                :is-error="isError"
                @keyupInput="isError = false"
            />
            <div class="mt-4">
                <PrimaryButton 
                    classes="text-center py-2.5 rounded-[10px] text-base font-bold leading-[20px] w-full shadow-guest"
                    :disabled="!form.password"
                    @click="submit"
                >
                    {{ $t('auth.reset-pass.continue-button') }}
                </PrimaryButton> 
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, toRefs } from 'vue'
import { getUrlParam } from '@/utils/utils'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import THInputText from '@/components/THInputText.vue';
import { navigateTo } from '@/utils/navigation'
import { handleToast } from "@/composables/useToast"; 
const { toastSuccess } = handleToast();
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
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
    if(!token.value && open.value){
        if(hotelData){
            navigateTo('Home')
        }else{
            router.push({ name: 'ChainLanding'})
        }   
    }
})

async function submit(){
    let res = await authStore.$resetPassword(token.value, form.password)
    if(res){
        toastSuccess(`${t('messageRequest.passwordUpdated')}!`); 
        router.push({ name: hotelData ? 'Home' : 'ChainLanding'})
    }
}



</script>