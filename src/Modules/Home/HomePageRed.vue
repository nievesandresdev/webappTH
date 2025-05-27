<template>

    <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000" />

    <HeaderHomeRed />
   <PageTransitionGlobal module="home">
        <HeroSectionRed />

        <BannersSection />

        <div class="px-3 sp:px-4 mt-3 sp:mt-6" v-if="hotelStore.hotelData?.buttons_home">
            <ButtonsSection />
        </div>

        <!-- carousel's -->
        <div class="mt-4 sp:mt-6 pb-[70px] sp:pb-[104px]">
            <!-- facilities carousel -->
            <section 
                v-if="crossellingsData?.crosselling_facilities?.length > 0 && hotelData?.show_facilities" 
            >
                <div class="flex items-center justify-between px-3 sp:px-4 h-[20px] sp:h-[28px]">
                    <h2 class="lato text-[14px] sp:text-[20px] font-bold leading-[12px] sp:leading-[18px]">
                        {{ $utils.capitalize($t('home.section-facility.title')) }}
                    </h2>
                    <a 
                        @click="goFacilities()" 
                        class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] underline hover:underline" href="javascript:void(0)"
                    >
                        {{ $utils.capitalize($t('home.btn-see-all')) }}
                    </a>
                </div>
                <div class="mt-4">
                    <CarouselFacilities id="1" :items="crossellingsData.crosselling_facilities"/>
                </div>
            </section>

            <!-- what visit carousel -->
            <section 
                v-if="showWhatvisitSection"
                class="mt-2"
            >
                <div class="flex items-center justify-between px-3 sp:px-4 h-[20px] sp:h-[28px]">
                    <h2 class="lato text-[14px] sp:text-[20px] font-bold leading-[12px] sp:leading-[18px]">
                        {{ $utils.capitalize($t('home.section-what-visit.title')) }}
                    </h2>
                    <a 
                        @click="goPlaces(crossellingPlacesData?.whatvisit_id, catWhatVisitId)"
                        class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] underline hover:underline" href="javascript:void(0)"
                    >
                        {{ $utils.capitalize($t('home.btn-see-all')) }}
                    </a>
                </div>
                <div class="">
                    <CarouselPlaces id="0" :items="crossellingPlacesData?.crosselling_places_whatvisit" place />
                </div>
            </section>

            <!-- where eat carousel -->
            <section 
            v-if="showWhereeatSection"
                class="mt-2"
            >
                <div class="flex items-center justify-between px-3 sp:px-4 h-[20px] sp:h-[28px]">
                    <h2 class="lato text-[14px] sp:text-[20px] font-bold leading-[12px] sp:leading-[18px]">
                        {{ $utils.capitalize($t('home.section-where-eat.title')) }}
                    </h2>
                    <a 
                        @click="goPlaces(crossellingPlacesData?.whereeat_id, catWhereEatId)"
                        class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] underline hover:underline" href="javascript:void(0)"
                    >
                        {{ $utils.capitalize($t('home.btn-see-all')) }}
                    </a>
                </div>
                <div class="">
                    <CarouselPlaces id="2" :items="crossellingPlacesData?.crosselling_places_whereeat" place />
                </div>
            </section>

            <!-- leisure carousel -->
            <section 
                v-if="showLeisureSection"
                class="mt-2"
            >
                <div class="flex items-center justify-between px-3 sp:px-4 h-[20px] sp:h-[28px]">
                    <h2 class="lato text-[14px] sp:text-[20px] font-bold leading-[12px] sp:leading-[18px]">
                        {{ $utils.capitalize($t('home.section-leisure.title')) }}
                    </h2>
                    <a 
                        @click="goPlaces(crossellingPlacesData?.leisure_id, catLeisureId)"
                        class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] underline hover:underline" href="javascript:void(0)"
                    >
                        {{ $utils.capitalize($t('home.btn-see-all')) }}
                    </a>
                </div>
                <div class="">
                    <CarouselPlaces id="2" :items="crossellingPlacesData?.crosselling_places_leisure" place />
                </div>
            </section>

            <!-- experiences carousel -->
            <section 
                v-if="crossellingPlacesData?.crosselling_experiences?.length > 0 && hotelData.show_experiences"
                class="mt-2"
            >
                <div class="flex items-center justify-between px-3 sp:px-4 h-[20px] sp:h-[28px]">
                    <h2 class="lato text-[14px] sp:text-[20px] font-bold leading-[12px] sp:leading-[18px]">
                        {{ $utils.capitalize($t('home.section-experience.title')) }}
                    </h2>
                    <router-link :to="{name:'ExperienceList'}" class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] underline hover:underline">
                        {{ $utils.capitalize($t('home.btn-see-all')) }}
                    </router-link>
                </div>
                <div class="">
                    <CarouselExperiences id="5" :items="crossellingPlacesData.crosselling_experiences"/>
                </div>
            </section>

            <SocialNetworks v-if="hotelData" />
        </div>
    </PageTransitionGlobal>

    <!-- forms -->
    <ModalSession />
