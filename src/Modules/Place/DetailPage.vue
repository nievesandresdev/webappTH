<template>
  <div>
    <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]"></div>

    <ImageSlider
      show-button-back
      :images="placeData?.place_images?.map(item=> placeStore.$loadImage(item)) ?? []"
    />
    <div class="py-[12px] sp:py-[24px]">
        <div class="pb-[12px] border-b  border-[#E9E9E9] mx-2 sp:mx-4">
            <div class="flex justify-between">
                <h2 class="text-[14px] sp:text-[18px] font-bold w-[123px] sp:w-[246px] lato">
                    {{ placeData?.title }}
                </h2>
                <div class="flex flex-col items-center">
                <div class="flex items-center mb-0.5 sp:mb-1">
                    <img src="/assets/icons/WA.star.svg" class="size-[8px] sp:size-[16px] mr-0.5 sp:mr-1" />
                    <p class="text-[11px] sp:text-[20px] font-semibold leading-none">{{ converStar(placeData?.num_stars) }}</p>
                </div>
                <p class="text-[6px] sp:text-[10px] font-medium lato leading-none">
                    ({{ placeData?.num_reviews }}
                    {{ $t('place.detail.opinionsWord') }})
                </p>
                </div>
            </div>

            <!-- Descripción con control de expansión -->
            <div
                v-if="description"
                class="mt-[8px] sp:mt-[16px]"
            >
                <p
                    ref="descriptionRef"
                    class="description mt-2 sp:mt-4 text-[9px] sp:text-sm font-medium lato"
                    :class="{ expanded: isExpanded }"
                >
                    {{ description }}
                </p>
                <!-- Botón para Mostrar Más/Menos -->
                <button
                    v-if="isLongDescription"
                    class="mt-[6px] sp:mt-[12px] underline hbtn-tertiary text-[9px] sp:text-sm font-bold lato"
                    @click="toggleDescription"
                >
                    {{ isExpanded ? $t('place.detail.showLess') : $t('place.detail.showMore') }}
                </button>
            </div>
            <p v-if="placeData?.type_cuisine" class="mt-2 sp:mt-4 text-[9px] sp:text-sm font-light lato">{{ placeData?.type_cuisine }}</p>
        </div>
        <div
            v-if="placeData?.recomendations"
            class="card-recommendation p-2.5 sp:p-4 relative mt-[12px] sp:mt-[24px] mx-2 sp:mx-4"
        >
            <div class="absolute sp:top-[-18px] top-[-9px] left-[4px] sp:left-[8px] card-recommendation__tag flex items-center space-x-0.5 sp:space-x-1 py-0.5 sp:py-1 px-1 sp:px-2">
                <img src="/assets/icons/WA.STAR.BLACK.svg" class="size-2 sp:size-4" />
                <span class="text-[9px] sp:text-sm font-bold">{{ $t('place.detail.recommended')?.toUpperCase() }}</span>
            </div>
            <p
                class="text-[9px] sp:text-sm font-medium"
                style="font-family: 'Lato', sans-serif !important; font-style: italic;"
            >
                {{ `“${placeData?.recomendation_language_current}”` }}
            </p>
        </div>
        <div class="mt-[12px] sp:mt-[24px]">
            <div class="flex items-center justify-between mx-2 sp:mx-4">
                <div class="flex items-center space-x-[4px] sp:space-x-[8px]">
                    <img
                        src="/assets/icons/WA.pointer.svg"
                        class="size-[10px] sp:size-[20px]"
                    >
                    <span class="text-[9px] sp:text-sm font-bold lato">{{ placeData?.address }}</span>
                </div>
                <button
                    class="hbtn-tertiary underline text-[9px] sp:text-sm font-bold flex items-center"
                    @click="copyText(placeData?.address)"
                >
                    <img
                        class="size-2 sp:size-4 inline-block mr-1 sp:mr-2"
                        src="/assets/icons/WA.COPY.svg"
                        alt="1.TH.COPY"
                    >
                    {{ $utils.titleCase($t('place.detail.copy')) }}
                </button>
            </div>
            <div class="py-[12px] sp:py-[24px] border-b  border-[#E9E9E9]">
                <DetailPageMap />
            </div>
            <div
                v-if="formatHours?.length > 0"
                class="my-[12px] sp:my-[24px] rounded-[10px] border border-[--Border-secondary] bg-gradient-100 p-2 sp:p-4 space-y-2 sp:space-y-4 mx-2 sp:mx-4"
            >
                <h2 class="text-[10px] sp:text-base font-bold lato">{{ $utils.titleCase($t('place.detail.hours.title')) }}</h2>
                <div
                    v-for="item in formatHours"
                    class="flex space-x-2 sp:space-x-4"
                >
                    <p class="text-[9px] sp:text-sm font-bold w-[50px] sp:w-[93px]">{{ $utils.titleCase($t(`place.detail.hours.${item.day}`)) }}</p>
                    <p class="text-[9px] sp:text-sm font-medium w-[50px] w-[93px]">{{ item.hour?.[0] }}</p>
                    <p class="text-[9px] sp:text-sm font-medium w-[50px] w-[93px]">{{ item.hour?.[1] }}</p>
                </div>
            </div>
            <div  
                class="flex justify-around mx-2 sp:mx-4 my-[12px] sp:my-[24px]"
            >
                <div
                    v-if="placeData?.web_link"
                    class="flex flex-col space-y-1 sp:space-y-2 justify-center items-center cursor-pointer"
                >
                    <div
                        class="button-utils p-1 sp:p-2"
                        @click="openWebsite"
                    >
                        <img
                            src="/assets/icons/WA.website.svg"
                            class="size-[16px] sp:size-[32px]"
                        >
                    </div>
                    <span class="text-[9px] sp:text-sm font-bold">{{ $utils.titleCase($t('place.detail.buttoms.web')) }}</span>
                </div>
                <div
                    v-if="placeData?.phone_wheretoeat"
                    class="flex flex-col space-y-1 sp:space-y-2 justify-center items-center cursor-pointer"
                >
                    <div
                        class="button-utils p-1 sp:p-2"
                        @click="openCall"
                    >
                        <img
                            src="/assets/icons/WA.llamar.svg"
                            class="size-[16px] sp:size-[32px]"
                        >
                    </div>
                    <span class="text-[9px] sp:text-sm font-bold">{{ $utils.titleCase($t('place.detail.buttoms.call')) }}</span>
                </div>
                <div
                    v-if="placeData?.url_menu"
                    class="flex flex-col space-y-1 sp:space-y-2 justify-center items-center cursor-pointer"
                >
                    <div
                        class="button-utils p-1 sp:p-2"
                        @click="openLinkMenu"
                    >
                        <img
                            src="/assets/icons/WA.MenuRestaurant.svg"
                            class="size-[16px] sp:size-[32px]"
                        >
                    </div>
                    <span class="text-[9px] sp:text-sm font-bold">{{ $utils.titleCase($t('place.detail.buttoms.menu')) }}</span>
                </div>
                <div
                    v-if="placeData?.email_wheretoeat"
                    class="flex flex-col space-y-1 sp:space-y-2 justify-center items-center cursor-pointer"
                >
                    <div
                        class="button-utils p-2"
                        @click="openEmail"
                    >
                        <img
                            src="/assets/icons/WA.mail.svg"
                            class="size-[16px] sp:size-[32px]"
                        >
                    </div>
                    <span class="text-[9px] sp:text-sm font-bold">{{ $utils.titleCase($t('place.detail.buttoms.email')) }}</span>
                </div>
            </div>
            <div
                v-if="placeData?.diet_specifications != '' && placeData?.diet_specifications"
                class="pt-[12px] sp:pt-[24px] border-t  border-[#E9E9E9] mx-2 sp:mx-4"
            >
                <div
                    class="pb-[12px] sp:pb-[24px]"
                >
                    <div class="rounded-[10px] border border-[--Border-secondary] bg-gradient-100 p-2 sp:p-4 space-y-[6px] space-y-[12px]">
                        <h2 class="text-[10px] sp:text-base font-bold lato">{{ $utils.titleCase($t('place.detail.specialRegimes')) }}</h2>
                        <ul class="space-y-1 sp:space-y-2 list-disc pl-[12px] sp:pl-[24px]">
                            <li
                                v-for="text in placeData?.diet_specifications?.split(',')"
                                class="text-[9px] sp:text-sm font-medium lato"
                            >
                                {{ text?.trim() }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div
                v-if="placeData?.datos_interes != '' && placeData?.datos_interes"
                class="border-t  border-[#E9E9E9] pt-[12px] sp:pt-[24px] mx-2 sp:mx-4"
            >
                <div
                    class="rounded-[10px] border border-[--Border-secondary] bg-gradient-100 p-2 sp:p-4 space-y-[6px] sp:space-y-[12px]"
                >
                    <h2 class="text-[10px] sp:text-base font-bold lato">{{ $utils.titleCase($t('place.detail.additionalInformation')) }}</h2>
                    <ul class="space-y-1 sp:space-y-2 list-disc pl-[12px] sp:pl-[24px]">
                        <li
                            v-for="text in placeData?.datos_interes.split(',')"
                            class="text-[9px] sp:text-sm font-medium lato"
                        >
                            {{ text?.trim() }}
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick, provide, computed } from 'vue';
import ImageSlider from '@/components/ImageSlider.vue';
import DetailPageMap from './DetailPageMap.vue';

