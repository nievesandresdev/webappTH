<template>
    <div
         id="list-confort"
         class=""
    >
        <p
            class="text-[6px] sp:text-sm font-bold lato"
        >
            16 Servicios encontrados en Confort
        </p>
        <div class="mt-1 sp:mt-2">
            <template v-for="(item, index) in (servicesData ?? [])">
                <CardList
                    :data="item" 
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

import { inject, onMounted, ref, computed } from 'vue';

import { $throttle, $isElementVisible } from '@/utils/utils';

import CardList from './components/CardList.vue';
import SkeletonCard from './components/SkeletonCard.vue';

import { useServiceStore } from '@/stores/modules/service';
const serviceStore = useServiceStore();

// INJECT
const servicesData = inject('servicesData');
const paginateData = inject('paginateData');
const firstLoad = inject('firstLoad');
const isloadingForm = inject('isloadingForm');
const searchingActive = inject('searchingActive');
const formFilter = inject('formFilter');

// DATA
const numberCardsToLoadDefault = ref(20);

// COMPUTED
const numberCardsToLoad = computed(() => {
    if(firstLoad.value) return numberCardsToLoadDefault.value;
    if(!firstLoad.value && paginateData.total == 0) return 0;
    let remaining = paginateData.total - servicesData.value.length;
    remaining = remaining < 0 ? 0 : remaining;
    if(remaining < numberCardsToLoadDefault.value && paginateData.total > 0){
        return remaining ;
    }
    return numberCardsToLoadDefault.value;
});

onMounted(() => {
    initScrollListener();
    submitFilter({showPreloader: true});
});

// FUNCTIONS
function closeSearch () {
    searchingActive.value = false;
}
function initScrollListener () {
    const container = document?.querySelector('#list-experience');
    if (container) {
        container.addEventListener('scroll', $throttle(checkLoadMore, 300), true);
    }
}

function checkLoadMore () {
    const skeletons = document.querySelectorAll('.skeleton-experience-card');
    for (let skeleton of skeletons) {
        if ($isElementVisible(skeleton) && !isloadingForm.value) {
            loadItems();
            break;
        }
    }   
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
        route.push({ name: 'Confort', query: {...filterNonNullAndNonEmpty(formFilter)} });
    }
}

async function loadItems () {
    isloadingForm.value = true;
    let query = {...filterNonNullAndNonEmpty(formFilter)}
    const response = await serviceStore.$apiDetAllConforApi({page: page.value,...query});
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



</script>