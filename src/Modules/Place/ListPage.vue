<template>
<div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]" />
    <AppHeader
        title="Lugares"
        :tabs="tabsHeader"
        fixed
    >
        <template v-slot:titleOrSearch>
            <InputSearchPlace
                :empty-filters="emptyFilters"
                @search="searchHandle"
                @activateSearch="activateSearchHandle"
                @openFilter="openFilter"
            />
        </template>
    </AppHeader>
    <PageTransitionGlobal module="place">
        <div class="flex-1 ">
            <ListPageMapClusterPlace
                @clickMapCluster="handleMapCluster"
            />
            <ListPageBottomSheet
                @changeCategory="changeCategoryHandle($event)"
                @loadMore="loadMore"
                @closeSearch="closeSearchHandle"
            />
        </div>
    </PageTransitionGlobal>
    <ListPagebottomSheetFilter
        @reloadPlaces="loadAll({ showPreloader: true })"
    />
</template>

<script setup>

import { onMounted, ref, provide, reactive, toRefs, computed, toRaw, nextTick, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getUrlParam, slufy, isMockup } from '@/utils/utils.js';
const route = useRouter();

import AppHeader from '@/layout/Components/AppHeader.vue';
import BaseMap from '@/components/Maps/BaseMap.vue';
import InputSearchPlace from './components/InputSearchPlace.vue';
import ListPageMapClusterPlace from './ListPageMapClusterPlace.vue';
import ListPageBottomSheet from './ListPageBottomSheet.vue';
import ListPagebottomSheetFilter from './ListPagebottomSheetFilter.vue';

import PageTransitionGlobal from "@/components/PageTransitionGlobal.vue";
import { SECTIONS } from "@/constants/sections.js";
import { useLoadingSections } from "@/composables/useLoadingSections";
const { startLoading, stopLoading } = useLoadingSections();

// STORE
import { usePlaceStore } from '@/stores/modules/place';
const placeStore = usePlaceStore();

import { useLocaleStore } from '@/stores/modules/locale'
const localeStore = useLocaleStore()
const { localeCurrent } = localeStore

import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()

// COMPOSABLES
import { useEventBus } from '@/composables/eventBus';
const { onEvent } = useEventBus();   

    // PROPS
const props = defineProps({
    queryRouter: {
        type: Object,
        default: () => ({})
    }
})
const { queryRouter } = toRefs(props);


// DATA
const dataFilter = {
    categoriplace: [],
    typeplace: null,
    points: [],
    distances: [],
    all_cities: false,
    search:null,
    city: null,
    featured: false,
}

const positionBottomSheet = ref('medium');
const loadingSearch = ref(false);
const isOpenBottomSheetList = ref(true);
const isOpenBottomSheetFilter = ref(false);
const searchingActive = ref(false);
const isloadingForm = ref(false);
const loadingPlaceSeleced = ref(false);
const page = ref(1);
const placesData = ref([]);
const pointersData = ref({
        type: "FeatureCollection",
        features: []
});
const placeSelected = ref(null);
const countOtherCities = ref(null);
const categoriplaces = ref([]);
const categoriplacesWithNumbers = ref(null);
const typeplaces = ref([]);
const formFilter = reactive(JSON.parse(JSON.stringify(dataFilter)));

const paginateData = reactive({
    total: 0,
    current_page: 1,
    per_page: 1,
    last_page: 0,
    from_page: 0,
    to: 0,
});
const tabsHeader = ref([]);



// COMPUTED
const hotelData = computed(() => {
    return hotelStore.hotelData ?? null;
});
const typePlaceSelected = computed(() => {
    let typeplace = typeplaces.value.find(item => item.id == formFilter.typeplace);
    // if (typeplace) {
    //     delete typeplace.categori_places;
    // }
    return typeplace;
});
const firstTypePlace = computed(() => {
    let typeplace = typeplaces.value.find(item => item);
    // if (typeplace) {
    //     delete typeplace.categori_places;
    // }
    return typeplace;
});
const categoriPlaceSelected = computed(() => {
    let categoriplace = categoriplaces.value.filter(item => formFilter.categoriplace.includes(item.id));
    return categoriplace;
});
const firstCategoriPlace = computed(() => {
    let categoriplace = categoriplaces.value.find(item => item);
    return categoriplace;
});

const numbersFiltersApplied = computed(() => {
    let filters = [];
    formFilter.featured ? filters.push('featured') : '';
    formFilter.distances?.length ? filters.push('distances') : '';
    formFilter.points?.length ? filters.push('points') : '';
    return filters;
});
const emptyFilters = computed(() => {
    return numbersFiltersApplied.value.length == 0;
});


