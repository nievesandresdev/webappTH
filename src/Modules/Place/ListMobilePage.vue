<template>
    <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]" />
    <div class="container-fluid-list">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 lg:pt-4 w-full gap-[12px] sp:gap-6">
        
            <div class="md:col-span-2 xl:col-span-4">

                <!-- title movil -->
                <h2 class="text-[10px] sp:text-sm md:text-xl font-medium text-center lg:hidden md:hidden relative h-8 sp:h-14 py-2.5 sp:py-5">
                    <button 
                        v-if="mobileList"
                        @click="backToList" 
                        class="absolute z-40 left-2.5 sp:left-4 top-3.5 sp:top-5"
                    >
                        <img class="w-[6px] sp:w-[10px]"  src="/assets/icons/explora/back.svg"/>
                    </button>

                    Explora en

                    <span class="py-2 cursor-pointer p-0">
                        {{ $utils.capitalize(formFilter.city) }}
                    </span>
                    <div  
                        v-if="!dropdownSerchCity && !mobileList" 
                        @click="dropdownSerchCity = !dropdownSerchCity"
                        style="background-color:#f3f3f3;"
                        class="absolute z-50 rounded-full w-2.5 sp:w-6 h-2.5 sp:h-6 top-3.5 sp:top-4 right-2.5 sp:right-4"
                    >
                        <img
                        src="/assets/icons/open-menu.svg" 
                        class="w-[6px] sp:w-[10px] mx-auto py-0.5 sp:my-2"
                        >
                    </div>
                    <div class="absolute z-50 top-8 left-0 bg-white rounded-lg shadow-md w-full">
                        <SearchCityMobile
                            :open="dropdownSerchCity"
                            :language="localeCurrent" 
                            :currentCity="formFilter.city"
                            @closeModal="dropdownSerchCity = false"
                            @submitSearchCity="submitSearchCity"
                        />
                    </div>
                </h2>
                <!-- fin title movil -->

                <h4 class="mt-4 font-medium hidden md:block">0
                    lugares encontrados
                </h4>

                <!-- Filtros de movil -->
                <MenuCategory 
                    @click:changeCategory="submitFilter" 
                    :mobileList="mobileList"
                    @openModalFilter="openModalFilter"
                />

                <template v-if="mobileList">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[8px] sp:gap-4 xl:gap-6 pt-[8px] sp:pt-4 px-3.5 md:px-0 mb-[10px] mb-20 lg:mb-0">
                        <div v-for="item in placesData" :key="item.id">
                            <CardProduct place heightImg="card-img" :data="item"/>
                        </div>
                    </div>

                    <div v-if="(placesData.length > 0) && (placesData.length < paginateData?.total)" class="w-full text-center pt-[8px] sp:pt-4 px-3.5 md:px-0">
                        <button @click="loadMore()"
                            class="mx-auto text-[8px] sp:text-xs lg:text-base text-center rounded-lg py-[4px] sp:py-2 m-0 font-bold border border-dark my-[4px] sp:my-2.5 w-full md:w-64 lg:w-72">
                            Cargar más
                        </button>
                    </div>
                </template>
            </div>

        </div>
        <RatingFilter  
            ref="ratingFilter" @submitPointsFilter="submitPointsFilter" 
            :filters="formFilter"
            :countPoints="countPoints"
            v-if="mobileList"
        />
    </div>
</template>

