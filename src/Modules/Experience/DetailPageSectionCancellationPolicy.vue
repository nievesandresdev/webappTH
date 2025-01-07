<template>
    <div class="p-3 sp:p-6 space-y-[12px] border border-color-secondary bg-gradient-100 rounded-[10px]">
        <h3 class="text-[9px] sp:text-[16px] leading-0 font-bold mb-[12px] sp:mb-[24px] lato">{{ $t('experience.detail-page.title-politic-cancelation') }}</h3>
        <p
            ref="cancellationRef"
            class="description text-[8px] sp:text-[14px] font-medium lato"
            :class="{ expanded: isExpanded }"
        >
            {{ cancellationPolicy }}
        </p>
        <div
            v-if="isLongDescription"
            class="w-full flex justify-end"
        >
            <button
                class="mt-[6px] sp:mt-[12px] underline hbtn-tertiary text-[9px] sp:text-sm font-bold lato"
                @click="toggleDescription"
            >
                {{ isExpanded ? $t('place.detail.showLess') : $t('place.detail.showMore') }}
            </button>
        </div>
    </div>
    
</template>

<script setup>
import { onMounted, ref, nextTick, provide, computed, inject, watch } from 'vue';

const experienceViatorData = inject('experienceViatorData');

const isExpanded = ref(false);
const isLongDescription = ref(false);
const cancellationRef = ref(null);


const cancellationPolicy = ref('');

watch(experienceViatorData, (viatorData) => {
    cancellationPolicy.value = viatorData?.cancellationPolicy?.description;
    checkDescriptionLength();
});


function checkDescriptionLength() {
  nextTick(() => {
    if (!cancellationRef.value) return;

    const descriptionElement = cancellationRef.value;
    isLongDescription.value = descriptionElement.scrollHeight > descriptionElement.clientHeight;
  });
}

const toggleDescription = () => {
  isExpanded.value = !isExpanded.value;
}


</script>

<style lang="scss" scoped>
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