// WATCH
watch(formFilter, function(value) {
    placeStore.setDataFilterList(formFilter);
});

watch(positionBottomSheet, function(val) {
    placeSelected.value = null;
    if (val == '0%') {
        isOpenBottomSheetList.value = true;
        setTimeout(() => {
            isOpenBottomSheetFilter.value = false;
        }, 400);
    }
});

startLoading(SECTIONS.PLACE.GLOBAL);
watch(hotelData, (valueCurrent, valueOld) => {
    if (!valueOld && valueCurrent) {
        loadData();
    }
}, { immediate: true });

// ONMOUNTED
onMounted(async () => {
});

onEvent('change-category', changeCategoryHandle);

// FUNCTIONS
async function loadData () {
    loadForFilterGlobal();
    await loadTypePlaces();
    await loadAll({showPreloader: true});
    formFilter.city = getUrlParam('city') || hotelData.value.zone;
    stopLoading(SECTIONS.PLACE.GLOBAL);
}

function loadForFilterGlobal () {
    Object.assign(formFilter, placeStore.dataFilterGlobal);
}
async function getPlaceById (placeId) {
    placeSelected.value = null;
    loadingPlaceSeleced.value = true;
    let response = await placeStore.$findById({id: placeId}, { showPreloader: false });
    if(response.ok) placeSelected.value = response.data.place;
    loadingPlaceSeleced.value = false;
}

function handleMapCluster (payload) {
    placeSelected.value = null;
    let { event, type } = payload;
    if (type == 'cluster') {
        getPlaceById(event.properties.id);
        positionBottomSheet.value = 'bottom';
    } else {
        positionBottomSheet.value = 'medium';
    }
}

async function loadTypePlaces () {
    const response = await placeStore.$apiGetTypePlaces();
    if (response.ok) {
        typeplaces.value = response.data;
        loadQueryInFormFilter();
        if (!formFilter.typeplace) {
            formFilter.typeplace = typeplaces.value?.[0].id;
        }
        validateTyePlaceCurrent();

        categoriplaces.value = typeplaces.value.find(item => item.id == formFilter.typeplace)?.categori_places ?? [];
        const { hidden_categories } = hotelData.value;
        categoriplaces.value = categoriplaces.value.filter(item => !hidden_categories.includes(item.id));
        // validateCategoriplaceCurrent();

        loadTabsHeader();
    }
}

function validateTyePlaceCurrent () {
    if(!typePlaceSelected.value) {
        let {id: idFirstTypePlace} = firstTypePlace.value;
        formFilter.typeplace = idFirstTypePlace;   
    }
}
function validateCategoriplaceCurrent () {
    if(categoriPlaceSelected.value?.length <= 0) {
        formFilter.categoriplace = [];
    }
}

async function loadCategoriPlaces () {
    
    const response = await placeStore.$apiGetCategoriesByType({...formFilter, allCategories: true, all: true, withNumbersPlaces: true});
    if (response.ok) {
        categoriplacesWithNumbers.value = response.data;
    }
}

function loadTabsHeader () {
    tabsHeader.value = typeplaces.value.map(item => {
        return {
            title: item.translation_current,
            exclude: false,
            iconDefault: `${item.icon}`,
            iconSelected: `${item.icon}.DEFAULT`,
            isActive: item.id == formFilter.typeplace,
            onClick: () => changeCategory([], item.id),
        };
    });
}

function changeCategoryHandle (payload) {
    const { idCategory, idTypePlace } = payload;
    changeCategory(idCategory, idTypePlace);
}

async function changeCategory (idCategory = [], idTypePlace = null) {
    if (idCategory.length > 0) {
        if (formFilter.categoriplace?.includes(idCategory)) {
            let index = formFilter.categoriplace.indexOf(idCategory);
            if (index !== -1) {
                formFilter.categoriplace.splice(index, 1);
            }
        } else {
             formFilter.categoriplace.push(String(idCategory));
        }
        if (formFilter.categoriplace.length >= categoriplaces.value.length) {
            formFilter.categoriplace = [];
        }
    } else {
        formFilter.categoriplace = [];
    }
    formFilter.typeplace = idTypePlace;
    loadTabsHeader();
    loadAll({showPreloader: true});
}

const getFirstCategoryOfType = ()=> {
    if(formFilter.typeplace){
        let first = categoriplaces.value?.[0] ?? null;
        formFilter.categoriplace = [first?.id];
    }
}

