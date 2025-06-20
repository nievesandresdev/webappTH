<template>
    <ModalNative :openProp="openProp" @closeModal="closeModal" width="340px" customClasses="'lato'">
        <div class="p-6">
            <h2 class="text-[18px] font-bold mb-6 lato">¡Acceso rápido a la WebApp!</h2>
            <p class="text-[14px] mb-3 lato font-normal">Añade un acceso rápido a la WebApp en el escritorio de tu móvil en 3 simples pasos.</p>
            
            <p class="text-[14px] font-bold mb-6 lato">¿Qué tipo de móvil utilizas?</p>
            
            <div class="flex flex-col gap-4">
                <button 
                    class="w-full lato flex justify-center items-center h-8 sp:h-10 sp:px-4 px-1 py-2 gap-2 rounded-[10px] border border-white text-white sp:text-sm text-[12px] font-bold hshadow-button bg-[#333333]"
                    @click="openOSModal('ios')"
                >
                    <img src="/assets/icons/apple.svg" class="sp:w-6 sp:h-6 h-5 w-5" alt="iPhone" />
                    iPhone
                </button>
                <button 
                    class="w-full lato flex justify-center items-center h-8 sp:h-10 sp:px-4 px-1 py-2 gap-2 rounded-[10px] border border-white text-white sp:text-sm text-[12px] font-bold hshadow-button bg-[#333333]"
                    @click="openOSModal('android')"
                >
                    <img src="/assets/icons/android.svg" class="sp:w-6 sp:h-6 h-5 w-5" alt="Android" />
                    Android
                </button>
            </div>
        </div>
    </ModalNative>

    <ModalNative :openProp="showAndroidModal" @closeModal="closeOSModal" width="340px" customClasses="'lato'">
        <div class="p-6 relative overflow-hidden">
            <img 
                src="/assets/icons/android.svg" 
                alt="Android Background" 
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48"
            />
            <div class="relative z-10">
                <h2 class="text-[18px] font-bold mb-6 lato">¡Acceso rápido a la WebApp!</h2>
                <p class="text-[14px] mb-6 font-normal lato">Añade un acceso rápido a la WebApp en el escritorio de tu móvil en 3 simples pasos.</p>
                
                <p class="text-[14px] mb-6 font-normal lato">Si tu móvil es <span class="font-bold lato text-[14px]">Android</span> y navegas con <span class="font-bold lato text-[14px]">Chrome:</span></p>

                <div class="space-y-4">
                    <div class="flex gap-1">
                        <span class="font-bold lato text-[14px]">1-</span>
                        <p class="text-[14px] font-normal lato">Toca el icono de tres puntos verticales <img src="/assets/icons/ellipsis-vertical.svg" alt="menu" class="inline-block w-4 h-4 ml-1"/> (en la esquina superior derecha)</p>
                    </div>
                    <div class="flex gap-1">
                        <span class="font-bold lato text-[14px]">2-</span>
                        <p class="text-[14px] font-normal lato">Toca en la opción "<span class="font-bold lato text-[14px]">Agregar a pantalla de inicio</span>" y "<span class="font-bold lato text-[14px]">Crear atajo</span>"</p>
                    </div>
                    <div class="flex gap-1">
                        <span class="font-bold lato text-[14px]">3-</span>
                        <p class="text-[14px] font-normal lato">Edita el nombre (si lo deseas) y toca "<span class="font-bold lato text-[14px]">Agregar</span>"</p>
                    </div>
                </div>

                <button 
                    class="w-full lato flex justify-center items-center h-10 px-4 py-2 gap-2 rounded-[10px] border border-white text-white text-sm font-bold hshadow-button bg-[#333333] mt-6"
                    @click="closeOSModal"
                >
                    Entendido
                </button>
            </div>
        </div>
    </ModalNative>

    <ModalNative :openProp="showIOSModal" @closeModal="closeOSModal" width="340px" customClasses="'lato'">
        <div class="p-6 relative overflow-hidden">
            <img 
                src="/assets/icons/apple.svg" 
                alt="Apple Background" 
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48"
            />
            <div class="relative z-10">
                <h2 class="text-[18px] font-bold mb-6 lato">¡Acceso rápido a la WebApp!</h2>
                <p class="text-[14px] mb-6 font-normal lato">Añade un acceso rápido a la WebApp en el escritorio de tu móvil en 3 simples pasos.</p>
                
                <p class="text-[14px] mb-6 font-normal lato">Si tu móvil es <span class="font-bold lato text-[14px]">iPhone</span> y navegas con <span class="font-bold lato text-[14px]">Safari:</span></p>

                <div class="space-y-4">
                    <div class="flex gap-1">
                        <span class="font-bold lato text-[14px]">1-</span>
                        <p class="text-[14px] font-normal lato">Toca el icono de Compartir <img src="/assets/icons/arrow-up-from-bracket.svg" alt="compartir" class="inline-block w-4 h-4 ml-1"/> (en el pie de la pantalla)</p>
                    </div>
                    <div class="flex gap-1">
                        <span class="font-bold lato text-[14px]">2-</span>
                        <p class="text-[14px] font-normal lato">Toca en la opción "<span class="font-bold lato text-[14px]">Añadir a pantalla de inicio</span>"</p>
                    </div>
                    <div class="flex gap-1">
                        <span class="font-bold lato text-[14px]">3-</span>
                        <p class="text-[14px] font-normal lato">Edita el nombre (si lo deseas) y toca "<span class="font-bold lato text-[14px]">Añadir</span>"</p>
                    </div>
                </div>

                <button 
                    class="w-full lato flex justify-center items-center h-10 px-4 py-2 gap-2 rounded-[10px] border border-white text-white text-sm font-bold hshadow-button bg-[#333333] mt-6"
                    @click="closeOSModal"
                >
                    Entendido
                </button>
            </div>
        </div>
    </ModalNative>
</template>

<script setup>
import ModalNative from '@/components/ModalNative.vue';
import { ref, onMounted } from 'vue';
import { detectOS } from '@/utils/helpers';

const showAndroidModal = ref(false);
const showIOSModal = ref(false);
const deviceInfo = ref({
    isIOS: false,
    isAndroid: false,
    browser: 'other'
});

onMounted(() => {
    deviceInfo.value = detectOS();
});

const props = defineProps({
    openProp: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['closeModal']);

const closeModal = () => {
    emit('closeModal');
}

const openOSModal = (os) => {
    closeModal();
    if (os === 'android') {
        showAndroidModal.value = true;
    } else {
        showIOSModal.value = true;
    }
}

const closeOSModal = () => {
    showAndroidModal.value = false;
    showIOSModal.value = false;
}
</script> 