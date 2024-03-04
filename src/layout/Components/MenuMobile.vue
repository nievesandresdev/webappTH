<template>
    <header
        class="fixed bottom-0 left-0 w-full z-[2000] shadow-md border-t-2 border-gray-300 bg-white pt-2.5 sp:pt-3.5 sp:pb-3.5"
        :class="!hotelStore?.hotelData?.show_experiences ? 'px-10 sp:px-12' : 'px-4 sp:px-6'"
    >
        <ul class="flex justify-between">
            <router-link
                to="/"
                class="text-center no-link flex-col item-justify w-[42px] sp:w-[66px]"
            >
                <img
                    class="mx-auto  w-4 h-4 sp:w-6 sp:h-6"
                    :src="['Home', 'about'].includes($route.name) ? `/assets/icons/home-hover.svg` : `/assets/icons/home-default.svg`"
                    alt="TH.HOME"
                >
                <span class="text-[6px] sp:text-[10px] block mt-[2px] sp:mt-1">
                    Home
                </span>
            </router-link>
            <router-link
                to="/instalaciones"
                class="text-center no-link flex-col item-justify w-[42px] sp:w-[66px]"
            >
                <img
                    class="mx-auto w-4 h-4 sp:w-6 sp:h-6"
                    :src="['FacilityList','FacilityDetail'].includes($route.name) ? `/assets/icons/instalations-hover.svg` : `/assets/icons/instalations-default.svg`"
                    alt="TH.FACILITY"
                >
                <span class="text-[6px] sp:text-[10px] block mt-[2px] sp:mt-1">
                    {{ $utils.capitalize($t('layout.header.facilities')) }}
                </span>
            </router-link>
            <router-link
                to="/places"
                class="text-center no-link flex-col item-justify w-[42px] sp:w-[66px]"
            >
                <img
                    v-if="['PlaceList', 'PlaceDetail'].includes($route.name)"
                    class="mx-auto w-3.5 h-3.5 sp:w-5 sp:h-5 sp:mt-0.5"
                    src="/assets/icons/explora-hover.svg"
                    alt="TH.PLACE"
                >
                <img
                    v-else
                    class="mx-auto w-4 h-4 sp:w-6 sp:h-6"
                    src="/assets/icons/explora-default.svg"
                    alt="TH.PLACE"
                >
                <span 
                    class="text-[6px] sp:text-[10px] block" 
                    :class="['PlaceList', 'PlaceDetail'].includes($route.name) ? 'mt-1 sp:mt-[6px]': 'mt-[2px] sp:mt-1'"
                >
                    {{ $utils.capitalize($t('layout.header.explore')) }}
                </span>
            </router-link>
            <router-link
                to="/experiencias"
                class="text-center no-link flex-col item-justify w-[42px] sp:w-[66px]"
                
            >
                <img
                    class="mx-auto w-4 h-4 sp:w-6 sp:h-6"
                    :src="['ExperienceList', 'ExperienceDetail'].includes($route.name) ? `/assets/icons/camera-hover.svg` : `/assets/icons/camera-default.svg`"
                    alt="TH.EXPERINCE"
                >
                <span class="text-[6px] sp:text-[10px] block mt-[2px] sp:mt-1">
                    {{ $utils.capitalize($t('layout.header.experiences')) }}
                </span>
            </router-link>
            <li
                class="text-center no-link flex-col item-justify w-[56px] sp:w-[66px] relative"
                @click="openInboxModal"
            >
                <span v-if="(chatStore.countUnreadMessages || queryStore.hasPendingQuery) && !$utils.isMockup()" class="hbg-warning h-3 w-3 rounded-full absolute right-0 top-0 left-4 mx-auto z-10"></span>
                <img
                    class="mx-auto w-4 h-4 sp:w-6 sp:h-6"
                    :src="
                        ['FakeQueriesIndex'].includes($route.name) || 
                        ['WindowChatMobile'].includes($route.name) || 
                        ['QueriesIndex'].includes($route.name) ?
                             `/assets/icons/1.TH.MailBoxACTIVE.svg` : 
                             `/assets/icons/1.TH.MailBox.svg`
                    "
                    alt="1.TH.MailBox"
                >
                <span class="text-[6px] sp:text-[10px] block mt-[2px] sp:mt-1">
                    Inbox
                </span>
            </li>
        </ul>
    </header>
    
</template>

<script setup>
    import { ref, provide, onMounted, defineProps, defineEmits } from 'vue'
    import { useRouter } from 'vue-router';
    import { useChatStore } from '@/stores/modules/chat';
    import { useHotelStore } from '@/stores/modules/hotel';
    import { useQueryStore } from '@/stores/modules/query';
    
    defineProps({
        msgs_unread: {
            type: Boolean,
            default: false,
        },
    })

    const emit  = defineEmits(['openInboxModal'])
    const router = useRouter();
    const chatStore = useChatStore();
    const queryStore = useQueryStore();
    //ONMOUNTED
    onMounted(async () => {
        await queryStore.$existingPendingQuery()
    })

    const hotelStore = useHotelStore()
    const showChat = hotelStore?.hotelData?.chatSettings.show_guest ?? false;
    //DATA
    const modal_find_reserve = ref(false)
    const modal_reserve = ref(false)
    const showInboxModal = ref(false);
    /* eslint-disable */
    const modal_lang = ref(false)

    // const isMockup = usePage().url.value.includes('mockup=true');

    //PROVIDE
    provide('modal_find_reserve', modal_find_reserve)
    provide('modal_reserve', modal_reserve)
    //COMPuted
    //FUNCTIONS
    function openInboxModal(){
        emit('openInboxModal')
    }

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
