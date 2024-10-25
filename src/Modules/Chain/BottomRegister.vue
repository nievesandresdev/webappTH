<template>
    <div v-if="true" class="relative">
        <!-- Full-screen container to center the panel -->
        <div 
            class="fixed left-0 bottom-0 flex w-screen items-center justify-center z-[2500]" 
            :class="true ? 'dialog-enter-active' : 'dialog-leave-active'"
        >
            <!-- The actual dialog panel -->
            <div class="w-full bg-white rounded-t-[20px] relative pb-14">
                 <img class="absolute top-[-89px] w-full h-[189px]" src="/assets/icons/EllipseCHAINHOME.svg">
                <div class="relative py-6" >
                    <img class="w-6 h-6 absolute left-4 top-[27px]" src="/assets/icons/WA.chevron.svg" alt="">
                    <h1 class="text-[20px] font-bold text-center leading-[28px] h-[31px] lato">
                        <!-- {{ $utils.capitalize($t('guest.guestLog.title')) }} -->
                        <template v-if="true">
                            Termina de registrarte
                        </template>
                        <template v-else>
                            Inicia sesión o regístrate
                        </template>
                    </h1>
                    <div class="absolute top-[27px] right-4">
                        <FormLangDropdown v-model="form.language" />
                    </div>
                </div>

               
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed, watch } from 'vue';
import FormLangDropdown from '@/components/Dropdowns/FormLangDropdown.vue'
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
    password:null
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



