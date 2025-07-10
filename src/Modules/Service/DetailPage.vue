<template>

    <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]"></div>


    <PageTransitionGlobal module="service" name="service_detail" :component-name="'SkeletonDetail'">
        <!-- <div class="h-full "> -->
            <ImageSlider
                show-button-back
                :images="serviceData.type == 'thehoster' ? serviceData.images.map(item=> serviceStore.$loadImage(item)) : serviceData.images.map(item=> experienceStore.$loadImage(item))"
                :from="'services'"
                :msg-shared="msgShared"
                show-button-shared
                :nameShared="serviceData?.name"
                :typeShared="hotelData.type"
            />
            <div class="py-[12px] sp:py-[24px] mx-2 sp:mx-4 pb-[40px] sp:pb-[86px]">
                <div class=" ">
                    <!-- border-b  border-[#E9E9E9] -->
                    <h2 class="text-[14px] sp:text-[18px] font-bold w-[173px] sp:w-[246px] lato">
                        {{ serviceData?.name }}
                    </h2>
                    <div class="mt-[5px] sp:mt-[8px]">
                        <p
                            v-if="serviceStore.calPrice(serviceData)?.isFrom"
                            class="text-[7px] sp:text-[10px] lato leading-none font-bold"
                        >
                            {{ $t('experience.card-experience.from') }}
                        </p>
                        <p class="text-[12px] sp:text-[20px] font-bold lato">
                            <template v-if="serviceStore.calPrice(serviceData)?.isFree">
                                {{ $t('service.card-item.free') }}
                            </template>
                            <template v-else>
                                {{ serviceStore.calPrice(serviceData)?.price }}
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
                        class="description mt-2 sp:mt-4 text-[10px] sp:text-sm font-medium lato"
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
    
                <div
                    v-if="hire"
                    class=" sp:pb-[16px] mt-4 sp:mt-6 card-recommendation p-2 sp:p-4"
                >
                    <h3 class="font-bold text-[12px] sp:text-[16px] lato mb-[8px] sp:mb-[12px]">{{ $t('service.detail-page.how-to-hire') }}</h3>
                    <p
                        ref="hireRef"
                        class="hire  text-[9px] sp:text-sm font-medium lato"
                        :class="{ expanded: isExpandedHire }"
                        v-html="hire"
                    />
                    <div
                        v-if="isLongHire"
                        class="mt-[6px] sp:mt-[12px] flex justify-end"
                    >
                        <button
                            class="underline hbtn-tertiary text-[9px] sp:text-sm font-bold lato"
                            @click="toggleHire"
                        >
                            {{ isExpandedHire ? $t('experience.detail-page.close-collapse-description') : $t('experience.detail-page.open-collapse-description') }}
                        </button>
                    </div>
                </div>
    
                <PrimaryButton 
                    v-if="serviceData.link_url"
                    classes="text-center py-1 sp:py-2.5 rounded-[10px] text-[10px] sp:text-[14px] font-bold leading-[20px] w-full lato mt-[14px] sp:mt-[24px]"
                    @click="isOpenModelLink = true"
                >
                    {{ $t('service.modal-request-service.button') }}
                </PrimaryButton>
                <span class="mt-[14px] sp:mt-[24px] border-b border-color-secondary block"></span>
                <template v-if="serviceData.type == 1">
                    <DetailPageCharacteristicsUnico />
                </template>
                <template v-else>
                    <DetailPageCharacteristicsVarious />
                </template>
    
    
                <Modal 
                    :openModal="isOpenModelLink"
                    :z-index="'z-[1800]'"
                    :customClasess="'w-full lg:w-[326px] lg:absolute lg:left-0 lg:right-0 m-auto z-[2000] space-y-[24px] space-y-[16px] sp:space-y-[24px] p-4 sp:p-6 text-left'"
                    @closeModal="isOpenModelLink = false"
                >
                    <h2 class="text-[13px] sp:text-[18px] font-bold lato">Estás por ser redirigido a un sitio web externo</h2>
                    <p class="text-[10px] sp:text-[14px] font-medium lato">Estás a punto de ser redirigido al sitio web del proveedor del servicio. ¿Deseas continuar?</p>
                    <div class="text-center space-y-4">
                        <PrimaryButton 
                            classes="text-center py-[12px] rounded-[10px] text-[10px] sp:text-[14px] font-bold leading-[20px] w-full lato"
                            @click="openModalLink"
                        >
                            {{ $t('service.modal-request-service.button') }}
                        </PrimaryButton>
                        <button
                            class="text-sm font-bold underline"
                            @click="isOpenModelLink = false"
                        >
                            Cancelar
                        </button>
                    </div>
                </Modal>
            </div>
        <!-- </div> -->
    </PageTransitionGlobal>
</template>

<script setup>
import { onMounted, ref, nextTick, provide, computed, watch } from 'vue';

// COMPONENTS
import ImageSlider from '@/components/ImageSlider.vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import Modal from '@/components/Modal.vue';
import LoadPage from '@/shared/LoadPage.vue';
import DetailPageCharacteristicsUnico from './DetailPageCharacteristicsUnico.vue';
import DetailPageCharacteristicsVarious from './DetailPageCharacteristicsVarious.vue';
import PageTransitionGlobal from '@/components/PageTransitionGlobal.vue';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();

// STORES
import { useServiceStore } from '@/stores/modules/service';
const serviceStore = useServiceStore();
import { useExperienceStore } from '@/stores/modules/experience';
const experienceStore = useExperienceStore();
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// CONSTANTS
import { SECTIONS } from '@/constants/sections';

import { useHead } from '@vueuse/head';

// COMPOSABLES
import { useLoadingSections } from '@/composables/useLoadingSections';
const { startLoading, stopLoading } = useLoadingSections();

// PROPS
const props = defineProps({
  paramsRouter: {
    type: Object,
    default: () => ({}),
  },
  queryRouter: {
    type: Object,
    default: () => ({}),
  },
});

const serviceData = ref({
    type: null,
    name: null,
    description: null,
    hire: null,
    link_url: null,
    type_price: 0,
    price: null,
    images: [],
});

const isOpenModelLink = ref(false);
const isExpandedDescription = ref(false);
const isLongDescription = ref(false);
const descriptionRef = ref(null);
const description = ref(null);

const isExpandedHire = ref(false);
const isLongHire = ref(false);
const hireRef = ref(null);
const hire = ref(null);
const loading = ref(true);

// COMPUTED
const hotelData = computed(() => hotelStore.hotelData);

const serviceCurrent = computed(() => {
    return props.paramsRouter.service;
});

//useHead
useHead({
    title: 'Servicios',
    meta: [
        { name: 'description', content: 'Servicios' }
    ]
});

const msgShared = computed(() => {
    return t('service.share.message', { type: hotelData.value.type });
});

startLoading(SECTIONS.SERVICE.DETAIL);
onMounted(() => {
    // loadData();
});

const idService = computed(() => {
    let { id, slug } = props.paramsRouter ?? {};
    return id ?? slug;
});

watch(hotelData, (valueCurrent, valueOld) => {
    if (!valueOld && valueCurrent) {
        loadData();
    }
}, { immediate: true });

async function loadData () {
    loading.value = true;
    let response = null;
    if (serviceCurrent.value === 'confort') {
        response = await serviceStore.$findByIdConfort(idService.value);
    }
    if (serviceCurrent.value === 'transport') {
        response = await serviceStore.$findByIdTransport(idService.value);
    }
    if (serviceCurrent.value === 'activity') {
        response = await experienceStore.$apiFindBySlug({slug: idService.value});
    }
    if (response.ok) {
        let { data } = response;
        let dataTranslate = {
            type: data?.name_api,
            name: data?.name ?? data?.title,
            description: data?.translation_current?.description ?? data?.description,
            hire: data?.translation_current?.hire ?? data?.hire,
            images: data.images,
            link_url: data.link_url ?? data.url,
            price: data.price ?? data.from_price,
            type_price: data.type_price,
            address: data?.translation_current?.address ?? data?.address,
            duration: data?.duration,
            availability: data?.availability,
            fields_visibles: data?.fields_visibles,
            languages: data?.languages,
            requeriment: data?.translation_current?.requeriment ?? data?.requeriment,
            type: data?.type,
            subservices: data?.subservices ?? [],
        };
        Object.assign(serviceData.value, dataTranslate);
        description.value = dataTranslate.description;
        hire.value = dataTranslate.hire;
        nextTick(() => {
            checkDescriptionLength();
        });
    }
    loading.value = false;
    stopLoading(SECTIONS.SERVICE.DETAIL);
}

function checkDescriptionLength () {
  nextTick(() => {
    if (descriptionRef.value) {
        const descriptionElement = descriptionRef.value;
        isLongDescription.value = descriptionElement.scrollHeight > descriptionElement.clientHeight;
    }

    if (hireRef.value) {
        const hireElement = hireRef.value;
        isLongHire.value = hireElement.scrollHeight > hireElement.clientHeight;
    }
  });
}

const toggleDescription = () => {
  isExpandedDescription.value = !isExpandedDescription.value;
}

const toggleHire = () => {
  isExpandedHire.value = !isExpandedHire.value;
}


const openModalLink = () => {
    window.open(serviceData.value.link_url, '_blank')
}

provide('queryRouter', props.queryRouter);
provide('serviceData', serviceData);
provide('serviceStore', serviceStore);
provide('hotelData', hotelData);

</script>

<style lang="scss">
.description, .hire {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Mostrar solo 3 líneas */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  transition: max-height 0.3s ease;
}

.description.expanded, .hire.expanded {
  -webkit-line-clamp: unset;
  max-height: none;
}

.card-recommendation {
    border-radius: 10px;
    border: 1px solid #E9E9E9;
    background:  linear-gradient(105deg, #F3F3F3 0%, #FAFAFA 100%);
}

</style>
