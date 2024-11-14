<template>

    <div
        id="list-place"
        class="w-full space-y-[8px] sp:space-y-4 h-[257px] h-[502px] overflow-y-auto"
    >   
        <template v-if="!isloadingForm && !placesData?.length">
            <ListPageBottomSheeListNotFound />
        </template>
        <template v-else>
            <template v-for="item in (placesData ?? [])">
                <CardList :data="item" />
            </template>
            <template v-for="card in (numberCardsToLoad ?? 0)">
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

    onMounted(() => {
        initScrollListener();  
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