<template>
    <div class="hidden md:block w-full">
        <div
            v-for="(itemType, indexType) in typeplacesTranslate"
            class="w-full"
            :class="{'mt-4': indexType != 0}"
        >
            <!-- :style="(formFilter.typeplace == itemType.id)  && !formFilter.categoriplace ? 'background: #EBF4F9; border-radius: 0px 20px 20px 0px;' : ''" -->
            <p
                class="pl-2 font-medium pt-2 pb-2 text-sm filters"
                @click="changeCategory('typeplace', itemType.id)"
            >
                {{ itemType.name }}
            </p>
            <templete v-for="(itemCategory, indexCat) in itemType.categori_places">
                <div
                    v-if="itemCategory.show == 1"
                    class="flex aling-center filters pt-2 pb-2 cursor-pointer"
                    :style="((formFilter.typeplace == itemType.id) && (formFilter.categoriplace == itemCategory.id)) ? 'background: #EBF4F9; border-radius: 0px 20px 20px 0px;' : ''"
                    @click="changeCategory(itemCategory.id, itemCategory.type_places_id)"
                >
                    <div class="inline-block ml-4 w-6 h-6">
                        <img class=" w-full h-full" :src="itemCategory.icon" alt="monumento image">
                    </div>
                    <p class="pl-3 text-sm inline-block">{{ itemCategory.name }}</p>
                </div>
            </templete>
        </div>
    </div>
</template>

