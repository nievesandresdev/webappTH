<template>
    <header id="header" class="shadow-md  bg-white">
        <div class="container-fluid-landing py-2.5 w-full flex justify-between items-center">
            <div class="flex items-center">
                <div  class="ml-2 mr-6 relative">
                    <a
                        class="font-medium no-underline text-sm"
                    >
                        Home
                    </a>
                    <div class="active absolute top-5 left-0 w-full" v-if="$route.name == 'Home'" />
                </div>
                <div  class="ml-2 mr-6 relative">
                    <!-- <Link :href="route('hoster.home.facility.view.huesped', { hoster: slug_hoster })" > -->
                    <a href="javascript:void(0)" class="font-medium no-underline text-sm">
                        {{ $utils.capitalize($t('layout.header.facilities')) }}
                    </a>
                    <div class="active absolute top-5 left-0 w-full" v-if="false" />
                </div>
                <div class="ml-2 mr-6 relative">
                    <a href="javascript:void(0)" class="font-medium no-underline text-sm">
                        {{ $utils.capitalize($t('layout.header.explore')) }}
                    </a>
                    <div class="active absolute top-5 left-0" v-if="false" />
                </div>
                <!-- v-if="hotel.show_experiences" -->
                <div class="ml-2 mr-6 relative">
                    <a href="javascript:void(0)" class="font-medium no-underline text-sm">
                        {{ $utils.capitalize($t('layout.header.experiences')) }}
                    </a>
                    <div class="active absolute top-5 left-0" v-if="$route.name == 'ExperienceList'" />
                </div>
            </div>
            <div class="flex content-center">
                <div class="search-desk lg:block" v-if="['PlaceList', 'PlaceDetail', 'ExperienceList', 'ExperienceDetail'].includes($route.name)">
                    <InputSearch />
                </div>
                <DropdownLanguage />
            </div>
        </div>
        <div  class="container-fluid-landing pb-3 search-tablet" v-if="['PlaceList', 'PlaceDetail', 'ExperienceList', 'ExperienceDetail'].includes($route.name)">
            <InputSearch />
        </div>
    </header>
</template>

<script setup>
    import { ref, provide, computed } from 'vue'
    import DropdownLanguage from './DropdownLanguage'
    import InputSearch from '@/components/InputSearch'

    // STATE
    import { useLocaleStore } from '@/stores/modules/locale'
    const localeStore = useLocaleStore()

    //COMPUTEDS

    // const hotel = usePage().props.value.user_hoster;
    const translate = {
        facilities :{
            "es": "Instalaciones",
            "en": "Facilities",
            "fr": "Installations"
        },
        PlaceList :{
            "es": "Explora",
            "en": "Explore ",
            "fr": "Explorer"
        },
        experiences :{
            "es": "Experiencias",
            "en": "Experiences",
            "fr": "Expériences"
        }
           
    }

    const l = computed(() => {
        return localStorage.getItem('locale') ?? 'nada'
    })

    

</script>

<style scoped>
    .active{
        width: 71px;
        border: 2px solid #333333;
    }
    a:hover {
        color: #000 !important;
        font-weight: 600 !important;
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
        margin-top: 7px;
        border: 2px solid #333333;
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