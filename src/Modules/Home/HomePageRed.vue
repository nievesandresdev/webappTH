<template>
    <HeaderHomeRed />
    <HeroSectionRed />

    <!-- carousel's -->
    <div class="mt-6 pb-[120px]">
        
        <!-- facilities carousel -->
        <section 
            v-if="crossellingsData?.crosselling_facilities?.length > 0 && hotelData?.show_facilities" 
            class="pl-4"
        >
            <div class="flex items-center justify-between pr-4 h-[28px]">
                <h2 class="lato text-[20px] font-bold leading-[18px]">
                    {{ $utils.capitalize($t('home.section-facility.title')) }}
                </h2>
                <a 
                    @click="goFacilities()" 
                    class="lato text-sm font-bold leading-[16px] underline hover:underline" href="javascript:void(0)"
                >
                    {{ $utils.capitalize($t('home.btn-see-all')) }}
                </a>
            </div>
            <div class="">
                <CarouselFacilities id="1" :items="crossellingsData.crosselling_facilities"/>
            </div>
        </section>

        <!-- what visit carousel -->
        <section 
            v-if="crossellingPlacesData?.crosselling_places_whatvisit?.length > 0"
            class="pl-4 mt-2"
        >
            <div class="flex items-center justify-between pr-4 h-[28px]">
                <h2 class="lato text-[20px] font-bold leading-[18px]">
                    {{ $utils.capitalize($t('home.section-what-visit.title')) }}
                </h2>
                <a 
                    @click="goPlaces(crossellingPlacesData?.whatvisit_id, catWhatVisitId)"
                    class="lato text-sm font-bold leading-[16px] underline hover:underline" href="javascript:void(0)"
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
            v-if="crossellingPlacesData?.crosselling_places_whereeat?.length > 0"
            class="pl-4 mt-2"
        >
            <div class="flex items-center justify-between pr-4 h-[28px]">
                <h2 class="lato text-[20px] font-bold leading-[18px]">
                    {{ $utils.capitalize($t('home.section-where-eat.title')) }}
                </h2>
                <a 
                    @click="goPlaces(crossellingPlacesData?.whereeat_id, catWhereEatId)"
                    class="lato text-sm font-bold leading-[16px] underline hover:underline" href="javascript:void(0)"
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
            v-if="crossellingPlacesData?.crosselling_places_leisure?.length > 0"
            class="pl-4 mt-2"
        >
            <div class="flex items-center justify-between pr-4 h-[28px]">
                <h2 class="lato text-[20px] font-bold leading-[18px]">
                    {{ $utils.capitalize($t('home.section-leisure.title')) }}
                </h2>
                <a 
                    @click="goPlaces(crossellingPlacesData?.leisure_id, catLeisureId)"
                    class="lato text-sm font-bold leading-[16px] underline hover:underline" href="javascript:void(0)"
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
            class="pl-4 mt-2"
        >
            <div class="flex items-center justify-between pr-4 h-[28px]">
                <h2 class="lato text-[20px] font-bold leading-[18px]">
                    {{ $utils.capitalize($t('home.section-experience.title')) }}
                </h2>
                <router-link :to="{name:'ExperienceList'}" class="lato text-sm font-bold leading-[16px] underline hover:underline">
                    {{ $utils.capitalize($t('home.btn-see-all')) }}
                </router-link>
            </div>
            <div class="">
                <CarouselExperiences id="5" :items="crossellingPlacesData.crosselling_experiences"/>
            </div>
        </section>
    </div>

    <!-- forms -->
    <ResetPasswordBottomSheet :open="formType == 'reset'"/>
    <RegisterOrLoginBottomSheet :open="formType == 'log' || !guestStore.guestData && formType !== 'reset'"/>
    <CompleteRegisterBottomSheet :open="formType == 'complete' || guestStore.guestData && !guestStore.guestData.name"/>
    <CreateStayBottomSheet :open="formType == 'createstay' || guestStore.guestData && guestStore.guestData.name && !stayStore.stayData && !formType"/>
</template>
<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
//forms
import RegisterOrLoginBottomSheet from '@/layout/Auth/RegisterOrLoginBottomSheet.vue';
import CompleteRegisterBottomSheet from '@/layout/Auth/CompleteRegisterBottomSheet.vue'
import CreateStayBottomSheet from '@/layout/Auth/CreateStayBottomSheet.vue'
import ResetPasswordBottomSheet from '@/layout/Auth/ResetPasswordBottomSheet.vue'
//sections
import HeaderHomeRed from './Components/HeaderHomeRed.vue'
import HeroSectionRed from './Components/HeroSectionRed.vue'
import CarouselFacilities from './Components/CarouselFacilitiesRed.vue'
import CarouselPlaces from './Components/CarouselPlacesRed.vue'
import CarouselExperiences from './Components/CarouselExperiencesRed.vue'

import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { useStayStore } from '@/stores/modules/stay'
const stayStore = useStayStore();
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore();
const { hotelData } = hotelStore
import { usePlaceStore } from '@/stores/modules/place'
const placeStore = usePlaceStore()


const props = defineProps({
    acform: {
        type:String,
        default:false
    }
});

// DATA
const crossellingsData = ref(null)
const crossellingPlacesData = ref(null)
const placeCategories = ref(null)
const catWhatVisitId = ref(null)
const catWhereEatId = ref(null)
const catLeisureId  = ref(null)

onMounted(() => {
    loadCrossellings();
    loadCrossellingsPlaces();
    getPlaceCategories();
})

async function loadCrossellings () {
    crossellingsData.value = await hotelStore.$getCrossellings()
    console.log('test crossellingsData',crossellingsData.value)
}

const goFacilities = () => {
    router.push({ name: 'FacilityList' });
}

async function loadCrossellingsPlaces () {
    crossellingPlacesData.value = await placeStore.$getCrosselling();
    console.log('test crossellingPlacesData.value', crossellingPlacesData.value)
}

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

const goPlaces = (type, cat) => {
    router.push({ name: 'PlaceList', query: { typeplace: type, categoriplace: cat, mobile : true } });
}

const formType = computed(() => props.acform);
</script>