</template>
<script setup>
import { onMounted, computed, ref, watch, watchEffect } from 'vue';
import { DateTime } from 'luxon';
import { useRouter } from 'vue-router';
import { isMockup } from '@/utils/utils'
const router = useRouter();
//sections
import ModalSession from '@/Modules/Auth/ModalSession.vue';
import HeaderHomeRed from './Components/HeaderHomeRed.vue'
import HeroSectionRed from './Components/HeroSectionRed.vue'
import CarouselFacilities from './Components/CarouselFacilitiesRed.vue'
import CarouselPlaces from './Components/CarouselPlacesRed.vue'
import CarouselExperiences from './Components/CarouselExperiencesRed.vue'
import SocialNetworks from './Components/SocialNetworksRed.vue'
import ButtonsSection from './Components/ButtonsSection.vue'
import BannersSection from './Components/BannersSection.vue';

import PageTransitionGlobal from "@/components/PageTransitionGlobal.vue";
import { SECTIONS } from "@/constants/sections.js";

//
import { $currentPeriod } from '@/utils/helpers.js'
//
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { useStayStore } from '@/stores/modules/stay'
const stayStore = useStayStore();
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore();
// const { hotelData } = hotelStore
import { usePlaceStore } from '@/stores/modules/place'
const placeStore = usePlaceStore()
import { useAuthStore } from '@/stores/modules/auth'
const authStore = useAuthStore()
import { useLoadingSections } from "@/composables/useLoadingSections";
const { startLoading, stopLoading } = useLoadingSections();


// DATA
const crossellingsData = ref(null)
const crossellingPlacesData = ref(null)
const placeCategories = ref(null)
const catWhatVisitId = ref(null)
const catWhereEatId = ref(null)
const catLeisureId  = ref(null)

startLoading(SECTIONS.HOME.GLOBAL);

onMounted(async () => {
    // loadCrossellings();
    // loadCrossellingsPlaces();
    // getPlaceCategories();
    // console.log('test guestData',guestStore.guestData)
    
});

const hotelData = computed(() => {
    return hotelStore.hotelData;
});

watch(hotelData, (valueCurrent, valueOld) => {
    if (!valueOld && valueCurrent) {
        loadData();
    }
}, { immediate: true });

async function loadData () {
    await Promise.all([loadCrossellings(), loadCrossellingsPlaces(), getPlaceCategories()]);
    stopLoading(SECTIONS.HOME.GLOBAL);
}

async function loadCrossellings () {
    crossellingsData.value = await hotelStore.$getCrossellings()
}

const goFacilities = () => {
    router.push({ name: 'FacilityList' });
}

async function loadCrossellingsPlaces () {
    crossellingPlacesData.value = await placeStore.$getCrosselling();
    // console.log('test crossellingPlacesData.value', crossellingPlacesData.value)
}

async function getPlaceCategories(){
    if(!hotelData.value) return;
    const response = await placeStore.$apiGetCategoriesByType({city: hotelData.value?.zone, all: true});
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

const goPlaces = (type, cat) => {
    router.push({ name: 'PlaceList', query: { typeplace: type, categoriplace: cat, mobile : true } });
}

// const formType = computed(() => props.acform);

const showWhatvisitSection = computed(() => {
    if(!crossellingPlacesData.value?.crosselling_places_whatvisit?.length) return false;
    let idSection = crossellingPlacesData.value?.crosselling_places_whatvisit[0].type_place.id;
    return !hotelStore.hotelData.hidden_type_places.includes(idSection)
});

const showWhereeatSection = computed(() => {
    if(!crossellingPlacesData.value?.crosselling_places_whereeat?.length) return false;
    let idSection = crossellingPlacesData.value?.crosselling_places_whereeat[0].type_place.id;
    return !hotelStore.hotelData.hidden_type_places.includes(idSection)
});

const showLeisureSection = computed(() => {
    if(!crossellingPlacesData.value?.crosselling_places_leisure?.length) return false;
    let idSection = crossellingPlacesData.value?.crosselling_places_leisure[0].type_place.id;
    return !hotelStore.hotelData.hidden_type_places.includes(idSection)
});





</script>