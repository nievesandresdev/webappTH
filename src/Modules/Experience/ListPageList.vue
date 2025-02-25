<template>

    <div
        id="list-experience"
        class="w-full overflow-y-scroll px-2 sp:px-4"
    >
        <p
            v-if="!isloadingForm"
            class="text-[6px] sp:text-sm font-bold my-[8px] sp:my-6"
        >
            <template v-if="!searchingActive">
                <template v-if="!formFilter.search && experiencesData.length">
                    {{ paginateData.total }} {{ $t('experience.list-page.text-count-list') }}
                </template>
                <template v-else-if="formFilter.search">
                    {{ `${$t('place.list-page.text-count-list-search',  { count: paginateData.total  })}: "${formFilter.search}"` }}
                </template>
            </template>
            <template v-else>
                <template v-if="!formFilter.search">
                    {{ paginateData.total }} {{ $t('experience.list-page.text-count-list') }}
                </template>
                <button
                    v-else
                    class="flex items-center space-x-1 sp:space-x-2"
                    @click="closeSearch"
                >
                    <img
                        src="/assets/icons/WA.search.svg"
                        class="size-[8px] sp:size-[16px]"
                        alt=""
                    >
                    <p class="text-[6px] sp:text-sm font-bold border-b border-b-black">
                        {{ `${$t('experience.list-page.text-count-list-search-active')}: "${formFilter.search}"` }}
                    </p>
                </button>
            </template>
        </p>
        <p
            v-else
            class="item-skeletom animate-pulse h-[7px] sp:h-[14px] w-[60px] sp:w-[120px] my-[8px] sp:my-6"
        />
        <!-- <p class="mt-3 sp:mt-6 mb-3 sp:mb-6 text-[8px] sp:text-sm font-bold px-2 sp:px-4">{{ paginateData.total }} {{ $t('experience') }}</p> -->
        <template v-if="!isloadingForm && !experiencesData?.length && !firstLoad">
            <ListPageListNotFound />
        </template>
        <template v-else>
            <template v-for="(item, index) in (experiencesData ?? [])">
                <CardList
                    :data="item" 
                    :class="index === experiencesData.length - 1 && !numberCardsToLoad ? 'mb-[96px]' : 'mb-[8px] sp:mb-4'"
                />
            </template>
            <template v-for="(card, index) in (numberCardsToLoad ?? 0)">
                <SkeletonCard
                    :class="index === experiencesData.length - 1 ? 'mb-[96px]' : 'mb-[8px] sp:mb-4'"
                />
            </template>
        </template>
    </div>
</template>

<script setup>
import { inject, onMounted, ref, computed } from 'vue';

import CardList from './components/CardList.vue';
import SkeletonCard from './components/SkeletonCard.vue';
import ListPageListNotFound from './ListPageListNotFound.vue';

import { $throttle, $isElementVisible } from '@/utils/utils';

const emits = defineEmits(['loadMore']);

// INJECT
const experiencesData = inject('experiencesData');
const paginateData = inject('paginateData');
const firstLoad = inject('firstLoad');
const isloadingForm = inject('isloadingForm');
const searchingActive = inject('searchingActive');
const formFilter = inject('formFilter');

// DATA
const numberCardsToLoadDefault = ref(20);

onMounted(() => {
    initScrollListener();  
});

// COMPUTED
const numberCardsToLoad = computed(() => {
    if(firstLoad.value) return numberCardsToLoadDefault.value;
    if(!firstLoad.value && paginateData.total == 0) return 0;
    let remaining = paginateData.total - experiencesData.value.length;
    remaining = remaining < 0 ? 0 : remaining;
    if(remaining < numberCardsToLoadDefault.value && paginateData.total > 0){
        return remaining ;
    }
    return numberCardsToLoadDefault.value;
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
            emits('loadMore');
            break;
        }
    }   
}


</script>

<style lang="scss">

#list-experience {
    height: calc(100vh - 68px);
}

@media (min-width: 300px){
    #list-experience {
        height: calc(100vh - 124px);
    }
}

</style>