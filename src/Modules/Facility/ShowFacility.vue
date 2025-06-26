<template>

    <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]" />

        <PageTransitionGlobal module="facility" name="facility_detail" component-name="SkeletomDetail">

            <div class="bg-[#FAFAFA] mb-[48px]">
                <ImageSlider 
                    :images="facility?.images?.map(item=> facilityStore.$loadImage(item,hotelData.image))" 
                    :imgDefault="hotelData?.image"  
                    showButtonBack 
                    :from="'facility'" 
                    showButtonShared 
                    :nameShared="facility.title"
                    :typeShared="hotelData.type" 
                    :msgShared="msgShared"
                />
                    <!-- v-if="facility.ad_tag" -->
                <div
                    v-if="facility.ad_tag"
                    class="absolute top-[180px] sp:top-[325px] right-2 sp:right-4 flex items-center justify-center gap-0.5 sp:gap-1 px-1 sp:px-2 py-0.5 sp:py-1 bg-[#FAFAFA] border border-white shadow-lg rounded-[10px] sp:rounded-[18px]" style="box-shadow: 0px 0.5px 4px rgba(0, 0, 0, 0.12), 0px 6px 13px rgba(0, 0, 0, 0.12);"
                >
                    <p class="text-[7px] sp:text-[12px] font-bold lato text-[#333] uppercase">{{ facility.ad_tag }}</p>
                </div>
                
                <div class="flex flex-col mt-2 sp:mt-4 px-2 sp:px-4">
                    <h1 class="lato text-[12px] sp:text-[18px] font-bold text-[#333] ">
                        {{ facility.title }}
                    </h1>
                    <!-- v-if="description" -->
                    <div
                    >
                        <p
                            ref="descriptionRef"
                            class="description text-[8px] sp:text-sm font-normal lato text-[#333] mt-1 sp:mt-2"
                            :class="{ expanded: isExpanded }"
                        >
                            {{ description }}
                        </p>
                        <p
                            v-if="isLongDescription"
                            class="text-[7px] sp:text-[14px] font-bold lato underline text-[#333] mt-1.5 sp:mt-3 text-right cursor-pointer"
                            @click="toggleDescription"
                        >
                            {{ isExpanded ? 'Ver menos' : 'Ver más' }}
                        </p>
                        
                        <button
                            :disabled="$utils.isMockup()"
                            v-if="facility.text_document_button && facility.document != 'no_add_document'"
                            class="w-full lato flex justify-center items-center h-8 sp:h-10 sp:px-4 px-1 py-2 gap-2 rounded-[10px] border border-white text-white sp:text-sm text-[12px] font-bold hshadow-button mt-4"
                            :style="{backgroundColor: chainStore.$bgColor0}"
                            @click="downloadDocument(facility)"
                        >
                            {{ facility.text_document_button }}
                        </button>
                    </div>

                    <div  class="flex flex-col w-full p-2 sp:p-4 gap-2 sp:gap-4 border border-[#E9E9E9] rounded-[10px] bg-gradient-h mt-2 sp:mt-4">
                        <p class="lato text-[#333] text-[10px] sp:text-[16px] font-bold">{{ $t('facility.detailPage.sectionSchedules.title') }}</p>
                        <p v-if="facility.always_open" class="lato text-[8px] sp:text-sm font-bold">{{ $t('facility.detailPage.sectionSchedules.openAlways') }}</p>
                        
                        <template v-else-if="activeWeekdays.length">
                            
                            <!-- horarios -->
                            <div class="flex flex-col">
                                <div v-for="(day, index) in activeWeekdays" :key="index">
                                    <div class="flex justify-between items-center text-[8px] sp:text-sm text-[#333] py-1 sp:py-2">
                                        <p class="text-[10px] sp:text-[16px] font-bold lato">{{ $t(`facility.detailPage.sectionSchedules.days.${day.name}`) }}</p>
                                        <div class="flex gap-2 sp:gap-4">
                                            <span v-for="(time, timeIndex) in day.times" :key="timeIndex" class="lato">
                                                {{ time.start }} - {{ time.end }}
                                            </span>
                                        </div>
                                    </div>
                                    <hr v-if="index < activeWeekdays.length - 1" class="border-t border-[#E9E9E9] my-1.5 sp:my-3" />
                                </div>
                            </div>
                        </template>

                        <p v-else class="lato text-[8px] sp:text-sm font-bold">{{ $t('facility.detailPage.sectionSchedules.empty') }}</p>
                    </div>
                    
                </div>
            </div>

        </PageTransitionGlobal>

</template>

<script setup>
    import { onMounted, defineProps, ref, computed, nextTick } from 'vue';
    import ImageSlider from '@/components/ImageSlider.vue';
    import PageTransitionGlobal from "@/components/PageTransitionGlobal.vue";
    import { useFacilityStore } from '@/stores/modules/facility.js';
    import { useHotelStore } from '@/stores/modules/hotel';
    import { useI18n } from 'vue-i18n';
    import { useHead } from '@vueuse/head';
    import { useChainStore } from '@/stores/modules/chain';

    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;
    const { t: $t } = useI18n();
    const chainStore = useChainStore();

    //useHead
    useHead({
        title: 'Instalaciones',
        meta: [
            { name: 'description', content: 'Instalaciones' }
        ]
    });

    import { SECTIONS } from "@/constants/sections.js";
    import { useLoadingSections } from "@/composables/useLoadingSections";
    const { startLoading, stopLoading } = useLoadingSections();

    const descriptionRef = ref(null);
    const description = ref('');
    const isLongDescription = ref(false);

    const hotelStore = useHotelStore();

    const hotelData = computed(() => hotelStore.hotelData);

    const msgShared = computed(() => {
        return $t('facility.detailPage.share.message', { type: hotelData.value.type });
    });

    const facilityStore = useFacilityStore();

    const props = defineProps({
        id: {
            type: String,
            required: true
        }
    });

    const CHARACTER_LIMIT = 210;

    const facility = ref({});
    const activeWeekdays = ref([]);

    const isExpanded = ref(false);

    startLoading(SECTIONS.FACILITY.DETAIL);
    onMounted(() => {
        getFacility();
    });

    const getFacility = async () => {
        let response = await facilityStore.$findById(props.id);
        facility.value = response;

        description.value = facility.value.description;
        // description.value = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.';

        const schedules = facility.value.schedules ? JSON.parse(facility.value.schedules) : [];

        activeWeekdays.value = schedules.filter(day => day.active);
        stopLoading(SECTIONS.FACILITY.DETAIL);
        await nextTick();
        checkDescriptionLength();  
    };

    function checkDescriptionLength() {
        setTimeout(() => {
            if (!descriptionRef.value) return;
            const descriptionElement = descriptionRef.value;
            isLongDescription.value = descriptionElement.scrollHeight > descriptionElement.clientHeight;
        }, 400);
    }

    const toggleDescription = () => {
        isExpanded.value = !isExpanded.value;
    }

    const formatDocument = (url) => {
        if (!url) return '';
        if (url.includes('https://')) return url; // Si es una URL completa, la retornamos tal cual
        return `${URL_STORAGE}/storage/facility_documents/${url}`; // Si no, construimos la ruta al documento
    }

    const downloadDocument = (facility) => {
        if (facility.document === 'link_document') {
            window.open(facility.link_document_url, '_blank');
        }
        if (facility.document === 'upload_file') {
            const documentUrl = formatDocument(facility.file_document_url);
            window.open(documentUrl, '_blank');
        }
    }
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

</style>