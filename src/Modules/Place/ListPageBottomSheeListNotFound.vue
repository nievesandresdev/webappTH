<template>
    <div class="w-full">
        <p class="text-[6px] sp:text-sm mb-[17px] sp:mb-[37px]">{{ `${$t('place.list-page.text-search-not-found')}` }}</p>
        <div class="flex flex-col space-y-[26px] sp:space-y-[56px]">
            <div v-for="item in typePlacesWithNumbers">
                <template v-if="item.numbers">
                    <div class="space-y-2  sp:space-y-4 flex flex-col items-center">
                        <div class="flex space-x-1 sp:space-x-2">
                            <img
                                :src="`/assets/icons/${item.icon_type_place}.svg`"
                                class="size-[8px] sp:size-[16px]"
                                alt=""
                            >
                            <span class="text-[6px] sp:text-sm">{{ item.name_type_place }}</span>
                        </div>
                        <p class="text-[6px] sp:text-sm font-bold"> {{ $t('place.list-page.text-count-list',  { count: item.numbers  }  ) }}</p>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, inject, computed } from 'vue';

    const categoriplacesWithNumbers = inject('categoriplacesWithNumbers');

    const typePlacesWithNumbers = computed(() => {
        let categoriGroupByTypePlace = groupByArray(categoriplacesWithNumbers.value, 'translation_current_type_place');
        let typePlacesArray = Object.entries(categoriGroupByTypePlace);
        let categoriWithNumbers = typePlacesArray.map(item => {
            let [ key, value ] = item;
            return {
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

</script>