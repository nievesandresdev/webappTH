<template>
	<div class="wrapper flex flex-col xs:hcursor-mobile relative">
        <!-- <Favicon /> -->
		<!-- Sidebar  -->
		<div v-if="$route.name != 'Home'" class="hidden md:block">
			<GeneralMenu/>
		</div>
		<div id="content" class="flex-1 lg:mb-0" :class="{'mb-16':showMenuMobile,'mb-0':!showMenuMobile}">
			<slot></slot>
            <router-view></router-view>
            <div 
                v-if="stayDataRef && showChat && windowWidth > 767" 
                class="bubble-chat block fixed bottom-[30px] right-[30px] cursor-pointer p-4 rounded-full"
                :class="{'hbg-warning':unreadMsgs,'hbg-gray-100':!unreadMsgs}"
                @click="openWindowChat" 
            >
                <img class="w-10 h-10" src="/assets/icons/Chatbubblelineoutline.svg" alt="chat">
            </div>
		</div>
		<!-- Footer  -->
        
		<div id="NavMobilePartner" class="md:hidden" :class="{'hidden':!showMenuMobile}">
			<MenuMobile :msgs_unread="unreadMsgs = false"  @markReadMsgs="markMsgsAsRead"/>
		</div>
        <template v-if="footer">
            <TheFooter />
        </template>

		<!-- <Notify v-if="$page.props.flash.id" :key="$page.props.flash.id" /> -->
		<!-- <ModalNotify /> -->

        <transition name="slide">
            <div v-if="openChat && windowWidth > 767" class="window-chat hbg-white-100 w-[438px] hidden lg:block fixed right-0 bottom-0 z-[1000]">
                <Chat 
                    @closechat="openChat = false"
                    :settings="chatSettings" 
                />
                <!-- 
                    :chat_hours="chat_hours"
                     -->
            </div>
        </transition>

        <!-- <ScheduleModal :chat_hours="chat_hours" /> -->
        <GuestLog :openModal="showGuestLog" @closeModal="closeGuestLog"/>
        <StayLog :openModal="showStayLog" @back="updateGuest"  @closeModal="closeStayLog"/>
	</div>
</template>

