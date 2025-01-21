<template>
    <div>
        <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]" />
        <div class="flex items-center py-[4px] sp:py-2 mb-[12px] sp:mb-6 hbg-white-100 z-10 sticky top-0"
            ref="header"
        >
            <div class="ml-[8px] sp:ml-4">
                <div @click="goHome($utils.isMockup())">
                    <img src="/assets/icons/back.svg" alt="back" class="h-[20px] sp:h-6 w-[20px] sp:w-6">
                </div>
            </div>
            <div 
                @click="goHome($utils.isMockup())"
                class="text-[10px] sp:text-sm font-medium ml-[8px] sp:ml-4"
            >
                {{ $t('about.mobileTitle')  }}
            </div>
        </div>

        <!-- nombre del hotel  -->
        <div class="px-[8px] sp:px-4">
            <div>
                <h1 class="text-base sp:text-[22px] font-medium leading-[150%] capitalize">
                    <!-- {{ formatTypeLodging(hotelData?.type) }} -->
                </h1>
                <h1 class="text-base sp:text-[22px] font-medium leading-[150%]">
                    {{ hotelData?.name }}
                </h1>
                

            </div>
            <div v-if="hotelData?.category">
                <div class="flex mt-1 sp:mt-2">
                    <div v-for="star in parseInt(hotelData?.category)" :key="star">
                        <img src="/assets/icons/star.svg" alt="stars" class="h-3 sp:h-4 w-3 sp:w-4 mr-[4px] sp:mr-2">
                    </div>
                </div>
            </div>
        </div>

        <!-- Informacion de contacto  -->
        <div v-if="hotelData?.phone || hotelData?.email" class="px-[8px] sp:px-4 mt-[20px] sp:mt-6">
            <p class="text-xs sp:text-base font-medium">
                {{ $t('about.info') }}
            </p>
            <div class="flex items-center mt-[12px] sp:mt-4" v-if="hotelData?.phone">
                <div class="mr-[12px] sp:mr-4">
                    <ImageToggle
                        class="w-[20px] sp:w-6 h-[20px] sp:h-6"
                        defaultSrc="/assets/icons/1.TH.COPY.svg"
                        pressedSrc="/assets/icons/1.TH.COPY.SHAPED.svg"
                        altText="copy_phone"
                        :content="hotelData?.phone"
                        :msg_copy="$t('about.msgCopyPhone')"
                    />
                </div>
                <p class="text-[10px] sp:text-sm font-medium">
                    {{ hotelData?.phone }}
                </p>
            </div>
            <div class="flex items-center mt-[12px] sp:mt-4" v-if="hotelData?.email">
                <div class="mr-[12px] sp:mr-4">
                    <ImageToggle
                        class="w-[20px] sp:w-6 h-[20px] sp:h-6"
                        defaultSrc="/assets/icons/1.TH.COPY.svg"
                        pressedSrc="/assets/icons/1.TH.COPY.SHAPED.svg"
                        altText="copy_email"
                        :content="hotelData?.email"
                        :msg_copy="$t('about.msgCopyEmail')"
                    />
                </div>
                <p class="text-[10px] sp:text-sm font-medium" style="overflow-wrap:anywhere;">
                    {{ hotelData?.email }}
                </p>
            </div>
        </div>

        <!-- Direccion y mapa  -->
        <div class="px-0 mt-[20px] sp:mt-6 relative" v-if="hotelData?.address">
            <div v-if="$utils.isMockup()" class="absolute z-50 top-0 left-0 w-full h-full"></div>
            <div id="map" class="h-[129px] sp:h-[215px] w-full border-gray-500 relative z-0"></div>
        </div>
        <div class="flex items-center mt-[4px] sp:mt-2 px-[8px] sp:px-4">
            <div class="mr-[12px] sp:mr-4">
                <ImageToggle
                    class="w-[20px] sp:w-6 h-[20px] sp:h-6"
                    defaultSrc="/assets/icons/1.TH.COPY.svg"
                    pressedSrc="/assets/icons/1.TH.COPY.SHAPED.svg"
                    altText="copy_email"
                    :content="hotelData?.address"
                    :msg_copy="$t('about.msgCopyAddress')"
                />
            </div>
            <p class="text-[10px] sp:text-sm font-medium leading-[120%] sp:leading-[150%]">
                {{ hotelData?.address }}
            </p>
        </div>

        <!-- CheckIn y checkOut  -->
        <div class="px-[8px] sp:px-4 mt-[20px] sp:mt-6" v-if="hotelData?.checkin && hotelData?.checkout">
            <div class="rounded-[6px] sp:rounded-[10px] border-2 p-[8px] sp:p-4 hborder-gray-400">
                <img src="/assets/icons/info.svg" alt="info" class="w-[24px] sp:w-8">
                <p class="mt-[12px] sp:mt-4 text-[10px] sp:text-lg font-medium leading-[80%] sp:leading-[110%]">{{ $t('about.horary') }}</p>
                <div class="mt-[12px] sp:mt-4">
                    <div class="flex items-center justify-between">
                        <p class="text-[8px] sp:text-sm font-medium leading-[80%] sp:leading-[110%]">{{ $t('about.checkin') }} </p>
                        <p class="text-[14px] sp:text-[22px] font-medium leading-[80%] sp:leading-[110%]">{{ hotelData?.checkin }}</p>
                    </div>
                    <div class="flex items-center justify-between mt-2">
                        <p class="text-[8px] sp:text-sm font-medium leading-[80%] sp:leading-[110%]">{{ $t('about.checkout') }}</p>
                        <p class="text-[14px] sp:text-[22px] font-medium leading-[80%] sp:leading-[110%]">{{ hotelData?.checkout }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Galeria de imagenes  -->
        <div class="px-0 mt-[20px] sp:mt-6" v-if="hotelData?.images?.length > 0">
            <ImageCarousel :images="hotelData?.images"/>
        </div>

        <!-- Descripción  -->
        <div class="px-[8px] sp:px-4 mt-[20px] sp:mt-6" v-if="hotelData?.description">
            <p class="text-[10px] sp:text-sm font-medium">
                {{localeStore.localeCurrent == 'es' ? hotelData?.description : hotelData?.translate.description}}
            </p>
        </div>

        <!-- Redes Sociales  -->
        <div class="px-[8px] sp:px-4 mt-[20px] sp:mt-6 mb-10" v-if="hotelData?.instagram_url || hotelData?.pinterest_url || hotelData?.facebook_url">
            <div>
                <p class="text-sm sp:text-lg font-medium">{{ $t('about.social') }}</p>
            </div>
            <div id="instagram" class="border-b hborder-bottom-gray-400 py-[10px] sp:py-4 flex items-center social"
                @click="openLink(hotelData?.instagram_url,$utils.isMockup())"
                :class="{ active: isActive,'hover-gray-100':!$utils.isMockup() }"
                v-if="hotelData?.instagram_url"
            >
                <img src="/assets/icons/instagram.svg" alt="instagram" class="w-4 sp:w-5 h-4 sp:h-5 mr-[12px] sp:mr-4">
                <div class="h-[10px] sp:h-5 flex flex-grow items-center">
                    <p class="text-[10px] sp:text-sm font-medium">Instagram</p>
                </div>
                <img src="/assets/icons/next.svg" alt="next" class="w-5 sp:w-6 h-5 sp:h-6">   
            </div>
            <div id="facebook" class="py-[10px] sp:py-4 flex items-center social border-b hborder-bottom-gray-400"
                @click="openLink(hotelData?.facebook_url,$utils.isMockup())"
                :class="{ active: isActive,'hover-gray-100':!$utils.isMockup() }"
                v-if="hotelData?.facebook_url"
            >
                <img src="/assets/icons/facebook.svg" alt="facebook" class="w-[14px] sp:w-[18px] h-4 sp:h-5 mr-[12px] sp:mr-4">
                <div class="h-5 flex flex-grow items-center">
                    <p class="text-[10px] sp:text-sm font-medium">Facebook</p>
                </div>
                <img src="/assets/icons/next.svg" alt="next" class="w-5 sp:w-6 h-5 sp:h-6">   
            </div>
            <div id="pinterest" class="py-[10px] sp:py-4 flex items-center social"
                @click="openLink(hotelData?.pinterest_url,$utils.isMockup())"
                :class="{ active: isActive,'hover-gray-100':!$utils.isMockup() }"
                v-if="hotelData?.pinterest_url"
            >
                <img src="/assets/icons/pinterest.svg" alt="pinterest" class="w-4 sp:w-5 h-4 sp:h-5 mr-[12px] sp:mr-4">
                <div class="h-[10px] sp:h-5 flex flex-grow items-center">
                    <p class="text-[10px] sp:text-sm font-medium">Pinterest</p>
                </div>
                <img src="/assets/icons/next.svg" alt="next" class="w-5 sp:w-6 h-5 sp:h-6">   
            </div>
        </div>
    </div>
  </template>

<script setup>
    import { onMounted, onBeforeUnmount, ref, computed, inject } from 'vue';
    // import { formatTypeLodging } from '@/utils/utils';
    import { useRouter } from 'vue-router';
    import ImageToggle from './components/ImageToggle.vue';
    import ImageCarousel from './components/ImageCarousel.vue';
    import { useHotelStore } from '@/stores/modules/hotel'
    import { useLocaleStore } from '@/stores/modules/locale'
    

    const hotelStore = useHotelStore()
    const { hotelData } = hotelStore

    const localeStore = useLocaleStore()
    
    const router = useRouter();


    onMounted(async () => {
        await hotelStore.$load()
        // if(hotelData?.images?.length){
        //     carouselRef.value = document.getElementById('carousel');
        //     carouselWidth.value = carouselRef.value.offsetWidth;
        //     totalImages.value = Math.ceil(carouselRef.value.scrollWidth / carouselWidth.value);
        // }
        initGoogleMap()
    })

    /*data*/
    const urlStorage = process.env.VUE_APP_STORAGE_URL;
    const translateX = ref(0);
    // const carouselRef = ref(null);
    const carouselWidth = ref(0);
    const totalImages = ref(0);
    const header = ref(null);
    // const isSticky = ref(false);
    const activeSocial = ref({});
    // const activate = (socialId) => {
    //     activeSocial.value[socialId] = true;
    // };
    // const deactivate = (socialId) => {
    //     activeSocial.value[socialId] = false;
    // };
    const isActive = (socialId) => {
        return activeSocial.value[socialId];
    };

    /* computed */

    /* functions */
    function printImg(img){
        if(img?.type == "image-hotel"){
            return urlStorage+img.url;
        }
        return img.url;
    }

    function goHome(isMockup){
        if(!isMockup){
            router.push({ name: 'Home'})
        }
    }

    function previousImage(isMockup) {
        if(!isMockup){
            const carouselWidthValue = carouselWidth.value;
            const remainingWidth = carouselWidthValue * (totalImages.value - 1);
            translateX.value += carouselWidthValue;

            if (translateX.value > 0) {
                translateX.value = -remainingWidth;
            }
        }
    }

    function nextImage(isMockup) {
        if(!isMockup){
            const carouselWidthValue = carouselWidth.value;
            const remainingWidth = carouselWidthValue * (totalImages.value - 1);
            translateX.value -= carouselWidthValue;

            if (translateX.value < -remainingWidth) {
                translateX.value = 0;
            }
        }
    }

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
    
    function openLink(link,isMockup) {
        if(!isMockup){
        window.open(link, '_blank');
        }
    }


</script>
<style>

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
