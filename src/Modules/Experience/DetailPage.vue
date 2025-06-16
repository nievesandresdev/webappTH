<template>
    <LoadPage v-if="loading" />
    <div>
        <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]"></div>
        <ImageSlider
        show-button-back
        :images="experienceData?.images?.map(item => item?.url) ?? []"
        /> 
        <div class="pt-[12px] sp:pt-[24px] px-[8px] sp:px-[16px] mb-2 sp:mb-4 space-y-3 sp:space-y-6 pb-[70px] sp:pb-[90px]">
            <div class="space-y-2 sp:space-y-4">
                <div class="flex justify-between">
                    <h2
                        v-html="experienceData?.title"
                        class="text-[12px] sp:text-[18px] font-bold w-[133px] sp:w-[246px] lato"
                    />
                    <div class="flex flex-col items-center">
                        <div class="flex items-center mb-0.5 sp:mb-1">
                            <img src="/assets/icons/WA.star.svg" class="size-[10px] sp:size-[16px] mr-0.5 sp:mr-1" />
                            <p class="text-[13px] sp:text-[20px] font-semibold leading-none lato">{{ experienceData?.reviews.combined_average_rating.toFixed(1) }}</p>
                        </div>
                        <p class="text-[7.5px] sp:text-[10px] font-medium lato leading-none">
                            ({{ experienceData?.reviews.total_reviews }} {{ $t('place.detail.opinionsWord') }})
                        </p>
                    </div>
                </div>
                <div class="flex justify-between items-end">
                    <div class="flex flex-col">
                        <p  class="text-[8px] sp:text-[10px] lato leading-none font-bold">{{ $t('experience.card-experience.from') }}</p>
                        <p class="text-[10px] sp:text-[20px] font-bold lato leading-none">{{ experienceData?.from_price?.toFixed(2) }} €</p>
                    </div>
                    <div class="flex items-center">
                        <img src="/assets/icons/WA.pointer.svg" class="size-[9px] sp:size-[16px] mr-0.5 sp:mr-1" />
                        <p class="text-[10px] sp:text-[14px] font-medium lato leading-none">{{ experienceData?.city_experince }}, España</p>
                    </div>
                </div>
            </div>
            <div
                v-if="experienceData?.recomendations"
                class="card-recommendation p-2.5 sp:p-4 relative mt-[12px] sp:mt-[24px]"
            >
                <div class="absolute sp:top-[-18px] top-[-9px] left-[4px] sp:left-[8px] card-recommendation__tag flex items-center space-x-0.5 sp:space-x-1 py-0.5 sp:py-1 px-1 sp:px-2">
                    <img src="/assets/icons/WA.STAR.BLACK.svg" class="size-2 sp:size-4" />
                    <span class="text-[7px] sp:text-[12px] font-bold leading-none lato">{{ $t('place.detail.recommended')?.toUpperCase() }}</span>
                </div>
                <p
                    class="text-[10px] sp:text-sm font-medium lato"
                    style="font-family: 'Lato', sans-serif !important; font-style: italic;"
                >
                    {{ `“${experienceData?.recomendation_language_current}”` }}
                </p>
            </div>
            <div
                v-if="description"
                class="pb-[8px] sp:pb-[16px] border-b  border-[#E9E9E9]"
            >
                <h2 class="text-[10px] sp:text-[18px] lato leading-none mb-1 sp:mb-2 font-bold">{{ $t('experience.detail-page.title-description') }}</h2>
                <p
                    ref="descriptionRef"
                    class="description mt-2 sp:mt-4 text-[9px] sp:text-sm font-medium lato"
                    :class="{ expanded: isExpanded }"
                >
                    {{ description }}
                </p>
                <div
                    v-if="isLongDescription"
                    class="mt-[6px] sp:mt-[12px] flex justify-end"
                >

                    <button
                        class=" underline hbtn-tertiary text-[9px] sp:text-sm font-bold lato"
                        @click="toggleDescription"
                    >
                        {{ isExpanded ? $t('experience.detail-page.close-collapse-description') : $t('experience.detail-page.open-collapse-description') }}
                    </button>
                </div>
            </div>
            <div v-if="existUrlVIator" class="space-y-[8px] sp:space-y-[16px] pb-[14px] sp:pb-[24px] border-b  border-[#E9E9E9]">
                <h3 class="lato  text-[8px] sp:text-[16px] font-medium leading-none">{{ $t('experience.detail-page.check-the-availability-of-this-experience') }}</h3>
                <PrimaryButton 
                    classes="block text-center py-1.5 sp:py-2.5 rounded-[10px] text-[9px] sp:text-[14px] font-bold leading-none w-full shadow-guest lato"
                    @click="goInViator"
                >
                    {{ $t('experience.detail-page.btn-see-availability-on-viator') }}
                </PrimaryButton>
            </div>
            <div class="p-3 sp:p-6 space-y-[12px] border border-color-secondary bg-gradient-100 rounded-[10px]">
                <h3 class="text-[10px] sp:text-[16px] lato font-bold leading-none">{{ $t('experience.detail-page.title-general-information') }}</h3>
                <div
                    v-if="experienceViatorData?.cancellationPolicy?.type == 'STANDARD'"
                    class="flex items-center space-x-1 sp:space-x-2"
                >
                    <img src="/assets/icons/WA.Cancelacion.svg" class="size-3 sp:size-4" />
                    <p class="text-[9px] sp:text-[14px] leading-none">{{ $t('experience.detail-page.free-cancellation-label') }}</p>
                </div>
                <div class="flex items-center space-x-1 sp:space-x-2">
                    <img src="/assets/icons/WA.Clock.svg" class="size-3 sp:size-4" />
                    <p class="text-[9px] sp:text-[14px] lato font-medium leading-none"> {{ duration }} </p>
                </div>
                <div
                    v-if="experienceViatorData?.ticketInfo?.ticketTypes?.includes('MOBILE_ONLY')"
                    class="flex items-center space-x-1 sp:space-x-2"
                >
                    <img src="/assets/icons/WA.mobile.svg" class="size-3 sp:size-4" />
                    <p class="text-[9px] sp:text-[14px] lato font-medium leading-none">{{ $t('experience.detail-page.tag-ticket-mobile') }}</p>
                </div>
                <div class="flex items-center space-x-1 sp:space-x-2">
                    <img src="/assets/icons/WA.PaperTicket.svg" class="size-3 sp:size-4" />
                    <p class="text-[9px] sp:text-[14px] lato font-medium leading-none">{{ $t('experience.detail-page.tag-paper-ticket') }}</p>
                </div>
                <div v-if="availablelanguages?.length" class="flex items-center space-x-1 sp:space-x-2">
                    <img src="/assets/icons/WA.Idiomas.svg" class="size-3 sp:size-4" />
                    <p class="text-[9px] sp:text-[14px] lato font-medium leading-none">{{ $t('experience.detail-page.offered-in') }}: {{ availablelanguages?.languages?.map(lg => $t(`language.${lg}`)).join(', ') }} </p>
                </div>
            </div>
            <DetailPageSectionInclude />
            <DetailPageSectionAditional />
            <DetailPageSectionCancellationPolicy />
            <DetailPageSectionRating />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, nextTick, provide, computed, toRefs, watch } from 'vue';
