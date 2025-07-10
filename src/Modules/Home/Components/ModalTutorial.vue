<template>
    <ModalNative :openProp="openProp" @closeModal="closeModal" width="340px" customClasses="'lato'">
        <div class="p-6">
            <h2 class="text-[18px] font-bold mb-6 lato">{{ $t('home.tutorial.modal.title') }}</h2>
            <p class="text-[14px] mb-3 lato font-normal">{{ $t('home.tutorial.modal.description') }}</p>
            
            <p class="text-[14px] font-bold mb-6 lato">{{ $t('home.tutorial.modal.deviceQuestion') }}</p>
            
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
                src="/assets/img/Android_logo_grey 1.svg" 
                alt="Android Background" 
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[93px] h-[110px]"
            />
            <div class="relative z-10">
                <h2 class="text-[18px] font-bold mb-6 lato">{{ $t('home.tutorial.modal.title') }}</h2>
                <p class="text-[14px] mb-6 font-normal lato">{{ $t('home.tutorial.modal.description') }}</p>
                
                <p class="text-[14px] mb-6 font-normal lato">
                    {{ $t('home.tutorial.modal.android.instructions', { device: 'Android', browser: 'Chrome' }) }}
                </p>

                <div class="space-y-4">
                    <div class="flex gap-1">
                        <span class="font-bold lato text-[14px]">1-</span>
                        <p class="text-[14px] font-normal lato">
                            {{ $t('home.tutorial.modal.android.step1') }}
                            <img src="/assets/icons/ellipsis-vertical.svg" alt="menu" class="inline-block w-4 h-4 ml-1"/>
                        </p>
                    </div>
                    <div class="flex gap-1">
                        <span class="font-bold lato text-[14px]">2-</span>
                        <p class="text-[14px] font-normal lato">
                            {{ $t('home.tutorial.modal.android.step2', { 
                                addToHome: $t('home.tutorial.modal.android.addToHome'), 
                                createShortcut: $t('home.tutorial.modal.android.createShortcut') 
                            }) }}
                        </p>
                    </div>
                    <div class="flex gap-1">
                        <span class="font-bold lato text-[14px]">3-</span>
                        <p class="text-[14px] font-normal lato">
                            {{ $t('home.tutorial.modal.android.step3', { add: $t('home.tutorial.modal.android.add') }) }}
                        </p>
                    </div>
                </div>

                <button 
                    class="w-full lato flex justify-center items-center h-10 px-4 py-2 gap-2 rounded-[10px] border border-white text-white text-sm font-bold hshadow-button bg-[#333333] mt-6"
                    @click="closeOSModal"
                >
                    {{ $t('home.tutorial.modal.understood') }}
                </button>
            </div>
        </div>
    </ModalNative>

    <ModalNative :openProp="showIOSModal" @closeModal="closeOSModal" width="340px" customClasses="'lato'">
        <div class="p-6 relative overflow-hidden">
            <img 
                src="/assets/img/Apple_logo_grey 1.svg" 
                alt="Apple Background" 
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[93px] h-[110px]"
            />
            <div class="relative z-10">
                <h2 class="text-[18px] font-bold mb-6 lato">{{ $t('home.tutorial.modal.title') }}</h2>
                <p class="text-[14px] mb-6 font-normal lato">{{ $t('home.tutorial.modal.description') }}</p>
                
                <p class="text-[14px] mb-6 font-normal lato">
                    {{ $t('home.tutorial.modal.ios.instructions', { device: 'iPhone', browser: 'Safari' }) }}
                </p>

                <div class="space-y-4">
                    <div class="flex gap-1">
                        <span class="font-bold lato text-[14px]">1-</span>
                        <p class="text-[14px] font-normal lato">
                            {{ $t('home.tutorial.modal.ios.step1') }}
                            <img src="/assets/icons/arrow-up-from-bracket.svg" alt="compartir" class="inline-block w-4 h-4 ml-1"/>
                        </p>
                    </div>
                    <div class="flex gap-1">
                        <span class="font-bold lato text-[14px]">2-</span>
                        <p class="text-[14px] font-normal lato">
                            {{ $t('home.tutorial.modal.ios.step2', { addToHome: $t('home.tutorial.modal.ios.addToHome') }) }}
                        </p>
                    </div>
                    <div class="flex gap-1">
                        <span class="font-bold lato text-[14px]">3-</span>
                        <p class="text-[14px] font-normal lato">
                            {{ $t('home.tutorial.modal.ios.step3', { add: $t('home.tutorial.modal.ios.add') }) }}
                        </p>
                    </div>
                </div>

                <button 
                    class="w-full lato flex justify-center items-center h-10 px-4 py-2 gap-2 rounded-[10px] border border-white text-white text-sm font-bold hshadow-button bg-[#333333] mt-6"
                    @click="closeOSModal"
                >
                    {{ $t('home.tutorial.modal.understood') }}
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