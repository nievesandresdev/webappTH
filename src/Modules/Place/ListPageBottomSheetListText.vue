<template>
    <!-- px-[8px] sp:px-4 pb-[8px] sp:pb-4 -->
    <!-- <div class="" :class="{ 'shadow-header': isScrollingList }"> -->
        <p
            v-if="!isloadingForm"
            class="text-[10px] sp:text-sm font-medium"
        >
            <template v-if="!searchingActive">
                <template v-if="!formFilter.search && placesData.length">
                    {{ $t('place.list-page.text-count-list',  { count: props.numbersPlaces }  ) }}
                </template>
                <template v-else-if="formFilter.search">
                    {{ `${$t('place.list-page.text-count-list-search',  { count: props.numbersPlaces })}: "${formFilter.search}"` }}
                </template>
            </template>
            <template v-else>
                <template v-if="!formFilter.search || props.hideBtnSearch">
                    {{ $t('place.list-page.text-count-list',  { count: props.numbersPlaces }  ) }}
                </template>
                <button
                    v-else-if="!props.hideBtnSearch"
                    class="flex items-center space-x-1 sp:space-x-2 mb-[16px] sp:mb-[24px]"
                    @click="closeSearch"
                >
                    <img
                        src="/assets/icons/WA.search.svg"
                        class="size-[8px] sp:size-[16px]"
                        alt=""
                    >
                    <p class="text-[6px] sp:text-sm font-bold border-b border-b-black">
                        {{ `${$t('place.list-page.text-count-list-search-active')}: "${formFilter.search}"` }}
                    </p>
                </button>
            </template>
        </p>
        <p
            v-else
            class="item-skeletom animate-pulse h-[7px] sp:h-[14px] w-[60px] sp:w-[120px] mt-[8px] sp:mt-4"
        />
    <!-- </div> -->
</template>

<script setup>
    import { ref, inject, toRefs, provide } from 'vue';

    // INJECTS
    const placesData = inject('placesData');
    const paginateData = inject('paginateData');
    const searchingActive = inject('searchingActive');
    const isloadingForm = inject('isloadingForm');
    const isScrollingList = inject('isScrollingList');
    const formFilter = inject('formFilter');

    // PROPS
    const props = defineProps({
        numbersPlaces: {
            type: Number,
            required: true,
            default: 0,
        },
        hideBtnSearch: {
            type: Boolean,
            default: false,
        },
    });

    // COMPOSABLES
    import { useEventBus } from '@/composables/eventBus';
    const { emitEvent } = useEventBus();  

    // FUNCTIONS
    function closeSearch () {
        emitEvent('close-search');
    }

</script>