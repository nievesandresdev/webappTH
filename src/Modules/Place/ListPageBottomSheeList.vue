<template>

    <div
        id="list-place"
        class="w-full overflow-y-scroll flex-1 no-scrollbar"
        @scroll="handleScroll"
    >
        <template v-if="!isloadingForm && !placesData?.length && !firstLoad && (searchingActive || !emptyFilters)">
            <ListPageBottomSheeListNotFound />
        </template>
        <template v-else>
            <template v-if="numbersPlacesRecommendation > 0">
                <ListPageBottomSheeListRecommendation
                    :placesRecommendated="placeDataRecommendation"
                />
                <div class="mt-[8px] sp:mt-[16px] px-[8px] sp:px-4">
                    <ListPageBottomSheetListText
                        :numbersPlaces="numbersPlacesNotRecommendation"
                        hide-btn-search
                    />
                </div>
            </template>
            <div v-if="placeDataNotRecommendation?.length" class="px-[8px] sp:px-4 w-full mt-[8px] sp:mt-4">
                <template v-for="(item, index) in (placeDataNotRecommendation ?? [])">
                    <!-- class="mx-[3px] sp:mx-[6px]" -->
                    <CardList
                        :data="item"
                        :class="index === paginateData.total - placeDataRecommendation.length - 1 ? 'mb-[96px]' : 'mb-[8px] sp:mb-4'"
                    />
                </template>
                <template v-for="(card, index) in (numberCardsToLoad ?? 0)">
                    <SkeletonCard
                        :class="index === paginateData.total - placeDataRecommendation.length - 1 ? 'mb-[96px]' : 'mb-[8px] sp:mb-4'"
                    />
                </template>
            </div>
        </template>
    </div>
</template>

<script setup>
    import { ref, inject, onMounted, computed, defineEmits } from 'vue';

    import CardList from './components/CardList.vue';
    import SkeletonCard from './components/SkeletonCard.vue';
    import ListPageBottomSheeListNotFound from './ListPageBottomSheeListNotFound.vue';
    import ListPageBottomSheeListRecommendation from './ListPageBottomSheeListRecommendation.vue';
    import ListPageBottomSheetListText from './ListPageBottomSheetListText.vue';

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

    const placeDataRecommendation = computed(() => {
        const placesRecommendation = placesData.value.filter(item => item.recommended || item.place_featured);
        return placesRecommendation;
    });

    const placeDataNotRecommendation = computed(() => {
        const placesRecommendation = placesData.value.filter(item => !item.recommended && !item.place_featured);
        return placesRecommendation;
    });

    const numbersPlacesRecommendation = computed(() => {
        return placeDataRecommendation.value.length;
    });

    const numbersPlacesNotRecommendation = computed(() => {
        return paginateData.total - placeDataRecommendation.value.length;
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