<script setup>
    // vue
    import { onMounted, ref, onUnmounted, watch, provide } from 'vue';
    import { useRoute } from 'vue-router';
    // components
    import GeneralMenu from './Components/GeneralMenu.vue'
    import TheFooter from './Components/TheFooter.vue'
    import MenuMobile from './Components/MenuMobile.vue'
    import GuestLog from './GuestLog.vue'
    import StayLog from './StayLog.vue';
    import Chat from '@/Modules/Chat/WindowChat.vue'
    //stores
    import { useStayStore } from '@/stores/modules/stay'
    import { useGuestStore } from '@/stores/modules/guest'
    import { useLocaleStore } from '@/stores/modules/locale'
    import { useHotelStore } from '@/stores/modules/hotel';
    import { useChatStore } from '@/stores/modules/chat';

    import { getUrlParam } from '@/utils/utils.js'


    // import ModalNotify from '@/Components/ModalNotify'
    import { getPusherInstance, isChannelSubscribed } from '@/utils/pusherSingleton.js'

    // import ScheduleModal from '@/Pages/HosterLanding/ScheduleModal.vue'
    // import Favicon from '../Components/Favicon.vue'
    /* eslint-disable */
    const props = defineProps({
       footer:{
        type:Boolean,
        default:'true'
       }
    })

    //store
    const hotelStore = useHotelStore()
    const stayStore = useStayStore()
    const { stayData } = stayStore;
    const stayDataRef = ref(null)

    const guestStore = useGuestStore()
    const localeStore = useLocaleStore()
    const chatStore = useChatStore()

    //DATA
    const windowWidth = ref(window.innerWidth);
    const showGuestLog = ref(false)
    const showStayLog = ref(false)
    const chatSettings = ref(hotelStore?.hotelData?.chatSettings ?? {});
    const showChat = hotelStore?.hotelData?.chatSettings.show_guest ?? false;
    const showMenuMobile = ref(true); 
    const langWebByUrl = ref(getUrlParam('lang'));
    //chat
    const chat_hours = ref([]);
    const chat = ref({});
    const messages = ref([]);        
    const openChat = ref(false);     
    const channel_chat = ref(null);
    const pusher = ref(null);   
    const isSubscribed = ref(false);
    const unreadMsgs = ref(false);
    const route = useRoute();
    provide('showMenuMobile', showMenuMobile);

    //ONMOUNTED
    onMounted(() => {
        if(langWebByUrl.value){
            localeStore.$change(langWebByUrl.value)
        }
        setTimeout(() => {
            loadWebDataModals();
        }, 1000);
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const mockup = urlParams.get('mockup');
    //     if(stay_session){
    //         let data_pending = usePage().props.value.guest_data_pending_init
    //         console.log('data_pending',usePage().props.value.guest_data_pending_init)
    //         chat.value = data_pending?.chat ?? null;
    //         chat_hours.value = data_pending?.chat_hours ?? [];
    //         messages.value = data_pending?.messages ?? [];
    //         chatSettings.value = data_pending?.settings ?? [];
    //     }
    //     if (mockup === 'true') {
    //         // Cambia el cursor para el mockup
    //         document.body.style.cursor = "url('/vendor_asset/img/hoster/2-th-hotspot.cur'), auto";
    //     }
    })

    onUnmounted(() => {
        if (channel_chat.value) {
            console.log("Desuscribiendo  del canal pusher:", channel_chat.value);
            channel_chat.value.unbind('App\\Events\\UpdateChatEvent');
            pusher.value.unsubscribe(channel_chat.value);
        }
    });

    const connect_pusher = () => {
        if (stayDataRef.value && !isSubscribed.value) {
            const channelName = 'private-update-chat.' + stayDataRef.value.id;
            if (!isChannelSubscribed(channelName)) {
                channel_chat.value = channelName;
                pusher.value = getPusherInstance();
                channel_chat.value = pusher.value.subscribe(channel_chat.value);
                channel_chat.value.bind('App\\Events\\UpdateChatEvent', async (data) => {
                    chatStore.addMessage(data.message);
                    // si el chat esta abierto se marca como leido el mensaje
                    if(
                        data.message.by == 'Hoster' && openChat.value || 
                        data.message.by == 'Hoster' && route.name == 'WindowChatMobile'
                    ){
                        await chatStore.markMsgsAsRead();
                        unreadMsgs.value = false;
                    }
                    await chatStore.unreadMsgs();
                });
            isSubscribed.value = true; // Marcar como suscrito
            }
        } else if (!stayDataRef.value && isSubscribed.value) {
            // Lógica para desuscribirse del canal si stayDataRef.value es null o undefined
            if (channel_chat.value) {
            console.log("Desuscribiendo del canal pusher:", channel_chat.value);
            pusher.value.unsubscribe(channel_chat.value);
            isSubscribed.value = false; // Marcar como no suscrito
            }
        }
    };


    const loadWebDataModals = async () => {

        try {
            const guestLogResult = await guestStore.loadLocalGuest();
            showGuestLog.value = guestLogResult ? false : true;
            if(guestLogResult && !guestLogResult.name){
                showGuestLog.value = true;
            }
            if (!showGuestLog.value) {
                loadWebStay();
            }
        } catch (error) {
            console.error("Error al cargar los datos locales:", error);
        }
    };

    const loadWebStay = async () => {
        try {
            const stayLogResult = await stayStore.loadLocalStay();
            showStayLog.value = stayLogResult ? false : true;
        } catch (error) {
            console.error("Error al cargar los datos locales:", error);
        }
    };

    const closeGuestLog = () => {
        showGuestLog.value = false;
        setTimeout(() => {
            loadWebStay();
        }, 1000);
    }

    const closeStayLog = () => {
        setTimeout(() => {
            console.log('closeStayLog')
            showStayLog.value = false
        }, 1000);
    }
    

    const updateGuest = () => {
        setTimeout(() => {
            showStayLog.value = false;
            showGuestLog.value = true;
        }, 1000);
    }

    const openWindowChat = () => {
        openChat.value = true;
        if(stayDataRef.value){
            chatStore.markMsgsAsRead();
        }
    }

    const markMsgsAsRead = () => {
        if(stayDataRef.value){
            chatStore.markMsgsAsRead();
        }
    }

    watch(() => stayStore.stayData, async (newStayData) => {
    stayDataRef.value = newStayData;
    // Intentar conectar pusher con los nuevos datos
      connect_pusher();
      if(stayDataRef.value){
        chatStore.unreadMsgs();
      }
    }, { immediate: true });

    watch(() => chatStore.unreadMsgsRef, (newVal, oldVal) => {
        if (newVal) {
            unreadMsgs.value = true;
        } else {
            unreadMsgs.value = false;
        }
    }, { immediate: true }); 
</script>

<style scoped>
    .wrapper {
        width: 100%;
    }
    .bubble-chat:hover{
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    }
    #content {
        width: 100%;
        min-height: calc(100vh  - 64px - 48px);
        transition: all 0.3s;
    }
 
    @media (min-width:1020px){
        .modal-dialog-centered{
            max-width: 320px !important;
        }
    }
    @media (min-width:1440px) {
        #content {
            margin-left: auto !important;
            margin-right: auto !important;
        }
    }

    .window-chat{
        height: 100vh;
    }

    .slide-enter-from, .slide-leave-to {
    transform: translateX(100%);
    }
    .slide-enter-to, .slide-leave-from {
    transform: translateX(0);
    }
    .slide-enter-active, .slide-leave-active {
    transition: transform 0.5s;
    }


</style>