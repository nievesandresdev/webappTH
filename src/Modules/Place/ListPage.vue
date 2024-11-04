<template>
    <AppHeader
        title="Hotel"
        :tabs="tabsHeader"
        fixed
    >
        <template v-slot:titleOrSearch>
            <InputSearchPlace />
        </template>
    </AppHeader>
    <div class="mt-[148px] flex-1">
        <ListPageMapClusterPlace />
        <ListPageBottomSheet />

    </div>
</template>

<script setup>

import { onMounted, ref, provide, reactive, toRefs, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getUrlParam } from '@/utils/utils.js';
const route = useRouter();

import AppHeader from '@/layout/Components/AppHeader.vue';
import BaseMap from '@/components/Maps/BaseMap.vue';
import InputSearchPlace from './components/InputSearchPlace.vue';
import ListPageMapClusterPlace from './ListPageMapClusterPlace.vue';
import ListPageBottomSheet from './ListPageBottomSheet.vue';

// STORE
import { usePlaceStore } from '@/stores/modules/place';
const placeStore = usePlaceStore();

import { useLocaleStore } from '@/stores/modules/locale'
const localeStore = useLocaleStore()
const { localeCurrent } = localeStore

import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
const { hotelData } = hotelStore;

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
    categoriplace: null,
    typeplace: null,
    points: [],
    distances: [],
    all_cities: false,
    search:null,
    city: null,
}
const categoriplaces = ref([]);
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

const typePlaceSelected = computed(() => {
    let typeplace = typeplaces.value.find(item => formFilter.typeplace);
    if (typeplace) {
        delete typeplace.categori_places;
    }
    return typeplace;
});
const categoriPlaceSelected = computed(() => {
    let categoriplace = categoriplaces.value.find(item => formFilter.categoriplace);
    return categoriplace;
});

// PROVIDE
provide('hotelData', hotelData);

// ONMOUNTED
onMounted(async () => {
    await loadTypePlaces();
    loadCategoriPlaces();
    // loadPlaces();
    formFilter.city = getUrlParam('city') || hotelData.zone;
});

// FUNCTIONS
async function loadTypePlaces () {
    const response = await placeStore.$apiGetTypePlaces();
    if (response.ok) {
        loadQueryInFormFilter();
        typeplaces.value = response.data;
        if (!formFilter.typeplace) {
            formFilter.typeplace = typeplaces.value?.[0].id;
        }
        if (!formFilter.categoriplace) {
            formFilter.categoriplace = typeplaces.value?.[0].categori_places?.[0].id;
        }
        loadTabsHeader();
    }
}

async function loadCategoriPlaces () {
    // const response = await placeStore.$apiGetCategoriesByType({city: formFilter.city, all: true, withNumbersPlaces: true});
    // if (response.ok) {
    //     categoriplaces.value = response.data;
    // }
    categoriplaces.value = typeplaces.value.find(item => item.id == formFilter.typeplace)?.categori_places ?? [];
}

function loadTabsHeader () {
    tabsHeader.value = typeplaces.value.map(item => {
        return {
            title: item.translation_current,
            exclude: false,
            iconDefault: `${item.icon}`,
            iconSelected: `${item.icon}.DEFAULT`,
            isActive: item.id == formFilter.typeplace,
            onClick: () => changeCategory(null, item.id),
        };
    });
}

function changeCategory (idCategory = null, idTypePlace = null) {
    formFilter.categoriplace = idCategory;
    formFilter.typeplace = idTypePlace;
    if(!formFilter.categoriplace) getFirstCategoryOfType();
    loadTabsHeader();
    submitFilter();
}

const getFirstCategoryOfType = ()=> {
    if(formFilter.typeplace){
        let first = categoriplaces.value?.[0] ?? null;
        formFilter.categoriplace = first?.id;
    }
}

function loadPlaces () {

}

function submitFilter (){
    // page.value = 1;
    // placesData.value = [];
    // loadPlaces();
    route.push({ name: 'PlaceList', query: {...filterNonNullAndNonEmpty(formFilter)} })
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
            if (['duration', 'distances'].includes(key)) {
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


</script>