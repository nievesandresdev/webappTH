<template>
    <div class="w-full">
        <p class="text-[6px] sp:text-sm mb-[17px] sp:mb-[37px]">{{ `${$t('place.list-page.text-search-not-found')}` }}</p>
        <div class="mx-[28px] relative">
             <img src="/assets/img/NOT.FOND.PLACES.png" class="w-full h-full absolute top-0 left-0 object-cover" alt="NOT.FOND.PLACES">
            <div class="flex flex-col space-y-[26px] sp:space-y-[56px] pt-[27px]">
                <template v-for="item in typePlacesWithNumbers">
                    <template v-if="item.numbers">
                        <div class="space-y-2  sp:space-y-4 flex flex-col items-center" style="z-index: 7000 !important;">
                            <div class="flex space-x-1 sp:space-x-2">
                                <img
                                    :src="`/assets/icons/${item.icon_type_place}.svg`"
                                    class="size-[8px] sp:size-[16px]"
                                    alt=""
                                >
                                <span class="text-[6px] sp:text-sm leading-none">{{ item.name_type_place }}</span>
                            </div>
                            <button
                                class="text-[6px] sp:text-sm font-bold underline leading-[14px]  leading-none"
                                @click="changeCategoryHandle({ idCategory: item.categori_places_id, idTypePlace: item.type_places_id })"
                            >
                                {{ $t('place.list-page.text-count-list',  { count: item.numbers  }  ) }}
                            </button>
                        </div>
                    </template>
                </template>
            </div>
           
        </div>
    </div>
</template>

<script setup>
    import { ref, inject, computed } from 'vue';

    // COMPOSABLES
    import { useEventBus } from '@/composables/eventBus';
    const { emitEvent } = useEventBus();

    const categoriplacesWithNumbers = inject('categoriplacesWithNumbers');

    const typePlacesWithNumbers = computed(() => {
        let categoriGroupByTypePlace = groupByArray(categoriplacesWithNumbers.value, 'translation_current_type_place');
        let typePlacesArray = Object.entries(categoriGroupByTypePlace);
        let categoriWithNumbers = typePlacesArray.map(item => {
            let [ key, value ] = item;
            return {
                categori_places_id: value?.[0]?.categori_places_id,
                type_places_id: value?.[0]?.type_places_id,
                name_type_place: key,
                icon_type_place: value?.[0]?.icon_type_place,
                numbers: value.reduce((acc, item) => {
                    acc = item.count_places + acc;
                    return acc;
                }, 0),
            }
        });
        return categoriWithNumbers;
    });

    function groupByArray(array, key) {
        if (!array) return {};
        return array.reduce((acc, item) => {
            const groupKey = item[key];
            if (!acc[groupKey]) {
                acc[groupKey] = [];
            }
            acc[groupKey].push(item);
            return acc;
        }, {});
    }

    function changeCategoryHandle (payload) {
        console.log(payload, 'change-category');
        emitEvent('change-category', payload);
    }

</script>