<template>
    <header id="header" class="block h-[50px] sp:h-[72px]" style="z-index: 1000 !important;">
        <div class="container-fluid-landing flex items-center justify-start py-2.5 sp:py-4 pr-2">
            <div class=" w-[150px] sp:w-[207px] h-[20px] sp:h-[40px]">
                <template v-if="hotelData?.logo">
                    <img :src="hotelStore.$loadImage(hotelData?.logo)" alt="Logo" class="w-auto h-[20px] sp:h-[40px]">
                </template>
                <template v-else>
                    <div class="flex items-center justify-start w-full h-full">   
                        <h4 
                            class="text-xs font-medium text-white sp:text-base"
                        >
                            {{ hotelData?.name }}
                        </h4>
                    </div>
                </template>
            </div>
            <div class="hidden md:flex items-center  ml-[2.5rem]">

                <!--    HOME    -->
                <div class="relative mr-[40px]">
                    <router-link
                        to="/"
                        class="p-2 mb-2 text-sm font-medium no-underline rounded-md hbtn-blur htext-white-100 "
                    >
                        Home
                    </router-link>
                    <div class="w-full mt-2 active" :class="{'invisible': $route.name != 'Home'}" />
                </div>
                <!--    INSTALACIONES    -->
                <div class="relative mr-[2.5rem]">
                    <router-link
                        to="/instalaciones"
                        class="p-2 mb-2 text-sm font-medium no-underline rounded-md hbtn-blur htext-white-100"
                    >
                        {{ $utils.capitalize($t('layout.header.facilities')) }}
                    </router-link>
                    <!-- absolute top-5 left-0 -->
                    <div class="w-full mt-2 active"  :class="{'invisible': $route.name != 'FacilityList'}" />
                </div>

                <!--    PLACES    -->
                <div class="relative mr-[2.5rem]">
                    <router-link
                        to="/places"
                        class="p-2 mb-2 text-sm font-medium no-underline rounded-md hbtn-blur htext-white-100"
                    >
                        {{ $utils.capitalize($t('layout.header.explore')) }}
                    </router-link>
                    <div class="w-full mt-2 active"  :class="{'invisible': !['PlaceList', 'PlaceDetail'].includes($route.name)}" />
                </div>

                <!--    EXPERIENCES    -->
                <!-- v-if="hotelData?.show_experiences" -->
                
                <div  class="relative mr-[2.5rem]">
                    <router-link
                        to="/experiencias"
                        class="p-2 mb-2 text-sm font-medium no-underline rounded-md hbtn-blur htext-white-100"
                    >
                        {{ $utils.capitalize($t('layout.header.experiences')) }}
                    </router-link>
                    <div class="w-full mt-2 active"  :class="{'invisible': $route.name != 'ExperienceList'}" />

                </div>
            </div>
            <div class="items-center justify-end hidden ml-auto md:flex">
                <DropdownLanguage />
            </div>
        </div>
    </header>
    <DropdownLanguageMobile />
</template>
<script setup>
import { ref, provide, onMounted } from 'vue'
import { useHotelStore } from '@/stores/modules/hotel'
import DropdownLanguage from '../Components/DropdownLanguage'
import DropdownLanguageMobile from '../Components/DropdownLanguageMobile'
import { useMainStore } from '@/stores'

const modal_lang = ref(false)

// DATA

const hotelStore = useHotelStore()
const { hotelData } = hotelStore
const mainStore = useMainStore()
const storageUrl = mainStore.URL_STORAGE

//meta variables
    
//PROVIDE
provide('modal_lang', modal_lang)
//INJECT
// const hoster = inject('hoster')

onMounted(() => {
    // Crear la etiqueta meta y atributos
    console.log('ksuhks',hotelStore.$loadImage(hotelData?.image))
    const metaTag = document.createElement('meta');
    metaTag.name = 'og:image';
    metaTag.content = hotelStore.$loadImage(hotelData?.image);
    metaTag.title = hotelData?.name;

    console.log('metaTag',metaTag)

    // Agregar la etiqueta meta al <head>
    document.head.appendChild(metaTag);
})

//COMPUTEDS
// const slug_hoster = usePage().props.value.user_hoster.slug;
//FUNCTIONS


function go_hosterhome () {
// if(slug_hoster){
//     Inertia.get(route('hoster.home', {hoster:slug_hoster}));
// }
}
</script>

<style scoped>
.non-selectable-text {
user-select: none; /* Evita que el texto sea seleccionable */
cursor: default; /* Cambia el cursor a la forma predeterminada (por ejemplo, flecha) */
}
#header{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    background: var(--th-bg-card-blur-gray-default, rgba(206, 206, 206, 0.10));
    backdrop-filter: blur(40px);
}
a:hover {
    color: var(--h-gray-200) !important;
}
.header-placeholder {
    height: 4.5rem;
}
.icon-menu > img{
    margin-top: 9px;
    transition: all 0.5s;
}
.icon-menu:hover > img{
    width: 4rem;
    height: 3rem;
    margin-top: 7px;
}
.icon-notify{
    height: 3rem;
    margin-top: 7px !important;
}
.icon-menu:hover > .icon-notify{
    height: 3.6rem;
    margin-top: 4px !important;
}
.active{
    width: 100%;
    margin-top: 8px;
    border-top: 2px solid var(--h-white-100);
}

@media (max-width: 1028px) {
    .search-desk {
        display:none
    }

    .log-desk {
        display: none;
    }
}

@media (min-width: 1028px) {
    .search-tablet {
        display:none
    }
}
</style>