import ImageSlider from '@/components/ImageSlider.vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import DetailPageSectionInclude from './DetailPageSectionInclude.vue';
import DetailPageSectionAditional from './DetailPageSectionAditional.vue';
import DetailPageSectionCancellationPolicy from './DetailPageSectionCancellationPolicy.vue';
import DetailPageSectionRating from './DetailPageSectionRating.vue';
import LoadPage from '@/shared/LoadPage.vue';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();

import $utils from '@/utils/utils';

import { handleToast } from "@/composables/useToast";
const { toastSuccess } = handleToast();

const props = defineProps({
  paramsRouter: {
    type: Object,
    default: () => ({}),
  },
});
const { paramsRouter } = toRefs(props);

// STORE
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();

import { useExperienceStore } from '@/stores/modules/experience';
const experienceStore = useExperienceStore();

  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();

// DATA
const experienceData = ref(null);
const experienceViatorData = ref(null);
const availablelanguages = ref({});

const isExpanded = ref(false);
const isLongDescription = ref(false);
const descriptionRef = ref(null);
const description = ref(null);
const loading = ref(true);

const hotelData = computed(() => hotelStore.hotelData);

// ONMOUNTED
onMounted(() => {
    // loadData();
});

watch(hotelData, (valueCurrent, valueOld) => {
    if (!valueOld && valueCurrent) {
        loadData();
    }
}, { immediate: true });

