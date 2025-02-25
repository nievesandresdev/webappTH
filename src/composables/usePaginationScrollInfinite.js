import { ref, onMounted, onUnmounted, computed } from 'vue'
import { $throttle, $isElementVisible } from '@/utils/utils';

export const usePaginationScrollInfinite = (
    numberCardsToLoadDefault = 20,
    firstLoad,
    paginateData,
    numberItemsLoadCurrent,
    idSelectorContainer,
    classSelectorCardsSkeleton,
    isloadingForm,
    loadMore
) => {

    onMounted(() => {
        initScrollListener();
    });

    // COMPUTED
    const numberCardsToLoad = computed(() => {
        if(firstLoad.value) return numberCardsToLoadDefault;
        if (!paginateData || !paginateData?.total) return 0;
        if(!firstLoad.value && paginateData.total == 0) return 0;
        let remaining = paginateData.total - numberItemsLoadCurrent.value;
        remaining = remaining < 0 ? 0 : remaining;
        if(remaining < numberCardsToLoadDefault && paginateData.total > 0){
            return remaining;
        }

        return numberCardsToLoadDefault;
    });

    function initScrollListener () {
        const container = document?.querySelector(`#${idSelectorContainer}`);
        if (!container) {
            console.warn(`No se encontró el contenedor con el ID: ${idSelectorContainer}`);
            return;
        }
        const throttledCheck = $throttle(checkLoadMore, 300);
        container.addEventListener('scroll', throttledCheck, true);

        // Cleanup
        onUnmounted(() => {
            container.removeEventListener('scroll', throttledCheck, true);
        });
    }

    function checkLoadMore () {
        const skeletons = document.querySelectorAll(`.${classSelectorCardsSkeleton}`);
        for (let skeleton of skeletons) {
            if ($isElementVisible(skeleton) && !isloadingForm.value) {
                loadMore();
                break;
            }
        }   
    }

    return {
        numberCardsToLoad,
    }
}