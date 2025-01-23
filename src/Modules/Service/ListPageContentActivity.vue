<template>
    <div
         id="list-activities"
         class="overflow-y-scroll w-full px-2 sp:px-4 pt-[12px] sp:pt-[32px]"
    >
        <p
            v-if="!isloadingForm"
            class="text-[6px] sp:text-sm font-bold lato"
        >
            {{ paginateData.total }} Servicios encontrados en Actividades
        </p>
        <p
            v-else
            class="item-skeletom animate-pulse h-[7px] sp:h-[14px] w-[60px] sp:w-[120px]"
        />
        <div class="mt-2 sp:mt-4">
            <template v-for="(item, index) in (servicesData ?? [])">
                <CardList
                    :data="item"
                    type-service="ACTIVITY"
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
</template>

<script setup>

import { inject, onMounted, ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRouter();

import { $throttle, $isElementVisible } from '@/utils/utils';

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
import { useExperienceStore } from '@/stores/modules/experience';
const experienceStore = useExperienceStore();

// COMPOSABLE
import { usePaginationScrollInfinite } from '@/composables/usePaginationScrollInfinite';

// INJECT
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

watch(() => [formFilter.search, formFilter.price_min, formFilter.price_max], (valueCurrent) => {
    submitFilter({showPreloader: true});
});

const { numberCardsToLoad } = usePaginationScrollInfinite(
    20,
    firstLoad,
    paginateData,
    numberItemsLoadCurrent,
    'list-activities',
    'skeleton-card',
    isloadingForm,
    loadItems
);

// const numberCardsToLoad = computed(() => {
//     if(firstLoad.value) return numberCardsToLoadDefault.value;
//     if(!firstLoad.value && paginateData.total == 0) return 0;
//     let remaining = paginateData.total - servicesData.value.length;
//     remaining = remaining < 0 ? 0 : remaining;
//     if(remaining < numberCardsToLoadDefault.value && paginateData.total > 0){
//         return remaining ;
//     }
//     return numberCardsToLoadDefault.value;
// });

onMounted(() => {
    // initScrollListener();
    submitFilter({showPreloader: true});
});


// FUNCTIONS
function closeSearch () {
    searchingActive.value = false;
}
// function initScrollListener () {
//     const container = document?.querySelector('#list-experience');
//     if (container) {
//         container.addEventListener('scroll', $throttle(checkLoadMore, 300), true);
//     }
// }

// function checkLoadMore () {
//     const skeletons = document.querySelectorAll('.skeleton-experience-card');
//     for (let skeleton of skeletons) {
//         if ($isElementVisible(skeleton) && !isloadingForm.value) {
//             loadItems();
//             break;
//         }
//     }   
// }

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
        route.push({ name: 'Activity', query: {...filterNonNullAndNonEmpty(formFilter)} });
    }
}

async function loadItems () {
    isloadingForm.value = true;
    let query = {...filterNonNullAndNonEmpty(formFilter)}
    const response = await experienceStore.$apiGetAll({page: page.value,...query});
    if (response.ok) {
        Object.assign(paginateData, response.data.experiences.paginate);
        page.value = paginateData.current_page;
        servicesData.value = [...servicesData.value, ...response.data.experiences.data];
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



</script>

<style lang="scss">

#list-activities {
    height: calc(100vh - 70px);
}

@media (min-width: 300px){
    #list-activities {
        height: calc(100vh - 126px);
    }
}

</style>