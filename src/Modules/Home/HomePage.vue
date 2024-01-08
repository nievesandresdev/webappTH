<template>
        <MenuHome />
        
        <!-- card banner -->
        <section class="relative h-[210px] sp:h-[345px] lg:h-screen">            
            <img 
                class="absolute inset-0 object-cover w-full h-[150px] sp:h-[240px] lg:h-full"
                :src="`${hotelData?.image ? storageUrl+hotelData?.image :storageUrl+'/storage/gallery/general-1.jpg'}`" 
                :alt="hotelData.name"
            >
            <div class="hidden lg:block absolute inset-x-0 bottom-0 h-16" :style="`background-image: url('/assets/img/home/gradient-white.png'); background-repeat: no-repeat;  background-size: 100% 64px;`"></div>
        </section>
        <!-- end card banner -->

        <!-- carousel's -->
        <div class="mb-4 sp:mb-6" :class="{'-mt-8': !hotelData.show_profile}">
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

            <!-- <section v-if="cross_selling_place_visit.length > 0" id="h-home-whatvisit" class="container-fluid-landing pr-mobile-0">
                <div class="flex justify-between items-center mt-4 sp:mt-8">
                    <h2 class="text-xs sp:text-base lg:text-lg font-medium">
                        {{translate.what_visit.title[$page.props.language.toLowerCase()]}}
                    </h2>
                    <a 
                        @click="go_places(whatvisit_id, categories_places_defaults?.whatvisit?.id)" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)"
                        :class="{'hcursor-mobile no-hover':$utils.isMockup()}"
                    >
                        {{translate.see_all[$page.props.language.toLowerCase()]}}
                    </a>
                </div>
                <div class="mt-2.5 sp:mt-4">
                    <CossSelingPlace id="0" :data="cross_selling_place_visit" place />
                </div>
            </section>

            <section v-if="cross_selling_place_eat.length > 0" id="h-home-whereeat" class="container-fluid-landing pr-mobile-0">
                <div class="flex justify-between items-center mt-4 sp:mt-8">
                    <h2 class="text-xs sp:text-base lg:text-lg font-medium">
                        {{translate.where_eat.title[$page.props.language.toLowerCase()]}}
                    </h2>
                    <a 
                        @click="go_places(whereeat_id, categories_places_defaults?.whereeat?.id)" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)"
                        :class="{'hcursor-mobile no-hover':$utils.isMockup()}"
                    >
                        {{translate.see_all[$page.props.language.toLowerCase()]}}
                    </a>
                </div>
                <div class="mt-2.5 sp:mt-4">
                    <CossSelingPlace id="1" :data="cross_selling_place_eat" place />
                </div>
            </section>
            
            <section v-if="cross_selling_place_leisure.length > 0" id="h-home-leisure" class="container-fluid-landing pr-mobile-0">
                <div class="flex justify-between items-center mt-4 sp:mt-8">
                    <h2 class="text-xs sp:text-base lg:text-lg font-medium">
                        {{translate.leisure.title[$page.props.language.toLowerCase()]}}
                    </h2>
                    <a 
                        @click="go_places(leisure_id, categories_places_defaults?.leisure?.id)" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)"
                        :class="{'hcursor-mobile no-hover':$utils.isMockup()}"
                    >
                        {{translate.see_all[$page.props.language.toLowerCase()]}}
                    </a>
                </div>
                <div class="mt-2.5 sp:mt-4">
                    <CossSelingPlace id="2" :data="cross_selling_place_leisure" place />
                </div>
            </section>

            <section v-if="cross_selling_experiences.length > 0 && hoster.show_experiences" id="h-home-experiences" class="container-fluid-landing pr-mobile-0">
                <div class="flex justify-between items-center mt-4 sp:mt-8">
                    <h2 class="text-xs sp:text-base lg:text-lg font-medium">
                        {{translate.experiences.title[$page.props.language.toLowerCase()]}}
                    </h2>
                    <a @click="go_experiences" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)">
                        {{translate.see_all[$page.props.language.toLowerCase()]}}
                    </a>
                </div>
                <div class="mt-2.5 sp:mt-4">
                <CossSelingActivity id="0" :data="cross_selling_experiences" />
                </div>
            </section> -->
        </div>
        <!-- end carousel's -->

    </template>
    
    <script setup>
        //IMPORT
        import {
            // onMounted,
            ref,
            // inject,
            // provide,
            // defineProps
            // onMounted,
            onBeforeMount,
        } from 'vue';//toRefs,
        import CarouselFacilities from './Components/CarouselFacilities.vue'
        import MenuHome from '@/layout/Components/MenuHome.vue'

        // STORE
        import { useHotelStore } from '@/stores/modules/hotel'
        const hotelStore = useHotelStore()
        const { hotelData } = hotelStore

        // DATA
        const crossellingsData = ref(null)

        onBeforeMount (() => {
            loadCrossellings()
        })

        // FUNCTION
        async function loadCrossellings () {
            crossellingsData.value = await hotelStore.$getCrossellings()
            console.log(crossellingsData.value)
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
    