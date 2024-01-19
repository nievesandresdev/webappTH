<template>
        <MenuHome />
        <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]" />
        
        <!-- card banner -->
        <section class="relative h-[210px] sp:h-[345px] lg:h-screen"> 
            <div class="w-full h-[150px] sp:h-[240px] lg:h-full relative">          
                <!-- <img
                    v-if="hotelData?.image"
                    class="absolute inset-0 object-cover w-full h-[150px] sp:h-[240px] lg:h-full"
                    :src="`${hotelData?.image ? storageUrl+hotelData?.image :storageUrl+'/storage/gallery/general-1.jpg'}`" 
                    :alt="hotelData.name"
                > -->
                <div v-if="hotelData.image" class="absolute inset-0 bg-cover bg-center" :style="'background-image: url('+storageUrl+hotelData?.image+')'"></div>
                <div v-else class="absolute inset-0 bg-cover bg-center" style="background-image: url('/storage/gallery/general-1.jpg');"></div>  
                <div class="hidden lg:block absolute inset-x-0 bottom-0 h-16" :style="`background-image: url('/assets/img/home/gradient-white.png'); background-repeat: no-repeat;  background-size: 100% 64px;`"></div>
                <div
                    class="block lg:hidden absolute inset-x-0 -bottom-0.5 w-full"
                    :class="hotelData.show_profile || stayStore?.stayData?.room || $utils.isMockup() ? 'h-[40px] sp:h-16 gradient-top' : 'h-[30px] sp:h-12 gradient-top-min'"
                    style="background-image: url('/assets/img/home/gradient.png'); background-repeat: no-repeat;"
                />
            </div>
            <div
                class="lg:hidden w-full"
                :class="hotelData.show_profile || stayStore?.stayData?.room  || $utils.isMockup() ? 'h-[70px] sp:h-[111px] gradient-bottom' : 'h-[30px] sp:h-[40px] gradient-bottom-min'"
                style="background-image: url('/assets/img/home/gradient-mobile.png'); background-repeat: no-repeat; object-fit: cover;"
            />
            <div
                v-if="guestStore?.guestData"
                :class="hotelData.show_profile || stayStore?.stayData?.room ? 'bottom-[8px] sp:bottom-[14px]' : 'bottom-[32px] sp:bottom-[56px] sp:bottom-[64px]'"
                class="absolute left-0 md:bottom-0 w-full lg:pb-[40px] flex justify-center"
            >
                <div v-if="stayStore?.stayData && guestStore?.guestData?.name" class="container-fluid-landing">
                    <div class="w-full lg:w-[453px] rounded-xl pt-2.5 pl-2.5 sp:pt-4 sp:pl-4 z-[10000]" style="background: rgba(206, 206, 206, 0.10); backdrop-filter: blur(40px)">
                        <!-- mb-3 sp:mb-4 -->
                        <div
                            :class="hotelData.show_profile || stayStore?.stayData?.room ? 'mb-2.5 sp:mb-4' : 'pb-[8px] sp:pb-[16px]'"
                            class="flex justify-between pr-[10px] sp:pr-[16px]"
                        >
                            <div class="w-[90px] sp:w-[184px] lg:w-[309px] truncate-1">
                                <!-- mb-2 sp:mb-3 -->
                                <h2
                                    class="text-[12px] leading-[20px] sp:leading-[33px] sp:text-[22px] text-white font-medium"
                                    :class="{'stayData && stayData.guest': !hotelData.show_profile && !stayStore?.stayData?.room}"
                                >
                                    {{ $t('home.title-welcome') }}
                                </h2>
                                <h2
                                    class="text-[12px] leading-[20px] sp:leading-[33px] sp:text-[22px] text-white font-medium truncate-1"
                                    :class="{'stayData && stayData.guest': !hotelData.show_profile && !stayStore?.stayData?.room}"
                                >
                                    {{ $utils.titleCase(guestStore?.guestData?.name) }}
                                </h2>
                            </div>
                            <div class="flex">
                                <div class="text-center mr-2.5 sp:mr-4">
                                    <h4 v-if="stayStore?.stayData?.check_in" class="text-white text-xs sp:text-base font-medium">{{ $moment(stayStore?.stayData?.check_in).format('DD/MM') }}</h4>
                                    <h6 v-if="stayStore?.stayData?.hour_checkin" class="text-white text-[8px] sp:text-xs font-medium">{{ stayStore?.stayData?.hour_checkin }}</h6>
                                </div>
                                <div class="text-center">
                                    <h4 v-if="stayStore?.stayData?.check_out" class="text-white text-xs sp:text-base font-medium">{{$moment(stayStore?.stayData?.check_out).format('DD/MM')}}</h4>
                                    <h6 v-if="stayStore?.stayData?.hour_checkout" class="text-white text-[8px] sp:text-xs font-medium">{{ stayStore?.stayData?.hour_checkout }}</h6>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="hotelData.show_profile || stayStore?.stayData?.room"
                            class="flex items-end w-full justify-between"
                            :class="{'justify-between': stayStore?.stayData?.room && hotelData.show_profile, 'justify-start': stayStore?.stayData?.room && !hotelData.show_profile, 'justify-end':  !stayStore?.stayData?.room && hotelData.show_profile,'no-hover':$utils.isMockup()}"
                        >
                            <div
                                v-if="stayStore?.stayData?.room"
                                class="text-start pb-[8px] sp:pb-[16px]"
                            >
                                <h4 class="text-white text-[6px] sp:text-[10px] lg:text-xs font-semibold">
                                    {{ $t('home.hab') }}
                                </h4>
                                <h6 class="text-white text-lg sp:text-[22px] font-medium">{{ stayStore?.stayData?.room }}</h6>
                            </div>
                            <!-- v-if="hotelData.show_profile" -->
                            <router-link
                                v-if="hotelData.show_profile"
                                :to="{name:'HotelAbout'}"
                                class="hbtn-blur p-2 rounded-md font-medium text-[10px] sp:text-sm text-white underline mb-[5px] sp:mb-[8px] mr-[5px] sp:mr-[8px]"
                                :class="{'hcursor-mobile':$utils.isMockup()}"
                            >
                                {{ $t('home.btn-more-info') }}
                        </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <HomePageFakeGuestWelcome v-if="$utils.isMockup()" />
        </section>
        <!-- end card banner -->

        <!-- carousel's -->
         <div class="mb-4 sp:mb-6" :class="{'-mt-8': !hotelData.show_profile && !stayStore?.stayData?.room && !$utils.isMockup()}">
            <section v-if="crossellingsData?.crosselling_facilities?.length > 0" id="h-home-facilities" class="container-fluid-landing pr-mobile-0">
                <div class="flex justify-between items-center mt-4 sp:mt-8">
                    <h2 class="text-xs sp:text-base lg:text-lg font-medium">
                        {{ $utils.capitalize($t('home.section-facility.title')) }}
                    </h2>
                    <a 
                        @click="go_facilities()" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)"
                        :class="{'hcursor-mobile no-hover':$utils.isMockup()}"
                    >
                        {{ $utils.capitalize($t('home.btn-see-all')) }}
                    </a>
                </div>
                <div class="mt-2.5 sp:mt-4">
                    <CarouselFacilities id="1" :items="crossellingsData.crosselling_facilities"/>
                </div>
            </section>

            <section v-if="crossellingsData?.crosselling_places_whatvisit?.length > 0" id="h-home-whatvisit" class="container-fluid-landing pr-mobile-0">
                <div class="flex justify-between items-center mt-4 sp:mt-8">
                    <h2 class="text-xs sp:text-base lg:text-lg font-medium">
                        {{ $utils.capitalize($t('home.section-what-visit.title')) }}
                    </h2>
                    <a 
                        @click="go_places(whatvisit_id, categories_places_defaults?.whatvisit?.id)" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)"
                        :class="{'hcursor-mobile no-hover':$utils.isMockup()}"
                    >
                        {{ $utils.capitalize($t('home.btn-see-all')) }}
                    </a>
                </div>
                <div class="mt-2.5 sp:mt-4">
                    <CarouselPlaces id="0" :items="crossellingsData?.crosselling_places_whatvisit" place />
                </div>
            </section>

            <section v-if="crossellingsData?.crosselling_places_whereeat.length > 0" id="h-home-whereeat" class="container-fluid-landing pr-mobile-0">
                <div class="flex justify-between items-center mt-4 sp:mt-8">
                    <h2 class="text-xs sp:text-base lg:text-lg font-medium">
                        {{ $utils.capitalize($t('home.section-where-eat.title')) }}
                    </h2>
                    <a 
                        @click="go_places(whereeat_id, categories_places_defaults?.whereeat?.id)" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)"
                        :class="{'hcursor-mobile no-hover':$utils.isMockup()}"
                    >
                        {{ $utils.capitalize($t('home.btn-see-all')) }}
                    </a>
                </div>
                <div class="mt-2.5 sp:mt-4">
                    <CarouselPlaces id="1" :items="crossellingsData?.crosselling_places_whereeat" />
                </div>
            </section>
            
            <section v-if="crossellingsData?.crosselling_places_leisure.length > 0" id="h-home-leisure" class="container-fluid-landing pr-mobile-0">
                <div class="flex justify-between items-center mt-4 sp:mt-8">
                    <h2 class="text-xs sp:text-base lg:text-lg font-medium">
                        {{ $utils.capitalize($t('home.section-leisure.title')) }}
                    </h2>
                    <a 
                        @click="go_places(leisure_id, categories_places_defaults?.leisure?.id)" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)"
                        :class="{'hcursor-mobile no-hover':$utils.isMockup()}"
                    >
                        {{ $utils.capitalize($t('home.btn-see-all')) }}
                    </a>
                </div>
                <div class="mt-2.5 sp:mt-4">
                    <CarouselPlaces id="2" :items="crossellingsData?.crosselling_places_leisure" />
                </div>
            </section>

            <section v-if="crossellingsData?.crosselling_experiences?.length > 0 && hotelData.show_experiences" id="h-home-experiences" class="container-fluid-landing pr-mobile-0">
                <div class="flex justify-between items-center mt-4 sp:mt-8">
                    <h2 class="text-xs sp:text-base lg:text-lg font-medium">
                        {{ $utils.capitalize($t('home.section-experience.title')) }}
                    </h2>
                    <a @click="go_experiences" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)">
                        {{ $utils.capitalize($t('home.btn-see-all')) }}
                    </a>
                </div>
                <div class="mt-2.5 sp:mt-4">
                    <CarouselExperiences id="0" :items="crossellingsData?.crosselling_experiences" />
                </div>
            </section>
        </div>
        <!-- end carousel's -->
        
        <!-- FormSurvey -->
        <FormSurvey />
         <!-- END FormSurvey    -->
    </template>
    
    <script setup>
        //IMPORT
        import {
            // onMounted,
            ref,
            // inject,
            // provide,
            // defineProps
            onMounted,
            onBeforeMount,
        } from 'vue';//toRefs,
        //COMPONENTS
        import CarouselFacilities from './Components/CarouselFacilities.vue'
        import CarouselExperiences from './Components/CarouselExperiences.vue'
        import CarouselPlaces from './Components/CarouselPlaces.vue'
        import FormSurvey from './Components/FormSurvey.vue'
        import HomePageFakeGuestWelcome from './HomePageFakeGuestWelcome.vue'
        import MenuHome from '@/layout/Components/MenuHome.vue'

        // STORE
        import { useMainStore } from '@/stores'
        const mainStore = useMainStore()
        import { useHotelStore } from '@/stores/modules/hotel'
        const hotelStore = useHotelStore()
        const { hotelData } = hotelStore
        import { useStayStore } from '@/stores/modules/stay'
        const stayStore = useStayStore()
        const { stayData } = stayStore
        import { useGuestStore } from '@/stores/modules/guest'
        const guestStore = useGuestStore()
        const { guestData } = guestStore


        // DATA
        const crossellingsData = ref(null)
        const storageUrl = mainStore.URL_STORAGE

        onBeforeMount (() => {
            loadCrossellings()
        })

        // FUNCTION
        async function loadCrossellings () {
            crossellingsData.value = await hotelStore.$getCrossellings()
        }
    
    </script>
    
    <style scoped>
    .underline{
        text-decoration: underline !important;
    }
    .see_all:hover{
        font-weight: 500;
    }
    #logo-preview {
      max-width: 70px;
      max-height: 70px;
      width: auto;
      height: auto;
      object-fit: contain;
    }
    
    .gradient-top {
        background-size: 100% 40px;
    }
    .gradient-bottom {
        background-size: 100% 70px;
    }
    .gradient-top-min {
        background-size: 100% 30px;
    }
    .gradient-bottom-min {
        background-size: 100% 30px;
    }
    
    @media (max-width:767px){
        .pr-mobile-0{
            padding-right: 0px !important;
        }
        #logo-preview {
            margin-left: auto;
        }
    }
    
    @media (min-width:300px){
        .gradient-top {
            background-size: 100% 64px;
        }
        .gradient-bottom {
            background-size: 100% 111px;
        }
        .gradient-top-min {
            background-size: 100% 48px;
        }
        .gradient-bottom-min {
            background-size: 100% 40px;
        }
        #logo-preview {
            max-width: 80px;
            max-height: 80px;
        }
    }
    @media (min-width:1280px){
    
         #logo-preview {
            max-width: 260px;
            max-height: 260px;
        }
    }
    
    @media (min-width:1920px){
    
    }

    </style>