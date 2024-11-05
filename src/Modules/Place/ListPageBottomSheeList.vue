<template>
    <template v-if="!firstLoad && !placesData.length">
    </template>
    <div
        id="list-place"
        class="w-full space-y-4 h-[327px] overflow-y-auto"
        v-else
    >
        <template v-for="item in placesData">
            <CardList :data="item" />
        </template>
        <template v-for="card in numberCardsToLoad">
            <SkeletonCard />
        </template>
    </div>
</template>

<script setup>
    import { ref, inject, onMounted, computed, defineEmits } from 'vue';

    import CardList from './components/CardList.vue';
    import SkeletonCard from './components/SkeletonCard.vue';

    const emits = defineEmits(['loadMore']);
    
    import { $throttle, $isElementVisible } from '@/utils/utils';

    const defNumberCardsToLoad = ref(20);

    const placesData = inject('placesData');
    const paginateData = inject('paginateData');
    const firstLoad = inject('firstLoad');
    const isloadingForm = inject('isloadingForm');

    onMounted(() => {
        initScrollListener();  
    });

    const numberCardsToLoad = computed(() => {
        if(firstLoad.value) return defNumberCardsToLoad.value;
        if(!firstLoad.value && paginateData.total == 0) return 0;
        let remaining = paginateData.total - placesData.value.length;
        if(remaining < defNumberCardsToLoad.value && paginateData.total > 0){
            return remaining;
        } 
        return defNumberCardsToLoad.value;
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