<template>
    <header id="header" class="shadow-md  bg-white">
        <div class="container-fluid-landing py-2.5 w-full flex justify-between items-center">
            <div class="flex items-center">
                <div  class="ml-2 md:ml-6 md:mr-6 relative">
                    <a 
                        @click="go_hosterhome" 
                        href="javascript:void(0)" 
                        class="font-medium no-underline"
                    >
                        Home
                    </a>
                    <div class="active absolute top-5 left-0 w-full" v-if="$route.name == 'homePage'" />
                </div>
                <div  class="ml-2 md:ml-6 md:mr-6 md:mr-6 relative">
                    <!-- <Link :href="route('hoster.home.facility.view.huesped', { hoster: slug_hoster })" > -->
                    <a href="javascript:void(0)" class="font-medium no-underline">
                        {{translate.facilities[lang_web]}}
                    </a>
                    <div class="active absolute top-5 left-0 w-full" v-if="false" />
                </div>
                <div class="ml-2 md:ml-6 md:mr-6 md:mr-6 relative">
                    <a href="javascript:void(0)" class="font-medium no-underline">
                        {{translate.places[lang_web]}}
                    </a>
                    <div class="active absolute top-5 left-0" v-if="false" />
                </div>
                <!-- v-if="hotel.show_experiences" -->
                <div class="ml-2 md:ml-6 md:mr-6 md:mr-6 relative">
                    <a href="javascript:void(0)" class="font-medium no-underline">
                        {{translate.experiences[lang_web]}}
                    </a>
                    <div class="active absolute top-5 left-0" v-if="false" />
                </div>
            </div>
            <div class="flex content-center">
                <div class="search-desk lg:block" v-if="$route.name == 'Places' || $route.name == 'Place' || $route.name == 'Experiences'">
                <!-- <InputSearchExperince /> -->
                </div>
                <!-- <DropdownLanguage /> -->
            </div>
        </div>
        <div  class="container-fluid-landing pb-3 search-tablet" v-if="$route.name == 'Places' || $route.name == 'Experience' || $route.name == 'Experiences'">
            <!-- <InputSearchExperince /> -->
        </div>
    </header>
</template>

<script setup>
    import { ref, provide } from 'vue'
    // import DropdownLanguage from '../Components/DropdownLanguage'
    // import InputSearchExperince from '../Components/InputSearchExperince'

    const modal_lang = ref(false)
    // const slug_hoster = usePage().props.value.user_hoster.slug;
    
    //PROVIDE
    provide('modal_lang', modal_lang)

    //COMPUTEDS

    // const hotel = usePage().props.value.user_hoster;
    const lang_web = 'es';
    const translate = {
        facilities :{
            "es": "Instalaciones",
            "en": "Facilities",
            "fr": "Installations"
        },
        places :{
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

    
    //FUNCTIONS
    function go_hosterhome () {
        // if(slug_hoster){
        //     console.log(slug_hoster)
        //     // Inertia.get(route('hoster.home', {hoster:slug_hoster}));
        // }
    }

    

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