<template>
    <div v-if="true" class="relative">
        <!-- Full-screen container to center the panel -->
        <div 
            class="fixed left-0 bottom-0 flex w-screen items-center justify-center z-[2500]" 
            :class="true ? 'dialog-enter-active' : 'dialog-leave-active'"
        >
            <!-- The actual dialog panel -->
            <div class="w-full bg-white rounded-t-[20px] relative">
                 <img class="absolute top-[-89px] w-full h-[189px]" src="/assets/icons/EllipseCHAINHOME.svg">
                 <div class="relative py-6" >
                    <img class="w-6 h-6 absolute left-4 top-[26px]" src="/assets/icons/WA.chevron.svg" alt="">
                    <h1 class="text-[20px] font-bold text-center leading-[28px] h-[31px] lato">
                        <!-- {{ $utils.capitalize($t('guest.guestLog.title')) }} -->
                        Inicia sesión o regístrate
                    </h1>
                    <div class="absolute top-[26px] right-4">
                        <MiniLangDropdown v-model="form.language" />
                    </div>
                </div>

                <template v-if="false">
      asdasd
                </template>
                <template v-else>
                    <div class="px-4 mb-14">
                        <div class="mt-4">
                            <h1 class="text-center text-[24px] font-medium leading-[28px] roboto">¡Te damos la bienvenida!</h1>
                            <p class="text-center text-[14px] font-medium leading-[16px] mt-2 lato">Disfruta de nuestra WebApp y gestiona tus estancias en cualquiera de nuestros hoteles.</p>
                        </div>
                        <div class="mt-6">
                            <THInputText
                                :placeholder="$t('guest.guestLog.email.placeholder')"
                                :type="'email'"
                                v-model="form.email"
                                @handleError="emailError = $event"
                                :textError="$t('guest.guestLog.email.error')"
                            />
                        </div>
                        <div class="mt-4">
                            <button class="bg-[#33333380] text-center py-2.5 rounded-[10px] text-base font-bold leading-[20px] text-[#FAFAFA40] w-full shadow-hoster">
                                Continuar
                            </button>
                        </div>
                        <div class="mt-6 h-[17px] flex items-center">
                            <div class="w-[143px] h-[1px] bg-[#E9E9E9]"></div>
                            <p class="text-xs font-bold leading-[16px] mx-auto">o</p>
                            <div class="w-[143px] h-[1px] bg-[#E9E9E9]"></div>
                        </div>
                        <div class="mt-4">
                            <button class="bg-white hborder-black-100 shadow-hoster py-2 flex items-center justify-center w-full rounded-[10px] shadow-guest">
                                <img class="w-6 h-6 mr-2" src="/assets/icons/1.TH.GOOGLE.svg" alt="icon google">
                                <p class="text-sm font-bold leading-[16px]">Continuar con Google</p>
                            </button>
                        </div>
                        <div class="mt-4">
                            <button class="bg-white hborder-black-100 shadow-hoster py-2 flex items-center justify-center w-full rounded-[10px] shadow-guest">
                                <img class="w-6 h-6 mr-2" src="/assets/icons/WA.facebook.svg" alt="icon google">
                                <p class="text-sm font-bold leading-[16px]">Continuar con Facebook</p>
                            </button>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed, watch } from 'vue';
import THInputText from '@/components/THInputText.vue';
import MiniLangDropdown from '../Components/MiniLangDropdown.vue';
// import { useHotelStore } from '@/stores/modules/hotel'

// const hotelStore = useHotelStore();
// const { hotelData } = hotelStore;

const emit = defineEmits(['closeModal']);

//data
const emailError = ref(false);

const form = reactive({
    name: null,
    email: null,
    language: 'es',
});

</script>   
<style scoped>
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

.dialog-enter-active {
    animation: fadeIn 0.5s ease;
}

.dialog-leave-active {
    animation: fadeOut 0.5s ease;
}
</style>



