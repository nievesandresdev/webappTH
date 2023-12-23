<template>
    <div
        class="fixed bottom-0 left-0 w-full z-20 shadow-md border-t-2 border-gray-300 bg-white pt-2.5 sp:pt-3.5 sp:pb-3.5"
    >
    <!-- :class="!hotel.chat_settings?.show_guest && !hotel.show_experiences ? 'px-10 sp:px-12' : 'px-4 sp:px-6'" -->
        <div class="flex justify-between">
            <div
                class="text-center no-link flex-col item-justify w-[56px] sp:w-[66px]"
            >
            <!-- @click="go_route(route('hoster.home', {hoster: slug_hoster}))" -->
                <!-- <img
                    v-if="$page.props.route_name == 'hoster.home' || $page.url.includes('sobre-nosotros')"
                    class="mx-auto  w-4 h-4 sp:w-6 sp:h-6"
                    :src="`/icons/layout/home-hover.svg`"
                    alt="menu_home"
                > v-else-->
                <img
                    
                    class="mx-auto  w-4 h-4 sp:w-6 sp:h-6"
                    :src="`/icons/layout/home-default.svg`"
                    alt="menu_home"
                >
                <span class="text-[6px] sp:text-[10px] block mt-[2px] sp:mt-1">
                    {{ translate.layout.menu_mobile.home[lang_app] }}
                </span>
            </div>
            <div
                class="text-center no-link flex-col item-justify w-[56px] sp:w-[66px]"
            >
                <!-- @click="go_route(route('hoster.home.facility.view.huesped', { hoster: slug_hoster }))"
                <img
                    class="mx-auto w-4 h-4 sp:w-6 sp:h-6"
                    :src="`/icons/layout/instalations-hover.svg`"
                    alt="menu_home"
                    v-if="$page.url.includes('instalaciones')"
                > v-else-->
                <img
                    class="mx-auto w-4 h-4 sp:w-6 sp:h-6"
                    :src="`/icons/layout/instalations-default.svg`"
                    alt="menu_instalations"
                    
                >
                <span class="text-[6px] sp:text-[10px] block mt-[2px] sp:mt-1">
                {{ translate.layout.menu_mobile.instalación[lang_app] }}
                </span>
            </div>
            <div
                class="text-center no-link flex-col item-justify w-[56px] sp:w-[66px]"
            >
                <!-- @click="go_route(route('places.list', {hoster: slug_hoster}))"
                <img
                    class="mx-auto w-4 h-4 sp:w-6 sp:h-6"
                    :src="`/icons/layout/explora-hover.svg`"
                    alt="menu_home"
                    v-if="$page.url.includes('places') || $page.url.includes('place')"
                >v-else -->
                <img
                    class="mx-auto w-4 h-4 sp:w-6 sp:h-6"
                    :src="`/icons/layout/explora-default.svg`"
                    alt="menu_explorer"
                >
                <span class="text-[6px] sp:text-[10px] block mt-[2px] sp:mt-1">
                    {{ translate.layout.menu_mobile.explore[lang_app] }}
                </span>
            </div>
            <div
                class="text-center no-link flex-col item-justify w-[56px] sp:w-[66px]"
                
            >
                <!-- v-if="hotel.show_experiences"
                @click="go_route(route('activities.list', {hoster:slug_hoster}))"
                :src="($page.props.route_name == 'activities.list') || ($page.props.route_name == 'experiences.show') ?
                        '/icons/layout/camera-hover.svg' : '/icons/layout/camera-default.svg'" -->
                <img
                    class="mx-auto w-4 h-4 sp:w-6 sp:h-6"
                    alt="menu_exp"
                    src="/icons/layout/camera-default.svg"
                >
                <span class="text-[6px] sp:text-[10px] block mt-[2px] sp:mt-1">
                {{ translate.layout.menu_mobile.experience[lang_app] }}
                </span>
            </div>
            <!-- v-if="hotel.chat_settings?.show_guest && ($utils.isMockup() || (!$utils.isMockup() && stay_session))" -->
            <div
                class="text-center no-link flex-col item-justify w-[56px] sp:w-[66px] relative"
                @click="mark_read_msgs"
            >
                <!-- <span v-if="msgs_unread && route().current() !== 'chat.mobile'" class="hbg-warning h-3 w-3 rounded-full absolute right-0 top-0 left-4 mx-auto z-10"></span> -->
                <!-- :src="(route().current() == 'chat.mobile') || ($page.url.includes('m-chat-fake')) ?
                        '/icons/layout/1.TH.ChatBubble.svg' : '/icons/layout/estancia/Chatbubblelineoutline.svg'" -->
                <img
                    class="mx-auto w-4 h-4 sp:w-6 sp:h-6"
                    src="/icons/layout/1.TH.ChatBubble.svg"
                    alt="menu_exp_chat"
                >
                <span class="text-[6px] sp:text-[10px] block mt-[2px] sp:mt-1">
                    Chat
                </span>
            </div>
        </div>
    </div>
    
