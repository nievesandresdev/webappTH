<template>
    <div class="flex px-20 mt-10 container-info">
        <!--Aside left-->
        <div class="w-[32.438rem] h-full overflow-y-auto no-scrollbar">

            <!--name and types-->
            <div class="grid grid-cols-1 gap-2 mb-[1.5rem]">
                <div>
                    <h1 class="text-[1.375rem] leading-[150%] font-medium">
                        {{ hotelData?.type }}<br>
                        {{ hotelData?.name }} <br>
                    </h1>
                </div>
                <div class="flex" v-if="hotelData.category">
                    <div v-for="star in parseInt(hotelData.category)" :key="star">
                        <img src="/assets/icons/star.svg" alt="stars" class="w-4 h-4 mr-2">
                    </div>
                </div>
            </div>

            <!-- Informacion de contacto  -->
            <div class="mb-[1.5rem]"  v-if="hotelData.phone || hotelData.email">
                <div class="">
                    <p class="text-[1rem] leading-[110%] font-medium">
                        {{ $t('about.info') }}
                    </p>
                </div>
                <div class="flex mt-4 items-center" v-if="hotelData?.phone">
                    <div class="mr-4">
                        <ImageToggle
                            defaultSrc="/assets/icons/1.TH.COPY.svg"
                            pressedSrc="/assets/icons/1.TH.COPY.SHAPED.svg"
                            altText="copy_phone"
                            :content="hotelData?.phone"
                            :msg_copy="$t('about.msgCopyPhone')"
                        />
                    </div>
                    <p class="text-[0.875rem] leading-[110%] font-medium">
                        {{ hotelData?.phone }}
                    </p>
                </div>
                <div class="flex items-center mt-4" v-if="hotelData?.email">
                    <div class="mr-4">
                        <ImageToggle
                            defaultSrc="/assets/icons/1.TH.COPY.svg"
                            pressedSrc="/assets/icons/1.TH.COPY.SHAPED.svg"
                            altText="copy_email"
                            :content="hotelData?.email"
                            :msg_copy="$t('about.msgCopyEmail')"
                        />
                    </div>
                    <p class="text-[0.875rem] leading-[110%] font-medium">
                        {{ hotelData?.email }}
                    </p>
                </div>
            </div>

            <!-- CheckIn y checkOut  -->
            <div class="grid grid-cols-1 mb-[1.5rem] gap-2" v-if="hotelData?.checkin && hotelData?.checkout">
                <div class="rounded-2xl border-2 p-4 hborder-gray-400">
                    <img src="/assets/icons/info.svg" alt="info" class="w-8 h-8 mb-4">
                    <p class="text-[1.125rem] leading-[110%] font-medium mb-4">
                        {{ $t('about.horary') }}
                    </p>
                    <div class="flex items-center justify-between mt-4">
                        <p class="text-[0.875rem] leading-[110%] font-medium">{{ $t('about.checkin') }} </p>
                        <p class="text-[1.375rem] leading-[110%] font-medium">{{ hotelData?.checkin }}</p>
                    </div>
                    <div class="flex items-center justify-between mt-4">
                        <p class="text-[0.875rem] leading-[110%] font-medium">{{ $t('about.checkout') }}</p>
                        <p class="text-[1.375rem] leading-[110%] font-medium">{{ hotelData?.checkout }}</p>
                    </div>
                    
                </div>
            </div>

            <!-- Galeria de imagenes  -->
            <div class="grid grid-cols-1 px-0  mb-[1.5rem]" v-if="hotelData?.images">
                <div class="relative">
                    <!-- Carrusel -->
                    <div class="overflow-hidden">
                        <div
                            class="flex transition-transform duration-300 ease-out -translate-x-full translate-x-0"
                            :style="`transform: translateX(${translateX}px)`"
                            ref="carouselRef"
                            id="carousel"
                        >
                        <!-- Imágenes -->
                            <div
                                v-for="(image, index) in hotelData?.images"
                                :key="index"
                                class="w-full h-[21.625rem] flex-shrink-0"
                            >
                                <img :src="urlStorage+image.url" :alt="image.name" class="w-full h-full object-cover rounded-lg">
                            </div>
                        </div>


                    </div>

                    <!-- Botones Next y Previous -->
                    <div v-if="hotelData?.images?.length > 1" class="absolute top-1/2 transform -translate-y-1/2 flex justify-between mt-2  left-0 right-0">
                        <button
                            id="previous"
                            class="rounded-full hbg-white-100 button-carousel transition-colors duration-300 w-8 h-8 flex items-center justify-center ml-4"
                            @click="previousImage"
                            @mousedown="activate"
                            @mouseup="deactivate"
                            :class="{ active: isActive }"
                        >
                            <img src="/assets/icons/previousCarrousel.svg" alt="Previous" class="w-[0.563rem] h-[1.125rem]">
                        </button>
                        <button
                            id="next"
                            class="rounded-full hbg-white-100 button-carousel transition-colors duration-300 w-8 h-8 flex items-center justify-center mr-4"
                            @click="nextImage"
                            @mousedown="activate"
                            @mouseup="deactivate"
                            :class="{ active: isActive }"
                        >
                            <img src="/assets/icons/nextCarrousel.svg" alt="Next" class="w-[0.563rem] h-[1.125rem]">
                        </button>
                    </div>

                    <!-- Contador -->
                    <div class="absolute bottom-[1rem] right-[1rem] bg-gray-900 bg-opacity-50 text-white p-1 info-carousel rounded-[0.188px]">
                        <img src="/assets/icons/images.svg" alt="Imagen" class="w-4 h-4 inline-block">
                        <span class="text-[0.75rem] leading-[90%] font-medium ml-1 htext-white-100">{{ hotelData?.images.length }}</span>
                    </div>
                </div>
            </div>
            <!-- Descripción  -->
            <div class="grid grid-cols-1 mb-[1.5rem] gap-2" v-if="hotelData?.translate.description">
                <div>
                    <p class="text-[0.875rem] leading-[150%] font-medium text-justify">
                        {{hotelData?.translate.description}}
                    </p>
                </div>
            </div>

            <!-- Redes Sociales  -->
            <div class="grid grid-cols-1 mb-[1.5rem]" v-if="hotelData?.instagram_url || hotelData?.pinterest_url || hotelData?.facebook_url">
                <div>
                    <p class="text-[1.125rem] font-medium leading-[1.238rem]">{{ $t('about.social') }}</p>
                </div>
                <div id="instagram" class="cursor-pointer py-4 flex items-center social"
                    @click="openLink(hotelData?.instagram_url)"
                    @mousedown="activate"
                    @mouseup="deactivate"
                    :class="{ active: isActive }"
                    v-if="hotelData?.instagram_url"
                >
                    <div class="w-5 mr-4">
                        <img src="/assets/icons/instagram.svg" alt="instagram" class="w-5 h-5">
                    </div>
                    <div class="h-5 flex flex-grow items-center">
                        <p class="text-[0.875rem] font-medium leading-[110%]">Instagram</p>
                    </div>
                    <div class="w-[1.5rem]">
                        <img src="/assets/icons/next.svg" alt="next" class="w-[1.5rem] h-[1.5rem]">
                    </div>
                </div>
                <div v-if="(hotelData?.pinterest_url || hotelData?.facebook_url) && hotelData?.instagram_url" class="border-b"></div>
                <div id="facebook" class="cursor-pointer py-4 flex items-center social"
                    @click="openLink(hotelData?.facebook_url)"
                    @mousedown="activate"
                    @mouseup="deactivate"
                    :class="{ active: isActive }"
                    v-if="hotelData?.facebook_url"
                >
                    <div class="w-5 mr-4">
                        <img src="/assets/icons/facebook.svg" alt="facebook" class="w-5 h-5">
                    </div>
                    <div class="h-5 flex flex-grow items-center">
                        <p class="text-[0.875rem] font-medium leading-[110%]">Facebook</p>
                    </div>
                    <div class="w-[1.5rem]">
                        <img src="/assets/icons/next.svg" alt="next" class="w-[1.5rem] h-[1.5rem]">
                    </div>
                </div>
                <div v-if="(hotelData?.pinterest_url || hotelData?.facebook_url)" class="border-b"></div>
                <div id="pinterest" class="cursor-pointer py-4 flex items-center social"
                    @click="openLink(hotelData?.pinterest_url)"
                    @mousedown="activate"
                    @mouseup="deactivate"
                    :class="{ active: isActive }"
                    v-if="hotelData?.pinterest_url"
                >
                    <div class="w-5 mr-4">
                        <img src="/assets/icons/pinterest.svg" alt="pinterest" class="w-5 h-5">
                    </div>
                    <div class="h-5 flex flex-grow items-center">
                        <p class="text-[0.875rem] font-medium leading-[110%]">Pinterest</p>
                    </div>
                    <div class="w-[1.5rem]">
                        <img src="/assets/icons/next.svg" alt="next" class="w-[1.5rem] h-[1.5rem]">
                    </div>
                </div>
            </div>
        </div>

        <!--Aside rigth-->
        <div class="flex flex-grow flex-col ml-6 h-full pb-10">
            <div v-if="hotelData?.address" class="flex w-full items-center mb-2">
                <div class="mr-4">
                    <ImageToggle
                        defaultSrc="/assets/icons/1.TH.COPY.svg"
                        pressedSrc="/assets/icons/1.TH.COPY.SHAPED.svg"
                        altText="copy_email"
                        :content="hotelData?.address"
                        :msg_copy="$t('about.msgCopyAddress')"
                    />
                </div>
                <p class="text-[0.875rem] leading-[110%] font-medium">
                    {{ hotelData?.address }}
                </p>
            </div>
            <div id="map" class="flex-grow w-full border-gray-500 relative rounded-[10px]"></div>
        </div>
    </div>
  </template>
