<template>
    <!-- <section class="container-fluid-landing pt-[80px] pb-[45px] space-y-[40px] bg-black h-full">
        <h1 class="font-semibold text-[40px]">Hotel tayko Sevilla</h1>
        <div class="flex justify-between">
            <div class="w-[661px] space-y-[40px]">
                <div class="title">
                    <h2 class="text-[32px] font-medium">
                        Descubre, Explora, Disfruta, Conecta
                    </h2>
                    <h3 class="text-[24px] font-medium">Todo a tu alcance</h3>
                </div>
                <div class="space-y-[40px]">
                    <div class="flex flex-wrap justify-between gap-y-[40px]">
                        <div class="flex items-center space-x-4">
                            <span class="inline-block p-2">
                                <img
                                    class="w-[45px]"
                                    src="/assets/icons/explora-default.svg"
                                    alt="explora-default"
                                >
                            </span>
                            <p class="text-[22px] font-medium">Descubre el hotel</p>
                        </div>
                        <div class="flex items-center space-x-4">
                            <span class="inline-block p-2">
                                <img
                                    class="w-[45px]"
                                    src="/assets/icons/camera-default.svg"
                                    alt="explora-default"
                                >
                            </span>
                            <p class="text-[22px] font-medium">Disfruta las experiencias</p>
                        </div>
                        <div class="flex items-center space-x-4">
                            <span class="inline-block p-2">
                                <img
                                    class="w-[45px]"
                                    src="/assets/icons/explora-default.svg"
                                    alt="explora-default"
                                >
                            </span>
                            <p class="text-[22px] font-medium">Explora la ciudad</p>
                        </div>
                        <div class="flex items-center space-x-4">
                            <span class="inline-block p-2">
                                <img
                                    class="w-[45px]"
                                    src="/assets/icons/Chatbubblelineoutline.svg"
                                    alt="explora-default"
                                >
                            </span>
                            <p class="text-[22px] font-medium">Conecta con el personal</p>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div class="w-[400px] space-y-[32px]">
                            <div class="w-full py-[19px] px-[24px] text-center hbg-yellow text-[22px] font-semibold">
                                Conoce más
                            </div>
                            <div class="h-full w-full">
                                <QRCodeVue3
                                    :width="400"
                                    :height="400"
                                    imgclass="souvenirs_img"
                                    :value="urlHuespedQR"
                                    :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
                                    :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
                                    :dotsOptions="{
                                        type: 'square',
                                        color: '#333333',
                                        gradient: {
                                            type: 'linear',
                                            rotation: 0,
                                            colorStops: [
                                                { offset: 0, color: '#333333' },
                                                { offset: 1, color: '#333333' },
                                            ],
                                        },
                                    }"
                                    :backgroundOptions="{ color: '#ffffff' }"
                                    fileExt="jpeg"
                                    :cornersSquareOptions="{ type: 'dot', color: '#333333' }"
                                    :cornersDotOptions="{ type: undefined, color: '#333333' }"
                                    :download="false"
                                    downloadButton="view-cart bg-info mt-3 souvenirs_btn"
                                    :downloadOptions="{ name: 'souvenirs', extension: 'jpeg' }"
                                    crossOrigin="anonymous"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <div class="w-[400px] h-[810px] pb-[50px] pt-[60px] px-[32px]" style="background-image: url('/assets/img/1.TH.DEV.MOCKUPTRANSPARENTE.svg')">
                <iframe 
                    class="w-full h-full" 
                    :src="urlHuespedMockup">
                </iframe>
            </div>
        </div>
    </section> -->
    <section class="w-full min-h-screen">
        <div class="w-[1120px] mx-[80px] 1xl:mx-auto mt-[80px] space-y-[40px] min-h-screen mb-[80px] ">
            <h1 class="font-semibold text-[40px] w-[661px] text-center">Hotel tayko Sevilla</h1>
            <div class="flex justify-between">
                <div class="w-[661px] space-y-[40px]">
                    <div class="title">
                        <h2 class="text-[32px] font-medium text-center">
                            Descubre, Explora, Disfruta, Conecta. <br>
                            Todo a tu alcance.
                        </h2>
                        <!-- <h2 class="text-[32px] font-medium">
                        </h2> -->
                    </div>
                    <div class="flex justify-between items-center w-full">
                        <div class="items-center h-full">
                            <img
                                src="/assets/img/1.TH.PHONE.QR.svg"
                                alt="1.TH.PHONE.QR"
                            >
                        </div>
                        <QRCodeVue3
                            :width="300"
                            :height="300"
                            imgclass="souvenirs_img"
                            :value="urlHuespedQR"
                            :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
                            :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
                            :dotsOptions="{
                                type: 'square',
                                color: '#333333',
                                gradient: {
                                    type: 'linear',
                                    rotation: 0,
                                    colorStops: [
                                        { offset: 0, color: '#333333' },
                                        { offset: 1, color: '#333333' },
                                    ],
                                },
                            }"
                            :backgroundOptions="{ color: '#ffffff' }"
                            fileExt="jpeg"
                            :cornersSquareOptions="{ type: 'dot', color: '#333333' }"
                            :cornersDotOptions="{ type: undefined, color: '#333333' }"
                            :download="false"
                            downloadButton="view-cart bg-info mt-3 souvenirs_btn"
                            :downloadOptions="{ name: 'souvenirs', extension: 'jpeg' }"
                            crossOrigin="anonymous"
                        />
                    </div>
                    <div class="flex justify-between">
                        <div class="flex flex-col justify-center">
                            <div class="inline-block p-[12px]">
                                <img
                                    class="w-[65px]"
                                    src="/assets/icons/explora-default.svg"
                                    alt="explora-default"
                                >
                            </div>
                            <p class="text-[17px] font-bold text-center">Descubre</p>
                        </div>
                        <div class="flex flex-col justify-center">
                            <div class="inline-block p-[12px]">
                                <img
                                    class="w-[65px]"
                                    src="/assets/icons/explora-default.svg"
                                    alt="explora-default"
                                >
                            </div>
                            <p class="text-[17px] font-bold text-center">Explora</p>
                        </div>
                        <div class="flex flex-col justify-center">
                            <div class="inline-block p-[12px]">
                                <img
                                    class="w-[65px]"
                                    src="/assets/icons/camera-default.svg"
                                    alt="explora-default"
                                >
                            </div>
                            <p class="text-[17px] font-bold text-center">Disfruta</p>
                        </div>
                        <div class="flex flex-col justify-center">
                            <div class="inline-block p-[12px]">
                                <img
                                    class="w-[65px]"
                                    src="/assets/icons/Chatbubblelineoutline.svg"
                                    alt="explora-default"
                                >
                            </div>
                            <p class="text-[17px] font-bold text-center">Conecta</p>
                        </div>
                    </div>
                </div> 
                <!-- pb-[20px] pt-[10px] px-[12px] -->
                <!-- <div class="w-[293px] h-[582px]" style="background-image: url('/assets/img/1.TH.DEV.MOCKUPTRANSPARENTE.svg'); object-fit: cover;"> -->
                <div class="w-[293px] h-[582px] relative pt-[50px] px-[25px] pb-[45px]">
                    <img
                        class="w-[293px] h-[582px] absolute top-0 left-0"
                        src="/assets/img/1.TH.DEV.MOCKUPTRANSPARENTE.svg"
                        alt="1.TH.DEV.MOCKUPTRANSPARENTE"
                    >
                    <iframe 
                        class="w-full h-full z-10"
                        :src="urlHuespedMockup">
                    </iframe>
                </div>
            </div>
        </div>
</section>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import QRCodeVue3 from "qrcode-vue3";

import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
 const { hotelData } = hotelStore;

onMounted(() => {
})

// COMPUTED
const urlHuespedMockup = computed(() => {
    let domain = window.location.origin;
    let { subdomain } = hotelData;
    let url = `${domain}/webapp/?subdomain=${subdomain}&mockup=true`;
    return url;
});
const urlHuespedQR = computed(() => {
    let domain = window.location.origin;
    let { subdomain } = hotelData;
    let url = `${domain}/webapp`;
    return url;
});

</script>