import $utils from '@/utils/utils';

import { usePlaceStore } from '@/stores/modules/place';

import { handleToast } from "@/composables/useToast"; 
const { toastSuccess } = handleToast();

const placeStore = usePlaceStore();

const props = defineProps({
  paramsRouter: {
    type: Object,
    default: () => ({}),
  },
});

const placeData = ref(null);
const hourData = ref(null);
const isExpanded = ref(false);
const isLongDescription = ref(false);
const descriptionRef = ref(null);
const description = ref('');

// const hoursStatic = {
//     weekRanges: [
//         [
//             {
//                 "open": 360,
//                 "openHours": "06:00",
//                 "close": 1500,
//                 "closeHours": "01:00"
//             }
//         ],
//         [
//             {
//                 "open": 360,
//                 "openHours": "06:00",
//                 "close": 1440,
//                 "closeHours": "00:00"
//             }
//         ],
//         [],
//         [
//             {
//                 "open": 360,
//                 "openHours": "06:00",
//                 "close": 1440,
//                 "closeHours": "00:00"
//             }
//         ],
//         [
//             {
//                 "open": 360,
//                 "openHours": "06:00",
//                 "close": 1440,
//                 "closeHours": "00:00"
//             }
//         ],
//         [
//             {
//                 "open": 360,
//                 "openHours": "06:00",
//                 "close": 1440,
//                 "closeHours": "00:00"
//             }
//         ],
//         [
//             {
//                 "open": 360,
//                 "openHours": "06:00",
//                 "close": 1500,
//                 "closeHours": "01:00"
//             }
//         ]
//     ],
//     timezone: "Africa/Ceuta"
// }

