<template>
<AppHeader
    fixed
    :tabs="tabsHeader"
>
    <template v-slot:titleOrSearch>
        <InputSearch
            :empty-filters="emptyFilters"
            @search="searchHandle"
            @activateSearch="activateSearchHandle"
            @openFilter="openFilter"
        />
    </template>
</AppHeader>

    <div class="flex flex-col">
        <div class="h-[70px]  sp:h-[126px] w-full">
            d
        </div>
        <ListPageContent>
            <template v-slot:confort>
                <router-view />
            </template>
        </ListPageContent>
    </div>

</template>

<script setup>
import { onMounted, ref, provide, reactive, toRefs, computed, toRaw, nextTick, watch, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getUrlParam, slufy } from '@/utils/utils.js';
const route = useRouter();

// COMPONENTS
import AppHeader from '@/layout/Components/AppHeader.vue';
import InputSearch from './components/InputSearch.vue';
import ListPageContent from './ListPageContent.vue';

// STORE
import { useServiceStore } from '@/stores/modules/service';
const serviceStore = useServiceStore();


// DATA

const dataFilter = {
    price_min: null,
    price_max: null,
    search: null,
    type: 'CONFORT',
}
const formFilter = reactive(JSON.parse(JSON.stringify(dataFilter)));

const firstLoad = ref(true);
const isOpenBottomSheetFilter = ref(false);
const loadingSearch = ref(false);
const searchingActive = ref(false);
const isloadingForm = ref(false);
const page = ref(1);
const servicesData = ref([]);
const paginateData = reactive({
    total: 0,
    current_page: 1,
    per_page: 1,
    last_page: 0,
    from_page: 0,
    to: 0,
});

const tabsHeader = ref();


onMounted(() => {
    loadType();
    loadTabs();
    loadForFilterGlobal();
});

// COMPUTED
const numbersFiltersApplied = computed(() => {
    let filters = [];
    formFilter.price_min ? filters.push('price_min') : '';
    formFilter.price_max ? filters.push('price_max') : '';
    return filters;
});
const emptyFilters = computed(() => {
    return numbersFiltersApplied.value.length == 0;
});

// WATCH
watch(formFilter, function(value) {
    serviceStore.setDataFilterList(formFilter);
});

// FUNCTION
function loadForFilterGlobal () {
    Object.assign(formFilter, serviceStore.dataFilterGlobal);
}
function loadType () {
    formFilter.type = route.currentRoute.value.name?.toUpperCase();
}
function loadTabs () {
    tabsHeader.value = [
        {
            title: 'Confort',
            exclude: false,
            iconDefault: 'WA.CONFORT',
            iconSelected: 'WA.CONFORT.DEFAULT',
            isActive: 'CONFORT' == formFilter.type,
            onClick: () => changeCategory('CONFORT'),
        },
        {
            title: 'Transporte',
            exclude: false,
            iconDefault: 'WA.TRANSPORT',
            iconSelected: 'WA.TRANSPORT.DEFAULT',
            isActive: 'TRANSPORT' == formFilter.type,
            onClick: () => changeCategory('TRANSPORT'),
        },
        {
            title: 'Actividades',
            exclude: false,
            iconDefault: 'WA.ACTIVITY',
            iconSelected: 'WA.ACTIVITY.DEFAULT',
            isActive: 'ACTIVITY' == formFilter.type,
            onClick: () => changeCategory('ACTIVITY'),
        },
    ];
}

function changeCategory (type = null) {
    
}

async function searchHandle ($event) {
    searchingActive.value = true;
    loadingSearch.value = true;
    formFilter.search = $event?.target?.value ?? '';
    page.value = 1;
    servicesData.value = [];
    await loadAll({showPreloader: false});
    loadingSearch.value = false;
}

// PROVIDE
// provide('hotelData', hotelData);
provide('firstLoad', firstLoad);
provide('formFilter', formFilter);
provide('paginateData', paginateData);
provide('servicesData', servicesData);
provide('loadingSearch', loadingSearch);
provide('isOpenBottomSheetFilter', isOpenBottomSheetFilter);
provide('isloadingForm', isloadingForm);
provide('searchingActive', searchingActive);


</script>