async function loadPlaces () {
    isloadingForm.value = true;
    let query = {...filterNonNullAndNonEmpty(formFilter)}
    const response = await placeStore.$apiGetAll({page: page.value,...query});
    if (response.ok) {
        Object.assign(paginateData, response.data.places.paginate);
        page.value = paginateData.current_page;
        placesData.value = [...placesData.value, ...response.data.places.data];
        countOtherCities.value = response.data.countOtherCities;
        loadCategoriPlaces();
    }
    firstLoad.value = false;
    isloadingForm.value = false;
    // const cities = await cityStore.$getNearCitiesData()
    // if(cities.ok){
    //     nearCitiesData.value = cities.data;
    // }
}

async function loadPointers () {
    let query = {...filterNonNullAndNonEmpty(formFilter)}
    const response = await placeStore.$apiGetPointer(query);
    if (response.ok) {
        pointersData.value = transformDataPointer(response.data?.places);
        // console.log(pointersData.value, 'pointersData.value');
    }
}

function transformDataPointer (data) {
    return  {
        type: "FeatureCollection",
        features: data.map(item => transformFeaturesPointerData(item)),
    }
}

function transformFeaturesPointerData (item) {
    return {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [Number(item.metting_point_longitude), Number(item.metting_point_latitude)]
        },
        properties: {
            id: item.id,
            name: item.title,
            description: item.description,
            category: slufy(item.categori_place.name),
            categoryIcon:  item.categori_place.icon,
        }
    }
}

function loadMore () {
    page.value += 1;
    loadPlaces();
}

function closeSearchHandle () {
    searchingActive.value = false;
}

async function searchHandle ($event) {
    searchingActive.value = true;
    loadingSearch.value = true;
    formFilter.search = $event?.target?.value ?? '';
    page.value = 1;
    placesData.value = [];
    await loadAll({showPreloader: false});
    loadingSearch.value = false;
}

function activateSearchHandle ($event) {
    placeSelected.value = null;
    positionBottomSheet.value = $event;
    if ($event == 'medium') {
        searchingActive.value = false;
        // formFilter.search = '';
        // loadAll({showPreloader: false});
    }
}

async function loadAll(payload) {

    const materialicePromice = await Promise.all([loadCategoriPlaces(),  submitFilter(payload), loadPointers()]);
}

function submitFilter (payload){
    placeSelected.value = null;
    isOpenBottomSheetList.value = true;
    page.value = 1;
    placesData.value = [];
    loadPlaces();
    let { showPreloader } = payload ?? {};
    if (showPreloader) {
        let formFilterWithMockup = {...formFilter, mockup: isMockup() }
        route.push({ name: 'PlaceList', query: {...filterNonNullAndNonEmpty(formFilterWithMockup)} });
    }
}

function filterNonNullAndNonEmpty(obj) {
    const filteredObject = {}
    Object.keys(obj).forEach(key => {

        if (obj[key] !== null && obj[key] !== '') {
            if (Array.isArray(obj[key]) && obj[key].length > 0) {
                filteredObject[key] = obj[key]
            }
            else if (!Array.isArray(obj[key])) {
                filteredObject[key] = obj[key]
            }
        }
    })
    return filteredObject
}

function loadQueryInFormFilter () {
    for (const [key, value] of Object.entries(queryRouter.value || {})) {
        if (formFilter.hasOwnProperty(key)) {
            if (['duration', 'distances', 'categoriplace', 'points'].includes(key)) {
                if (typeof value === 'string') {
                    formFilter[key].push(value);
                } else {
                    formFilter[key] = value;
                }
            }else {
                formFilter[key] = validValueQuery(key, value);
            }
        }
    }
}

function validValueQuery (field, value) {
    if (value === 'false') return false;
    if (value === 'true') return true;
    return value;
}

async function openFilter () {
    isOpenBottomSheetList.value = false;
    // await nextTick();
    setTimeout(() => {
        positionBottomSheet.value = 'medium';
        searchingActive.value = false;
        // formFilter.search = '';
        isOpenBottomSheetFilter.value = true;
    }, 400);
}

function handleMapClick (event) {

}

// PROVIDE
provide('hotelData', hotelData);
provide('categoriplaces', categoriplaces);
provide('formFilter', formFilter);
provide('paginateData', paginateData);
provide('placesData', placesData);
provide('pointersData', pointersData);
provide('placeSelected', placeSelected);
provide('loadingSearch', loadingSearch);
provide('emptyFilters', emptyFilters);
provide('loadingPlaceSeleced', loadingPlaceSeleced);
provide('isOpenBottomSheetList', isOpenBottomSheetList);
provide('isOpenBottomSheetFilter', isOpenBottomSheetFilter);
provide('positionBottomSheet', positionBottomSheet);
provide('isloadingForm', isloadingForm);
provide('searchingActive', searchingActive);
provide('categoriplacesWithNumbers', categoriplacesWithNumbers);


// SKELETON
const firstLoad = ref(true);

provide('firstLoad', firstLoad);


</script>