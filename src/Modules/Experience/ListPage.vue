<template>
    <!-- <div v-if="mockup" class="fixed top-0 left-0 w-screen h-full z-[2000]" /> -->
    <div id="mobile-header-list" class="mobile-header md:hidden px-3.5 mt-4">

        <div class="flex items-center w-full justify-center mb-2.5 sp:mb-4">
            <InputSearch />
            <button 
                class=""
                data-toggle="modal" data-target="#filtersmobile"
            >
                <img class="inline-block md:hidden w-3.5 sp:w-4 h-3.5 sp:h-4 absolute top-3.5 sp:top-4 right-3.5 mt-2.5 mr-4" src="/assets/icons/icon-filter.svg">
            </button>
        </div>

        <!-- title,language,filters IN MOBILE-->
        <div class="mt-0 sp:mt-3.5 md:hidden flex justify-between">
            <h2 class="text-xs sp:text-lg font-medium my-auto relative w-full">
                {{ $t('experience.list-page.section-filter.title') }}
                <template v-if="innerWidth <= 700">
                    <THSearchCity
                        right
                        :open="dropdownSerchCity"
                        @update:open="dropdownSerchCity = $event"
                        :data="formFilter"
                        :endpoint="'activities.list'"
                        @submitSearchCity="submitSearchCity($event)"
                    >
                        <template v-slot:button>
                            <span class="py-2 cursor-pointer p-0 inline-block" id="listCity" @click="dropdownSerchCity = !dropdownSerchCity">
                                {{formFilterCity.city}}
                                <img
                                    :src="`/assets/icons/${!dropdownSerchCity ? '1.TH.I.DROPDOWN.svg' : '1.TH.I.DROPDOWN.OPEN.svg'}`" alt="icon_close"
                                    class="w-4 h-4 ml-1 inline-block"
                                >
                            </span>
                        </template>
                    </THSearchCity>
                </template>
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
                                {{dur.name[localeCurrent]}}
                            </label>
                        </span>
                        <span class="inline-block text-sm">{{countDuration?.[dur.id]?.['count']}}</span>
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
                                <button class="text-lg lg:text-[22px] font-medium my-auto hbtn-primary plain cursor-pointer" @click="dropdownSerchCity">
                                    {{ $t('experience.list-page.title') }}
                                    
                                    <span class="py-2 p-0 " id="listCity">{{formFilter.city}}  
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
                
                <h3 v-if="experiencesData.length > 0" class="hidden md:block text-base lg:text-sm font-medium md:mt-4 lg:mt-6 mb-4">
                    {{ paginateData?.total }}
                    {{ $t('experience.list-page.text-count-list') }}
                </h3>

                <h3 v-if="experiencesData.length > 0" class="md:hidden text-[10px] sp:text-base font-medium mb-4">
                    {{ $t('experience.list-page.text-count-list-mobile', {count: paginateData?.total}) }}
                </h3>

                <!--CARDS -->
                <div v-if="experiencesData.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 lg:gap-6" style="max-width:954px;">
                    <template v-for="item in experiencesData" :key="item.id">
                            <div style="card-exp">
                                <CardExperience :data="item" />
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
                <div v-if="experiencesData.length < paginateData?.total" class="w-full mt-4 lg:mt-6 grid grid-cols-1 lg:grid-cols-3 lg:gap-4 justify-items-center" style="max-width:954px;">
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

    </div>
</template>

<script setup>
    import { ref, reactive, onMounted } from 'vue';

    // COMPONENTS
    import THSearchCity from './components/THSearchCity'
    import CardExperience from '@/components/CardExperience'

    // STORE
    import { useLocaleStore } from '@/stores/modules/locale'
    const localeStore = useLocaleStore()
    const { localeCurrent } = localeStore

    import { useHotelStore } from '@/stores/modules/hotel'
    const hotelStore = useHotelStore()
    const { hotelData } = hotelStore

    import { useExperienceStore } from '@/stores/modules/experience'
    const experienceStore = useExperienceStore()

    // DATA STATIC
    const durationList = [
        {id:'1',name:{en:"Up to one hour",es:"Hasta una hora",fr:"Jusqu'à une heur"}},
        {id:'2',name:{en:"Between 1 and 3 hours",es:"Entre 1 y 3 horas",fr:"Entre 1 et 3 heuresr"}},
        {id:'3',name:{en:"Midi",es:"Medio día",fr:"Midday"}},
        {id:'4',name:{en:"Complete day",es:"Día completo",fr:"Jour complet"}}
    ]
    const innerWidth = window.innerWidth

    // DATA
    const dropdownSerchCity = ref(false)
    const formFilterCity = reactive({
        city: ''
    })
    const formFilter = reactive({
        page: 1,
        price_min: null,
        price_max: null,
        duration: [],
        load_more: null,
        search:null,
        city: null,
    })
    const countDuration = ref([])
    const experiencesData = ref([])
    const paginateData = reactive({
        total: 0,
        current_page: 0,
        per_page: 0,
        last_page: 0,
        from_page: 0,
        to: 0,
    })
    const experiencesCount = ref(0)

    // ONMOUNTED
    onMounted(() => {
        loadExperinces()
    })

    // FUNCTION`
    async function loadExperinces () {
        console.log(formFilter, 'formFilter')
        const response = await experienceStore.$apiGetAll(formFilter)
        if (response.ok) {
            Object.assign(paginateData, response.data.paginate)
            experiencesData.value.push(response.data.data)
        }
    }
    function submitSearchCity (city) {
        formFilter.city = city
    }
    function loadMore () {
        formFilter.page = paginateData.current_page++
        loadExperinces()
    }
    function submitFilter (){

    }

</script>