onMounted(async () => {
  await getDataPlace();
  description.value = placeData.value?.description;
  nextTick(() => {
    checkDescriptionLength();
  });
});

const formatHours = computed(() => {
    const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const formattedHours = [];
    if (!hourData.value) return [];

    hourData.value?.forEach((dayRanges, index) => {
        const dayName = dayNames[index];
        
        if (dayRanges.length === 0) {
            formattedHours.push({day: dayName, hour: 'Cerrado'});
        } else {
            // Mapeamos cada rango de apertura y cierre
            const ranges = dayRanges.map(range => {
                let closeHour = range.closeHours;
                let openHour = range.openHours;

                // Si el cierre es "00:00", interpretarlo como "24:00"
                if (closeHour === "00:00") {
                    // closeHour = "24:00";
                }

                return `${openHour} - ${closeHour}`;
            }); // Si hay múltiples rangos, los separamos por comas

            formattedHours.push({day: dayName, hour: ranges});
        }
    }) ?? [];

    return formattedHours;
});

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

// Cargar datos del lugar
const getDataPlace = async () => {
  let response = await placeStore.$findById({ id: props.paramsRouter.id });
  placeData.value = null;
  if (response.ok) {
    placeData.value = response.data.place;
    let hours =  response.data.backupPlace?.hours;
    hours = hours ? JSON.parse(hours) : null;
    hourData.value = hours?.weekRanges ?? null;
    await nextTick();
  }
}

// Convierte las estrellas
const converStar = (value) => {
  if (!value) return 0;
  return parseFloat(value.replace(',', '.'))?.toFixed(1);
};

function openWebsite () {
    window.open(placeData.value?.web_link, '_blank', 'noopener,noreferrer');
}

function openCall () {
    window.location.href = `tel:${placeData.value?.phone_wheretoeat}`;
}

function openLinkMenu () {
    window.open(placeData.value?.url_menu, '_blank', 'noopener,noreferrer');
}

function openEmail () {
    // const mailtoLink = `mailto:${'jhjacoz96@gmail.com'}?subject=${encodeURIComponent(this.emailSubject)}&body=${encodeURIComponent(this.emailBody)}`;
    const mailtoLink = `mailto:${placeData.value?.email_wheretoeat}`;
    window.location.href = mailtoLink;
}

const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        // console.log("Texto copiado");
        toastSuccess('Copiado con éxito');
    }).catch(err => {
        console.error("Error al copiar el texto: ", err);
    });
};

provide('placeData', placeData);

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

.button-utils{
    border-radius: 360px;
    border: 1px solid #FFF;
    background: linear-gradient(105deg, #F3F3F3 0%, #FAFAFA 100%);
    box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 1px 0px rgba(0, 0, 0, 0.04);
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
