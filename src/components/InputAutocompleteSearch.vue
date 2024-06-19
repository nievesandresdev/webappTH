<template>
    <div
        class="h-8 sp:h-10 input-search flex bg-white rounded-lg p-0.5 border border-gray-300 w-full"
    >
        <div
            class="input-search__search h-full relative flex-1 w-auto"
        >
            <img class="inline-block w-3 sp:w-4 h-3 sp:h-4 md:w-5 md:h-5 absolute top-2 sp:top-2.5 left-1.5 sp:left-2.5 md:top-1.5 md:left-2.5" src="/assets/icons/search.svg">
            <div
            ref="refDropdown" 
                class="w-full h-full border-none bg-white"
            >
                <!-- v-if="innerWidth > 768" -->
                <input
                    v-model="formSearch.search"
                    class="pl-6 sp:pl-9 text-[10px] sp:text-sm lg:text-sm font-medium w-full h-full border-none bg-white hidden md:block"
                    :placeholder="`${$t('layout.input-search.search')}...`"
                    type="text"
                    @input="searchContent()"
                    @focus="searchContent()"
                >
                <button
                    class="pl-6 sp:pl-9 text-[10px] sp:text-xs lg:text-sm font-medium w-full h-full border-none bg-white text-left block md:hidden"
                    @click="searchContent()"
                >
                    {{ formSearch.search ? formSearch.search : `${$t('layout.input-search.search')}...` }}
                </button>
                <div v-if="showDropdown" class="dropdown-search bg-white shadow-lg z-20 rounded-xl py-6 max-h-[499px]">
                    <!-- <h6 class="text-base font-medium mb-6 px-3.5">{{ translate.dropdown_city.title['es'] }}</h6> -->
                    <h6 class="text-base font-medium mb-6 px-3.5">{{ $t('layout.input-search.search') }}</h6>
                    <div class="max-h-[399px] overflow-y-auto scrolling-sticky">
                        <div
                            v-for="(item, index) in data"
                            class="flex items-center hover:bg-gray-200 w-full px-3.5 cursor-pointer"
                            @click="selectSearch(item)"
                        >
                            <img class="rounded-lg w-10 h-10 mr-2" :src="placeStore.$loadImage(item.image, item.type)">
                            <div class="border-b border-gray-300 w-full truncate-1 py-2">
                                <p class="text-sm font-medium truncate-1" v-html="item.title"></p>
                                <p
                                    class="text-xs font-light mt-1"
                                >
                                    {{ item.city }} <span v-if="item.type == 'experience'">- {{ $t('layout.input-search.from') }} {{ item.price }}€</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <InputSearchModalMobile @input:search="searchContent" />
</template>

