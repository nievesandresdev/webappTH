<template>
    <header id="header" class="block h-[50px] sp:h-[72px]" style="z-index: 1000 !important;">
        <div class="container-fluid-landing flex items-center justify-start py-2.5 sp:py-4 pr-2">
            <div class=" w-[150px] sp:w-[207px] h-[20px] sp:h-[40px]">
                <template v-if="hotel.logo">
                    <img :src="hotel.logo" alt="Logo" class="w-auto h-[20px] sp:h-[40px]">
                </template>
                <template v-else>
                    <div class="w-full h-full flex items-center justify-start">   
                        <h4 
                            class="text-xs sp:text-base font-medium text-white"
                            :class="{
                                'non-selectable-text':!$utils.isMockup(),
                            }"
                        >
                            {{ hotel.name }}
                        </h4>
                    </div>
                </template>
            </div>
            <div class="hidden md:flex items-center  ml-[2.5rem]">

                <!--    HOME    -->
                <div class="relative mr-[40px]">
                    <a
                        @click="go_hosterhome"
                        href="javascript:void(0)"
                        class="hbtn-blur p-2 rounded-md font-medium no-underline htext-white-100 text-[0.875rem] mb-[0.5rem] "
                    >
                        Home
                    </a>
                    <div class="active mt-2 w-full" :class="{'invisible': !$route.name == 'homePage'}" />
                </div>

                <!--    INSTALACIONES    -->
                <div class="relative mr-[2.5rem]">
                    <a
                        class="hbtn-blur p-2 rounded-md font-medium no-underline htext-white-100 text-[0.875rem] mb-[0.5rem]"
                    >
                        {{translate.facilities[app_lang]}}
                    </a>
                    <!-- absolute top-5 left-0 -->
                    <div class="active mt-2 w-full"  :class="{'invisible': !$route.name == 'x'}" />
                </div>

                <!--    INSTALACIONES    -->
                <div class="relative mr-[2.5rem]">
                    <a
                        class="hbtn-blur p-2 rounded-md font-medium no-underline htext-white-100 text-[0.875rem] mb-[0.5rem]"
                    >
                        {{translate.places[app_lang]}}
                    </a>
                    <div class="active mt-2 w-full"  :class="{'invisible': !$route.name == 'x'}" />
                </div>

                <!--    INSTALACIONES    -->
                <div v-if="hotel.show_experiences" class="relative mr-[2.5rem]">
                    <a
                        class="hbtn-blur p-2 rounded-md font-medium no-underline htext-white-100 text-[0.875rem] mb-[0.5rem]"
                        :class="{'border-b-2 border-black': $route.name == 'x'}"
                    >
                        {{translate.experiences[app_lang]}}
                    </a>
                    <div class="active mt-2 w-full"  :class="{'invisible': !$route.name == 'x'}" />

                </div>
            </div>
            <div class="hidden md:flex items-center justify-end ml-auto">
                <!-- <DropdownLanguage /> -->
            </div>
        </div>
    </header>
    <!-- <DropdownLanguageMobile /> -->
</template>
<script setup>
import { ref, provide, onMounted } from 'vue'
// import DropdownLanguage from '../Components/DropdownLanguage'
// import DropdownLanguageMobile from '../Components/DropdownLanguageMobile'
const modal_lang = ref(false)

const hotel = {
                "id": 194,
                "name": "Hotel Tayko Sevilla",
                "type": "Hotel",
                "address": "Prta de Jerez, 3, 41004 Sevilla, España",
                "zone": "Sevilla",
                "category": null,
                "image": null,
                "phone": "+52123123123",
                "email": null,
                "latitude": "37.382342",
                "longitude": "-5.993942",
                "checkin": "02:22",
                "checkout": "14:31",
                "show_profile": 1,
                "slug": "hotel-tayko-sevillaah2",
                "subscription_active": null,
                "logo": null,
                "favicon": null,
                "name_origin": "Hotel Tayko Sevilla",
                "subdomain": "hoteltaykosevilla4",
                "show_experiences": 0,
                "images": [],
                "language_names": [
                    {
                        "id": 76,
                        "name": "Hotel Tayko Sevilla",
                        "language": "es",
                        "zone": "Sevilla",
                        "description": null,
                        "type": "Hotel",
                        "hotel_id": 194,
                        "created_at": "2023-11-02T10:50:06.000000Z",
                        "updated_at": "2023-11-03T13:17:30.000000Z"
                    },
                    {
                        "id": 77,
                        "name": "Hotel Tayko Sevilla",
                        "language": "en",
                        "zone": "Sevilla",
                        "description": null,
                        "type": "Hotel",
                        "hotel_id": 194,
                        "created_at": "2023-11-02T10:50:07.000000Z",
                        "updated_at": "2023-11-03T13:17:30.000000Z"
                    },
                    {
                        "id": 78,
                        "name": "Hotel Tayko Sevilla",
                        "language": "fr",
                        "zone": "Sevilla",
                        "description": null,
                        "type": "Hotel",
                        "hotel_id": 194,
                        "created_at": "2023-11-02T10:50:07.000000Z",
                        "updated_at": "2023-11-03T13:17:30.000000Z"
                    }
                ],
                "chat_settings": {
                    "show_guest": true,
                    "hotel_id": 194
                }
            };
    const app_lang = 'es';
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
//PROVIDE
provide('modal_lang', modal_lang)
//INJECT
// const hoster = inject('hoster')

onMounted(() => {
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
