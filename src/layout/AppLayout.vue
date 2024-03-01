<template>
	<div class="wrapper flex flex-col xs:hcursor-mobile relative">
        <Favicon v-if="stayDataRef" />
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
                :class="{'hbg-warning':chatStore.countUnreadMessages,'hbg-gray-100':!chatStore.countUnreadMessages}"
                @click="openWindowChat" 
            >
                <img class="w-10 h-10" src="/assets/icons/Chatbubblelineoutline.svg" alt="chat">
            </div>
		</div>
		<!-- Footer  -->
        
		<div id="NavMobilePartner" class="md:hidden" :class="{'hidden':!showMenuMobile}">
			<MenuMobile  @openInboxModal="openInboxModal"/>
		</div>
        
        <TheFooter v-if="showFooter" />
        

		<!-- <Notify v-if="$page.props.flash.id" :key="$page.props.flash.id" /> -->

        <transition name="slide">
            <div v-if="openChat && windowWidth > 767" class="window-chat hbg-white-100 w-[438px] hidden lg:block fixed right-0 bottom-0 z-[1000]">
                <Chat 
                    @closechat="openChat = false"
                    :settings="chatSettings" 
                />
            </div>
        </transition>
        
        <!-- modal inbox -->
        <transition name="modal">
            <InboxModal v-if="showInboxModal" @close="showInboxModal = false"/>
        </transition>
        <div v-show="showInboxModal" class="fixed inset-0 bg-[#00000080] z-[1500]"></div>
        <!-- modal inbox -->
        
        <GuestLog v-if="!$utils.isMockup()" :openModal="showGuestLog" @closeModal="closeGuestLog"/>
        <StayLog v-if="!$utils.isMockup()" :openModal="showStayLog" @back="updateGuest"  @closeModal="closeStayLog"/>
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
    import InboxModal from './Components/InboxModal'
    //stores
    import { useStayStore } from '@/stores/modules/stay'
    import { useGuestStore } from '@/stores/modules/guest'
    import { useLocaleStore } from '@/stores/modules/locale'
    import { useHotelStore } from '@/stores/modules/hotel';
    import { useChatStore } from '@/stores/modules/chat';
    //extra
    import { getPusherInstance, isChannelSubscribed } from '@/utils/pusherSingleton.js'
    import { getUrlParam } from '@/utils/utils.js'
    import Favicon from './Components/Favicon.vue'
    /* eslint-disable */

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
    const showInboxModal = ref(false); 
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
    const route = useRoute();
    provide('showMenuMobile', showMenuMobile);
    const showFooter = ref(true);
    provide('showFooter', showFooter);

    //ONMOUNTED
    onMounted(() => {
        // if(langWebByUrl.value){
        //     localeStore.$change(langWebByUrl.value)
        // }
        setTimeout(() => {
            loadWebDataModals();
        }, 1000);
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const mockup = urlParams.get('mockup');
    //     if (mockup === 'true') {
    //         // Cambia el cursor para el mockup
    //         document.body.style.cursor = "url('/vendor_asset/img/hoster/2-th-hotspot.cur'), auto";
    //     }
    })

    onUnmounted(() => {
        if (channel_chat.value) {
            channel_chat.value.unbind('App\\Events\\UpdateChatEvent');
            pusher.value.unsubscribe(channel_chat.value);
        }
    });

    const openInboxModal = ()  =>{
        showInboxModal.value = true;
    }

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
                    }
                    await chatStore.unreadMsgs();
                });
            isSubscribed.value = true; // Marcar como suscrito
            }
        } else if (!stayDataRef.value && isSubscribed.value) {
            // Lógica para desuscribirse del canal si stayDataRef.value es null o undefined
            if (channel_chat.value) {
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

    watch(() => stayStore.stayData, async (newStayData) => {
    stayDataRef.value = newStayData;
    // Intentar conectar pusher con los nuevos datos
      connect_pusher();
      if(stayDataRef.value){
        chatStore.unreadMsgs();
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

    /* Estado inicial del modal al entrar */
    .modal-enter-from,
    .modal-leave-to {
    transform: translateY(100%);
    }

    .slide-enter-to, .slide-leave-from {
        transform: translateY(0);
    }
    .modal-enter-active,.modal-leave-active {
    transition: transform 0.3s ease;
    }





</style>