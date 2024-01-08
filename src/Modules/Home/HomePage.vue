<template>
        <MenuHome />
        
        <!-- card banner -->
        <section class="relative h-[210px] sp:h-[345px] lg:h-screen">            
            <img 
                class="absolute inset-0 object-cover w-full h-[150px] sp:h-[240px] lg:h-full"
                :src="`${hotelData?.image ? storageUrl+hotelData?.image :storageUrl+'/storage/gallery/general-1.jpg'}`" 
                :alt="hotelData.name"
            >
            <div class="hidden lg:block absolute inset-x-0 bottom-0 h-16" :style="`background-image: url('/assets/img/home/gradient-white.png'); background-repeat: no-repeat;  background-size: 100% 64px;`"></div>
        </section>
        <!-- end card banner -->

    </template>
    
    <script setup>
        //import libraries
        import {
            onMounted,
            ref,
            // inject,
            provide,
            // defineProps
        } from 'vue';
        import { useHotelStore } from '@/stores/modules/hotel'
        //toRefs,
        // import { useMainStore } from '@/stores'
        // import { useHotelStore } from '@/stores/modules/hotel'

        // import {$slufy} from '@/util/helpers.js'
        //imports components
        import MenuHome from '@/layout/Components/MenuHome.vue'
        // import CossSelingPlace from '../../Landing/Components/CossSelingPlace'
        // import CossSelingActivity from '../../Landing/Components/CossSelingActivity'
        // import CarouselFacilities from '../Components/CrossSellingFacilities'
        // import SiderBarHome from '../../Landing/Layout/SiderBarHome'
        // import FormGuest from './FormGuest'
        // import FormStay from './FormStay'
        // import FakeGuestWelcome from './FakeGuestWelcome'
        // import PopUpSurvey from './PopUpSurvey'
    
        // const hotelStore = useHotelStore();
        // const hotel = hotelStore.hotelData
        const storageUrl = process.env.VUE_APP_STORAGE_URL
        const hotelStore = useHotelStore()
        const { hotelData } = hotelStore

        //DATA STATIC
        
        // const IMAGE_HOME_DEFAULT = require('@/assets/img/home/home1.png')
        // const IMAGE_GRADIENT_WHITE = require('@/assets/img/home/gradient-white.png')

        /*const translate = {
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
        }*/
    
        //Props
        // const props = defineProps({
        //     hoster: {
        //         type: Object,
        //         default: () => ({}),
        //     },
        //     stay_session: {
        //         type: Object,
        //         default: () => ({}),
        //     },
        //     summary_reviews: {
        //         type: Object,
        //         default: () => ({}),
        //     },
        //     cross_selling_place_visit: {
        //         type:Array,
        //         default: () => ([]),
        //     },
        //     cross_selling_place_eat: {
        //         type:Array,
        //         default: () => ([]),
        //     },
        //     cross_selling_place_leisure: {
        //         type:Array,
        //         default: () => ([]),
        //     },
        //     cross_selling_experiences: {
        //         type:Array,
        //         default: () => ([]),
        //     },
        //     facilities: {
        //         type:Array,
        //         default: () => ([]),
        //     },
        //     leisure_id: {
        //         type:String,
        //         default: () => null,
        //     },
        //     whereeat_id: {
        //         type:String,
        //         default: () => null,
        //     },
        //     whatvisit_id: {
        //         type:String,
        //         default: () => null,
        //     },
        //     mockup_url: {
        //         type:Boolean,
        //         default: false,
        //     },
        //     subject: {
        //         type:String,
        //         default: () => null,
        //     },
        //     categories_places_defaults:{
        //         type:Array,
        //         default: () => [],
        //     },
        // })
    
        // const { hoster, stay_session, summary_reviews, cross_selling_experiences, mockup_url } = toRefs(props)
    
        // INSTANCE STORE
        // const mainStore = useMainStore()

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
        // const $moment = inject('moment')
        // const screen_width= screen.width
        
    
        //ONMOUNTED
        onMounted(() => {
            get_params()
            some_modal()


        })
    
        //COMPUTED
    
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
    
        // function goAbout () {
        //     // Inertia.get(route('hoster.about.us', {hoster:slug_hoster}));
        // }
    
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
    