<template>
    <!-- <div class="bg-black flex-1">
        di
    </div> -->
        <!-- :class="classHeightDinamic" -->
    <div
        id="list-place"
        class="w-full overflow-y-scroll flex-1 no-scrollbar px-[8px] sp:px-4"
        @scroll="handleScroll"
    >
        <template v-if="!isloadingForm && !placesData?.length && !firstLoad && (searchingActive || !emptyFilters)">
            <ListPageBottomSheeListNotFound />
        </template>
        <template v-else>
            <template v-for="(item, index) in (placesData ?? [])">
                <CardList
                    :data="item"
                    class="mx-[3px] sp:mx-[6px]"
                    :class="index === placesData.length - 1 ? 'mb-[96px]' : 'mb-[8px] sp:mb-4'"
                />
            </template>
            <template v-for="(card, index) in (numberCardsToLoad ?? 0)">
                <SkeletonCard
                    :class="index === placesData.length - 1 ? 'mb-[96px]' : 'mb-[8px] sp:mb-4'"
                />
            </template>
        </template>
    </div>
</template>

<script setup>
    import { ref, inject, onMounted, computed, defineEmits } from 'vue';

    import CardList from './components/CardList.vue';
    import SkeletonCard from './components/SkeletonCard.vue';
    import ListPageBottomSheeListNotFound from './ListPageBottomSheeListNotFound.vue';

    const emits = defineEmits(['loadMore']);
    
    import { $throttle, $isElementVisible } from '@/utils/utils';

    const numberCardsToLoadDefault = ref(20);

    const placesData = inject('placesData');
    const paginateData = inject('paginateData');
    const firstLoad = inject('firstLoad');
    const searchingActive = inject('searchingActive');
    const isloadingForm = inject('isloadingForm');
    const positionBottomSheet = inject('positionBottomSheet');
    const isScrollingList = inject('isScrollingList');

    onMounted(() => {
        initScrollListener();  
    });

     const windowWidth = window.innerWidth;

// h-[589px]
// h-[395px
// h-[450px]
    const classHeightDinamic = computed(() => {
        if (positionBottomSheet.value == 'top') {
            return 'h-[589px]';
        }
        if (positionBottomSheet.value == 'medium') {
            return 'h-[395px]';
        }
        return 'h-[450px]';
    });

    const numberCardsToLoad = computed(() => {
        if(firstLoad.value) return numberCardsToLoadDefault.value;
        if(!firstLoad.value && paginateData.total == 0) return 0;
        let remaining = paginateData.total - placesData.value.length;
        remaining = remaining < 0 ? 0 : remaining;
        if(remaining < numberCardsToLoadDefault.value && paginateData.total > 0){
            return remaining ;
        }
        return numberCardsToLoadDefault.value;
    });

    // FUNCTIONS
    function handleScroll() {
        const contentFilter = document.querySelector('#list-place');
        if (contentFilter) {
            const maxScroll = contentFilter.scrollHeight - contentFilter.clientHeight;
            isScrollingList.value = contentFilter.scrollTop != 0;
        }
    }

    function initScrollListener() {
        const container = document?.querySelector('#list-place');
        if (container) {
            container.addEventListener('scroll', $throttle(checkLoadMore, 300), true);
        }
    }

    function checkLoadMore () {
        const skeletons = document.querySelectorAll('.skeleton-place-card');
        for (let skeleton of skeletons) {
            if ($isElementVisible(skeleton) && !isloadingForm.value) {
                emits('loadMore');
                break;
            }
        }   
    }


</script>