<script setup>
    import { onMounted, onBeforeUnmount, ref, computed, inject } from 'vue';
    import ImageToggle from './components/ImageToggle.vue';
    import { useHotelStore } from '@/stores/modules/hotel'
    const hotelStore = useHotelStore()
    const { hotelData } = hotelStore
    const showFooter = inject('showFooter');  
    onMounted(() => {
        if(hotelData?.images?.length){
            carouselRef.value = document.getElementById('carousel');
            carouselWidth.value = carouselRef.value.offsetWidth;
            totalImages.value = Math.ceil(carouselRef.value.scrollWidth / carouselWidth.value);
        }
        initGoogleMap()
        showFooter.value = false;
    })

    onBeforeUnmount(() => {
        showFooter.value = true;
    });


/*data*/
    const urlStorage = process.env.VUE_APP_STORAGE_URL;
    const translateX = ref(0);
    const carouselRef = ref(null);
    const carouselWidth = ref(0);
    const totalImages = ref(0);
    const header = ref(null);
    const isSticky = ref(false);
    const activeSocial = ref({});

    const activate = (socialId) => {
        activeSocial.value[socialId] = true;
    };
    const deactivate = (socialId) => {
        activeSocial.value[socialId] = false;
    };
    const isActive = (socialId) => {
        return activeSocial.value[socialId];
    };

    /* Functions */
    function initGoogleMap () {
        if (hotelData?.address) {
            var script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA2pl-RXaMKbahzdX9yl0CRFc3-_fbtMog&libraries=places&callback=initMap';
            script.async = true;
            const coord = { lat: parseFloat(hotelData?.latitude), lng: parseFloat(hotelData?.longitude) };

            let vue = this;
            window.initMap = function() {
                const map = new google.maps.Map(document.getElementById("map"), {
                    center: coord,
                    zoom: 12,
                    disableDefaultUI: true,
                });
                const marker = new google.maps.Marker({
                    position: coord,
                    map: map,
                    });
            };
            // Append the 'script' element to 'head'
            document.head.appendChild(script);
        }   
    }
    function previousImage() {
        const carouselWidthValue = carouselWidth.value;
        const remainingWidth = carouselWidthValue * (totalImages.value - 1);
        translateX.value += carouselWidthValue;

        if (translateX.value > 0) {
            translateX.value = -remainingWidth;
        }
    }
    function nextImage() {
    const carouselWidthValue = carouselWidth.value;
    const remainingWidth = carouselWidthValue * (totalImages.value - 1);
    translateX.value -= carouselWidthValue;

    if (translateX.value < -remainingWidth) {
        translateX.value = 0;
    }
    }
    function openLink(link) {
        window.open(link, '_blank');
    }
</script>
<style>
.container-info{
    height: calc(100vh - 108px);
}
 .social:hover {
    background-color: var(--h-gray-100);
}

.social:active {
    background-color: var(--h-gray-100);
}
.social {
    background-color: var(--h-white-100);
}
.button-carousel:hover{
    background-color: var(--h-gray-100);
}
.button-carousel:active{
    background-color: var(--h-gray-100);
}
.info-carousel{
    background-color: rgba(206, 206, 206, 0.10);
    backdrop-filter: blur(40px);
;
}
</style>
