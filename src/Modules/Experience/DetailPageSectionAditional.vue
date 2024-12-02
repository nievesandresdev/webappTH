<template>
    <div class="p-3 sp:p-6 space-y-[12px] border border-color-secondary bg-gradient-100 rounded-[10px]">
        <h3 class="text-[9px] sp:text-[16px] leading-0 font-bold mb-[12px] sp:mb-[24px] lato">{{ $t('experience.detail-page.title-other-information') }}</h3>
        <ul class="list-disc space-y-[7px] sp:space-y-[12px] pl-[11px] sp:pl-[22px]">
            <li
                v-for="(item, index) in informationAditionalDataExpanded"
                class="text-[8px] sp:text-[14px] font-medium lato leading-0"
            >
                {{ item }}
            </li>
        </ul>
        <div
            v-if="informationAditionalData.length > MAX_INFORMATION_ADITIONAL"
            class="w-full flex justify-end"
        >
            <button
                class="underline hbtn-tertiary text-[9px] sp:text-sm font-bold lato"
                @click="toggleInfo"
            >
                {{ isExpanded ? $t('place.detail.showLess') : $t('place.detail.showMore') }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { inject, watch, ref, nextTick, computed } from 'vue';

const experienceViatorData = inject('experienceViatorData');

const MAX_INFORMATION_ADITIONAL = 5;
const isExpanded = ref(false);

const informationAditionalData = ref([]);

watch(experienceViatorData, (viatorData) => {
    let informationAditional = viatorData?.additionalInfo?.map(item => item?.description) ?? [];

    informationAditionalData.value = informationAditional;
});

const informationAditionalDataExpanded = computed(() => {
     let length = informationAditionalData.value.length;
     if (length <= MAX_INFORMATION_ADITIONAL || isExpanded.value) return  informationAditionalData.value;
     let info =  informationAditionalData.value.slice(0, MAX_INFORMATION_ADITIONAL);
     return info;
});

function toggleInfo () {
    isExpanded.value = !isExpanded.value;
}

</script>