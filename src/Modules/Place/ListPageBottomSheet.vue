<template>
    <BaseBottomSheet
        is-step-three
        :open="isOpenBottomSheetList"
        :position="positionBottomSheet"
        @changeCurrentHeight="changePositionHandle"
    >
        <template v-slot:content>
            <!-- {{positionBottomSheet}} -->
            <PlaceSelected :place-selected="placeSelectedData"  />
            <!-- {{ `searchingActive: ${searchingActive}` }} {{ `search: ${formFilter.search}` }} {{ `length: ${placesData.length}` }} -->
            <div class="px-4 pt-[12px] h-full">
                <div class=" h-full flex flex-col">
                    <ListPageBottomSheetCategory @changeCategory="changeCategoryHandle($event)" />
                    <p
                        v-if="!isloadingForm"
                        class="text-sm font-bold my-4"
                    >
                        <template v-if="!searchingActive">
                            <template v-if="!formFilter.search && placesData.length">
                                {{ $t('place.list-page.text-count-list',  { count: paginateData.total  }  ) }}
                            </template>
                            <template v-else-if="formFilter.search">
                                {{ `${$t('place.list-page.text-count-list-search',  { count: paginateData.total  })}: "${formFilter.search}"` }}
                            </template>
                        </template>
                        <template v-else>
                            <button
                                class="flex items-center space-x-2"
                                @click="closeSearch"
                            >
                                <img
                                    src="/assets/icons/WA.search.svg"
                                    class="size-[16px]"
                                    alt=""
                                >
                                <p class="text-sm font-bold border border-b-black">
                                    {{ `${$t('place.list-page.text-count-list-search-active')}: "${formFilter.search}"` }}
                                </p>
                            </button>
                        </template>
                    </p>
                    <p
                        v-else
                        class="item-skeletom animate-pulse h-[14px] w-[120px] my-4"
                    />
                    <ListPageBottomSheeList @loadMore="loadMoreHandle" />
                </div>
            </div>
        </template>
    </BaseBottomSheet>
    <!-- <BaseBottomSheet>
    </BaseBottomSheet> -->
</template>

<script setup>
    import { ref, inject, toRefs } from 'vue';

    import CardList from './components/CardList.vue';
    import PlaceSelected from './components/PlaceSelected.vue';

    const props = defineProps({
        positionBottomSheet: String,
    });

    const { positionBottomSheet } = toRefs(props);

    import BaseBottomSheet from '@/components/Modal/BaseBottomSheet.vue';
    import ListPageBottomSheetCategory from './ListPageBottomSheetCategory.vue';
    import ListPageBottomSheeList from './ListPageBottomSheeList.vue';

    const emits = defineEmits(['changeCategory', 'closeSearch']);

    const formFilter = inject('formFilter');
    const isloadingForm = inject('isloadingForm');
    const paginateData = inject('paginateData');
    const searchingActive = inject('searchingActive');
    const placesData = inject('placesData');
    const placeSelectedData = inject('placeSelected');
    const isOpenBottomSheetList = inject('isOpenBottomSheetList');

    const classControlsSheet = ref('0px');

    function changeCategoryHandle (payload) {
         emits('changeCategory', payload);
    }

    function loadMoreHandle () {
        emits('loadMore');
    }
    
    function closeSearch () {
        emits('closeSearch');
    }
    function changePositionHandle ($event) {
        if ($event === 3) {
            positionBottomSheet.value = 'min-top';
        }
        if ($event === 2) {
            positionBottomSheet.value = 'top';
        }
        if ($event === 1) {
            positionBottomSheet.value = 'medium';
            searchingActive.value = false;
        }
        if ($event === 0) {
            positionBottomSheet.value = 'bottom';
        }
    }
</script>