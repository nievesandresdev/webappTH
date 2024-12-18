<template>
    <BaseBottomSheet
        is-step-three
        :open="isOpenBottomSheetList"
        :position="positionBottomSheet"
        @changeCurrentHeight="changePositionHandle"
    >
        <template v-slot:content>
            <PlaceSelected :place-selected="placeSelectedData" :loading="loadingPlaceSeleced"  />
            <!-- {{ `searchingActive: ${searchingActive}` }} {{ `search: ${formFilter.search}` }} {{ `length: ${placesData.length}` }} -->
            <!-- py-[6px] sp:pt-[12px] -->
            <button @click="shareContent">Open</button>
            <!-- <div class="h-full">
                <div class="flex flex-col h-full">
                    <div
                        class="header-list-place z-[400000]"
                        :class="{ 'shadow-header': isScrollingList }"
                    >
                        <ListPageBottomSheetCategory @changeCategory="changeCategoryHandle($event)" />
                        <div class="px-[8px] sp:px-4 pb-[8px] sp:pb-4" :class="{ 'shadow-header': isScrollingList }">
                            <p
                                v-if="!isloadingForm"
                                class="text-[6px] sp:text-sm font-bold mt-[8px] sp:mt-4"
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
                                    <template v-if="!formFilter.search">
                                        {{ $t('place.list-page.text-count-list',  { count: paginateData.total  }  ) }}
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
                                            {{ `${$t('place.list-page.text-count-list-search-active')}: "${formFilter.search}"` }}
                                        </p>
                                    </button>
                                </template>
                            </p>
                            <p
                                v-else
                                class="item-skeletom animate-pulse h-[7px] sp:h-[14px] w-[60px] sp:w-[120px] mt-[8px] sp:mt-4"
                            />
                        </div>
                    </div>
                    <ListPageBottomSheeList @loadMore="loadMoreHandle" />
                </div>
            </div> -->
        </template>
    </BaseBottomSheet>
</template>

<script setup>
    async function shareContent () {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Título del contenido',
            text: 'Este es el texto del contenido que quiero compartir.',
            url: 'https://example.com'
          });
          console.log('¡Compartido con éxito!');
        } catch (error) {
          console.error('Error al compartir:', error);
        }
      } else {
        alert('La función de compartir no está disponible en este navegador.');
      }
    }

    import { ref, inject, toRefs, provide } from 'vue';

    import CardList from './components/CardList.vue';
    import PlaceSelected from './components/PlaceSelected.vue';


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
    const placeSelected = inject('placeSelected');
    const positionBottomSheet = inject('positionBottomSheet');
    const loadingPlaceSeleced = inject('loadingPlaceSeleced');

    const classControlsSheet = ref('0px');

    const isScrollingList = ref(false);

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
        placeSelected.value = null;
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

    provide('isScrollingList', isScrollingList);
</script>

<style lang="scss">
    .shadow-header {
       box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
    }
</style>