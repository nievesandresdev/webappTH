<template>
    <AppHeader
        title="Hotel"
        :tabs="tabsHeader"
    >
        <template v-slot:titleOrSearch>
            <InputSearchPlace />
        </template>
    </AppHeader>
    <div>
        {{tabsHeader}}
    </div>
</template>

<script setup>

import { onMounted, ref, provide, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getUrlParam } from '@/utils/utils.js';
const route = useRouter();

import AppHeader from '@/layout/Components/AppHeader.vue';
import InputSearchPlace from './components/InputSearchPlace.vue';

// STORE
import { usePlaceStore } from '@/stores/modules/place';
const placeStore = usePlaceStore();

import { useLocaleStore } from '@/stores/modules/locale'
const localeStore = useLocaleStore()
const { localeCurrent } = localeStore

import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
const { hotelData } = hotelStore

    // PROPS
const props = defineProps({
    queryRouter: {
        type: Object,
        default: () => ({})
    }
})
const { queryRouter } = toRefs(props);


// DATA
const dataFilter = {
    categoriplace: null,
    typeplace: null,
    points: [],
    distances: [],
    all_cities: false,
    search:null,
    city: null,
}
const categoriplaces = ref([]);
const typeplaces = ref([]);
const formFilter = reactive(JSON.parse(JSON.stringify(dataFilter)));
const paginateData = reactive({
    total: 0,
    current_page: 1,
    per_page: 1,
    last_page: 0,
    from_page: 0,
    to: 0,
});
const tabsHeader = ref([]);

// const  = computed(()=> {
//     return typeplaces.value.map(item => {
//         let slug_type = slufy(item.name)
//         let categori_places = item.categori_places.map(item_cat => {
//             let slug_cat = slufy(item_cat.name)
//             return {
//                 id: item_cat.id,
//                 type_places_id: item_cat.type_places_id,
//                 icon: iconsCategoriplaces[slug_cat],
//                 name: translate.categoriplace?.[slug_cat]?.[localeCurrent],
//                 show: item_cat.show,
//             }
//         })
//         return {
//             id: item.id,
//             name: translate.typeplace?.[slug_type]?.[localeCurrent],
//             categori_places,
//         }
//     })
// });

// ONMOUNTED
onMounted(async () => {
    await loadTypePlaces();
    loadCategoriPlaces();
    // loadPlaces();
    formFilter.city = getUrlParam('city') || hotelData.zone;
});

// FUNCTIONS
async function loadTypePlaces () {
    const response = await placeStore.$apiGetTypePlaces();
    if (response.ok) {
        loadQueryInFormFilter();
        typeplaces.value = response.data;
        loadTabsHeader();
        if (!formFilter.typeplace) {
            formFilter.typeplace = typeplaces.value?.[0].id;
        }
        if (!formFilter.categoriplace) {
            formFilter.categoriplace = typeplaces.value?.[0].categori_places?.[0].id;
        }
    }
}

async function loadCategoriPlaces () {
    const response = await placeStore.$apiGetCategoriesByType({city: formFilter.city, all: true, withNumbersPlaces: true});
    if (response.ok) {
        categoriplaces.value = response.data;
    }
}

function loadTabsHeader () {
    tabsHeader.value = typeplaces.value.map(item => {
        return {
            title: item.translation_current,
            exclude: false,
            iconDefault: `${item.icon}`,
            iconSelected: `${item.icon}.DEFAULT`,
            isActive: item.name === 'Qué visitar',
            onClick: () => changeCategory(),
        };
    });
}

function changeCategory (idCategory = null, idTypePlace = null) {
    formFilter.categoriplace = idCategory
    formFilter.typeplace = idTypePlace
    if(!formFilter.categoriplace) getFirstCategoryOfType()
    emit('click:changeCategory')
}

// const tabsHeader = reactive([
//     {
//         title: 'Información',
//         exclude: false,
//         iconDefault: 'WA.MENU.DEFAULT.ALOJAMIENTO',
//         iconSelected: 'WA.MENU.SELECTED.ALOJAMIENTO',
//         to: '/',
//         routeNameIncludes: ['Home'],
//         onClick: () => router.push('/'),
//     },
//     {
//         title: 'Instalaciones',
//         exclude: false,
//         iconDefault: 'WA.MENU.DEFAULT.INSTALACIONES',
//         iconSelected: 'WA.MENU.SELECTED.INSTALACIONES',
//         to: '/',
//         routeNameIncludes: ['PlaceList'],
//         onClick: () => router.push('/'),
//     },
// ]);

function loadQueryInFormFilter () {
    for (const [key, value] of Object.entries(queryRouter.value || {})) {
        if (formFilter.hasOwnProperty(key)) {
            if (['duration', 'distances'].includes(key)) {
                if (typeof value === 'string') {
                    formFilter[key].push(value);
                } else {
                    formFilter[key] = value;
                }
            }else {
                formFilter[key] = validValueQuery(key, value);
            }
        }
    }
}


</script>