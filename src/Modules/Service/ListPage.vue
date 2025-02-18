<template>

<div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]" />

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
    <div class="h-[95px]  sp:h-[126px] w-full">
        d
    </div>
    <router-view />
</div>

<ListPageBottomSheetFilter />

</template>

<script setup>
import { onMounted, ref, provide, reactive, toRefs, computed, toRaw, nextTick, watch, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getUrlParam, slufy } from '@/utils/utils.js';
const route = useRouter();

// COMPONENTS
import AppHeader from '@/layout/Components/AppHeader.vue';
import InputSearch from './components/InputSearch.vue';
import ListPageBottomSheetFilter from './ListPageBottomSheetFilter.vue';

// STORE
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useServiceStore } from '@/stores/modules/service';
const serviceStore = useServiceStore();
import { useExperienceStore } from '@/stores/modules/experience';
const experienceStore = useExperienceStore();

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

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

const tabsHeader = ref([]);
// COMPUTED
const hotelData = computed(() => {
    return hotelStore.hotelData ?? null;
});

const numbersFiltersApplied = computed(() => {
    let filters = [];
    formFilter.price_min ? filters.push('price_min') : '';
    formFilter.price_max ? filters.push('price_max') : '';
    return filters;
});
const emptyFilters = computed(() => {
    return numbersFiltersApplied.value.length == 0;
});

onMounted(() => {

});

// WATCH
watch(formFilter, function(value) {
    serviceStore.setDataFilterList(formFilter);
});

watch(hotelData, (valueCurrent, valueOld) => {
    if (!valueOld && valueCurrent) {
        loadData();
    }
}, { immediate: true });

watch (() => route.currentRoute.value, (valCurrent) => {
    if (hotelData.value) {
        loadData();
    }
});


// FUNCTION

function loadData () {
    loadForFilterGlobal();
    loadType();
    loadTabs();
}

function loadForFilterGlobal () {
    Object.assign(formFilter, serviceStore.dataFilterGlobal);
}
function loadType () {
    formFilter.type = route.currentRoute.value.name?.toUpperCase();
}
function loadTabs () {
    // console.log(hotelStore.hotelData, 'hotelStore.hotelData');
    tabsHeader.value = [
        {
            title: t('service.confort.title'),
            exclude: !hotelStore.hotelData.show_confort,
            iconDefault: 'WA.CONFORT',
            iconSelected: 'WA.CONFORT.DEFAULT',
            isActive: 'CONFORT' == formFilter.type,
            onClick: () => changeType('Confort'),
        },
        {
            title: t('service.transport.title'),
            exclude: !hotelStore.hotelData.show_transport,
            iconDefault: 'WA.TRANSPORT',
            iconSelected: 'WA.TRANSPORT.DEFAULT',
            isActive: 'TRANSPORT' == formFilter.type,
            onClick: () => changeType('Transport'),
        },
        {
            title: t('service.activity.title'),
            exclude: !hotelStore.hotelData.show_experiences,
            iconDefault: 'WA.ACTIVITY',
            iconSelected: 'WA.ACTIVITY.DEFAULT',
            isActive: 'ACTIVITY' == formFilter.type,
            onClick: () => changeType('Activity'),
        },
    ];
}

function changeType (type = null) {
    formFilter.type = type.toUpperCase();
    route.push({ name: type });
}

async function searchHandle ($event) {
    searchingActive.value = true;
    loadingSearch.value = true;
    formFilter.search = $event?.target?.value ?? '';
    page.value = 1;
    servicesData.value = [];
    loadingSearch.value = false;
}

function activateSearchHandle ($event) {
    searchingActive.value = false;
}

async function openFilter () {
    setTimeout(() => {
        searchingActive.value = false;
        isOpenBottomSheetFilter.value = true;

    }, 400);
}

// PROVIDE
provide('hotelData', hotelData);
provide('experienceStore', experienceStore);
provide('serviceStore', serviceStore);
provide('page', page);
provide('firstLoad', firstLoad);
provide('formFilter', formFilter);
provide('paginateData', paginateData);
provide('servicesData', servicesData);
provide('loadingSearch', loadingSearch);
provide('isOpenBottomSheetFilter', isOpenBottomSheetFilter);
provide('isloadingForm', isloadingForm);
provide('searchingActive', searchingActive);


</script>