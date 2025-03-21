<template>
    <!-- Fondo semitransparente para "Home" -->
    <div 
        v-if="route.name === 'Home' && (showResetPassword || showRegisterOrLogin || showCompleteRegister || showCreateStay || showEnterPassword)" 
        class="fixed top-0 left-0 w-screen h-screen z-[9000] bg-[#00000080]"
    ></div>
    
    <BottomSheet :open-bottom-sheet="isOpenModal && !$utils.isMockup()">
        <!-- Imagen decorativa para rutas distintas a Home -->
        <img 
            v-if="route.name !== 'Home'"
            class="absolute top-[-89px] w-full h-[189px] z-[-1]" 
            src="/assets/icons/EllipseCHAINHOME.svg"
        >
        <div class="px-4 pt-4">
            <!-- Mensaje de bienvenida para rutas distintas a Home; se muestra solo cuando la transición finalizó -->
            <!-- class="mb-[96px]" -->

            
            <div class="h-[68px] mt-[-60px]">
                <WelcomeMsg v-if="showRegisterOrLogin && !showEnterPassword && route.name !== 'Home' && transitionFinished"/>
            </div>
            
             <!-- class="h-[412px] overflow-hidden" -->
            <div :class="{'mt-4': route.name == 'ChainLanding'}">
                <div class="h-[31px] overflow-hidden">
                    <HeadSessionModal @back="handleBack"/>
                </div>
                <!-- Mensaje de bienvenida extra para Home -->
                <div v-if="showRegisterOrLogin && !showEnterPassword && route.name === 'Home'" class="pt-4 h-[84px]">
                    <WelcomeMsg/>
                </div>
                <!-- container forms -->
                <div class="pt-4 overflow-y-auto" :class="{'h-[381px]': !heightHomeLog, 'h-[297px]': heightHomeLog}">
                    <!-- Transición tipo carrusel -->
                    <Transition :name="transitionName" mode="out-in" @after-enter="handleTransitionFinish">
                        <component 
                          :is="currentFormComponent" 
                          :key="currentFormKey"
                          @next="handleNext"
                          @back="handleBack"
                          @enterPasswordToLogin="handleEnterPasswordToLogin"
                        />
                    </Transition>
                </div>
            </div>
        </div>
    </BottomSheet>
</template>

<script setup>
import { ref, reactive, computed, watch, provide } from 'vue'
import { useRoute } from 'vue-router'
import { useGuestStore } from '@/stores/modules/guest'
import { useStayStore } from '@/stores/modules/stay'

import HeadSessionModal from './HeadSessionModal.vue'
import BottomSheet from '@/layout/Auth/Components/BottomSheet.vue'
import RegisterOrLogin from '@/layout/Auth/Components/RegisterOrLogin.vue'
import WelcomeMsg from '@/Modules/Chain/Components/WelcomeMsg.vue'
import CompleteRegistration from '@/layout/Auth/Components/CompleteRegistration.vue'
import ResetPassword from '@/layout/Auth/Components/ResetPassword.vue'
import FormCreateStay from '@/layout/Auth/Components/FormCreateStay.vue'
import PasswordToLogin from '@/layout/Auth/Components/PasswordToLogin.vue'
import { isMockup } from '@/utils/utils'

const route = useRoute()
const guestStore = useGuestStore()
const stayStore = useStayStore()

const showEnterPassword = ref(false)
const formType = ref(route.query.acform ?? 'log')

const form = reactive({
    id: '',
    email: '',
    type: null,
    password: null
})


const heightHomeLog = computed(() => {
    console.log('test formType.value', formType.value)
    return formType.value == 'log' && route.name == 'Home' && !showEnterPassword.value;
});
// Mantenemos las condiciones originales para cada formulario:
const showRegisterOrLogin = computed(() => {
    if(isMockup() || showEnterPassword.value) return false;
    return (formType.value === 'log' && !stayStore.stayData) || 
           (!guestStore.guestData && formType.value !== 'reset' && !formType.value) ||
           (!route.query?.acform && route.name === 'ChainLanding');
});

const showCompleteRegister = computed(() => {
    return formType.value === 'complete' || (guestStore.guestData && !guestStore.guestData.name && !formType.value);
});

const showResetPassword = computed(() => {
    return formType.value === 'reset';
});

const showCreateStay = computed(() => {
    return formType.value === 'createstay' || (guestStore.guestData && guestStore.guestData.name && !stayStore.stayData && !formType.value);
});

const isOpenModal = computed(() => {
    return showRegisterOrLogin.value || showCompleteRegister.value || showResetPassword.value || showCreateStay.value || showEnterPassword.value;
});

// Variable para controlar la dirección de la transición (slide-left o slide-right)
const transitionName = ref('');
// Flag para indicar cuando la transición ha finalizado
const transitionFinished = ref(true);

// Computed para seleccionar el componente actual según el estado
const currentFormComponent = computed(() => {
    if(showRegisterOrLogin.value && !showEnterPassword.value) return RegisterOrLogin;
    if(showEnterPassword.value) return PasswordToLogin;
    if(showCompleteRegister.value) return CompleteRegistration;
    if(showResetPassword.value) return ResetPassword;
    if(showCreateStay.value) return FormCreateStay;
    return null;
});

// Key para forzar el re-render y activar la transición
const currentFormKey = computed(() => {
    if(showRegisterOrLogin.value && !showEnterPassword.value) return 'register';
    if(showEnterPassword.value) return 'enterPassword';
    if(showCompleteRegister.value) return 'complete';
    if(showResetPassword.value) return 'reset';
    if(showCreateStay.value) return 'createStay';
    return 'default';
});

// Funciones para manejar la navegación entre formularios
function handleNext() {
    // Antes de iniciar la transición, marcamos que aún no ha finalizado
    transitionFinished.value = false;
    transitionName.value = 'slide-left';
}

function handleBack() {
    transitionFinished.value = false;
    transitionName.value = 'slide-right';
}

function handleEnterPasswordToLogin() {
    transitionFinished.value = false;
    transitionName.value = 'slide-left';
    showEnterPassword.value = true;
}

// Esta función se ejecuta al terminar la transición
function handleTransitionFinish() {
    transitionFinished.value = true;
}

// Observa cambios en la query para actualizar formType
watch(
  () => route.query.acform,
  (newAcform, oldAcform) => {
    console.log('acform ha cambiado de', oldAcform, 'a', newAcform);
    formType.value = newAcform;
  }
);

// Observar cambios en el estado del modal para controlar el scroll del body
watch(
  () => isOpenModal.value && !isMockup(),
  (shouldBlockScroll) => {
    if (shouldBlockScroll) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  },
  { immediate: true }
);

provide('form', form)
provide('showEnterPassword', showEnterPassword)
</script>

<style scoped>
/* Transición para avanzar (slide-left) */
.slide-left-enter-active, .slide-left-leave-active {
  transition: transform 0.2s ease;
}
.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}

/* Transición para retroceder (slide-right) */
.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.2s ease;
}
.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
