<template>

    <div
        class="flex w-full menu-scroll-top md:hidden"
        :class="{'sticky top-0 left-0 w-full bg-white z-30':!mobileList}"
    >
        <template v-if="mobileList">
            <div
                v-for="item in typeplacesTranslate" :key="item"
                class="text-center menu-mobile-font pt-1.5 sp:pt-2.5 w-1/3"
                :class="{'menu-mobile-active': formFilter.typeplace == item.id}"
                @click="changeCategory(null, item.id)"
            >
                <span class="text-[9px] sp:text-sm font-medium">{{ item.name }}</span>
            </div>
        </template>
        <template v-else>
           <!-- codigo anterior  
             <div
                v-for="(item, index) in typeplacesTranslate" :key="index"
                @click="slideToSection(index)"
                class="text-center menu-mobile-font pt-2.5 w-1/3"
                :class="{'menu-mobile-active': (scroll > 384 && scroll < 650 && index == 1) || (scroll < 384 && index == 0) || (scroll > 650 && index == 2)}"
            >
                <span class="text-sm font-medium">{{ item.name }}</span>
            </div> -->

            <div
                v-for="(item, index) in typeplacesTranslate" :key="index"
                @click="slideToSection(index)"
                class="text-center menu-mobile-font pt-2.5 w-1/3"
                :class="{'menu-mobile-active': (scroll > 384 && scroll < 519 && index == 1) || (scroll < 384 && index == 0) || (scroll > 520 && index == 2 )}"
            >
                <span class="text-sm font-medium">{{ item.name }}</span>
            </div>
        </template>
    </div>

    <div class="px-3 md:hidden" v-if="mobileList">
        <div class="relative mt-[8px] sp:mt-4">
            <img
                class="w-[12px] sp:w-5 absolute right-4 top-3 cursor-pointer"
                src="/assets/icons/filters-platform.svg"
            >
            <InputAutocompleteSearch type="place" />
            <button 
                class=""
                @click="openModalFilter"
            >
                <img class="w-[12px] sp:w-6 absolute right-4 top-2 cursor-pointer" src="/assets/icons/icon-filter.svg">
            </button>
        </div>
    </div>

    <div
        class="grid grid-flow-col auto-cols-max md:hidden py-[8px] sp:py-4 z-40 overflow-x-scroll space-x-[8px] sp:space-x-4 sticky top-0 left-0 z-20 bg-white w-screen pl-1.5 sp:pl-2.5"
        v-if="mobileList"
    >
        <div
            v-for="(item, index) in categoriesOfType" :key="index"
            class="flex item-menu-cat rounded-full mb-0.5 sp:mb-1 top-0 p-1 spp-2"
            :class="{'item-menu-cat-active': item.id == formFilter.categoriplace,'hbg-gray-100':!(item.id == formFilter.categoriplace)}"
            @click="changeCategory(item.id, formFilter.typeplace)"
        >
                <img :src="item.iconCat" class=" w-[12px] sp:w-auto mr-[4px] sp:mr-2 inline" />
                <span class="font-item-menu-cat">{{ item.name }}</span>
        </div>
    </div>

    <div class="w-full grid grid-cols-1 md:hidden xl:hidden px-3.5 pb-[8px] sp:pb-4" v-if="mobileList">
        <h4 class="pt-[8px] sp:pt-4 font-medium text-[10px] sp:text-[14px]">{{ paginateData.total }}
            {{ categorySearch +' '+ $t('place.categorySearch') }} 
        </h4>
    </div>

    <template v-if="!mobileList">
        <div
            v-for="(item, index) in typeplacesTranslate" :key="index"
            class="w-full px-4 pt-4 lg:hidden"
        >
            <h1 class="title-card-category" v-if="item.id != 5">{{item.name}}</h1>
            <div
                v-for="(itemCat, index) in categoriplacesTranslate"
                :key="itemCat"
                @click="selectCategory(`card-explora${itemCat.id}`, itemCat.id, item.id)"
            >
                <div
                    :id="'card-explora'+itemCat.id" class="relative card-explora-image overflow-hidden rounded-[6px]"
                    v-if="itemCat.type_places_id == item.id"
                    :class="{ 'card-explora-select': selectedCard === 'card-explora'+itemCat.id }"
                >
                    <div class="w-full h-full relative rounded-[6px] overflow-hidden">
                        <img
                            :src="itemCat.image" alt="img"
                            class="w-full h-full object-cover rounded-[6px]"
                        >
                        <div class="overlay absolute h-full z-10 w-full top-0 left-0 card-explora rounded-[6px]" >
                            <div class="w-14 h-14 hbg-white-100 rounded-[6px] ml-4 my-8">
                                <img class="w-full py-2.5 px-2"  :src="itemCat.icon" alt="" srcset="">
                            </div>
                            <span class="absolute z-30 text-card-explora font-explora" >
                                {{ itemCat.name }}
                            </span>
                            <span class="absolute count-card">{{ itemCat.count }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>

    <div class="hidden w-full md:block">
        <div
            v-for="(itemType, indexType) in typeplacesTranslate"
            class="w-full"
            :class="{'mt-4': indexType != 0}"
        >
            <!-- :style="(formFilter.typeplace == itemType.id)  && !formFilter.categoriplace ? 'background: #EBF4F9; border-radius: 0px 20px 20px 0px;' : ''" -->
            <p
                class="pt-2 pb-2 pl-2 text-sm font-medium filters"
                @click="changeCategory('typeplace', itemType.id)"
            >
                {{ itemType.name }}
            </p>
            <template v-for="(itemCategory, indexCat) in itemType.categori_places">
                <div
                    v-if="itemCategory.show == 1"
                    class="flex pt-2 pb-2 cursor-pointer aling-center filters"
                    :style="((formFilter.typeplace == itemType.id) && (formFilter.categoriplace == itemCategory.id)) ? 'background: #EBF4F9; border-radius: 0px 20px 20px 0px;' : ''"
                    @click="changeCategory(itemCategory.id, itemCategory.type_places_id)"
                >
                    <div class="inline-block w-6 h-6 ml-4">
                        <img class="w-full h-full " :src="itemCategory.icon" alt="monumento image">
                    </div>
                    <p class="inline-block pl-3 text-sm">{{ itemCategory.name }}</p>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
    import { computed, inject, onMounted, watch, ref } from 'vue';
    import { slufy, getUrlParam } from '@/utils/utils.js'
    // COMPONENTS
    import InputAutocompleteSearch from '@/components/InputAutocompleteSearch'

    const props = defineProps ({
        mobileList:{
            type:Boolean,
            default:false
        }
    })
    // EMIT
    const emit = defineEmits(['click:changeCategory','openModalFilter'])

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
            'naturaleza': {
                es: 'Naturaleza',
                en: 'Nature',
                fr: 'Nature',
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
                en: 'Shopping',
                fr: 'Shopping',
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
        'naturaleza': '/assets/icons/explora/1.TH.PARQUES.svg',
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
        'naturaleza': '/assets/icons/explora/icon-parques-cat.svg',
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
        'naturaleza': '/assets/icons/explora/parques.svg',
        restaurantes :'/assets/icons/explora/restaurantes.svg',
        heladerias:'/assets/icons/explora/heladerias.svg',
        'cafeterias-y-postres':'/assets/icons/explora/cafeterias.svg',
        'vida-nocturna':'/assets/icons/explora/discotecas.svg',
        compras: '/assets/icons/explora/compras.svg',
        otros: '/assets/icons/explora/otros.svg',
    }

    // DATA \ MOBILE
    const endPage = ref(false)
    const scroll = ref(0)
    const scrollBottom = ref(0)
    const scrollPositions = [
        0, 
        450,
        800
    ];
    const selectedCard = ref(null)

    // INJECT
    const typeplaces = inject('typeplaces')
    const categoriplaces = inject('categoriplaces')
    const formFilter = inject('formFilter')
    const paginateData = inject('paginateData')

    // COMPUTED
    const categoriplacesTranslate = computed(()=> {
        let cats = categoriplaces.value.map(item => {
            let slug = slufy(item.name)
                return {
                    id: item.id,
                    type_places_id: item.type_places_id,
                    icon: iconsCategoriplaces[slug],
                    iconCat: iconsCat[slug],
                    image: imagesCategory[slug],
                    name: translate.categoriplace[slug]?.[localeCurrent],
                    count: item.count_places,
                    show: item.show,
                }
        })
        // console.log('cats',cats)
        return cats;
    })

    const categoriesOfType = computed(()=> {
         let categoriesOfType = categoriplacesTranslate.value.filter(cat => cat.type_places_id == formFilter.typeplace)
        return categoriesOfType;
    })
    const typeplacesTranslate = computed(()=> {
        return typeplaces.value.map(item => {
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
    })

    const categorySearch = computed(()=> {
        return categoriplacesTranslate.value?.find(item => item.id == formFilter.categoriplace)?.name
    })

    // ONMOUNTED
    onMounted(() => {
        // if (formFilter.typeplace) {
        //     formFilter.typeplace = typeplacesTranslate.value?.[0].id   
        // }
        // if (formFilter.categoriplace) {
        //     formFilter.categoriplace = typeplacesTranslate.value?.[formFilter.typeplace]?.categori_places?.[0].id  
        // }

        window.addEventListener('scroll', () => {
            let d = document.documentElement
            scroll.value = d.scrollTop
            //identifa si el usuario llego al final de la paginas
            let offset = scroll.value + window.innerHeight;
            let height = d.offsetHeight;

            if (offset >= height) {
                endPage.value = true;
            }else{
                endPage.value = false;
            }
        })

        window.addEventListener('scroll', () => {
            const sBottom = document.documentElement.scrollTop + window.innerHeight;
            if (sBottom >= document.body.offsetHeight) {
                scrollBottom.value = 1;
            }

            if (sBottom < document.body.offsetHeight) {
                scrollBottom.value = 0;
            }
        })

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
    const getFirstCategoryOfType = ()=> {
        if(formFilter.typeplace){
            formFilter.typeplace
            let first = categoriplacesTranslate.value.find(cat => cat.type_places_id == formFilter.typeplace)
            formFilter.categoriplace = first?.id
        }
    }

    function changeCategory (idCategory = null, idTypePlace = null) {
        formFilter.categoriplace = idCategory
        formFilter.typeplace = idTypePlace
        if(!formFilter.categoriplace) getFirstCategoryOfType()
        emit('click:changeCategory')
    }

    // FUNCTIONS MOBILE
    function selectCategory(cardId, catId, typeId) {
        selectedCard.value = cardId
        changeCategory(catId, typeId)
    }

    function slideToSection(index){
        const scrollPosition = scrollPositions[index];
        if (scrollPosition !== undefined) {
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    }

    function openModalFilter(){
        emit('openModalFilter')
    }

    

</script>

<style lang="scss" scoped>

    .item-menu-cat {
        align-items: center;
    }

    .item-menu-cat-active {
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    }

    .title-card-category {
        margin-bottom: 16px;
        margin-top: 24px;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        color: #333333;
        line-height: 110%;
    }
    .text-card-explora {
    top: 35px;
    left: 96px;
    }

    .count-card {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 110%;
    color: #FFFFFF;
    top: 64px;
    left: 96px;
    }

    .font-explora {
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 110%;
    color: #FFFFFF;
    }

    .card-explora {
        background: rgba(0, 0, 0, 0.5);
    }

    .card-explora-image {
        height: 120px;
        margin: auto auto 16px;
    }
    .card-explora-select{
        height: 115px !important;
        width: 97% !important;
        margin: 0 auto 16px;
    }
    .focusCard {
        width: 322px!important;
        height: 118px!important;
    }
    .filters:hover {
        background: #F3F3F3;
        border-radius: 0px 20px 20px 0px;
        cursor: pointer;
    }
    .p-16 {
        padding: 16px!important;
    }

    .ptb-0 {
        padding-top: 0!important;
        padding-bottom: 0 !important;
    }

    .menu-cat-top {
        height: 50px!important;
        margin-top: 20px!important;
        padding-top: 0px!important;
        position: sticky;
    }

    .menu-scroll-top {
        height: 27px!important;
    }

    .menu-mobile-font {
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        line-height: 110%;
        color: #333333;
        border-bottom: 2px solid #BFBFBF;
    }
    .menu-mobile-active {
        border-bottom: 2px solid #333333;
    }
    .font-item-menu-cat {
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
    }

    @media (min-width: 300px){
        .menu-scroll-top {
            height: 46px!important;
        }
        .menu-mobile-font {
            font-size: 16px;
            line-height: 110%;
            border-bottom: 4px solid #BFBFBF;
        }
        .menu-mobile-active {
            border-bottom: 4px solid #333333;
        }
        .font-item-menu-cat {
            font-size: 12px;
        }
    }

    .menu-mobile-default {
        border-bottom: 4px solid #BFBFBF;
        width: 120px;
    }
</style>
