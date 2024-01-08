<template>
    <header
        class="fixed bottom-0 left-0 w-full z-20 shadow-md border-t-2 border-gray-300 bg-white pt-2.5 sp:pt-3.5 sp:pb-3.5"
    >
    <!-- :class="!hotel.chat_settings?.show_guest && !hotel.show_experiences ? 'px-10 sp:px-12' : 'px-4 sp:px-6'" -->
        <ul class="flex justify-between">
            <li
                class="text-center no-link flex-col item-justify w-[56px] sp:w-[66px]"
            >
                <img
                    class="mx-auto  w-4 h-4 sp:w-6 sp:h-6"
                    :src="['home', 'about'].includes($route.name) ? `/assets/icons/home-hover.svg` : `/assets/icons/home-default.svg`"
                    alt="TH.HOME"
                >
                <span class="text-[6px] sp:text-[10px] block mt-[2px] sp:mt-1">
                    Home
                </span>
            </li>
            <li
                class="text-center no-link flex-col item-justify w-[56px] sp:w-[66px]"
            >
                <img
                    class="mx-auto w-4 h-4 sp:w-6 sp:h-6"
                    :src="['facility'].includes($route.name) ? `/assets/icons/instalations-hover.svg` : `/assets/icons/instalations-default.svg`"
                    alt="TH.FACILITY"
                >
                <span class="text-[6px] sp:text-[10px] block mt-[2px] sp:mt-1">
                    {{ $utils.capitalize($t('layout.header.facilities')) }}
                </span>
            </li>
            <li
                class="text-center no-link flex-col item-justify w-[56px] sp:w-[66px]"
            >
                <img
                    class="mx-auto w-4 h-4 sp:w-6 sp:h-6"
                    :src="['placeList', 'placeShow'].includes($route.name) ? `/assets/icons/explora-hover.svg` : `/assets/icons/explora-default.svg`"
                    alt="TH.PLACE"
                >
                <span class="text-[6px] sp:text-[10px] block mt-[2px] sp:mt-1">
                    {{ $utils.capitalize($t('layout.header.explore')) }}}
                </span>
            </li>
            <li
                class="text-center no-link flex-col item-justify w-[56px] sp:w-[66px]"
                
            >
                <img
                    class="mx-auto w-4 h-4 sp:w-6 sp:h-6"
                    :src="['experinceList', 'experinceShow'].includes($route.name) ? `/assets/icons/camera-hover.svg` : `/assets/icons/camera-default.svg`"
                    alt="TH.EXPERINCE"
                >
                <span class="text-[6px] sp:text-[10px] block mt-[2px] sp:mt-1">
                    {{ $utils.capitalize($t('layout.header.experinces')) }}
                </span>
            </li>
            <li
                class="text-center no-link flex-col item-justify w-[56px] sp:w-[66px] relative"
                @click="mark_read_msgs"
            >
                <img
                    class="mx-auto w-4 h-4 sp:w-6 sp:h-6"
                    :src="['chat'].includes($route.name) ? `/assets/icons/1.TH.ChatBubble.svg` : `/assets/icons/Chatbubblelineoutline.svg`"
                    alt="TH.CHAT"
                >
                <span class="text-[6px] sp:text-[10px] block mt-[2px] sp:mt-1">
                    Chat
                </span>
            </li>
        </ul>
    </header>
    
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
    const modal_find_reserve = ref(false)
    const modal_reserve = ref(false)
    /* eslint-disable */
    const modal_lang = ref(false)

    // const isMockup = usePage().url.value.includes('mockup=true');
    // const stay_session = usePage().props.value.stay_session
    // const hotel = usePage().props.value.user_hoster;
    // const slug_hoster = hotel.slug;

    //PROVIDE
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
