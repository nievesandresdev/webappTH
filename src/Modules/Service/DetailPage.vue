<template>
    <LoadPage v-if="loading" />

  <div v-else class="no-scrollbar">
    <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]"></div>

    <ImageSlider
      show-button-back
      :images="serviceData.images.map(item=> serviceStore.$loadImage(item))"
      :from="'services'"
    />
    <div class="py-[12px] sp:py-[24px] no-scrollbar mx-2 sp:mx-4">
        <div class="pb-[12px] border-b  border-[#E9E9E9]">
            <h2 class="text-[14px] sp:text-[18px] font-bold w-[173px] sp:w-[246px] lato">
                {{ serviceData?.name }}
            </h2>
            <p class="text-[14px] sp:text-[20px] font-bold mt-[8px] lato">{{ serviceData?.price?.toFixed(2) }}€</p>
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

        <div
            v-if="hire"
            class="pb-[8px] sp:pb-[16px] mt-4 sp:mt-6"
        >
            <p
                ref="hireRef"
                class="hire mt-2 sp:mt-4 text-[9px] sp:text-sm font-medium lato"
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
            classes="text-center py-2.5 rounded-[10px] text-[10px] sp:text-[14px] font-bold leading-[20px] w-full lato"
            @click="isOpenModelLink = true"
        >
            {{ $t('service.modal-request-service.button') }}
        </PrimaryButton>
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
</div>

</template>

<script setup>
import { onMounted, ref, nextTick, provide, computed, watch } from 'vue';
import ImageSlider from '@/components/ImageSlider.vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import Modal from '@/components/Modal.vue';
import LoadPage from '@/shared/LoadPage.vue';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();

import { useServiceStore } from '@/stores/modules/service';
const serviceStore = useServiceStore();
import { useExperienceStore } from '@/stores/modules/experience';
const experienceStore = useExperienceStore();
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();

// const serviceData = {
//     name: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam eos culpa perspiciatis. Nesciunt ipsa, quo dolorem necessitatibus voluptates recusandae laudantium modi saepe sint veniam nemo esse molestias commodi perspiciatis doloremque.",
//     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam eos culpa perspiciatis. Nesciunt ipsa, quo dolorem necessitatibus voluptates recusandae laudantium modi saepe sint veniam nemo esse molestias commodi perspiciatis doloremque.",
//     hire: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam eos culpa perspiciatis. Nesciunt ipsa, quo dolorem necessitatibus voluptates recusandae laudantium modi saepe sint veniam nemo esse molestias commodi perspiciatis doloremque.",
//     link_url: "http://google.com",
//     type_price: 0,
//     price: 200
// }

const serviceData = ref({
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
    return router.params;
});

onMounted(() => {
    // loadData();
});

watch(hotelData, (valueCurrent, valueOld) => {
    if (!valueOld && valueCurrent) {
        loadData();
    }
}, { immediate: true });

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

async function loadData () {
    loading.value = true;
    let response = await serviceStore.$findByIdConfort(3);
    if (response.ok) {
        let { data } = response;
        let dataTranslate = { name: data.name, description: data.translation_current.description, hire: data.translation_current.hire, images: data.images, link_url: data.link_url, price: data.price };
        Object.assign(serviceData.value, dataTranslate);
        description.value = dataTranslate.description;
        hire.value = dataTranslate.hire;
        checkDescriptionLength();
    }
    loading.value = false;
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

</script>

<style scoped lang="scss">
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
    &__tag {
        border-radius: 18px;
        border: 1px solid  #FFF;
        background: #FAFAFA;
        box-shadow: 0px 0.5px 4px 0px rgba(0, 0, 0, 0.12), 0px 6px 13px 0px rgba(0, 0, 0, 0.12);
    }
}

</style>
