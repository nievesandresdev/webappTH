<template>
    <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]" />
    <div id="mobile-header-list" class="mobile-header md:hidden px-3.5 mt-4">

        <div class="flex items-center w-full justify-center mb-2.5 sp:mb-4">
            <InputAutocompleteSearch />
            <button 
                class=""
                @click="openModalFilter"
            >
                <img class="inline-block md:hidden w-3.5 sp:w-6 h-3.5 sp:h-6 absolute top-3.5 sp:top-3 right-3.5 mt-2.5 mr-4" src="/assets/icons/icon-filter.svg">
            </button>
        </div>

        <!-- title,language,filters IN MOBILE-->
        <div class="mt-0 sp:mt-3.5 md:hidden flex justify-between">
            <h2 class="text-xs sp:text-lg font-medium my-auto relative w-full">
                {{ $t('experience.list-page.title') }} {{ hotelData.zone }}
            </h2>
        </div>
        <!--END title,language,filters IN MOBILE-->

    </div>

    <div class="main-desktop-list container-fluid-landing">

        <!-- desktop-list-breadcrumb -->
        <div class="desktop-list-breadcrumb mt-[40px] hidden md:block">
            <router-link to="/" class="text-sm font-medium text-gray-ao">
                Home    
            </router-link>
            <img src="/assets/icons/breadcrumbs.svg" class="inline-block w-1.5 lg:mx-2">
            <router-link to="/experiencias" class="text-sm font-medium text-gray-ao">
                {{ $t('experience.list-page.title') }} {{ hotelData.zone }}
            </router-link>
        </div>
        <!-- END desktop-list-breadcrumb -->

        <!-- desktop-list-content -->
        <div class="desktop-list-content flex mt-2 sp:mt-4 md:mt-6">
            <!-- filters list -->
            <div class="w-1/4 hidden lg:inline-block pb-10">
                <!-- filter seacrh -->
                <h3 class="lg:text-base font-medium mb-4">
                    {{ $t('experience.list-page.section-filter.label-search') }}
                </h3>
                <div class="relative">
                    <img 
                        class="lg:w-5 lg:h-5 absolute left-2.5 top-2.5"
                        src="/assets/icons/lupa.svg"
                    >
                    <input 
                        type="text"
                        class="w-full lg:h-10 lg:pl-9 text-sm hinput-primary py-[8px] px-[12px]"
                        :placeholder="$t('experience.list-page.section-filter.label-search')"
                        v-model="formFilter.search"
                        @keyup.enter="submitFilter"
                    >
                </div>
                <!-- END filter seacrh -->
                <!-- filter prices -->
                <div class="mt-6">
                    <h2 class="text-sm font-medium">
                        {{ $t('experience.list-page.section-filter.label-price') }}
                    </h2>
                    <div class="flex mt-6">
                        <div class="w-1/2 lg:pr-2">
                            <label class="lg:mb-2 text-sm">
                                {{ $t('experience.list-page.section-filter.label-price-min') }}
                            </label>
                            <div class="relative">
                                <input
                                    v-model="formFilter.price_min"
                                    @keyup.enter="submitFilter"
                                    type="number"
                                    class="w-full lg:h-8 text-sm hinput-primary py-[8px] px-[12px]"
                                    :placeholder="$t('experience.list-page.section-filter.placeholder-price-min')"
                                >
                                <p class="text-sm absolute lg:right-2.5 top-1.5  text-sm">€</p>
                            </div>
                        </div>
                        <div class="w-1/2 lg:pl-2">
                            <label class="lg:mb-2 text-sm">
                                {{ $t('experience.list-page.section-filter.label-price-max') }}
                            </label>
                            <div class="relative">
                                <input
                                    v-model="formFilter.price_max"
                                    type="number"
                                    @keyup.enter="submitFilter"
                                    class="w-full lg:h-8 text-sm hinput-primary  py-[8px] px-[12px]"
                                    :placeholder="$t('experience.list-page.section-filter.placeholder-price-max')"
                                >
                                <p class="text-sm absolute lg:right-2.5 top-1.5  text-sm">€</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END filter prices -->
                <!-- duration filter -->
                <div class="lg:mt-6">
                    <h2 class="text-sm font-medium mb-4">
                        {{ $t('experience.list-page.section-filter.label-duration') }}
                    </h2>
                    <div
                        v-for="(dur, index) in durationList" :key="dur.id"
                        class="flex justify-between"
                        :class="{'mb-2': index != (durationList.length - 1)}"
                    >
                        <span class="flex items-center">
                            <input
                                v-model="formFilter.duration"
                                @change="submitFilter"
                                :value="dur.id" type="checkbox"
                                class="inline-block rounded  lg:mr-2 h-5 w-5"
                                :checked="formFilter.duration.includes(dur.id)"
                            >
                            <label class="text-sm mb-0">
                                {{dur.name[$i18n.locale]}}
                            </label>
                        </span>
                        <span class="inline-block text-sm">{{numbersByFilterDuration?.duration?.[dur.id]?.['count']}}</span>
                    </div>
                </div>
            </div>
            <!-- END filters list -->

            <!-- content list container-->
            <div class="w-full lg:w-3/4 lg:pl-6 pb-8 md:pb-10">

                <!-- tablet filters button -->
                <button 
                    class="w-full h-10 rounded-lg border border-dark text-center text-sm font-medium mt-6 hidden md:block lg:hidden"
                >
                    <img src="/assets/icons/filters-platform.svg" class="mr-2.5 inline w-5">
                    {{ $t('experience.list-page.btn-more-filter') }}
                </button>
                <!-- END tablet filters button -->

                                <!-- title section-->
                <div class="mt-6 lg:mt-0 hidden md:flex justify-between lg:block">
                    <div v-if="innerWidth > 700" class="relative">
                        <THSearchCity
                            right
                            :open="dropdownSerchCity"
                            @update:open="dropdownSerchCity = $event"
                            :data="formFilter"
                            :endpoint="'activities.list'"
                            @submitSearchCity="submitSearchCity($event)"
                        >
                            <template v-slot:button>
                                <button class="text-lg lg:text-[22px] font-medium my-auto hbtn-primary plain cursor-pointer" @click="dropdownSerchCity = !dropdownSerchCity">
                                    {{ $t('experience.list-page.title') }}
                                    
                                    <span class="py-2 p-0 " id="listCity">{{ formFilter.city || hotelData.zone }}  
                                        <img
                                            :src="`/assets/icons/${!dropdownSerchCity ? '1.TH.I.DROPDOWN.svg' : '1.TH.I.DROPDOWN.OPEN.svg'}`" alt="icon_close"
                                            class="w-4 h-4 ml-1 inline-block"
                                        >
                                    </span>
                                </button>
                            </template>
                        </THSearchCity>
                    </div>
                </div>
                <!-- END title section-->

                                <!-- info filter active-->
                <div v-if="filterActive" class="flex md:mt-6 items-center relative mb-4 md:mb-0 h-auto" :class="{'md:pl-5':widthSon > widthFather}">
                    <!-- slider icons-->
                    <template v-if="widthSon > widthFather">
                        <img  
                            class="absolute z-30 cursor-pointer left-0" src="/assets/icons/left_carusel.svg"
                            @click="()=> containerFilter.scrollLeft = 0"
                        >
                        <img  
                            class="absolute z-30 cursor-pointer right-0" src="/assets/icons/right_carusel.svg"
                            @click="()=> containerFilter.scrollLeft = 200"
                        >
                    </template>
                    <!--end slider icons-->

                     <!-- id="container-filters" -->
                    <div  class="flex items-center overflow-x-auto px-0 w-full">
                        <div class="flex">
                            <!-- price tag filter-->
                            <div
                                v-if="formFilter.price_min || formFilter.price_max"
                                class="h-8 text-sm font-medium relative pl-2 md:pl-4 pr-6 md:pr-7 border border-dark rounded-lg inline-block whitespace-nowrap py-1.5 mr-2 hbtn-primary"
                            >
                                {{ $t('experience.list-page.section-filter-history.btn-price', {price_min: `${formFilter.price_min}€`, price_max: `${formFilter.price_max}€` }) }}
                                <img 
                                    class="w-4 h-4 absolute right-1.5 top-2 cursor-pointer" 
                                    src="/assets/icons/1.TH.CLOSE.svg"
                                    @click="()=>{formFilter.price_min= null; formFilter.price_max= null; submitFilter()}"
                                >
                            </div>
                            <!--END price tag filter-->

                            <!-- DURATION tag filter-->
                            <div
                                v-for="duration in formFilter.duration" :key="duration"
                                class="h-8 text-sm font-medium relative pl-2 md:pl-4 pr-6 md:pr-7 border border-dark rounded-lg inline-block whitespace-nowrap py-1.5 mr-2 hbtn-primary"
                            >   
                                {{ durationList.find(item => item.id == duration).name[$i18n.locale] }}
                                <img 
                                    class="w-4 h-4 absolute right-1.5 top-2 cursor-pointer" 
                                    src="/assets/icons/1.TH.CLOSE.svg"
                                    @click="()=>{formFilter.duration = formFilter.duration.filter(dur=> dur !== duration); submitFilter()}"
                                >
                            </div>
                            <!-- END duration tag filter-->
                            
                            <div
                                v-if="formFilter.search"
                                class="h-8 text-sm font-medium relative pl-2 md:pl-4 pr-6 md:pr-7 border border-dark rounded-lg inline-block whitespace-nowrap py-1.5 hbtn-primary"
                            >   
                                {{ formFilter.search }}
                                <img 
                                    class="w-4 h-4 absolute right-1.5 top-2 cursor-pointer" 
                                    src="/assets/icons/1.TH.CLOSE.svg"
                                    @click="()=>{ formFilter.search = ''; submitFilter()}"
                                >
                            </div>
                            <!--END seatch filter-->
                        </div>
                        <button 
                            v-if="filterActive" 
                            class="text-sm font-medium underline px-3"
                            @click="clearFilters"
                        >
                            {{ $t('experience.list-page.section-filter-history.btn-close') }}
                        </button>
                    </div>
                </div>
                <!-- END info filter active-->
                
                <h3 v-if="experiencesData.length > 0" class="hidden md:block text-base lg:text-sm font-medium md:mt-4 lg:mt-6 mb-4">
                    {{ paginateData?.total }}
                    {{ $t('experience.list-page.text-count-list') }}
                </h3>

                <h3 v-if="experiencesData.length > 0" class="md:hidden text-[10px] sp:text-base font-medium mb-4">
                    {{ $t('experience.list-page.text-count-list-mobile', {count: paginateData?.total}) }}
                </h3>

                <!--CARDS -->
                <div v-if="experiencesData.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 lg:gap-6" style="max-width:954px;">
                    <template v-for="(item, index) in experiencesData" :key="item.id">
                            <p 
                                v-if="experiencesData[index-1]?.city_experince == hotelData.zone && hotelData.zone !== item.city_experince"
                                class="pt-4 text-[10px] sp:text-base font-medium hborder-top-gray-400"
                            >
                            {{countOtherCities}} experiencias cerca de {{ hotelData.zone }}
                            </p> 
                            <div style="card-exp">
                                    <!-- :distance="item.city_experince !== hotelData.zone ? item.distance : null" -->
                                <CardExperience 
                                    :data="item" 
                                    :truncateTitle="false"
                                    :distance="item.distance"
                                />
                            </div>
                    </template>
                </div>
                <!-- END  CARDS -->

                <h2 v-if="experiencesData.length <= 0" class="text-[22px] mt-4">
                    {{ $t('experience.list-page.without-results.title') }}
                </h2>

                <h5 v-if="experiencesData.length <= 0" class="text-sm mt-4" style="max-width:954px;">
                    {{ $t('experience.list-page.without-results.text') }}
                </h5>

                <!--load more -->
                <div v-if="(experiencesData.length > 0) && (experiencesData.length < paginateData?.total)" class="w-full mt-4 lg:mt-6 grid grid-cols-1 lg:grid-cols-3 lg:gap-4 justify-items-center" style="max-width:954px;">
                    <button class="w-full invisible hidden lg:block">
                        cargar mas
                    </button>
                    <button @click="loadMore()" class="text-sm font-medium text-center rounded-lg py-2 m-0 border border-black  w-full md:w-72 lg:w-full">
                        {{ $t('experience.list-page.btn-load-more') }}
                    </button>
                </div>
                <!-- END  load more -->

            </div>
            <!-- END content list container -->


        </div>
        <!-- END desktop-list-content -->

        <FormFilterMobile
            @submit:filter="submitFilter"
            @click:clearFilters="clearFilters"
            @click:close="closeModalFilter"
        />


    </div>
