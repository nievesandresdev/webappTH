<template>

    <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000" />

    <HeaderHomeRed />
   <PageTransitionGlobal module="home">
    
        <HeroSectionRed />
        <BannersSection />
        <ButtonsSection v-if="hotelStore.hotelData?.buttons_home" />
        <!--  como anclar app  al inicio -->
        <TutorialHome :showTutorial="showTutorial" @closeAppTutorial="closeAppTutorial" />

        <SectionServices />

        <!-- carousel's -->
        <div class="mt-4 sp:mt-6 pb-[70px] sp:pb-[104px]" v-if="hotelStore.hotelData">
            <!-- facilities carousel -->
            <CarouselFacilities/>    
            <ExplorePlacesSection />
            <RecomendationPlaces/>
            <CarouselExperiences/>
            <SocialNetworks />
        </div>
    </PageTransitionGlobal>

    <!-- forms -->
    <ModalSession />
    <FakeModalMsgQuery />
</template>
<script setup>
import { onMounted, computed, ref, watch, watchEffect, provide } from 'vue';
import { DateTime } from 'luxon';
import { useRouter } from 'vue-router';
import { isMockup } from '@/utils/utils'
const router = useRouter();
import { useHead } from '@vueuse/head'
import FakeModalMsgQuery from './FakeModalMsgQuery.vue';
import { useFavicon } from '@/composables/useFavicon'

//sections
    import SectionServices from './Components/SectionServices.vue';
import ModalSession from '@/Modules/Auth/ModalSession.vue';
import HeaderHomeRed from './Components/HeaderHomeRed.vue'
import HeroSectionRed from './Components/HeroSectionRed.vue'
import CarouselFacilities from './Components/CarouselFacilitiesRed.vue'
import CarouselPlaces from './Components/CarouselPlacesRed.vue'
import CarouselExperiences from './Components/CarouselExperiencesRed.vue'
import SocialNetworks from './Components/SocialNetworksRed.vue'
import ButtonsSection from './Components/ButtonsSection.vue'
import BannersSection from './Components/BannersSection.vue';
import TutorialHome from './Components/TutorialHome.vue';
import ExplorePlacesSection from './Components/ExplorePlacesSection.vue';
import PageTransitionGlobal from "@/components/PageTransitionGlobal.vue";
import { SECTIONS } from "@/constants/sections.js";
import RecomendationPlaces from './Components/RecomendationPlaceSections.vue';

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
const showTutorial = ref(true)
const orderSections = ref(null)

startLoading(SECTIONS.HOME.GLOBAL);

useHead({
    title: 'The Hoster',
    meta: [
        { name: 'description', content: 'The Hoster' },
        { name: 'og:title', content: 'The Hoster' },
    ]
})

useFavicon('/assets/icons/1.TH.RECOMMEND.svg')

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
    await Promise.all([loadCrossellings(), loadCrossellingsPlaces(), getPlaceCategories(), loadOrderSections()]);
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
    console.log('test crossellingPlacesData.value', crossellingPlacesData.value)
}

async function loadOrderSections () {
    const response = await hotelStore.$getOrderSections()
    if(response.ok) orderSections.value = response.data
    console.log('test orderSections.value', orderSections.value)
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

const closeAppTutorial = () => {
    showTutorial.value = false
}

provide('placeCategories', placeCategories)
provide('orderSections', orderSections)
provide('crossellingPlacesData', crossellingPlacesData)
provide('crossellingsData', crossellingsData)

</script>