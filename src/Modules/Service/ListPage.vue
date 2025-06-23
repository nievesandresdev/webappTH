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
    <TransitionBook
        :custom-transitions="{
            Confort: 1,
            Transport: 2,
            Activity: 3,
        }"
    >
        <router-view v-slot="{ Component }">
            <component :is="Component" :key="$route.name" />
        </router-view>
    </TransitionBook>
</div>

<ListPageBottomSheetFilter />

</template>

<script setup>
import { onMounted, ref, provide, reactive, toRefs, computed, toRaw, nextTick, watch, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { titleCase } from '@/utils/utils.js';
const route = useRouter();

// COMPONENTS
import AppHeader from '@/layout/Components/AppHeader.vue';
import InputSearch from './components/InputSearch.vue';
import ListPageBottomSheetFilter from './ListPageBottomSheetFilter.vue';
import TransitionBook from '@/components/Transition/TransitionBook.vue';

// STORE
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useServiceStore } from '@/stores/modules/service';
const serviceStore = useServiceStore();
import { useExperienceStore } from '@/stores/modules/experience';
const experienceStore = useExperienceStore();

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { SECTIONS } from '@/constants/sections';

// COMPOSABLE
import { usePaginationScrollInfinite } from '@/composables/usePaginationScrollInfinite';
import { useLoadingSections } from "@/composables/useLoadingSections";
const { startLoading, stopLoading } = useLoadingSections();

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

// COMPUTED
const typeServicesEnabled = computed(() => {
    let typeServices = [];
    if (hotelData.value.show_confort) typeServices.push('CONFORT');
    if (hotelData.value.show_transport) typeServices.push('TRANSPORT');
    if (hotelData.value.show_experiences) typeServices.push('ACTIVITY');
    // console.log(hotelData.value.show_confort, 'show_confort')
    // console.log(hotelData.value.show_transport, 'show_transport')
    // console.log(hotelData.value.show_experiences, 'show_experiences')
    return typeServices;
});
const typeServicesFull = computed(() => {
    return ['CONFORT', 'TRANSPORT', 'ACTIVITY'];
});
const typeServiceInRoute = computed(() => {
    return route.currentRoute.value.name?.toUpperCase();
});
const typeServiceCurrent = computed(() => {
    if (!typeServiceInRoute.value) {
        return null;
    }
    if (typeServicesEnabled.value.includes(typeServiceInRoute.value)) {
        return typeServiceInRoute.value;
    }
    return typeServicesEnabled.value?.length > 0 ? typeServicesEnabled.value[0] : null;
});

// ONMOUNTED
startLoading(SECTIONS.SERVICE.GLOBAL);
onMounted(async () => {
    // console.log('onMounted')
});

// WATCH
watch(formFilter, function(value) {
    serviceStore.setDataFilterList(formFilter);
});

watch(hotelData, async (valueCurrent, valueOld) => {
    if (!valueOld && valueCurrent) {
        // console.log('watch hotelData')
        await validateServiceCurrent();
        loadData();
    }
}, { immediate: true });

watch (() => route.currentRoute.value, (valCurrent) => {
    if (hotelData.value) {
        // console.log('watch rout')
        loadData();
    }
});

// FUNCTION
async function validateServiceCurrent () {
    // console.log('validateServiceCurrent', typeServiceCurrent.value)
    if (!typeServiceCurrent.value) {
        await nextTick();
        // console.log('push Home')
        route.replace({ name: 'Home' });
        return
    }
    
    const typeEnabled = typeServicesEnabled.value.includes(typeServiceInRoute.value);
    if (!typeEnabled) {
        await nextTick();
        await changeType(titleCase(typeServiceCurrent.value), true);
    }
}
function loadType () {
    formFilter.type = typeServiceCurrent.value;
}
function loadData () {
    loadForFilterGlobal();
    loadType();
    loadTabs();
}

function loadForFilterGlobal () {
    Object.assign(formFilter, serviceStore.dataFilterGlobal);
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

async function changeType (type = null, forceReload = false) {
    // console.log(forceReload, 'forceReload')
    // console.log(type, 'type changeType')
    if (isloadingForm.value && !forceReload) {
        return;
    }
    formFilter.type = type.toUpperCase();
    page.value = 1;
    servicesData.value = [];
    // console.log(type, 'type changeType');
    // console.log('route.name actual:', route.currentRoute.value.name);
    await route.replace({ name: type });
    stopLoading(SECTIONS.SERVICE.GLOBAL);
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