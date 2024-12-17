<template>
    <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]" />
    <section class="container-fluid-landing pr-mobile-0">
        <!-- desktop-list-breadcrumb -->
        <div class="desktop-list-breadcrumb my-6 hidden md:block">
            <router-link :to="{name:'Home'}" class="text-sm font-medium htext-gray-500">Home</router-link>
            <img src="/assets/icons/stroke.svg" class="inline mx-1">
            <router-link :to="{name:'FacilityList'}" class="text-sm font-medium htext-gray-500">
                {{ $t('facility.facilitiesWord') }}
            </router-link>
            <img src="/assets/icons/stroke.svg" class="inline mx-1">
            <span class="text-sm font-medium htext-gray-500" v-html="$utils.capitalize(facility?.title)">
            </span>
        </div>
        <section>
            <div class="flex justify-between items-center mb-6 hidden lg:flex"> 
                <h2 class="text-xs sp:text-base lg:text-[22px] font-medium">
                    {{ $utils.capitalize(facility?.title) }}
                </h2>
            </div>
            <div class="mt-4 hidden lg:flex">
                <div class="w-[60%] pr-8">
                    <p class="text-sm">{{ facility?.description }}</p>
                    <section v-if="facility?.schedule">
                        <div class="flex justify-between items-center mt-6"> 
                            <h2 class="text-base lg:text-lg font-medium">
                                {{ $t('facility.horaryWord') }}
                            </h2>
                        </div>
                        <p
                            v-html="facility?.schedule"
                            class="text-[10px] sp:text-sm mt-4"
                        >
                        </p>
                    </section>
                </div>
                <div v-if="facility?.images?.length > 0" class="w-[40%]" id="carousel-facility">
                    <Carousel v-model="currentSlide" :settings="settings_cross" :breakpoints="breakpoints">
                        <Slide v-for="(item, index) in facility?.images" :key="index">
                            <div class="relative h-[295px] w-full lg:w-[510px]">
                                <img 
                                    :src="facilityStore.$loadImage(item?.images?.[0])" alt="img"
                                    class="w-full h-full object-cover rounded-lg"
                                >
                            </div>
                        </Slide>
                        <template #addons v-if="facility?.images?.length > 1">
                            <Navigation />
                            <Pagination />
                        </template>
                    </Carousel> 
                </div>
            </div>
        </section>
    </section>
    <!-- content movil -->
    <div class="lg:hidden mb-20">
        <router-link :to="{name:'FacilityList'}" class="fixed flex z-20 mt-3 ml-3">
            <div class="div-back h-[18px] w-[18px] sp:h-6 sp:w-6 bg-white rounded-full pt-1 pl-1">
                <img class="w-2.5 sp:w-4" src="/assets/icons/arrow-back.svg">
            </div>
        </router-link>
        <div class="w-full mb-[16px] sp:mb-[24px]" id="carousel-facility-movil">
            
            <Carousel v-model="currentSlide" :settings="settings_cross" :breakpoints="breakpoints">
                <Slide v-for="(item, index) in facility?.images" :key="index">
                    <div class="relative h-[190px] sp:h-[295px] w-full">
                        <img 
                            :src="facilityStore.$loadImage(item)" alt="img"
                            class=" w-full h-full"
                        >
                    </div>
                </Slide>
                <template #addons>
                    <Pagination />
                </template>
            </Carousel> 
        </div>
        <div class="px-4" :class="facility?.images?.length == 0 ? 'mt-10' : ''">
            <div class="mb-2.5 sp:mb-6">
                <h2 
                    class="text-xs sp:text-base lg:text-[22px] font-medium mb-1.5 sp:mb-4"
                    v-html="facility?.title"
                ></h2>
                <div class="justify">
                    <p class="text-[10px] sp:text-sm" v-html="facility?.description">
                    </p>
                </div>
            </div>
            <div v-if="facility?.schedule" class="flex justify-between items-center"> 
                <h2 class="text-xs sp:text-base lg:text-lg font-medium mb-1.5 sp:mb-4">
                    {{ $t('facility.horaryWord') }}
                </h2>
            </div>
            <!-- <div v-if="facility?.schedules" class="row">
                <div class="col-12 justify">
                    <p
                        v-html="facility?.schedules"
                        class="text-[10px] sp:text-sm"
                    >
                    </p>
                </div>
            </div> -->
            <div v-if="facility?.schedules" class="row">
                <div class="col-12">
                    <p v-for="(schedule, index) in activeWeekdays" :key="index" class="text-[10px] sp:text-sm">
                        {{ schedule.name }} {{ schedule.times[0].start }} - {{ schedule.times[0].end }}
                    </p>
                </div>
            </div>

        </div>
        
    </div>
</template>

<script setup>    
    import { Carousel, Pagination, Slide, Navigation } from 'vue3-carousel'
    import { ref, onMounted, toRefs } from 'vue'
    import 'vue3-carousel/dist/carousel.css';
    import { useFacilityStore } from '@/stores/modules/facility.js'
    
    const props = defineProps({
        paramsRouter: {
            type: Object,
            default: () => ({})
        }
    })
    const { paramsRouter } = toRefs(props)

    const currentSlide = ref(0);
    const facility = ref(null);
    const facilityStore = useFacilityStore();
    const activeWeekdays = ref([]);


    onMounted(() => {
        getFacility();
    })

    const getFacility = async () => {
        // console.log('getFacility',paramsRouter.value.id)
        let response = await facilityStore.$findById(paramsRouter.value.id);
        // console.log('getFacility',response)
        facility.value = response;

        // Procesar el JSON de schedules y filtrar los días activos de lunes a viernes
        const schedules = JSON.parse(facility.value.schedules);

        activeWeekdays.value = schedules.filter(day => {
            return day.active;
        });
    }

    const getImg = (payload) => {
        if (payload?.url) return `${urlStorage}/storage/facility${payload.url}`
        return null
    }

    //static
    const settings_cross = {
        itemsToShow: 1,
        snapAlign: 'start',
    }
    const breakpoints = {
        700: {
            itemsToShow: 1,
            snapAlign: 'start',
        },
        1024: {
            itemsToShow: 1,
            snapAlign: 'start',
        },
    }
    const urlStorage = process.env.VUE_APP_STORAGE_URL;
    
</script>
    
<style lang="scss" scoped>
.carousel__pagination {        
    position: absolute;
    left: 0;
    right: 0;
}
#carousel-facility .carousel__pagination {        
    top: 15rem;
}
#carousel-facility-movil .carousel__pagination {        
    bottom: 16px;
}
</style>
