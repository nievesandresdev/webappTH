<template>
    <BaseBottomSheet
        :open="isOpenBottomSheet"
        :position="positionBottomSheet"
        is-full-front
        max-height="85"
        :showHandlebar="false"
        @changeCurrentHeight="changePositionHandle"
    >
        <template v-slot:content>
            <div class="h-full flex flex-col">
                <div class="overflow-y-auto">
                    <div class="rounded-t-[20px] overflow-hidden relative">
                        <RoundedButton
                            id="close-bottom-sheet"
                            class-container="absolute top-[16px] left-[16px] z-10"
                            class-button="rounded-[7px]"
                            iconUrl="/assets/icons/1.TH.CLOSE.svg"
                            sizeIcons="w-6 h-6"
                            @click="closeBottomSheet"
                        />
                        <RoundedButton
                            id="open-shared-stay-modal"
                            class-container="absolute top-[16px] right-[16px] z-10"
                            class-button="rounded-[7px]"
                            iconUrl="/assets/icons/arrow-up-from-bracket.svg"
                            sizeIcons="w-6 h-6"
                            @click="isModalShareOpen()"
                        />
                        <ImageSlider
                            :show-button-back="false"
                            :images="[serviceStore.$loadImage(subserviceData.image)]"
                            :from="'services'"
                        />
                    </div>
                    <div class="py-[12px] sp:py-[24px] no-scrollbar mx-2 sp:mx-4">
                        <div class="pb-[12px] border-b  border-[#E9E9E9]">
                            <h2 class="text-[14px] sp:text-[18px] font-bold w-[173px] sp:w-[246px] lato">
                                {{ subserviceData?.name }}
                            </h2>
                            <div class="mt-[5px] sp:mt-[8px]">
                                <p class="text-[14px] sp:text-[20px] font-bold lato">
                                    <template v-if="serviceStore.calPrice(serviceData)?.isFree">
                                        {{ $t('service.card-item.free') }}
                                    </template>
                                    <template v-else>
                                        {{ serviceStore.calPrice(subserviceData)?.price }}
                                    </template>
                                </p>
                            </div>
                        </div>
                        <div
                            v-if="description"
                            class="pb-[8px] sp:pb-[16px] border-b  border-[#E9E9E9]  mt-2 sp:mt-4"
                        >
                            <p
                                ref="descriptionRef"
                                class="description mt-2 sp:mt-4 text-[9px] sp:text-sm font-medium lato"
                                :class="{ expanded: isExpandedDescription }"
                                v-html="description"
                            />
                            <div
                                v-if="isLongDescription"
                                class="mt-[6px] sp:mt-[12px] flex justify-end"
                            >
        
                                <button
                                    class=" underline hbtn-tertiary text-[9px] sp:text-sm font-bold lato"
                                    @click="toggleDescription"
                                >
                                    {{ isExpandedDescription ? $t('experience.detail-page.close-collapse-description') : $t('experience.detail-page.open-collapse-description') }}
                                </button>
                            </div>
                        </div>
                        <div class="mt-[18px] sp:mt-[24px] card-recommendation p-2 sp:p-4 space-y-[9px] sp:space-y-[12px] mb-[18px] sp:mb-[24px]">
                            <h3 class="text-[9px] sp:text-[16px] lato font-bold leading-none">{{ $t('experience.detail-page.title-general-information') }}</h3>
                            <div
                                v-if="subserviceData?.duration && subserviceData?.fields_visibles?.includes('DURATION')"
                                class="flex items-center space-x-[9px] sp:space-x-[12px]"
                            >
                                <img src="/assets/icons/WA.Clock.svg" class="size-2 sp:size-4" />
                                <p class="text-[7px] sp:text-[14px] leading-none">{{ calculateDuration(subserviceData?.duration) }}</p>
                            </div>
                            <div
                                v-if="subserviceData?.address && subserviceData?.fields_visibles?.includes('ADDRESS')"
                                class="flex items-center space-x-[9px] sp:space-x-[12px]"
                            >
                                <img src="/assets/icons/WA.pointer.svg" class="size-2 sp:size-4" />
                                <p class="text-[7px] sp:text-[14px] leading-none">{{ subserviceData?.address }}</p>
                            </div>
                            <div
                                v-if="subserviceData?.fields_visibles?.includes('ACCESSIBILITY')"
                                class="flex items-center space-x-[9px] sp:space-x-[12px]"
                            >
                                <img src="/assets/icons/WA.PaperTicket.svg" class="size-2 sp:size-4" />
                                <p class="text-[7px] sp:text-[14px] leading-none">{{ $t('service.detail-page.accessibility') }}</p>
                            </div>
                            <div
                                v-if="subserviceData?.languages?.length > 0 && subserviceData?.fields_visibles?.includes('LANGUAGES')"
                                class="flex items-center space-x-[9px] sp:space-x-[12px]"
                            >
                                <img src="/assets/icons/WA.Idiomas.svg" class="size-2 sp:size-4" />
                                <p class="text-[7px] sp:text-[14px] leading-none">{{ `${$t('service.detail-page.offered-in')}: ${subserviceData?.languages?.map(lg => $utils.capitalize($t(`language.${lg}`))).join(', ')}` }}</p>
                            </div>
                        </div>
                        <div class="sp:pb-[16px] card-recommendation p-2 sp:p-4 space-y-[9px] sp:space-y-[12px]">
                            <h3 class="text-[9px] sp:text-[16px] lato font-bold leading-none">{{ $t('service.detail-page.requeriments.title') }}</h3>
                            <p class="text-[7px] sp:text-[14px] leading-none font-medium">{{ subserviceData?.requeriment }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </BaseBottomSheet>
</template>

<script setup>
import { inject, ref, computed, nextTick, watch } from 'vue';

import BaseBottomSheet from '@/components/Modal/BaseBottomSheet.vue';
import ImageSlider from '@/components/ImageSlider.vue';
import RoundedButton from '@/components/Buttons/RoundedButton.vue';

import { useRouter } from 'vue-router';
const router = useRouter();

// INJECT
const serviceStore = inject('serviceStore');
const isOpenBottomSheet = inject('isOpenBottomSheet');
const subserviceData = inject('subserviceData');
const serviceData = inject('serviceData');
const queryRouter = inject('queryRouter');

// COMPOSABLES
import { useShare } from "@/composables/useShare";
const { shareContent } = useShare();
import { useI18n } from 'vue-i18n';
const { t } = useI18n();


  
// DATA
const descriptionRef = ref(null);
const isExpandedDescription = ref(false);
const isLongDescription = ref(false);
const positionBottomSheet = ref('min-top');

watch(isOpenBottomSheet, (valueCurrent, valueOld) => {
    if (!valueOld && valueCurrent) {
        checkDescriptionLength();
    }
    if (valueOld && !valueCurrent) {
        isExpandedDescription.value = false;
        isLongDescription.value = false;
        descriptionRef.value = null;
    }
});


// METHODS
const changePositionHandle = (position) => {
    isOpenBottomSheet.value = false;
}

function checkDescriptionLength () {
  nextTick(() => {
    if (descriptionRef.value) {
        const descriptionElement = descriptionRef.value;
        isLongDescription.value = descriptionElement.scrollHeight > descriptionElement.clientHeight;
    }
  });
}

const toggleDescription = () => {
  isExpandedDescription.value = !isExpandedDescription.value;
}

const description = computed(() => {
    return subserviceData.value.description;
})

function calculateDuration(duration) {
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 100);
    
    if (hours === 0 && minutes > 0) {
        return `${minutes} minutos`;
    }
    if (hours > 0 && minutes > 0) {
        return `${hours} Horas y ${minutes} minutos`;
    }
    return `${hours} Horas`;
}

function closeBottomSheet() {
    isOpenBottomSheet.value = false;
    router.push({ name: 'DetailService', params: { service: serviceData.value.id } });
}

function isModalShareOpen () {
    let data = {
        title: "Mira el servicio que ofrece nuestro hotel para nuestra estancia 1",
        text: "Mira el servicio que ofrece nuestro hotel para nuestra estancia 2",
        url: router.resolve({ name: 'DetailService', params: { service: serviceData.value.id }, query: { subserviceId: subserviceData.value.id } }).href,
    }
    shareContent(data);
};

</script>

<style scoped>
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