<script setup>
    import { computed, inject, onMounted, watch } from 'vue';
    import { slufy } from '@/utils/utils.js'

    // EMIT
    const emit = defineEmits(['click:changeCategory'])

    // STORE
    import { useLocaleStore } from '@/stores/modules/locale'
    const localeStore = useLocaleStore()
    const { localeCurrent } = localeStore

    //DATA STATIC
    const translate = {
        typeplace: {
            'que-visitar': {
                es: 'Qué visitar',
                en: 'Places',
                fr: 'Des endroits',
            },
            'donde-comer': {
                es: 'Dónde comer',
                en: 'Food',
                fr: 'Aliments',
            },
            ocio: {
                es: 'Ocio',
                en: 'Leisure',
                fr: 'Loisirs',
            },
        },
        categoriplace: {
            monumentos: {
                es: 'Monumentos',
                en: 'Monuments',
                fr: 'Les monuments',
            },
            museos: {
                es: 'Museos',
                en: 'Museums',
                fr: 'Musées',
            },
            'zonas-verdes': {
                es: 'Zonas verdes',
                en: 'Parkland',
                fr: 'Zones vertes',
            },
            restaurantes: {
                es: 'Restaurantes',
                en: 'Restaurants',
                fr: 'Restaurants',
            },
            heladerias: {
                es: 'Heladerías',
                en: 'Heladerías',
                fr: 'Heladerías',
            },
            'cafeterias-y-postres': {
                es: 'Cafeterías y postres',
                en: 'Cafes and desserts',
                fr: 'Cafés et desserts',
            },
            'vida-nocturna': {
                es: 'Vida nocturna',
                en: 'Night life',
                fr: 'Vie nocturne',
            },
            compras: {
                es: 'Compras',
                en: 'Shoppings',
                fr: 'Shoppings',
            },
            otros: {
                es: 'Otros',
                en: 'Others',
                fr: 'Les autres',
            },
            cultura: {
                es: 'Cultura',
                en: 'Cultural',
                fr: 'Culture',
            },
            copas: {
                es: 'Copas',
                en: 'Drinks',
                fr: 'Boissons',
            },
        },
        results:{
            'es':'Sin resultados...',
            'en':'Without results...',
            'fr':'Sans résultats...',
        },
        seaching:{
            'es':'Buscando...',
            'en':'Searching...',
            'fr':'Recherche...',
        }
    }

    const iconsCategoriplaces = {
        monumentos:'/assets/icons/explora/icon-monumentos.svg',
        museos:'/assets/icons/explora/1.Th.MUSEOS.svg',
        'zonas-verdes': '/assets/icons/explora/1.TH.PARQUES.svg',
        restaurantes :'/assets/icons/explora/1.TH.DONDE COMER.svg',
        heladerias:'/assets/icons/explora/1.TH.I.heladería.svg',
        'cafeterias-y-postres':'/assets/icons/explora/1.TH.CAFETERIAS.svg',
        'vida-nocturna':'/assets/icons/explora/1.TH.COPAS.svg',
        compras: '/assets/icons/explora/TH.COMPRAS.svg',
        otros: '/assets/icons/explora/1.TH.OTROS.svg',
    }

    const iconsCat = {
        monumentos:'/assets/icons/explora/icon-monuments-cat.svg',
        museos:'/assets/icons/explora/icon-museo-cat.svg',
        'zonas-verdes': '/assets/icons/explora/icon-parques-cat.svg',
        restaurantes :'/assets/icons/explora/icon-restaurantes-cat.svg',
        heladerias:'/assets/icons/explora/icon-heladerias-cat.svg',
        'cafeterias-y-postres':'/assets/icons/explora/icon-cafeterias-cat.svg',
        discotecas:'/assets/icons/explora/icon-discotecas-cat.svg',
        compras: '/assets/icons/explora/1.TH.Compras.svg',
        otros: '/assets/icons/explora/1.TH.OTROS.svg',
        'vida-nocturna':'/assets/icons/explora/1.TH.COPAS.svg',
    }

    const imagesCategory = {
        monumentos:'/assets/icons/explora/monumentos.svg',
        museos:'/assets/icons/explora/museos.svg',
        'zonas-verdes': '/assets/icons/explora/parques.svg',
        restaurantes :'/assets/icons/explora/restaurantes.svg',
        heladerias:'/assets/icons/explora/heladerias.svg',
        'cafeterias-y-postres':'/assets/icons/explora/cafeterias.svg',
        'vida-nocturna':'/assets/icons/explora/discotecas.svg',
        compras: '/assets/icons/explora/compras.svg',
    }

    // INJECT
    const typeplaces = inject('typeplaces')
    const categoriplaces = inject('categoriplaces')
    const formFilter = inject('formFilter')

    // COMPUTED
    const categoriplacesTranslate = computed(()=> {
        return categoriplaces.value.map(item => {
            let slug = slufy(item.name)
                return {
                    id: item.id,
                    type_places_id: item.type_places_id,
                    icon: iconsCategoriplaces[slug],
                    iconCat: iconsCat[slug],
                    image: imagesCategory[slug],
                    name: translate.categoriplace[slug]?.[localeCurrent],
                    count: item.countPlaces,
                    show: item.show,
                }
        })
    })
    const typeplacesTranslate = computed(()=> {
        let typeplacesTranslate = typeplaces.value.map(item => {
            let slug_type = slufy(item.name)
            let categori_places = item.categori_places.map(item_cat => {
                let slug_cat = slufy(item_cat.name)
                return {
                    id: item_cat.id,
                    type_places_id: item_cat.type_places_id,
                    icon: iconsCategoriplaces[slug_cat],
                    name: translate.categoriplace?.[slug_cat]?.[localeCurrent],
                    show: item_cat.show,
                }
            })
            return {
                id: item.id,
                name: translate.typeplace?.[slug_type]?.[localeCurrent],
                categori_places,
            }
        })
        return typeplacesTranslate;
    })

    // ONMOUNTED
    onMounted(() => {
        if (formFilter.typeplace) {
            formFilter.typeplace = typeplacesTranslate.value?.[0].id   
        }
        if (formFilter.categoriplace) {
            formFilter.categoriplace = typeplacesTranslate.value?.[formFilter.typeplace]?.categori_places?.[0].id  
        }
    })

    // WATCH
    watch(typeplacesTranslate, (valueCurrent)=>{
        // if (!formFilter.typeplace) {
        //     formFilter.typeplace = typeplacesTranslate.value?.[0].id
        // }
        // if (!formFilter.categoriplace) {
        //     formFilter.categoriplace = typeplacesTranslate.value?.[0].categori_places?.[0].id  
        // }
    })

    // FUNCTION
    function changeCategory (id, idTypePlace = null) {
        formFilter.categoriplace = id
        formFilter.typeplace = idTypePlace
        emit('click:changeCategory')
    }

</script>