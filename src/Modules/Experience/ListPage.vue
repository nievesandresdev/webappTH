<template>
<div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]" />
    <AppHeader
        title="Experiencias"
        with-title-route
        fixed
    >
        <template v-slot:titleOrSearch>
            <InputSearchExperience
                :empty-filters="emptyFilters"
                @search="searchHandle"
                @activateSearch="activateSearchHandle"
                @openFilter="openFilter"
            />
        </template>
    </AppHeader>

    <div class="flex flex-col">
    
        <div class="h-[90px]  sp:h-[124px] w-full">
            d
        </div>
        <ListPageList @loadMore="loadMore" />
    </div>
    <ListPageBottomSheetFilter
        @reloadPlaces="loadAll({ showPreloader: true })"
    />
</template>

<script setup>
import { onMounted, ref, provide, reactive, toRefs, computed, toRaw, nextTick, watch, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getUrlParam, slufy } from '@/utils/utils.js';
const route = useRouter();

import AppHeader from '@/layout/Components/AppHeader.vue';
import InputSearchExperience from './components/InputSearchExperience.vue';
import ListPageList from './ListPageList.vue';
import ListPageBottomSheetFilter from './ListPageBottomSheetFilter.vue';

// STORE
import { useExperienceStore } from '@/stores/modules/experience';
const experienceStore = useExperienceStore();

import { useLocaleStore } from '@/stores/modules/locale'
const localeStore = useLocaleStore()
const { localeCurrent } = localeStore

import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
const { hotelData } = hotelStore;

// DATA

const dataFilter = {
    duration: [],
    score: [],
    price_min: null,
    price_max: null,
    search:null,
    city: null,
    all_cities: false,
    free_cancelation: false,
    featured: false,
};
const formFilter = reactive(JSON.parse(JSON.stringify(dataFilter)));

const isOpenBottomSheetFilter = ref(false);
const loadingSearch = ref(false);
const searchingActive = ref(false);
const isloadingForm = ref(false);
const page = ref(1);
const experiencesData = ref([]);
const paginateData = reactive({
    total: 0,
    current_page: 1,
    per_page: 1,
    last_page: 0,
    from_page: 0,
    to: 0,
});

// COMPUTED
const numbersFiltersApplied = computed(() => {
    let filters = [];
    formFilter.duration?.length ? filters.push('duration') : '';
    formFilter.score?.length ? filters.push('score') : '';
    formFilter.price_min ? filters.push('price_min') : '';
    formFilter.price_max ? filters.push('price_max') : '';
    formFilter.free_cancelation ? filters.push('free_cancelation') : '';
    formFilter.featured ? filters.push('featured') : '';
    return filters;
});
const emptyFilters = computed(() => {
    return numbersFiltersApplied.value.length == 0;
});

// WATCH
watch(formFilter, function(value) {
    experienceStore.setDataFilterList(formFilter);
});

// ONMOUNTED
onMounted(async () => {
    loadForFilterGlobal();
    loadAll({showPreloader: true});
    formFilter.city = getUrlParam('city') || hotelData.zone;
});

// FUNCTION
function loadForFilterGlobal () {
    Object.assign(formFilter, experienceStore.dataFilterGlobal);
}

function loadMore () {
    page.value += 1;
    loadExperiences();
}

function closeSearchHandle () {
    searchingActive.value = false;
}

function activateSearchHandle ($event) {
    searchingActive.value = false;
    // formFilter.search = '';
    // loadAll({showPreloader: false});
}

async function searchHandle ($event) {
    searchingActive.value = true;
    loadingSearch.value = true;
    formFilter.search = $event?.target?.value ?? '';
    page.value = 1;
    experiencesData.value = [];
    await loadAll({showPreloader: false});
    loadingSearch.value = false;
}

async function loadAll(payload) {
     const materialicePromice = await Promise.all([submitFilter(payload)]);
}

function submitFilter (payload){
    page.value = 1;
    experiencesData.value = [];
    loadExperiences();
    let { showPreloader } = payload ?? {};
    if (showPreloader) {
        route.push({ name: 'ExperienceList', query: {...filterNonNullAndNonEmpty(formFilter)} });
    }
}


async function loadExperiences () {
    isloadingForm.value = true;
    let query = {...filterNonNullAndNonEmpty(formFilter)}
    const response = await experienceStore.$apiGetAll({page: page.value,...query});
    if (response.ok) {
        Object.assign(paginateData, response.data.experiences.paginate);
        page.value = paginateData.current_page;
        experiencesData.value = [...experiencesData.value, ...response.data.experiences.data];
    }
    firstLoad.value = false;
    isloadingForm.value = false;
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

async function openFilter () {
    // await nextTick();
    setTimeout(() => {
        searchingActive.value = false;
        // formFilter.search = null;
        isOpenBottomSheetFilter.value = true;
    }, 400);
}

// PROVIDE
provide('hotelData', hotelData);
provide('formFilter', formFilter);
provide('paginateData', paginateData);
provide('experiencesData', experiencesData);
provide('loadingSearch', loadingSearch);
provide('isOpenBottomSheetFilter', isOpenBottomSheetFilter);
provide('isloadingForm', isloadingForm);
provide('searchingActive', searchingActive);


// SKELETON
const firstLoad = ref(true);

provide('firstLoad', firstLoad);




</script>