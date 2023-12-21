<template>
    <Layout>
        <MenuHome />
        <!-- <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]" /> -->
        
        <!-- card banner -->
        <section class="relative h-[210px] sp:h-[345px] lg:h-screen">
            <div class="w-full h-[150px] sp:h-[240px] lg:h-full relative">
                <div v-if="hotel.image" class="absolute inset-0 bg-cover bg-center" :style="'background-image: url('+hotel.image+')'"></div>
                <div v-else class="absolute inset-0 bg-cover bg-center" style="background-image: url('/vendor_asset/img/home/home1.png');"></div>            
                <div class="hidden lg:block absolute inset-x-0 bottom-0 h-16" style="background-image: url('/vendor_asset/img/home/gradient-white.png'); background-repeat: no-repeat;  background-size: 100% 64px;"></div>
                <div
                    class="block lg:hidden absolute inset-x-0 -bottom-0.5 w-full"
                    :class="hoster.show_profile || stay_session?.stay?.room || $utils.isMockup() ? 'h-[40px] sp:h-16 gradient-top' : 'h-[30px] sp:h-12 gradient-top-min'"
                    style="background-image: url('/vendor_asset/img/home/gradient.png'); background-repeat: no-repeat;"
                />
            </div>
            <div
                class="lg:hidden w-full"
                :class="hoster.show_profile || stay_session?.stay?.room  || $utils.isMockup() ? 'h-[70px] sp:h-[111px] gradient-bottom' : 'h-[30px] sp:h-[40px] gradient-bottom-min'"
                style="background-image: url('/vendor_asset/img/home/gradient-mobile.png'); background-repeat: no-repeat; object-fit: cover;"
            />
            <div
                v-if="stay_session?.guest"
                :class="hoster.show_profile || stay_session?.stay?.room ? 'bottom-[8px] sp:bottom-[14px]' : 'bottom-[32px] sp:bottom-[56px] sp:bottom-[64px]'"
                class="absolute left-0 md:bottom-0 w-full lg:pb-[40px] flex justify-center"
            >
                <div v-if="stay_session?.stay && stay_session?.guest?.name" class="container-fluid-landing">
                    <div class="w-full lg:w-[453px] rounded-xl pt-2.5 pl-2.5 sp:pt-4 sp:pl-4 z-[10000]" style="background: rgba(206, 206, 206, 0.10); backdrop-filter: blur(40px)">
                        <!-- mb-3 sp:mb-4 -->
                        <div
                            :class="hoster.show_profile || stay_session?.stay?.room ? 'mb-2.5 sp:mb-4' : 'pb-[8px] sp:pb-[16px]'"
                            class="flex justify-between pr-[10px] sp:pr-[16px]"
                        >
                            <div class="w-[90px] sp:w-[184px] lg:w-[309px] truncate-1">
                                <!-- mb-2 sp:mb-3 -->
                                <h2
                                    class="text-[12px] leading-[20px] sp:leading-[33px] sp:text-[22px] text-white font-medium"
                                    :class="{'stay_session && stay_session.guest': !hoster.show_profile && !stay_session?.stay?.room}"
                                >
                                    {{translate.welcome[$page.props.language.toLowerCase()]}}
                                </h2>
                                <h2
                                    class="text-[12px] leading-[20px] sp:leading-[33px] sp:text-[22px] text-white font-medium truncate-1"
                                    :class="{'stay_session && stay_session.guest': !hoster.show_profile && !stay_session?.stay?.room}"
                                >
                                    {{ $utils.titleCase(stay_session.guest.name) }}
                                </h2>
                            </div>
                            <div class="flex">
                                <div class="text-center mr-2.5 sp:mr-4">
                                    <h4 v-if="stay_session?.stay?.check_in" class="text-white text-xs sp:text-base font-medium">{{ $moment(stay_session?.stay?.check_in).format('DD/MM') }}</h4>
                                    <h6 v-if="stay_session?.stay?.hour_checkin" class="text-white text-[8px] sp:text-xs font-medium">{{ stay_session?.stay?.hour_checkin }}</h6>
                                </div>
                                <div class="text-center">
                                    <h4 v-if="stay_session?.stay?.check_out" class="text-white text-xs sp:text-base font-medium">{{$moment(stay_session?.stay?.check_out).format('DD/MM')}}</h4>
                                    <h6 v-if="stay_session?.stay?.hour_checkout" class="text-white text-[8px] sp:text-xs font-medium">{{ stay_session?.stay?.hour_checkout }}</h6>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="hoster.show_profile || stay_session?.stay?.room"
                            class="flex items-end w-full justify-between"
                            :class="{'justify-between': stay_session?.stay?.room && hoster.show_profile, 'justify-start': stay_session?.stay?.room && !hoster.show_profile, 'justify-end':  !stay_session?.stay?.room && hoster.show_profile,'no-hover':$utils.isMockup()}"
                        >
                            <div
                                v-if="stay_session?.stay?.room"
                                class="text-start pb-[8px] sp:pb-[16px]"
                            >
                                <h4 class="text-white text-[6px] sp:text-[10px] lg:text-xs font-semibold">
                                    {{translate.room[$page.props.language.toLowerCase()]}}
                                </h4>
                                <h6 class="text-white text-lg sp:text-[22px] font-medium">{{ stay_session?.stay?.room }}</h6>
                            </div>
                            <!-- v-if="hoster.show_profile" -->
                            <button
                                v-if="$page.props.user_hoster.show_profile"
                                class="hbtn-blur p-2 rounded-md font-medium text-[10px] sp:text-sm text-white underline mb-[5px] sp:mb-[8px] mr-[5px] sp:mr-[8px]"
                                :class="{'hcursor-mobile':$utils.isMockup()}"
                                :disabled="$utils.isMockup()"
                                @click="goAbout()"
                            >
                                {{translate.more_info[$page.props.language.toLowerCase()]}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <FakeGuestWelcome v-if="$utils.isMockup()" /> -->
        </section>
    
        <!-- carousel's -->
        <!-- <div class="mb-4 sp:mb-6" :class="{'-mt-8': !hoster.show_profile && !stay_session?.stay?.room && !$utils.isMockup()}">
            <section v-if="facilities.length > 0" id="h-home-facilities" class="container-fluid-landing pr-mobile-0">
                <div class="flex justify-between items-center mt-4 sp:mt-8">
                    <h2 class="text-xs sp:text-base lg:text-lg font-medium">
                        {{translate.facilities.title[$page.props.language.toLowerCase()]}}
                    </h2>
                    <a 
                        @click="go_facilities()" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)"
                        :class="{'hcursor-mobile no-hover':$utils.isMockup()}"
                    >
                        {{translate.see_all[$page.props.language.toLowerCase()]}}
                    </a>
                </div>
                <div class="mt-2.5 sp:mt-4">
                    <CarouselFacilities id="1" :data="facilities"/>
                </div>
            </section>
    
            <section v-if="cross_selling_place_visit.length > 0" id="h-home-whatvisit" class="container-fluid-landing pr-mobile-0">
                <div class="flex justify-between items-center mt-4 sp:mt-8">
                    <h2 class="text-xs sp:text-base lg:text-lg font-medium">
                        {{translate.what_visit.title[$page.props.language.toLowerCase()]}}
                    </h2>
                    <a 
                        @click="go_places(whatvisit_id, categories_places_defaults?.whatvisit?.id)" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)"
                        :class="{'hcursor-mobile no-hover':$utils.isMockup()}"
                    >
                        {{translate.see_all[$page.props.language.toLowerCase()]}}
                    </a>
                </div>
                <div class="mt-2.5 sp:mt-4">
                    <CossSelingPlace id="0" :data="cross_selling_place_visit" place />
                </div>
            </section>
    
            <section v-if="cross_selling_place_eat.length > 0" id="h-home-whereeat" class="container-fluid-landing pr-mobile-0">
                <div class="flex justify-between items-center mt-4 sp:mt-8">
                    <h2 class="text-xs sp:text-base lg:text-lg font-medium">
                        {{translate.where_eat.title[$page.props.language.toLowerCase()]}}
                    </h2>
                    <a 
                        @click="go_places(whereeat_id, categories_places_defaults?.whereeat?.id)" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)"
                        :class="{'hcursor-mobile no-hover':$utils.isMockup()}"
                    >
                        {{translate.see_all[$page.props.language.toLowerCase()]}}
                    </a>
                </div>
                <div class="mt-2.5 sp:mt-4">
                    <CossSelingPlace id="1" :data="cross_selling_place_eat" place />
                </div>
            </section>
            
            <section v-if="cross_selling_place_leisure.length > 0" id="h-home-leisure" class="container-fluid-landing pr-mobile-0">
                <div class="flex justify-between items-center mt-4 sp:mt-8">
                    <h2 class="text-xs sp:text-base lg:text-lg font-medium">
                        {{translate.leisure.title[$page.props.language.toLowerCase()]}}
                    </h2>
                    <a 
                        @click="go_places(leisure_id, categories_places_defaults?.leisure?.id)" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)"
                        :class="{'hcursor-mobile no-hover':$utils.isMockup()}"
                    >
                        {{translate.see_all[$page.props.language.toLowerCase()]}}
                    </a>
                </div>
                <div class="mt-2.5 sp:mt-4">
                    <CossSelingPlace id="2" :data="cross_selling_place_leisure" place />
                </div>
            </section>
    
            <section v-if="cross_selling_experiences.length > 0 && hoster.show_experiences" id="h-home-experiences" class="container-fluid-landing pr-mobile-0">
                <div class="flex justify-between items-center mt-4 sp:mt-8">
                    <h2 class="text-xs sp:text-base lg:text-lg font-medium">
                        {{translate.experiences.title[$page.props.language.toLowerCase()]}}
                    </h2>
                    <a @click="go_experiences" class="text-[10px] sp:text-sm underline see_all mr-3.5 lg:mr-0" href="javascript:void(0)">
                        {{translate.see_all[$page.props.language.toLowerCase()]}}
                    </a>
                </div>
                <div class="mt-2.5 sp:mt-4">
                <CossSelingActivity id="0" :data="cross_selling_experiences" />
                </div>
            </section>
        </div> -->
        
        <!-- modal's -->
        <!-- <FormGuest :stay_session="stay_session" :hotel="hoster" :subject="subject"/>
        <FormStay :stay_session="stay_session" :hotel="hoster" :guest_id="stay_session.guest?.id"/>
        <template v-if="!stay_session?.stay_survey">
            <PopUpSurvey />
        </template> -->
    </Layout>
    </template>
    
    <script setup>
        //import libraries
        import { onMounted, ref, inject, computed, provide, defineProps } from 'vue';//toRefs,
    
        // import {$slufy} from '@/util/helpers.js'
        //imports components
        import Layout from '@/layout/AppLayout.vue'
        import MenuHome from '@/layout/MenuHome.vue'
        // import CossSelingPlace from '../../Landing/Components/CossSelingPlace'
        // import CossSelingActivity from '../../Landing/Components/CossSelingActivity'
        // import CarouselFacilities from '../Components/CrossSellingFacilities'
        // import SiderBarHome from '../../Landing/Layout/SiderBarHome'
        // import FormGuest from './FormGuest'
        // import FormStay from './FormStay'
        // import FakeGuestWelcome from './FakeGuestWelcome'
        // import PopUpSurvey from './PopUpSurvey'
    
    
        //PROVIDE
    
        //DATA STATIC
        const translate = {
            facilities: {
                title: {
                    es: 'Instalaciones',
                    en: 'Facilities',
                    fr: 'Installations',
                },
            },
            what_visit: {
                title: {
                    es: 'Qué visitar',
                    en: 'What to visit',
                    fr: 'Que visiter',
                }
            },
            where_eat: {
                title: {
                    es: 'Dónde comer',
                    en: 'Where to eat',
                    fr: 'Où manger',
                },
            },
            leisure: {
                title: {
                    es: 'Ocio',
                    en: 'Leisure',
                    fr: 'Loisirs',
                },
            },
            see_all: {
                es: 'Ver todo',
                en: 'See all',
                fr: 'Voir tout',
            },
            experiences: {
                title: {
                    es: 'Experiencias',
                    en: 'Experiences',
                    fr: 'Expériences',
                }
            },
            welcome: {
                es: 'Bienvenido',
                en: 'Welcome',
                fr: 'Accueillir',
            },
            room: {
                es: 'HAB',
                en: 'ROOM',
                fr: 'CHAMBRE',
            },
            more_info:{
                es: 'Más información',
                en: 'More information',
                fr: "Plus d'informations",
            }
        }
    
        //Props
        const props = defineProps({
            hoster: {
                type: Object,
                default: () => ({}),
            },
            stay_session: {
                type: Object,
                default: () => ({}),
            },
            summary_reviews: {
                type: Object,
                default: () => ({}),
            },
            cross_selling_place_visit: {
                type:Array,
                default: () => ([]),
            },
            cross_selling_place_eat: {
                type:Array,
                default: () => ([]),
            },
            cross_selling_place_leisure: {
                type:Array,
                default: () => ([]),
            },
            cross_selling_experiences: {
                type:Array,
                default: () => ([]),
            },
            facilities: {
                type:Array,
                default: () => ([]),
            },
            leisure_id: {
                type:String,
                default: () => null,
            },
            whereeat_id: {
                type:String,
                default: () => null,
            },
            whatvisit_id: {
                type:String,
                default: () => null,
            },
            mockup_url: {
                type:Boolean,
                default: false,
            },
            subject: {
                type:String,
                default: () => null,
            },
            categories_places_defaults:{
                type:Array,
                default: () => [],
            },
        })
    
        // const { hoster, stay_session, summary_reviews, cross_selling_experiences, mockup_url } = toRefs(props)
    
        //DATA
        const modal_lang = ref(false)
        const mockup = ref(false)
        // const form_search = useForm({
        //     search: '',
        //     lng: '',
        //     type: '',
        //     id: null,
        //     date: null,
        // })
        // const slug_hoster = usePage().props.value.user_hoster.slug;
        
        //PROVIDE
        provide('mockup', mockup)
        // provide('form_search', form_search)
        provide('modal_lang', modal_lang)
        // provide('hoster', hoster)
        // provide('hotel', hotel)
        // provide('stay_session', stay_session)
        // provide('summary_reviews', summary_reviews)
        //INJECT
        const $moment = inject('moment')
        // const screen_width= screen.width
        
    
        //ONMOUNTED
        onMounted(() => {
            get_params()
            console.log('categories_places_defaults', props.categories_places_defaults)
            some_modal()
        })
    
        //COMPUTED
        const  hotel = computed(() => {
            // return usePage().props.value.user_hoster
            return {
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
            }
        })
    
        //FUNCTIONS
        function some_modal(){
            // if(!mockup_url.value){    
                //solo si no es un mockup
                // if(!stay_session.value.guest || (stay_session.value.guest && props.subject)){
                    // $('#form-guest').modal('show')
                // }else if(!stay_session.value.stay){
                    // $('#form-stay').modal('show')
                // }
            // }
        }
        // function go_experiences () {
            // Inertia.get(route('activities.list', {hoster:slug_hoster}));
        // }
    
        // function go_places (typeplace, categoriplace) {
            // let mobile = 0;
            // if(screen_width < 767)mobile = 1;
            // Inertia.get(route('places.list', {hoster:slug_hoster,typeplace,categoriplace,mobile}));
        // }
    
        // function go_facilities () {
            // Inertia.get(route('hoster.home.facility.view.huesped', {hoster:slug_hoster}));
        // }
        function get_params () {
            let url = window.location.href
            let queryString = url.split('?')?.[1]
            if(!queryString) return
            let params = new URLSearchParams(queryString)
            let param = params.get('mockup')
            if (param) {
                mockup.value = true
            }
        }
    
        function goAbout () {
            // Inertia.get(route('hoster.about.us', {hoster:slug_hoster}));
        }
    
    </script>
    
    <style scoped>
    .underline{
        text-decoration: underline !important;
    }
    .see_all:hover{
        font-weight: 500;
    }
    #logo-preview {
      max-width: 70px;
      max-height: 70px;
      width: auto;
      height: auto;
      object-fit: contain;
    }
    
    .gradient-top {
        background-size: 100% 40px;
    }
    .gradient-bottom {
        background-size: 100% 70px;
    }
    .gradient-top-min {
        background-size: 100% 30px;
    }
    .gradient-bottom-min {
        background-size: 100% 30px;
    }
    
    @media (max-width:767px){
        .pr-mobile-0{
            padding-right: 0px !important;
        }
        #logo-preview {
            margin-left: auto;
        }
    }
    
    @media (min-width:300px){
        .gradient-top {
            background-size: 100% 64px;
        }
        .gradient-bottom {
            background-size: 100% 111px;
        }
        .gradient-top-min {
            background-size: 100% 48px;
        }
        .gradient-bottom-min {
            background-size: 100% 40px;
        }
        #logo-preview {
            max-width: 80px;
            max-height: 80px;
        }
    }
    @media (min-width:1280px){
    
         #logo-preview {
            max-width: 260px;
            max-height: 260px;
        }
    }
    
    @media (min-width:1920px){
    
    }
    
    
    </style>
    