<template>

    <div
        id="list-place"
        class="w-full overflow-y-auto"
        :class="classHeightDinamic"
    >
    <!-- h-[257px] sp:h-[450px] -->
        <template v-if="!isloadingForm && !placesData?.length && !firstLoad">
            <ListPageBottomSheeListNotFound />
        </template>
        <template v-else>
            <template v-for="(item, index) in (placesData ?? [])">
                <CardList
                    :data="item" 
                    :class="index === placesData.length - 1 ? 'mb-[96px]' : 'mb-[8px] sp:mb-4'"
                />
            </template>
            <template v-for="(card, index) in (numberCardsToLoad ?? 0)">
                <SkeletonCard />
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
    const isloadingForm = inject('isloadingForm');
    const positionBottomSheet = inject('positionBottomSheet');

    onMounted(() => {
        initScrollListener();  
    });

     const windowWidth = window.innerWidth;

    const classHeightDinamic = computed(() => {
        if (positionBottomSheet.value == 'top') {
            return 'h-[522px]';
        }
        if (positionBottomSheet.value == 'medium') {
            return 'h-[343px]';
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
    function initScrollListener() {
        const container = document.querySelector('#list-place');
        container.addEventListener('scroll', $throttle(checkLoadMore, 300), true);
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