<template>
    <!-- <PageTransitionGlobal module="service"> -->
        <div
            id="list-confort"
            class="overflow-y-scroll w-full px-2 sp:px-4 pt-[8px] sp:pt-[32px] "
        >
            <p
                v-if="!isloadingForm"
                class="text-[9px] sp:text-sm font-bold lato"
            >
                <!-- {{ paginateData.total }} Servicios encontrados en Confort -->
                {{ $t('service.confort.text-search-found', { number: paginateData.total  }) }}
            </p>
            <p
                v-else
                class="item-skeletom animate-pulse h-[7px] sp:h-[14px] w-[60px] sp:w-[120px]"
            />
            <div class="mt-2 sp:mt-4 ">
                <template v-for="(item, index) in (servicesData ?? [])">
                    <CardList
                        :data="item"
                        type-service="CONFORT"
                        :class="index === servicesData.length - 1 && !numberCardsToLoad ? 'mb-[96px]' : 'mb-[8px] sp:mb-4'"
                    />
                </template>
                <template v-for="(card, index) in (numberCardsToLoad ?? 0)">
                    <SkeletonCard
                        :class="index === servicesData.length - 1 ? 'mb-[96px]' : 'mb-[8px] sp:mb-4'"
                    />
                </template>
            </div>
        </div>
    <!-- </PageTransitionGlobal> -->
</template>

<script setup>

import { inject, onMounted, ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRouter();

import { $throttle, $isElementVisible, isMockup } from '@/utils/utils';

const props = defineProps({
    queryRouter: {
        type: Object,
        default: () => ({})
    } 
});

import CardList from './components/CardList.vue';
import SkeletonCard from './components/SkeletonCard.vue';

import { useServiceStore } from '@/stores/modules/service';
const serviceStore = useServiceStore();

// CONSTANTS
import { SECTIONS } from '@/constants/sections';

// COMPOSABLE
import { usePaginationScrollInfinite } from '@/composables/usePaginationScrollInfinite';
import { useLoadingSections } from "@/composables/useLoadingSections";
const { startLoading, stopLoading } = useLoadingSections();

const hotelData = inject('hotelData');
const servicesData = inject('servicesData');
const paginateData = inject('paginateData');
const firstLoad = inject('firstLoad');
const page = inject('page');
const isloadingForm = inject('isloadingForm');
const searchingActive = inject('searchingActive');
const formFilter = inject('formFilter');

// DATA
const numberCardsToLoadDefault = ref(20);

// COMPUTED
const numberItemsLoadCurrent = computed(() => {
    return servicesData.value.length;
});

const { numberCardsToLoad } = usePaginationScrollInfinite(
    20,
    firstLoad,
    paginateData,
    numberItemsLoadCurrent,
    'list-confort',
    'skeleton-card',
    isloadingForm,
    loadMore
);

watch(hotelData, (valueCurrent, valueOld) => {
    if (!valueOld && valueCurrent) {
        loadData();
    }
}, { immediate: true });

watch(() => [formFilter.search, formFilter.price_min, formFilter.price_max], (valueCurrent) => {
    if (hotelData.value) {
        submitFilter({showPreloader: true});
    }
});

startLoading(SECTIONS.SERVICE.GLOBAL);


// FUNCTIONS
function loadData () {
    submitFilter({showPreloader: true});
}
function closeSearch () {
    searchingActive.value = false;
}

function loadMore () {
    page.value += 1;
    loadItems();
}

function submitFilter (payload){
    page.value = 1;
    servicesData.value = [];
    loadItems();
    let { showPreloader } = payload ?? {};
    if (showPreloader) {
        let formFilterWithMockup = {...formFilter, mockup: isMockup() }
        route.push({ name: 'Confort', query: {...filterNonNullAndNonEmpty(formFilterWithMockup)} });
    }
}

async function loadItems () {
    isloadingForm.value = true;
    let query = {...filterNonNullAndNonEmpty(formFilter)}
    const response = await serviceStore.$apiDetAllConforApi({page: page.value,...query});
    if (response.ok) {
        Object.assign(paginateData, response.data.confortServicesCollection.paginate);
        page.value = paginateData.current_page;
        servicesData.value = [...servicesData.value, ...response.data.confortServicesCollection.data];
    }
    firstLoad.value = false;
    isloadingForm.value = false;
    stopLoading(SECTIONS.SERVICE.GLOBAL);
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

function validValueQuery (field, value) {
    if (value === 'false') return false;
    if (value === 'true') return true;
    return value;
}



</script>

<style lang="scss">

#list-confort {
    height: calc(100vh - 70px);
}

@media (min-width: 300px){
    #list-confort {
        height: calc(100vh - 126px);
    }
}

</style>