<script setup>
    import { onMounted, ref, provide, reactive, toRefs } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { getUrlParam } from '@/utils/utils.js'
    const route = useRouter()

    // COMPONENTS
    import MenuCategory from './components/MenuCategory'
    import SearchCityMobile from './components/SearchCityMobile.vue'
    import CardProduct from '@/components/CardProduct'
    import RatingFilter from './components/RatingFilter.vue';

        // PROPS
    const props = defineProps({
        queryRouter: {
            type: Object,
            default: () => ({})
        }
    })
    const { queryRouter } = toRefs(props)

    // STORE
    import { useLocaleStore } from '@/stores/modules/locale'
    const localeStore = useLocaleStore()
    const { localeCurrent } = localeStore

    import { useHotelStore } from '@/stores/modules/hotel'
    const hotelStore = useHotelStore()
    const { hotelData } = hotelStore

    import { usePlaceStore } from '@/stores/modules/place'
    const placeStore = usePlaceStore()

    // DATA STATIC
    const innerWidth = window.innerWidth

    // DATA
    const mobileList = ref(queryRouter.value.mobile ?? false)
    const dropdownSerchCity = ref(false)
    const categoriplaces = ref([])
    const typeplaces = ref([])
    const placesData = ref([])
    const ratingFilter = ref(null);
    const countPoints = ref([])
    const formFilter = reactive({
        categoriplace: null,
        typeplace: null,
        points: [],
        search:null,
        city: null,
    })
    const paginateData = reactive({
        total: 0,
        current_page: 1,
        per_page: 1,
        last_page: 0,
        from_page: 0,
        to: 0,
    })
    const page = ref(0)

    // ONMOUNTED
    onMounted(async () => {
        await loadTypePlaces()
        loadCategoriPlaces()
        loadPlaces()
        formFilter.city = getUrlParam('city') || hotelData.zone;
        console.log('mobileList',mobileList.value)
    })

    // PROVIDER
    provide('categoriplaces', categoriplaces)
    provide('typeplaces', typeplaces)
    provide('formFilter', formFilter)
    provide('paginateData', paginateData)

    // FUNCTION
    async function loadPlaces () {
        const response = await placeStore.$apiGetAll({page: page.value,...formFilter})
        if (response.ok) {
            Object.assign(paginateData, response.data.paginate)
            page.value = paginateData.current_page
            placesData.value = [...placesData.value, ...response.data.data]
        }
    }

    async function loadTypePlaces () {
        const response = await placeStore.$apiGetTypePlaces()
        if (response.ok) {
            loadQueryInFormFilter()
            typeplaces.value = response.data
            if (!formFilter.typeplace) {
                formFilter.typeplace = typeplaces.value?.[0].id
            }
            if (!formFilter.categoriplace) {
                formFilter.categoriplace = typeplaces.value?.[0].categori_places?.[0].id  
            }
        }
    }

    async function loadCategoriPlaces () {
        const response = await placeStore.$apiGetCategoriesByType({city: formFilter.city, all: true})
        if (response.ok) {
            categoriplaces.value = response.data
        }
    }

    const getRatingCountsPlaces = async () =>{ 
        let params = {
            city : formFilter.city,
            typeplace : formFilter.typeplace,
            categoriplace : formFilter.categoriplace,
        };
        let response = await placeStore.$getRatingCountsPlaces(params);
        countPoints.value = response.ok ? response.data : [];
        console.log('countPoints.value',countPoints.value)
    }

    function submitSearchCity (city) {
        dropdownSerchCity.value = false;
        formFilter.city = city
        loadTypePlaces()
        loadCategoriPlaces()
        submitFilter()
    }

    function loadMore () {
        page.value+=1
        loadPlaces()
    }

    function loadQueryInFormFilter () {
        for (const [key, value] of Object.entries(queryRouter.value || {})) {
            if (formFilter.hasOwnProperty(key)) {
                formFilter[key] = value
            }
        }
    }

    function clearFilters () {
         const formFilterDefault = {
            categoriplace: null,
            typeplace: null,
            points: [],
            search:null,
            city: null,
        }
        Object.assign(formFilter, formFilterDefault)
        submitFilter()
    }

    function filterNonNullAndNonEmpty(obj) {
        const filteredObject = {}
        Object.keys(obj).forEach(key => {

            if (obj[key] !== null && obj[key] !== '') {
                if (Array.isArray(obj[key]) && obj[key].length > 0) {
                    filteredObject[key] = obj[key]
                }
                else if (!Array.isArray(obj[key])) {
                    filteredObject[key] = obj[key]
                }
            }
        })
        return filteredObject
    }

    function submitFilter (){
        mobileList.value = true;
        page.value = 1
        placesData.value = []
        loadPlaces()
        route.push({ name: 'PlaceList', query: {...filterNonNullAndNonEmpty(formFilter)} })
    }

    function submitPointsFilter (points) {
        formFilter.points = points
        submitFilter()
    }

    function backToList (){
        mobileList.value = false;
        page.value = 1
        placesData.value = []
        route.push({ name: 'PlaceList'})
    }

    function openModalFilter () {
        getRatingCountsPlaces();
        ratingFilter.value.open();
    }

</script>