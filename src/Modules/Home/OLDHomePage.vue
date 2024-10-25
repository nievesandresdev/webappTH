<template>
        <MenuHome />
        <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]" />
        
        <!-- card banner -->
        <section class="relative h-[210px] sp:h-[345px] lg:h-screen z-[10]"> 
            <div class="w-full h-[150px] sp:h-[226px] lg:h-full relative">          
                <div v-if="hotelData.image" class="absolute inset-0 bg-center bg-cover bg-hotel" :style="`background-image: url('${hotelStore.$loadImage(hotelData?.image)}'); background-size: cover;`"></div>
                <!-- <div v-if="hotelData.image" class="absolute inset-0 bg-center bg-cover" :style="`background-image: url(${storageUrl+hotelData?.image})`"></div> -->
                <div v-else class="absolute inset-0 bg-center bg-cover bg-hotel" :style="`background-image: url(${storageUrl}/storage/gallery/general-1.jpg)`"></div>  
                <div class="absolute inset-x-0 bottom-0 hidden h-16 lg:block" style="background-image: url('/assets/img/home/gradient-white.png'); background-repeat: no-repeat;  background-size: 100% 64px;"></div>
                <div
                    class="block lg:hidden absolute inset-x-0 -bottom-0.5 w-full"
                    :class="hotelData.show_profile || stayStore?.stayData?.room || $utils.isMockup() ? 'h-[40px] sp:h-16 gradient-top' : 'h-[30px] sp:h-12 gradient-top-min'"
                    style="background-image: url('/assets/img/home/gradient.png'); background-repeat: no-repeat;"
                />
            </div>
            <div
                class="w-full lg:hidden"
                :class="hotelData.show_profile || stayStore?.stayData?.room  || $utils.isMockup() ? 'h-[70px] sp:h-[111px] gradient-bottom' : 'h-[30px] sp:h-[40px] gradient-bottom-min'"
                style="background-image: url('/assets/img/home/gradient-mobile.png'); background-repeat: no-repeat; object-fit: cover;"
            />
            <!-- card stay/guest -->
            <div
                v-if="guestStore?.guestData"  
                :class="class_position_card_stay"
                class="absolute left-0 md:bottom-0 w-full lg:pb-[40px] flex justify-center"
            >
                <div v-if="stayStore?.stayData && guestStore?.guestData?.name" class="container-fluid-landing">
                    <!-- content card -->
                    <div class="w-full lg:w-[453px] rounded-xl p-2.5 sp:p-4 z-[10000]" style="background: rgba(206, 206, 206, 0.10); backdrop-filter: blur(40px)">
                        <!-- welcome to the guest -->
                        <p class="text-sm font-semibold text-white truncate leading-110">
                            {{ $t('home.title-welcome') }} {{ $utils.titleCase(guestStore?.guestData?.name) }}
                        </p>
                        <!-- settings button -->
                        <div class="flex items-center mt-4">
                            <p class="text-base font-semibold text-white leading-110">
                                {{ $t('home.stayTitle') }}
                            </p>
                            <img @click="openStaySettings" class="w-6 h-6 ml-auto" src="/assets/icons/1.TH.SETTINGS.SHAPE.svg" alt="">
                        </div>
                        <!-- date stay and room -->
                        <div class="flex items-center justify-between mt-2">
                            <div class="">
                                <div class="inline-block">
                                    <h4 class="text-sm font-medium text-white leading-110">
                                        {{ stayStore?.stayData?.check_in ? $moment(stayStore?.stayData?.check_in).format('DD/MM') : '' }}
                                    </h4>
                                    <h5 class="mt-1 text-xs font-medium text-white leading-90 ">
                                        {{ hotelData?.checkin && hotelData?.checkout ? hotelData?.checkin : '' }}
                                    </h5>
                                </div>
                                <div class="inline-block ml-4">
                                    <h4 class="text-sm font-medium text-white leading-110" :class="{'h-3': !hotelData?.checkin || !hotelData?.checkout}">
                                        {{ stayStore?.stayData?.check_out ? $moment(stayStore?.stayData?.check_out).format('DD/MM') : '' }}
                                    </h4>
                                    <h5 class="mt-1 text-xs font-medium text-white leading-90" :class="{'h-3': !hotelData?.checkin || !hotelData?.checkout}">
                                        {{ hotelData?.checkin && hotelData?.checkout ? hotelData?.checkout : '' }}
                                    </h5>
                                </div>
                            </div>
                            <div v-if="stayStore?.stayData?.room" class="text-right">
                                <h5 class="text-xs font-medium text-white leading-90">{{ $t('home.hab') }}</h5>
                                <h4 class="mt-1 text-sm font-medium text-white leading-110">{{stayStore?.stayData?.room}}</h4>
                            </div>
                        </div>
                        <div class="flex items-center mt-2">
                            <p class="text-sm font-semibold text-white">
                                {{ $t('home.guestTitle')}} 
                                {{ stayStore?.stayData?.uniqueAccessesCount }} / 
                                {{ stayStore?.stayData?.number_guests ?? stayStore?.stayData?.uniqueAccessesCount }}
                            </p>
                            <button 
                                v-if="!stayStore?.completelyVisited"
                                @click="openInvite" 
                                class="hbtn-cta text-sm font-medium py-3 w-[104px] text-center ml-auto leading-3"
                            >
                                {{ $t('home.invite')}}
                            </button>
                        </div>

                        
                    </div>
                </div>
            </div>
            <HomePageFakeGuestWelcome v-if="$utils.isMockup()" />
        </section>
        <!-- end card banner -->

        <!-- more info -->
        <div v-if="hotelData?.show_profile" class="mt-2 text-center sp:mt-4">
            <router-link
                    :to="{name:'HotelAbout'}"
                    class="hbtn-primary leading-90 text-[10px] sp:text-xs font-medium p-1 sp:p-2"
                    :class="{'hcursor-mobile':$utils.isMockup()}"
                >
                    <img class="w-3 sp:w-4 h-3 sp:h-4 mr-0.5 sp:mr-1.5 inline" src="/assets/icons/1.TH.INFO.svg">
                    {{ $t('home.btn-more-info') }}
            </router-link>
        </div>
        

        <!-- carousel's -->
         <div class="mt-4 mb-4 sp:mb-6" :class="!hotelData?.show_profile ? 'sp:mt-[-71px] z-[20]' : ''" >
            <section v-if="crossellingsData?.crosselling_facilities?.length > 0 && hotelData?.show_facilities" id="h-home-facilities" class="container-fluid-landing pr-mobile-0">
                <div class="flex items-center justify-between mt-4 sp:mt-6">
                    <h2 class="text-xs font-medium sp:text-base lg:text-lg">
                        {{ $utils.capitalize($t('home.section-facility.title')) }}
                    </h2>
                    <!-- <router-link :to="{name:'FacilityList'}" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)"
                        :class="{'hcursor-mobile no-hover':$utils.isMockup()}"
                    >
                        {{ $utils.capitalize($t('home.btn-see-all')) }}
                    </router-link> -->
                    <a 
                    @click="goFacilities()" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)"
                        :class="{'hcursor-mobile no-hover':$utils.isMockup()}"
                    >
                        {{ $utils.capitalize($t('home.btn-see-all')) }}
                    </a>
                </div>
                <div class="mt-2.5 sp:mt-4">
                    <CarouselFacilities id="1" :items="crossellingsData.crosselling_facilities"/>
                </div>
            </section>

            <section v-if="crossellingPlacesData?.crosselling_places_whatvisit?.length > 0" id="h-home-whatvisit" class="container-fluid-landing pr-mobile-0">
                <div class="flex items-center justify-between mt-4 sp:mt-8">
                    <h2 class="text-xs font-medium sp:text-base lg:text-lg">
                        {{ $utils.capitalize($t('home.section-what-visit.title')) }}
                    </h2>
                    <a 
                    @click="goPlaces(crossellingPlacesData?.whatvisit_id, catWhatVisitId)" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)"
                        :class="{'hcursor-mobile no-hover':$utils.isMockup()}"
                    >
                        {{ $utils.capitalize($t('home.btn-see-all')) }}
                    </a>
                </div>
                <div class="mt-2.5 sp:mt-4">
                    <CarouselPlaces id="0" :items="crossellingPlacesData?.crosselling_places_whatvisit" place />
                </div>
            </section>
            <section v-if="crossellingPlacesData?.crosselling_places_whereeat.length > 0" id="h-home-whereeat" class="container-fluid-landing pr-mobile-0">
                <div class="flex items-center justify-between mt-4 sp:mt-8">
                    <h2 class="text-xs font-medium sp:text-base lg:text-lg">
                        {{ $utils.capitalize($t('home.section-where-eat.title')) }}
                    </h2>
                    <a 
                        @click="goPlaces(crossellingPlacesData?.whereeat_id, catWhereEatId)" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)"
                        :class="{'hcursor-mobile no-hover':$utils.isMockup()}"
                    >
                        {{ $utils.capitalize($t('home.btn-see-all')) }}
                    </a>
                </div>
                <div class="mt-2.5 sp:mt-4">
                    <CarouselPlaces id="1" :items="crossellingPlacesData?.crosselling_places_whereeat" />
                </div>
            </section>
            
            <section v-if="crossellingPlacesData?.crosselling_places_leisure.length > 0" id="h-home-leisure" class="container-fluid-landing pr-mobile-0">
                <div class="flex items-center justify-between mt-4 sp:mt-8">
                    <h2 class="text-xs font-medium sp:text-base lg:text-lg">
                        {{ $utils.capitalize($t('home.section-leisure.title')) }}
                    </h2>
                    <a 
                        @click="goPlaces(crossellingPlacesData?.leisure_id, catLeisureId)" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)"
                        :class="{'hcursor-mobile no-hover':$utils.isMockup()}"
                    >
                        {{ $utils.capitalize($t('home.btn-see-all')) }}
                    </a>
                </div>
                <div class="mt-2.5 sp:mt-4">
                    <CarouselPlaces id="2" :items="crossellingPlacesData?.crosselling_places_leisure" />
                </div>
            </section>

            <section v-if="crossellingPlacesData?.crosselling_experiences?.length > 0 && hotelData.show_experiences" id="h-home-experiences" class="container-fluid-landing pr-mobile-0">
                <div class="flex items-center justify-between mt-4 sp:mt-8">
                    <h2 class="text-xs font-medium sp:text-base lg:text-lg">
                        {{ $utils.capitalize($t('home.section-experience.title')) }}
                    </h2>
                    <router-link :to="{name:'ExperienceList'}" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)">
                        {{ $utils.capitalize($t('home.btn-see-all')) }}
                    </router-link>
                </div>
                <div class="mt-2.5 sp:mt-4">
                    <CarouselExperiences id="0" :items="crossellingPlacesData?.crosselling_experiences" />
                </div>
            </section>
        </div>
        <!-- end carousel's -->
        
        <!-- FormSurvey -->
        <!-- <FormSurvey /> -->
         <!-- END FormSurvey    -->

         <InviteModal ref="inviteModal"/>
         <StayDataModal ref="stayDataModal"/>
    </template>
    
    <script setup>
        //IMPORT
        import {
            ref,
            onMounted,
            computed,
            watch,
            nextTick, 
            h
        } from 'vue';//toRefs,
        import { useRouter } from 'vue-router';
        //COMPONENTS
        import CarouselFacilities from './Components/CarouselFacilities.vue'
        import CarouselExperiences from './Components/CarouselExperiences.vue'
        import CarouselPlaces from './Components/CarouselPlaces.vue'
        import FormSurvey from './Components/FormSurvey.vue'
        import HomePageFakeGuestWelcome from './HomePageFakeGuestWelcome.vue'
        import MenuHome from '@/layout/Components/MenuHome.vue'
        import InviteModal from './Components/InviteModal.vue'
        import StayDataModal from './Components/StayDataModal.vue';
        import { useHead } from '@vueuse/head'

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
        import { usePlaceStore } from '@/stores/modules/place'
        const placeStore = usePlaceStore()
        import { useLocaleStore } from '@/stores/modules/locale'
        const localeStore = useLocaleStore()

        const router = useRouter();

        // DATA
        const crossellingsData = ref(null)
        const crossellingPlacesData = ref(null)
        const placeCategories = ref(null)
        const catWhatVisitId = ref(null)
        const catWhereEatId = ref(null)
        const catLeisureId  = ref(null)
        const inviteModal  = ref(null)
        const stayDataModal  = ref(null)
        const storageUrl = mainStore.URL_STORAGE

        /* useHead({
            // Can be static or computed
            title: computed(() => hotelData.name),
            meta: [
                {
                    name: `description`,
                    content: computed(() => hotelData.description),
                },
                {
                    property: 'og:image',
                    content: computed(() => hotelStore.$loadImage(hotelData?.image)),
                }

                ],
        
        }) */

        // Hook de inicialización
        onMounted(async() => {

            await nextTick();
            // Crear las etiquetas meta y configurar atributos
            const ogSiteNameTag = createMetaTag('og:site_name', hotelData.name);
            const ogTitleTag = createMetaTag('og:title', hotelData.name);
            const ogTypeTag = createMetaTag('og:type', 'website');
            // url de la imagen de fondo del header
            const backgroundImageStyle = getComputedStyle(document.querySelector('.bg-hotel'));
            const backgroundImageUrl = backgroundImageStyle.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');

            // console.log('backgroundImageUrl',backgroundImageUrl)
            const ogImageTag = createMetaTag('og:image', backgroundImageUrl);
            //const ogDescriptionTag = createMetaTag('og:description', metaDescription.value);

            // Encontrar la etiqueta existente <meta name="viewport">
            const viewportMetaTag = document.querySelector('meta[name="viewport"]');

            // Insertar las nuevas etiquetas después de la etiqueta <meta name="viewport">
            viewportMetaTag.parentNode.insertBefore(ogSiteNameTag, viewportMetaTag.nextSibling);
            viewportMetaTag.parentNode.insertBefore(ogTitleTag, viewportMetaTag.nextSibling);
            viewportMetaTag.parentNode.insertBefore(ogImageTag, viewportMetaTag.nextSibling);
            viewportMetaTag.parentNode.insertBefore(ogTypeTag, viewportMetaTag.nextSibling);
            //document.head.appendChild(ogDescriptionTag);
        });

        // Función para crear una etiqueta meta
        function createMetaTag(property, content) {
            const metaTag = document.createElement('meta');
            metaTag.setAttribute('property', property);
            metaTag.content = content;
            return metaTag;
        }

        /* onMounted(async () => {
            // Crear la etiqueta meta y atributos
            await nextTick();
            
            const metaTag = document.createElement('meta');
            metaTag.setAttribute('property', 'og:image'); // Ejemplo de atributo "property"

            // url de la imagen de fondo del header
            const backgroundImageStyle = getComputedStyle(document.querySelector('.bg-hotel'));
            const backgroundImageUrl = backgroundImageStyle.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');

            console.log('backgroundImageUrl',backgroundImageUrl)

            // Configurar la etiqueta meta con la URL de la imagen de fondo
            metaTag.content = backgroundImageUrl;
            //metaTag.content = hotelStore.$loadImage(hotelData?.image);
            metaTag.title = hotelData?.name;

            //console.log('metaTag',metaTag,metaTag.content)

            // Agregar la etiqueta meta al <head>
            document.head.appendChild(metaTag);
        }) */

        // onBeforeMount (() => {
        // })

        // onMounted(async () => {
        //     await Promise.all([loadCrossellings(),getPlaceCategories()])
        // })

        watch([() => stayStore.stayData, () => localeStore.localeCurrent], ([newStayData, newLocaleData]) => {
            // console.log(localeStore.localeCurrent, 'watch')
            // console.log(newStayData, 'newStayData watch')
            // if (newStayData) {
                Promise.all([loadCrossellings(), loadCrossellingsPlaces(), getPlaceCategories()]);
            // }
        }, { immediate: true })

        // COMPUTED
        const class_position_card_stay = computed(() => {
            
            let class_enables= '';
            class_enables = hotelData.show_profile || stayStore?.stayData?.room ? 'bottom-[8px] sp:bottom-[9px]' : 'bottom-[32px] sp:bottom-[56px] sp:bottom-[64px]';
            // class_enables = !hotelData.value?.show_profile ? 'bottom-[0px]' : '';
            return class_enables;
        })

        // FUNCTION
        async function getPlaceCategories(){
            const response = await placeStore.$apiGetCategoriesByType({city: hotelData?.zone, all: true});
            if(response.ok)placeCategories.value = response.data;
            let typePlacesIds = placeCategories.value?.reduce((categoriesObject, categoryCurrent) => {
                if ((categoryCurrent.name_type_place == 'Qué visitar') && !categoriesObject.catWhatVisitId) {
                    categoriesObject.catWhatVisitId = categoryCurrent.categori_places_id;
                }
                if ((categoryCurrent.name_type_place == 'Dónde comer') && !categoriesObject.catWhereEatId) {
                    categoriesObject.catWhereEatId = categoryCurrent.categori_places_id;
                }
                if ((categoryCurrent.name_type_place == 'Ocio') && !categoriesObject.catLeisureId) {
                    categoriesObject.catLeisureId = categoryCurrent.categori_places_id;
                }
                return categoriesObject;
            }, {catWhatVisitId: null, catWhereEatId: null, catLeisureId: null});
            catWhatVisitId.value = typePlacesIds.catWhatVisitId;
            catWhereEatId.value = typePlacesIds.catWhereEatId;
            catLeisureId.value = typePlacesIds.catLeisureId;
        }

        async function loadCrossellings () {
            crossellingsData.value = await hotelStore.$getCrossellings()
        }
        async function loadCrossellingsPlaces () {
            crossellingPlacesData.value = await placeStore.$getCrosselling();
            // console.log(crossellingPlacesData.value, 'crossellingPlacesData.value')
        }

        const goPlaces = (type, cat) => {
            router.push({ name: 'PlaceList', query: { typeplace: type, categoriplace: cat, mobile : true } });
        }

        const goFacilities = () => {
            router.push({ name: 'FacilityList' });
        }

        const openInvite = () =>{
            inviteModal.value.open();
        }

        const openStaySettings = () =>{
            stayDataModal.value.open();
        }

        //computed
        
        
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
            background-size: 100% 130px;
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