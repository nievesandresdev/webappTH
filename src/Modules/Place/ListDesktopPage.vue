<template>
    <div class="container-fluid-list">
        <!-- desktop-list-breadcrumb -->
        <div class="desktop-list-breadcrumb my-[40px] hidden md:block">
            <router-link to="/" class="text-sm font-medium text-gray-ao no-link">
                Home    
            </router-link>
            <p class="inline text-gray-ao lg:mx-2">
            > 
            </p>
            <router-link  to="/places" class="text-sm font-medium text-gray-ao no-link">
                {{ $t('place.breadcrumbs.explore') }}
            </router-link >
        </div>
        <!-- END desktop-list-breadcrumb -->

        <div class="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-5 lg:pt-4 w-full gap-6">
            <div class="md:col-span-1 hidden md:block w-full">
                <MenuCategory @click:changeCategory="submitFilter" />
            </div>
            <div class="md:col-span-2 xl:col-span-4 pb-[40px]">
                <!-- destock -->
                 <div class="mt-6 md:mt-0 hidden md:flex justify-between md:block">
                     <!-- Filter city -->
                    <div class="relative">
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
                                    {{ $t('place.list-page.title') }}
                                    
                                    <span class="py-2 p-0 " id="listCity">{{ formFilter.city || hotelData.zone }}  
                                        <img
                                            :src="`/assets/icons/${!dropdownSerchCity ? '1.TH.I.DROPDOWN.svg' : '1.TH.I.DROPDOWN.OPEN.svg'}`" alt="OPEN"
                                            class="w-4 h-4 ml-1 inline-block"
                                        >
                                    </span>
                                </button>
                            </template>
                        </THSearchCity>
                    </div>
                    <!-- END Filter city -->
                </div>
                <h4 class="mt-4 font-medium hidden md:block text-sm">
                    {{ $t('place.list-page.text-count-list', {count: paginateData?.total}) }}
                </h4>
                <section class="hidden md:block">

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-4 xl:gap-6 pt-4 px-3.5 md:px-0">
                        <div v-for="item in placesData" :key="item.id">
                        
                            <CardProduct place heightImg="card-img" :data="item"/>
                        </div>
                    </div>

                    <div v-if="(placesData.length > 0) && (placesData.length < paginateData?.total)" class="w-full text-center pt-4 px-3.5 md:px-0">
                        <button @click="loadMore()"
                        class="mx-auto text-xs lg:text-base text-center rounded-lg py-2 m-0 font-medium border border-black my-2.5 w-full md:w-64 lg:w-72">
                            {{ $t('place.list-page.btn-load-more') }}
                        </button>
                    </div>
                </section>
            </div>
        </div>

    </div>
</template>

<script setup>
    import { onMounted, ref, provide, reactive, toRefs } from 'vue'
    import { useRouter } from 'vue-router'
    const route = useRouter()

    // COMPONENTS
    import THSearchCity from '@/components/THSearchCity'
    import MenuCategory from './components/MenuCategory'
    import CardProduct from '@/components/CardProduct'

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
    const dropdownSerchCity = ref(null)
    const categoriplaces = ref([])
    const typeplaces = ref([])
    const placesData = ref([])
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
    })

    // PROVIDER
    provide('categoriplaces', categoriplaces)
    provide('typeplaces', typeplaces)
    provide('formFilter', formFilter)

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
        const response = await placeStore.$apiGetCategoriesByType()
        if (response.ok) {
            categoriplaces.value = response.data
        }
    }

    function submitSearchCity (city) {
        formFilter.city = city
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
        route.push({ name: 'PlaceList', query: {...filterNonNullAndNonEmpty(formFilter)} })
        page.value = 1
        placesData.value = []
        loadPlaces()
    }

</script>

<style lang="scss" scoped>
.text-underline {
    text-decoration: underline;
}

.card-content{
  width: 100%;
}
.card-img{
  height: 218px !important;
}

.container-fluid-list{
  width: 100%;
  /* padding-left: 16px; */
  /* padding-right: 16px; */
}

.title-movil{
  font-weight: 600;
  font-size: 14px;
  line-height: 110%;
  color: #333333;
}

.icon-title-movil{
  position: absolute!important;
  display: inline;
}

@media (min-width: 360px) {

}

@media (min-width:768px) {
    .card-content{
        width: 260px;
    }
    .card-img{
      height: 173px !important;
    }
    .container-fluid-list{
      width: 100%;
      padding-left: 24px;
      padding-right: 24px;
    }
    .container-menu{
       width: 168px;
    }
}
@media (min-width:1024px) {
    .card-content{
        width: 260px;
    }
    .card-img{
      //height: 182px !important;
    }
    .container-fluid-list{
      width: 100%;
      padding-left: 80px;
      padding-right: 80px;
    }
    .container-menu{
      width: 262px;
    }
}
@media (min-width:1280px) {
    .card-content{
        width: 260px;
    }
    .card-img{
      //height: 182px !important;
    }
    .container-menu{
       width: 273px;
    }
}
.selected-type-place {
  padding: 8px 12px 8px 16px;
  gap: 8px;
  width: 105px;
  height: 32px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  font-size: 11px;
}

.filters:hover {
  background: #F3F3F3;
  border-radius: 0px 20px 20px 0px;
  cursor: pointer;
}

.places_card {
  display: flex;
  flex-direction: column;
  padding: 0px 0px 16px;
  isolation: isolate;
  width: 302px;
  height: 307.33px;
  border-radius: 10px;
}

.places_image {
  width: 302px;
  height: 201.33px;
  border-radius: 10px 10px 0px 0px;
}

.tag_recomendado {
  display: flex;
  padding: 4px 8px;
  gap: 8px;
  width: 91px;
  height: 24px;
  background: #FFEBCC;
  border-radius: 100px;
}

.p_recomendado {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 90%;
  display: flex;
  align-items: center;
  color: #A0A0A0;
}

.tag_categoria {
  display: flex;
  padding: 4px 8px;
  gap: 8px;
  width: 85px;
  height: 24px;
  background: #EBF4F9;
  border-radius: 100px;
}

.p_categoria {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 90%;
  align-items: center;
  color: #A0A0A0;
}

.num_reviews {
  display: flex;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 90%;
  bottom: 0.5%;
  position: absolute;
  left: 27%;
  color: #333333;
}

.destacado {
  display: flex;
  align-items: center;
  padding: 0px 16px;
  gap: 8px;
  width: 221px;
  height: 24px;
  position: relative;
  bottom: 90%;
  background: #FF9C06;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
  border-radius: 0px 3px 3px 0px;
}

.mtb-40 {
    margin-top: 40px!important;
    margin-bottom: 32px!important;
}

.text-gray-ao{
    color: #a0a0a0;
}

.no-link{
    text-decoration:none;
}

.no-link:hover{
    color: #a0a0a0;
}
.pb-40{
  padding-bottom: 40px;
}
</style>