</template>

<script setup>
    import { ref, reactive, onMounted, inject, watch, toRefs, computed, provide } from 'vue'
    import { useRouter } from 'vue-router'
    const route = useRouter()

    // COMPONENTS
    import FormFilterMobile from './components/FormFilterMobile'
    import THSearchCity from '@/components/THSearchCity'
    import CardExperience from '@/components/CardExperience'
    import InputAutocompleteSearch from '@/components/InputAutocompleteSearch'

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

    import { useExperienceStore } from '@/stores/modules/experience'
    const experienceStore = useExperienceStore()
    
    import { useCityStore } from '@/stores/modules/city'
    const cityStore = useCityStore()


    // DATA STATIC
    const durationList = [
        {id:'1',name:{en:"Up to one hour",es:"Hasta una hora",fr:"Jusqu'à une heur"}},
        {id:'2',name:{en:"Between 1 and 3 hours",es:"Entre 1 y 3 horas",fr:"Entre 1 et 3 heuresr"}},
        {id:'3',name:{en:"Midi",es:"Medio día",fr:"Midday"}},
        {id:'4',name:{en:"Complete day",es:"Día completo",fr:"Jour complet"}}
    ]
    const innerWidth = window.innerWidth

    // DATA
    const modalFilter = ref(false)
    const dropdownSerchCity = ref(false)
    const nearCitiesData = ref([])
    const formFilterCity = reactive({
        city: ''
    })
    const formFilter = reactive({
        price_min: null,
        price_max: null,
        duration: [],
        search:null,
        city: null,
    })
    const countDuration = ref([])
    const experiencesData = ref([])
    const paginateData = reactive({
        total: 0,
        current_page: 1,
        per_page: 1,
        last_page: 0,
        from_page: 0,
        to: 0,
    })
    const page = ref(1)
    const experiencesCount = ref(0)
    const countOtherCities = ref(0)
    const containerFilter = ref(null)
    const numbersByFilterDuration = ref(null)

    //PROVIDE
    provide('formFilter', formFilter)
    provide('durationList', durationList)
    provide('numbersByFilterDuration', numbersByFilterDuration)
    provide('modalFilter', modalFilter)

    // ONMOUNTED
    onMounted(() => {
        containerFilter.value = document.getElementById('container-filters');

        loadQueryInFormFilter()
        loadExperiences()
        loadNumbersByFilters()
    })

    // WATCH
    watch(() => route.query, (newQuery) => {
    }, { immediate: true })

    // COMPUTED
    const filterActive = computed(() => {
        for (const key in queryRouter.value) {
            if (
                ['price_min', 'price_max', 'duration', 'search'].includes(key) &&
                ((queryRouter.value[key] != '' && queryRouter.value[key] != null) || (Array.isArray(queryRouter.value[key]) && queryRouter.value[key].length > 0))
              ) {
                return true
            }
        }
        return false
    })
    
    const widthFather = computed(() => (document.getElementById('container-filters')?.offsetWidth))
    const widthSon = computed(() => (document.getElementById('container-filters-child')?.offsetWidth))

    // FUNCTION
    async function loadNumbersByFilters () {
        const response = await experienceStore.$apiGetNumbersByFilters(formFilter)
        if (response.ok) {
            numbersByFilterDuration.value = response.data
        }
    }

    async function loadExperiences () {
        console.log(formFilter, 'formFilter')
        const response = await experienceStore.$apiGetAll({page: page.value,...formFilter})
        if (response.ok) {
            Object.assign(paginateData, response.data.experiences.paginate)
            page.value = paginateData.current_page
            experiencesData.value = [...experiencesData.value, ...response.data.experiences.data]
            countOtherCities.value = response.data.countOtherCities;
        }

        const cities = await cityStore.$getNearCitiesData()
        if(cities.ok){
            nearCitiesData.value = cities.data;
            console.log('nearCitiesData.value',nearCitiesData.value)
        }
    }
    function submitSearchCity (city) {
        formFilter.city = city
        submitFilter()
    }
    function loadMore () {
        page.value+=1
        // console.log(page.value, 'loadMore')
        loadExperiences()
    }
    function submitFilter (){
        route.push({ name: 'ExperienceList', query: {...filterNonNullAndNonEmpty(formFilter)} })
        page.value = 1
        experiencesData.value = []
        closeModalFilter()
        loadNumbersByFilters()
        loadExperiences()
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

    function loadQueryInFormFilter () {
        for (const [key, value] of Object.entries(queryRouter.value || {})) {
            if (formFilter.hasOwnProperty(key)) {
                formFilter[key] = value
            }
        }
        // console.log(formFilter, 'loadQueryInForm')
    }

    function clearFilters () {
         const formFilterDefault = {
            price_min: null,
            price_max: null,
            duration: [],
            search:null,
            city: null,
        }
        Object.assign(formFilter, formFilterDefault)
        submitFilter()
    }

    function openModalFilter () {
        modalFilter.value = true
    }

    function closeModalFilter () {
        modalFilter.value = false
    }

</script>