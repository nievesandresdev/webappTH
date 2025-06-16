<template>
     <div class="p-3 sp:p-6 space-y-[12px] border border-color-secondary bg-gradient-100 rounded-[10px]">
        <h3 class="text-[10px] sp:text-[16px] leading-0 font-bold mb-[12px] sp:mb-[24px] lato">{{ $t('experience.detail-page.title-include') }}</h3>
        <div class="space-y-1 sp:space-y-2 flex flex-col w-full">
            <div
                v-for="(item, index) in inclusionsAndExcludeData"
                :key="index"
                class="flex space-x-1 sp:space-x-2 w-full"
            >
                <div class="flex items-stretch w-[10px] sp:w-4 h-full">
                    <div class="w-[12px] sp:size-4 mt-[2px] sp:mt-[4px]">
                        <img :src="`/assets/icons/WA.${item.type == 1 ? 'check' : 'Close'}.svg`" class="w-full" />
                    </div>
                </div>
                <div class="space-y-1 sp:space-y-2 flex-1">
                    <p v-if="item.label" class="text-[9px] sp:text-[14px] font-medium leading-0 lato">{{ item.label }}</p>
                    <p
                        v-if="item.value"
                        class="description text-[7px] sp:text-[12px] font-medium leading-0 text-[#777777] lato"
                        ref="descriptionRefs"
                        :class="{ expanded: item.isExpanded }"
                    >
                        {{ item.value }}
                    </p>
                    <div
                        v-if="item.isLongDescription"
                        class="w-full flex justify-end"
                    >
                        <button
                            class="underline hbtn-tertiary text-[9px] sp:text-sm font-bold lato"
                            @click="toggleDescription(index)"
                        >
                            {{ item.isExpanded ? $t('place.detail.showLess') : $t('place.detail.showMore') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <pre>{{ inclusionsAndExcludeData }}</pre> -->
</template>

<script setup>
import { inject, watch, ref, nextTick } from 'vue';

const experienceViatorData = inject('experienceViatorData');

const inclusionsAndExcludeData = ref([]);
const descriptionRefs = ref([]);

// onMounted(() => {

// });

// WATCH

watch(experienceViatorData, (viatorData) => {
    let includes = viatorData?.inclusions?.map(item => {
        return {
            type: 1,
            label: item?.categoryDescription ?? null,
            value: item?.otherDescription ?? null,
            isExpanded: false,
            isLongDescription: false,
        }
    }) ?? [];
    let excludes = viatorData?.exclusions?.map(item => {
        return {
            type: 2,
            label: item?.categoryDescription ?? null,
            value: item?.otherDescription ?? null,
            isExpanded: false,
            isLongDescription: false,
        }
    }) ?? [];
    inclusionsAndExcludeData.value = [...includes, ...excludes];

    inclusionsAndExcludeData.value.forEach((_, index) => {
        checkDescriptionLength(index);
    });

});

const checkDescriptionLength = (index) => {
  nextTick(() => {
    const descriptionElement = descriptionRefs.value[index];
    let { scrollHeight, clientHeight } = descriptionElement ?? {};
    inclusionsAndExcludeData.value[index].isLongDescription = descriptionElement && scrollHeight > clientHeight;
  });
};

// FUNCTION
function toggleDescription (index) {
    inclusionsAndExcludeData.value[index].isExpanded = !inclusionsAndExcludeData.value[index].isExpanded;
}

</script>

<style lang="scss">
.description {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Mostrar solo 3 líneas */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  transition: max-height 0.3s ease;
}

.description.expanded {
  -webkit-line-clamp: unset;
  max-height: none;
}
</style>