const existUrlVIator = computed(() => {
    return experienceViatorData.value && experienceViatorData?.value?.productUrl;
});

const duration = computed( ()  => {
    let d = $utils.transformDuration(experienceData?.value?.duration)
    let text = d?.minutes <= 0 ? `${d?.hours} ${t('experience.card-experience.hour')}` : `${d?.hours} ${t('experience.card-experience.hour')} ${t('experience.card-experience.and')} ${d?.minutes} ${t('experience.card-experience.min-aprox')}`
    return text;
});

// FUNCTION
async function loadData () {
    // await Promise.all([loadExperience(), loadExperienceInViator()]);
    await loadExperience();
    await loadExperienceInViator();
    loading.value = false;
}

async function loadExperience () {
    let { slug } = paramsRouter.value;
    if (!slug) return;
    const response = await experienceStore.$apiFindBySlug({slug});
    if (response.ok) {
        experienceData.value = response.data;
        description.value = experienceData.value.description;
        checkDescriptionLength();
    }

}
async function loadExperienceInViator () {
    let shortId = getShortId();
    const response = await experienceStore.$apiFindInVIatorByShortId({shortId});
    if (response.ok) {
        experienceViatorData.value = response.data;
        loadLanguagesAvailables();
    }
    
}
function loadLanguagesAvailables () {
    const { languageGuides } = experienceViatorData.value ?? {};
    const codesLanguages = languageGuides
        ?.filter(lg => lg?.language)
        .map(lg => lg.language) ?? [];
    const nameslanguages = codesLanguages;
    const languagesAvailablesData = {
        numbers: nameslanguages?.length - 1,
        firstLanguage: nameslanguages?.[0],
        length: nameslanguages?.length,
        languages: nameslanguages,
    }
    Object.assign(availablelanguages.value, languagesAvailablesData);
}

function getShortId () {
    let {slug} = paramsRouter.value;
    if (!slug) return;
    const matches = slug.match(/[A-Za-z]*\d+[A-Za-z0-9]*/g);
    if (matches && matches.length > 0) {
        const lastMatch = matches[matches.length - 1];
        return lastMatch;
    }
    let shortId = experienceData.value?.api_short_id ?? null;
    return shortId;
}

function checkDescriptionLength() {
  nextTick(() => {
    if (!descriptionRef.value) return;

    const descriptionElement = descriptionRef.value;
    isLongDescription.value = descriptionElement.scrollHeight > descriptionElement.clientHeight;
  });
}

const toggleDescription = () => {
  isExpanded.value = !isExpanded.value;
}

function goInViator ()  {
    if (!existUrlVIator.value) {
         router.go(-1);
         return;
    }
    window.open(experienceViatorData?.value.productUrl, '_blank')
}

provide('experienceViatorData', experienceViatorData);

</script>

<style scoped lang="scss">
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

.card-recommendation {
    border-radius: 10px;
    border: 1px solid #E9E9E9;
    background:  linear-gradient(105deg, #F3F3F3 0%, #FAFAFA 100%);
    &__tag {
        border-radius: 18px;
        border: 1px solid  #FFF;
        background: #FAFAFA;
        box-shadow: 0px 0.5px 4px 0px rgba(0, 0, 0, 0.12), 0px 6px 13px 0px rgba(0, 0, 0, 0.12);
    }
}

</style>