</template>

<script setup>
    import { ref, provide, onMounted, defineProps, defineEmits } from 'vue'

    defineProps({
        msgs_unread: {
            type: Boolean,
            default: false,
        },
    })

    const emit  = defineEmits(['mark_read_msgs'])
    //ONMOUNTED
    onMounted(() => {
        //
    })

    //DATA
    const lang_app = ref('es')
    const modal_lang = ref(false)
    const modal_find_reserve = ref(false)
    const modal_reserve = ref(false)
    const translate = {
        layout: {
            menu_mobile: {
                home: {
                    es: 'Home',
                    en: 'Home',
                    fr: 'Maison',
                },
                instalación: {
                    es: 'Instalaciones',
                    en: 'Facilities',
                    fr: 'Installations',
                },
                explore: {
                    es: 'Explora',
                    en: 'Explore',
                    fr: 'Explorer',
                },
                experience: {
                    es: 'Experiencias',
                    en: 'Experiences',
                    fr: 'Expériences',
                },
            }
        },
    }
    // const isMockup = usePage().url.value.includes('mockup=true');
    // const stay_session = usePage().props.value.stay_session
    // const hotel = usePage().props.value.user_hoster;
    // const slug_hoster = hotel.slug;

    //PROVIDE
    provide('modal_lang', modal_lang)
    provide('modal_find_reserve', modal_find_reserve)
    provide('modal_reserve', modal_reserve)
    //COMPuted
    //FUNCTIONS
    function mark_read_msgs(){
        // if(!isMockup){
            // Inertia.get(route('chat.mobile', {hoster:slug_hoster}))
            emit('mark_read_msgs')
        // }
    }

    // function go_route(ruta){
        // if(!isMockup){
            // Inertia.get(ruta)
        // }
    // }

</script>

<style scoped>
    .bottom-mockup{
        bottom: -12px !important;
    }
    .font-black-defatul {
        color: #333333;
        font-weight: 500;
        line-height: 90%;
        font-size: 10px;
    }

    .font-black-hover {
        color: #333333;
        font-weight: 500;
        line-height: 90%;
        font-size: 10px;
    }
    .menu-mobile{
        height: 64px;
    }
    .text-sp{
        font-size: 8px;
    }
    @media (max-width:250px){
        .xs\:py-2 {
            padding-top: 8px;
            padding-bottom: 8px;
        }
        .xs\w-4{
            width: 16px;
        }
        .xs\h-4{
            height: 16px;
        }
        .xs:\text-sp{
            font-size: 8px;
        }
    }

     @media (min-width:640px){
        .font-black-defatul {
            font-size: 10px;
        }

        .font-black-hover {
            font-size: 10px;
        }
     }



    .no-link {
        text-decoration: none!important;;
    }
</style>
