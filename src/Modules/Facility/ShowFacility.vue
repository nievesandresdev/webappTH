<template>
    <div class="bg-[#FAFAFA] mb-[48px]">
        <ImageSlider :images="facility?.images?.map(item=> facilityStore.$loadImage(item,hotelData.image))" :imgDefault="hotelData?.image"  showButtonBack />
        <div v-if="facility.ad_tag"  class="absolute top-[325px] mockup:top-[180px] right-4 mockup:right-2 flex items-center justify-center gap-1 px-2 py-1 bg-[#FAFAFA] border border-white shadow-lg rounded-[18px]" style="box-shadow: 0px 0.5px 4px rgba(0, 0, 0, 0.12), 0px 6px 13px rgba(0, 0, 0, 0.12);">
            <p class="text-[12px] font-bold lato text-[#333] uppercase mockup:text-[8px]">{{ facility.ad_tag }}</p>
        </div>
        
        <div class="flex flex-col mt-4 px-4">
            <h1 class="lato text-[18px] font-bold text-[#333] mockup:text-[15px]">
                {{ facility.title }}
            </h1>
            <p v-show="facility.description" :class="isExpanded ? 'text-sm font-normal lato text-[#333] mt-2' : 'text-sm font-normal lato text-[#333] truncate-description mt-2'">
                {{ facility.description }}
            </p>

            <p v-if="facility?.description?.length > CHARACTER_LIMIT" @click="isExpanded = !isExpanded" class="text-[14px] font-bold lato underline text-[#333] mt-3 text-right cursor-pointer">
                {{ isExpanded ? 'Ver menos' : 'Ver más' }}
            </p>

            <div  class="flex flex-col w-full p-4 gap-4 border border-[#E9E9E9] rounded-[10px] bg-gradient-h mt-4">
                <p class="lato text-[#333] text-[16px] font-bold mockup:text-[14px]">Horarios</p>
                <p v-if="facility.always_open" class="lato text-sm font-bold">Abierto todos los días las 24hs</p>
                
                <template v-else-if="activeWeekdays.length">
                    <!-- horarios -->
                    <div class="flex flex-col">
                        <div v-for="(day, index) in activeWeekdays" :key="index">
                            <div class="flex justify-between items-center text-sm text-[#333] py-2">
                                <p class="font-bold lato">{{ day.name }}</p>
                                <div class="flex gap-4">
                                    <span v-for="(time, timeIndex) in day.times" :key="timeIndex" class="lato">
                                        {{ time.start }} - {{ time.end }}
                                    </span>
                                </div>
                            </div>
                            <hr v-if="index < activeWeekdays.length - 1" class="border-t border-[#E9E9E9] mt-3 mb-3" />
                        </div>
                    </div>
                </template>

                <p v-else class="lato text-sm font-bold">Sin horarios especificados. Consulta vía chat.</p>
            </div>
            
        </div>
    </div>
</template>

<script setup>
    import { onMounted, defineProps, ref,computed } from 'vue';
    import ImageSlider from '@/components/ImageSlider.vue';
    import { useFacilityStore } from '@/stores/modules/facility.js';
    import { useHotelStore } from '@/stores/modules/hotel';

    const hotelStore = useHotelStore();

    const hotelData = computed(() => hotelStore.hotelData);

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

    onMounted(() => {
        getFacility();
    });

    const getFacility = async () => {
        let response = await facilityStore.$findById(props.id);
        facility.value = response;

        const schedules = facility.value.schedules ? JSON.parse(facility.value.schedules) : [];

        activeWeekdays.value = schedules.filter(day => day.active);

    };
</script>
