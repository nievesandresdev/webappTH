<template>
    <div 
        v-if="route.name === 'Home' && (showResetPassword || showRegisterOrLogin || showCompleteRegister || showCreateStay || showEnterPassword)" 
        class="fixed top-0 left-0 w-screen h-screen z-[9000] bg-[#00000080]"
    ></div>
    
    <BottomSheet :open-bottom-sheet="isOpenModal && !$utils.isMockup()">
        <img 
            v-if="route.name !== 'Home'"
            class="absolute top-[-89px] w-full h-[189px] z-[-1]" src="/assets/icons/EllipseCHAINHOME.svg"
        >
        <div class="px-4 pt-4">
            <WelcomeMsg v-if="showRegisterOrLogin && !showEnterPassword && route.name !== 'Home'"/>
            <div :class="{'mt-[96px]':showRegisterOrLogin && !showEnterPassword && route.name !== 'Home','mt-2':route.name == 'Home'}">
                <div>
                    <HeadSessionModal />
                </div>
                <!-- central container -->
                <div v-if="showRegisterOrLogin && !showEnterPassword && route.name == 'Home'" class="mt-10 pb-2">
                    <WelcomeMsg/>
                </div>
                <div class="pt-4">
                    <RegisterOrLogin 
                        @enterPasswordToLogin="showEnterPassword = true"
                        v-if="showRegisterOrLogin"
                    />
                    <PasswordToLogin v-else-if="showEnterPassword"/>
                    <CompleteRegistration v-else-if="showCompleteRegister"/>
                    <ResetPassword v-else-if="showResetPassword"/>
                    <FormCreateStay v-else-if="showCreateStay"/>
                </div>
            </div>
        </div>
    </BottomSheet>
</template>
<script setup>
import { ref, reactive, provide, toRefs, computed, watch } from 'vue'
import { navigateTo } from '@/utils/navigation'

import HeadSessionModal from './HeadSessionModal.vue'
import BottomSheet from '@/layout/Auth/Components/BottomSheet.vue'
import RegisterOrLogin from '@/layout/Auth/Components/RegisterOrLogin.vue';
import WelcomeMsg from '@/Modules/Chain/Components/WelcomeMsg.vue';
import CompleteRegistration from '@/layout/Auth/Components/CompleteRegistration.vue';
import ResetPassword from '@/layout/Auth/Components/ResetPassword.vue';
import FormCreateStay from '@/layout/Auth/Components/FormCreateStay.vue';
// import RegisterOrLogin from './Components/RegisterOrLogin.vue';
import PasswordToLogin from '@/layout/Auth/Components/PasswordToLogin.vue';
import { isMockup } from '@/utils/utils'
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { useStayStore } from '@/stores/modules/stay'
const stayStore = useStayStore();

import { useRoute } from 'vue-router';
const route = useRoute();

const showEnterPassword = ref(false)
const formType = ref(route.query.acform)

const form = reactive({
    id:'',
    email:'',
    type: null,
    password: null
})

watch(
  () => route.query.acform,
  (newAcform, oldAcform) => {
    console.log('acform ha cambiado de', oldAcform, 'a', newAcform);
    formType.value = newAcform;
    // Aquí puedes actualizar una variable reactiva o ejecutar otra lógica
  }
);


const isOpenModal = computed(() => {
    return showRegisterOrLogin.value || showCompleteRegister.value || showResetPassword.value || showCreateStay.value || showEnterPassword.value;
});

const showRegisterOrLogin = computed(() => {
    if(isMockup() || showEnterPassword.value) return false;
    let val = formType.value == 'log' || !guestStore.guestData && formType.value !== 'reset' && !formType.value
    || !route.query?.acform && route.name == 'ChainLanding';
    ;
    return val;
});

const showCompleteRegister = computed(() => {
    let val = formType.value == 'complete' || guestStore.guestData && !guestStore.guestData.name && !formType.value;
    console.log('test showCompleteRegister', val)
    return val;
});

const showResetPassword = computed(() => {
    return formType.value == 'reset'
});

const showCreateStay = computed(() => {
    let val = formType.value == 'createstay' || guestStore.guestData && guestStore.guestData.name && !stayStore.stayData && !formType.value;
    console.log('test showCreateStay', val)
    return val;
});

provide('form',form)
provide('showEnterPassword',showEnterPassword)
</script>