<script setup>
    //import libraries
    import { ref, computed, provide, reactive, onMounted, onBeforeUnmount } from 'vue';
    import { slufy } from '@/utils/utils.js'
    import { useRoute, useRouter   } from 'vue-router'
    import { useUtilityStore } from '@/stores/modules/utility'
    import { getUrlParam } from '@/utils/utils.js'
    //import component
    import InputSearchModalMobile from './InputSearchModalMobile'

    // PROPS
    // const props = defineProps({
    //     type: String,
    //     default: null
    // });
    
    //route  
    const route  = useRoute();
    const router = useRouter();
    // STORE
    const utilityStore = useUtilityStore()

    //DATA STATIC
    const urlStorage = process.env.VUE_APP_STORAGE_URL;
    const attr = {
        key: 'today',
            highlight: {
            class: 'bg-black',
            contentClass: 'text-white',
            // style:{
            //     borderRadius: '0.5rem',
            // },
        },
    }
    const innerWidth = window.innerWidth
    const translate = {
        message: {
            es: 'Seleciona un destino o experiencia',
            en: 'Select a destination or experience',
            fr: 'Sélectionnez une destination ou une expérience',
        },
        btn_search: {
            es: 'Buscar...',
            en: 'Search...',
            fr: 'Chercher...',
        },
        input_city: {
            es: 'Destinos, experiencias...',
            en: 'Destinations, experiences...',
            fr: 'Destinations, expériences...',
        },
        input_calendar: {
            es: 'Añadir fecha',
            en: 'Add date',
            fr: 'Ajouter une date',
        },
        dropdown_city: {
            title: {
                es: 'Ciudades destacadas',
                en: 'Featured cities',
                fr: 'Villes en vedette',
            },
            from: {
                es: 'desde',
                en: 'from',
                fr: 'depuis',
            },
        },
    }

    //DATA
    const formSearch = reactive ({
        search: '',
        typeSearch: '',
        typePlace:null,
        categoryPlace:null
    })
    const showDropdown = ref(false)
    const refDropdown = ref(false)
    const timeoutFormId = ref(null)
    const showDropdownMobile = ref(false) 
    const data = ref([])

    //PROVIDE
    provide('showDropdownMobile', showDropdownMobile)
    provide('data', data)
    provide('formSearch', formSearch)

    // FUNCTIONS
    function defineTypeSearch(){
        formSearch.typeSearch = 'experience';
        if(route.name == "PlaceList" ||  route.name == "PlaceDetail"){
            formSearch.typeSearch = 'place';
        }
    }

    function toggleDropdown () {
        if (innerWidth < 768) {
            showDropdownMobile.value = true
            return
        }
        showDropdown.value = true
        if (showDropdown.value) {
            document.addEventListener("click", closeDropdownOnClickOutside)
        } else {
            document.removeEventListener("click", closeDropdownOnClickOutside)
        }
    }

    function closeDropdownOnClickOutside (event) {
      // Si el evento objetivo no está dentro del menú, cierra el menú
      if (!refDropdown?.value?.contains(event.target)) {
        showDropdown.value = false
        document.removeEventListener("click", closeDropdownOnClickOutside)
      }
    }

    function searchContent () {
        formSearch.typePlace = getUrlParam('typeplace') ?? null;
        formSearch.categoryPlace = getUrlParam('categoriplace') ?? null;
        defineTypeSearch();
        clearTimeout(timeoutFormId.value)
        timeoutFormId.value = setTimeout(async () => {
            const response = await utilityStore.$apiGetExpAndPlaceBySaearch(formSearch)
            if (response.ok) {
                data.value = response.data
                toggleDropdown()
            }
        }, formSearch.data ? 400 : 0)
    }

    function getImage (img, type) {
        let path = {
            experience: {
                path: img,
            },
            place: {
                path: `${urlStorage}storage/places/${img.image}`,
            },
            city: {
                path: '/storage/city',
            },
        }
        let url = img ? `${path[type]['path']}` : null
        return url
    }

    function selectSearch (item) {
        formSearch.search = item.title
        formSearch.id = item.id
        showDropdown.value = false
        if(item.type == 'place'){
            router.push({name: 'PlaceDetail', params:{ id: item.id }})
        }else{
            router.push({name: 'ExperienceDetail', params:{ slug: item.slug }})
        }
    }
</script>

<style lang="scss" scoped>
    input:focus{
        border:none !important;
    }
    .vc-container{
        border: none !important;
    }
    .input-search {
        width: 100%;
        &__search {
            //width: 372px;
        }
        &__calendar {
            //width: auto;
        }
    }
    .content-search-city{
         width: 100%;
    }
    .dropdown-search {
        width: 519px;
        max-width: 519px;
        position: absolute;
        right: 0;
        top: 3.2rem;
    }
    .dropdown-calendar {
        width: 519px;
        position: absolute;
        left: 0;
        top: 3.2rem;
    }
    .dropdown-calendar-list {
        position: absolute;
        width: 519px;
        left: auto;
        top: 3.2rem;
        right: 0;
    }
    .dropdown-menu-city {
        width: 519px;
        position: absolute;
        left: -1rem;
        top: 6rem;
        max-height: 499px;
    }

    // @media (min-width: 1028px) {
    //     .input-search {
    //         display: none;
    //     }
    //     .input-search-tablet {
    //         display: block;
    //     }
    // }

     @media (min-width:768px) {
        .dropdown-calendar {
            left: auto;
            right: 0;
        }
     }

     @media (min-width:1024px) {
        .input-search {
            //width: 519px;
        }
        .dropdown-calendar {
            right: auto;
            left: 0;
        }
        .content-search-city{
           width: 483px;
        }
     }

</style>