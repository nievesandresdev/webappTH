<template>

    <div class="hcursor-mobile" id="app-container">

        <router-view></router-view>
        <MenuMobile 
            v-if="!isDesktop"
            v-show="showMenu" 
        />
    </div>
    <!-- evitar que se pueda usar la webapp en Mockup -->
    <div v-if="$utils.isMockup() && route.name !== 'FakeChat'" class="fixed top-0 left-0 w-screen h-screen z-[5000]"></div>
</template>

<script setup>

import { onMounted, ref, provide, watch, computed } from 'vue';
import { getPusherInstance, isChannelSubscribed } from '@/utils/pusherSingleton.js'
import { isMockup } from '@/utils/utils.js'
import { useMediaQuery } from '@/composables/useMediaQuery.js'
const { isDesktop } = useMediaQuery()


import MenuMobile from './Components/AppMenu.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
import { getUrlParam } from '@/utils/utils.js'
//stores
import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { useChatStore } from '@/stores/modules/chat';
const chatStore = useChatStore()
import { useAuthStore } from '@/stores/modules/auth';
const authStore = useAuthStore()

const hideAppMenu = ref(false);
const channelChat = ref(null);
const channelLogOutGuest = ref(null);
const pusher = ref(null);   
const isSubscribed = ref(false);
provide('hideAppMenu',hideAppMenu)

onMounted(() => {
    
})

const connectPusher = () => {
    const guestData = guestStore.guestData;
    if (stayStore.stayData && !isSubscribed.value) {
        //
        const channelName = 'private-notify-unread-msg-guest.' + guestData?.id;
        if (!isChannelSubscribed(channelName)) {
            channelChat.value = channelName;
            pusher.value = getPusherInstance();
            channelChat.value = pusher.value.subscribe(channelChat.value);
            channelChat.value.bind('App\\Events\\NotifyUnreadMsgGuest', async (data) => {
                // console.log('test NotifyUnreadMsgGuest', data)
                chatStore.setUnreadMsgsCount(data.countUnreadMsgsByGuest);
            });
        isSubscribed.value = true; // Marcar como suscrito
        }
        //channelLogOutGuest
        const channelName2 = 'private-logout-webapp-guest.' + guestData?.id;
        if (!isChannelSubscribed(channelName2)) {
            channelLogOutGuest.value = channelName2;
            channelLogOutGuest.value = pusher.value.subscribe(channelLogOutGuest.value);
            channelLogOutGuest.value.bind('App\\Events\\LogoutWebappGuest', async (data) => {
                if(data.guestId == guestData?.id){
                    authStore.$logout();
                }
            });
        }
    } else if (!stayStore.stayData && isSubscribed.value) {
        // Lógica para desuscribirse del canal si stayStore.stayData es null o undefined
        if (channelChat.value) {
            pusher.value.unsubscribe(channelChat.value);
            isSubscribed.value = false; // Marcar como no suscrito
        }
    }
};

const unSubscribePusher = () =>{
    if (channelChat.value && !isMockup()) {
        channelChat.value.unbind('App\\Events\\NotifyUnreadMsgGuest');
        pusher.value.unsubscribe(channelChat.value);
    }

    if (channelLogOutGuest.value && !isMockup()) {
        channelLogOutGuest.value.unbind('App\\Events\\LogoutWebappGuest');
        pusher.value.unsubscribe(channelLogOutGuest.value);
    }
    
}

watch(() => stayStore.stayData, async (newStayData) => {
    if (!isMockup()) {
        // localStorage.setItem('stayData',newStayData);
        // stayData = newStayData;
        if(newStayData){
            unSubscribePusher();
            // console.log('test connectPusher',newStayData)
            connectPusher();
        }
    }
}, { immediate: true });

const showMenu = computed(() => {
    if(isMockup()) return true;
    let guestId = guestStore.guestData ? guestStore.guestData?.id : false;
    let stayId = stayStore.stayData ? stayStore.stayData?.id : false;
    let hiddenMenuByRoute = !route?.meta?.hiddenMenu;
    let hiddenMenuByRef = !hideAppMenu.value;
    let existsUrlParam = !getUrlParam('acform');
    return  existsUrlParam && hiddenMenuByRef && stayId && guestId && hiddenMenuByRoute;
});
</script>
