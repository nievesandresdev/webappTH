<template>
    <div class="lg:w-1/2 lg:pr-3">
        <!-- FIRST ROW -->
        <div class="flex items-center">
            <!-- tags -->
            <div class="flex items-center overflow-x-auto max-w-[132px] sp:max-w-[196px] lg:max-w-[600px]">
                <!-- tag recomendado -->
                <div v-if="placeData?.recomendations" class="mr-1 lg:mr-2">
                    <div class="tag py-1 px-2 h-6 rounded-full bg-[#FFEBCC]">
                        <p class="text-[6px] sp:text-[10px] font-medium htext-gray-500">
                            {{ $t('place.detail.recommended') }}
                        </p>
                    </div>
                </div>
                <!-- tag destacado -->
                <div v-if="placeData?.place_featured" class="mr-1 lg:mr-2">
                    <div class="tag py-1 px-2 h-6 rounded-full bg-[#FFEBCC]">
                        <p class="text-[6px] sp:text-[10px] font-medium htext-gray-500">
                            {{ $t('place.detail.featured') }}
                        </p>
                    </div>
                </div>
                <!-- tag type places -->
                <div class="hidden md:inline">
                    <div class="tag py-1 px-2 h-6 rounded-full bg-[#EBF4F9]">
                        <p class="text-[6px] sp:text-[10px] font-medium htext-gray-500">
                            {{ $t('place.types.'+slufy(placeData?.type_place?.name)) }}
                        </p>
                    </div>
                </div>
                <!-- tag categoriplace -->
                <div class="pl-1 lg:pl-2">
                    <div class="tag py-1 px-2 h-6 rounded-full bg-[#EBF4F9]">
                        <p class="text-[6px] sp:text-[10px] font-medium htext-gray-500">
                            {{ $t('place.categories.'+slufy(placeData?.category)) }}
                        </p>
                    </div>
                </div>
            </div>
            <!-- rating  mobile-->
            <div class="lg:hidden ml-auto">
                <div>
                    <img
                        v-for="(value, index) in 5"
                        :key="index"
                        :src="Math.round(converStar(placeData?.num_stars)) >= value ? url_star+'star_yellow.svg' : url_star+'star_not_filled.svg'" 
                        class="w-[10px] sp:w-[20px] lg:w-[24px] inline mr-0.5 sp:mr-1 lg:mr-2"
                    />
                </div>
                <p class="text-[8px] sp:text-xs lg:text-sm font-medium text-right mt-2">
                    {{ placeData?.num_reviews }}
                    {{ $t('place.detail.opinionsWord') }}
                </p>
            </div>
        </div>
        
        <!-- SECOND ROW -->
        <div>
            <h1 class="text-xs sp:text-lg lg:text-[22px] font-medium mt-[8px] sp:mt-4 lg:mt-6">
                {{ placeData?.title }}
            </h1>
            <div v-if="placeData?.type_place?.name == 'Dónde comer'">
                <p v-if="placeData?.range_prices || placeData?.type_cuisine" class="text-[8px] sp:text-sm mt-2.5 sp:mt-4 ">
                    <template v-if="placeData?.range_prices">
                        {{ placeData?.range_prices }} 
                    </template>
                    <template v-if="placeData?.type_cuisine">
                        , {{ placeData?.type_cuisine}}
                    </template>
                </p>
                <div class="mt-4 space-x-2 flex items-center md:justify-start mx-[-16px] lg:mx-0">
                    <button
                        v-if="placeData?.url_menu.length > 4"
                        class="md:border-r border-gray-200 text-[8px] sp:text-sm flex flex-col md:flex-row justify-center items-center w-1/4 lg:w-auto"
                        @click="openLink(place.url_menu)"
                    >
                        <Icon class="w-[16px] sp:w-[24px] h-[16px] sp:h-[24px] mr-[8px]" :fullPath="'/assets/icons/1.TH.RESTAURANT.svg'"/>
                        <span class="flex items-end hover:underline">
                            Menú
                            <Icon class="w-[4px] sp:w-[7px] mr-1" :fullPath="'/assets/icons/1.TH.LINK.svg'"/>
                        </span>
                    </button>
                    <button
                        v-if="placeData?.web_link.length > 4"
                        class="md:border-r border-gray-200 pr-[4px] sp:pr-0 lg:pr-2 text-[8px] sp:text-sm flex flex-col md:flex-row justify-center items-center w-1/4 lg:w-auto"
                        @click="openLink(placeData?.web_link)"
                    >
                        <Icon class="w-[16px] sp:w-[24px] h-[16px] sp:h-[24px]  lg:mr-[8px]" :fullPath="'/assets/icons/TH.URL.svg'"/>
                        <span class="flex items-end hover:underline">
                            Website
                            <Icon class="w-[4px] sp:w-[7px] mr-1" :fullPath="'/assets/icons/1.TH.LINK.svg'"/>
                        </span>
                    </button>
                    <a
                        :href="'tel:'+placeData?.phone_wheretoeat"
                        v-if="placeData?.phone_wheretoeat && placeData?.phone_wheretoeat !== 'None'"
                        class="md:border-r border-gray-200 pr-[4px] sp:pr-0 lg:pr-2 text-[8px] sp:text-sm flex flex-col md:flex-row justify-center items-center w-1/4 lg:w-auto"
                    >
                        <Icon class="w-[16px] sp:w-[24px] h-[16px] sp:h-[24px] mr-[8px]" :fullPath="'/assets/icons/TH.PHONE.svg'"/>
                        <span class="hidden md:inline-block hover:underline">
                            {{placeData?.phone_wheretoeat}}
                        </span>
                        <span class="inline-block md:hidden">
                            {{ $t('place.detail.callWord') }}
                        </span>
                    </a>
                    <a
                        :href="'mailto:'+placeData?.email_wheretoeat"
                        v-if="placeData?.email_wheretoeat && placeData?.email_wheretoeat !== 'None'"
                        class="md:border-r border-gray-200 pr-[4px] sp:pr-0 lg:pr-2 text-[8px] sp:text-sm flex flex-col md:flex-row justify-center items-center w-1/4 lg:w-auto"
                    >
                        <Icon class="w-[16px] sp:w-[24px] h-[16px] sp:h-[24px] mr-[8px]" :fullPath="'/assets/icons/TH.EMAIL.svg'"/>
                        <span class="flex items-end hover:underline">
                            E-mail
                            <Icon class="w-[4px] sp:w-[7px] mr-1" :fullPath="'/assets/icons/1.TH.LINK.svg'"/>
                        </span>
                    </a>

                </div>
                <div class="mt-4 border-b lg:hidden"></div>
            </div>
        </div>

        <!-- THIRD ROW --> <!-- datos de recomendacion -->
        <div>
            <h2 v-if="placeData?.recomendations" class="mt-[12px] sp:mt-6 text-[10px] sp:text-base lg:text-lg font-medium">
                {{  $t('place.detail.recommendationWord') }}
            </h2>
            <div v-if="placeData?.recomendations" class="recomender mt-[8px] sp:mt-4 p-[4px] sp:p-2 lg:p-4 flex flex-col w-full bg-white rounded-[10px]">
                <div class="flex">
                    <img 
                        class="w-[18px] sp:w-9 h-[18px] sp:h-9" 
                        src="/assets/icons/user.svg" alt="user image" 
                        style="filter: invert(70%) sepia(33%) saturate(5509%) hue-rotate(352deg) brightness(108%) contrast(110%);"

                    />
                    <div class="hgrow pl-[4px] sp:pl-2.5">
                        <p class="text-[10px] sp:text-base font-medium leading-5">
                            {{hotelStore.hotelData.name}}
                        </p>
                    </div>
                </div>
                <p class="text-[6px] sp:text-xs lg:text-sm mt-[6px] sp:mt-3 lg:mt-4">
                    {{placeData?.recomendations?.message}}
                </p>
            </div>
        </div>

        <!-- FOURTH ROW --> <!-- datos interes -->
        <div>
            <h1 class="text-[10px] sp:text-base lg:text-lg font-medium mt-[12px] sp:mt-6" v-if="placeData?.diet_specifications || placeData?.range_numeric_prices">
                {{ $t('place.detail.dataInterest.title') }}
            </h1>
            <div class="lg:flex lg:justify-between" v-if="placeData?.range_numeric_prices || placeData?.diet_specifications">
                <div class="w-[253px]" v-if="placeData?.range_numeric_prices">
                    <p class="text-[10px] sp:text-sm lg:text-base lg:font-medium mt-[8px] sp:mt-4">
                        {{ $t('place.detail.dataInterest.priceRange') }}
                    </p>
                    <ul class="list-disc" v-if="placeData?.range_numeric_prices">
                        <li class="text-[8px] sp:text-sm mt-[8px] sp:mt-2 lg:mt-4 ml-4">
                            {{ placeData?.range_numeric_prices}}
                        </li>
                    </ul>

                    <div v-if="placeData?.diet_specifications && placeData?.datos_interes.trim()">
                        <p class="text-[10px] sp:text-sm lg:text-base lg:font-medium mt-[8px] sp:mt-4">
                            {{ $t('place.detail.dataInterest.diet') }}
                        </p>
                        <ul class="list-disc">
                            <li 
                                class="text-[8px] sp:text-sm mt-[8px] sp:mt-2 lg:mt-4 ml-4"
                                v-for="diet in placeData?.diet_specifications.split(',')" :key="diet"
                            >
                                {{ diet.trim() }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="w-[253px]" v-if="placeData?.datos_interes">
                    <p class="text-[10px] sp:text-sm lg:text-base lg:font-medium mt-[8px] sp:mt-4">
                        {{ $t('place.detail.dataInterest.others') }}
                    </p>
                    <ul class="list-disc">
                        <li 
                            class="text-[8px] sp:text-sm mt-[8px] sp:mt-2 lg:mt-4 ml-4"
                            v-for="other in placeData?.datos_interes.split(',')" :key="other"
                        >
                            {{ other.trim() }}
                        </li>
                    </ul>
                </div>
                <div class="w-[253px]" v-if="placeData?.diet_specifications && !placeData?.datos_interes.trim()">
                    <p class="text-[10px] sp:text-sm lg:text-base lg:font-medium mt-[8px] sp:mt-4">
                        {{ $t('place.detail.dataInterest.diet') }}
                    </p>
                    <ul class="list-disc">
                        <li 
                            class="text-[8px] sp:text-sm mt-[8px] sp:mt-2 lg:mt-4 ml-4"
                            v-for="diet in placeData?.diet_specifications.split(',')" :key="diet"
                        >
                            {{ diet.trim() }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mt-4 border-b lg:hidden"></div>
        </div>

        <!-- FIFTH ROW --> <!-- Ubicacion -->
        <div class="mt-[12px] sp:mt-6 lg:mb-10" id="place-location">
            <h1 class="text-[10px] sp:text-base lg:text-lg font-medium">
                {{ $t('place.detail.locationWord') }}
            </h1>
            <div class="mt-[4px] sp:mt-2 lg:mt-4" id="map-wrapper">
                <div class="mx-[-16px] lg:mx-0 lg:rounded-[10px] h-[160px] lg:h-[215px]" id="location"></div>
            </div>
            <p v-if="placeData?.address" class="text-[8px] sp:text-sm font-medium lg:font-normal mt-[4px] sp:mt-2">
                <i class="fas fa-map-marker-alt mr-2"></i>{{placeData?.address}}
            </p>
        </div>

    </div>
</template>
<script setup>
    import Icon from '@/components/Icon.vue';
    import { slufy } from '@/utils/utils';
    import { useHotelStore } from '@/stores/modules/hotel';
    import { onMounted, watch  } from 'vue';
    const hotelStore = useHotelStore();

    const props = defineProps({
        placeData:{
            type:Object,
            default:{}
        }
    })
    //static
    const url_star = '/assets/icons/';

    //function
    const converStar = (value) => {
        if(!value) return 0
        return parseFloat(value.replace(",", "."))
    }
    
    const openLink = (link) => {
        link = link?.toLowerCase()
        let none = ['none', '...']
        if (!none || none.includes(link)) return;
        window.open(link, '_blank')
    }

    const createMap = () => {
        console.log('createMap',props.placeData)
        if(props.placeData){
            var script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA2pl-RXaMKbahzdX9yl0CRFc3-_fbtMog&libraries=places&callback=initMap';
            script.async = true;
            const coord = { lat: parseFloat(JSON.parse(props.placeData?.metting_point_latitude)), lng: parseFloat(JSON.parse(props.placeData?.metting_point_longitude)) }
            window.initMap = function () {
                const map = new google.maps.Map(document.getElementById("location"), {
                    center: coord,
                    zoom: 12,
                });

                const marker = new google.maps.Marker({
                    position: coord,
                    map: map,
                });

            };

            document.head.appendChild(script);
        }
    }

    watch(() => props.placeData, (newValue) => {
        if (newValue && Object.keys(newValue).length > 0) {
            createMap();
        }
    }, { immediate: true });
</script>
<style scoped>
.recomender {
    border: 1px solid #FF9C06;
    box-sizing: border-box;
}
@media (min-width: 1020px) {
    #location {
        border: 1px solid #A0A0A0;
    }
}
</style>
