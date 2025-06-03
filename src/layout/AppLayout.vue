<template>
    <div class="hcursor-mobile" id="app-container">

        <router-view></router-view>
        <MenuMobile 
            v-if="!isDesktop && hotelStore.hotelData && showMenu"
        />
        <IconsQueryModal />
    </div>
    <!-- evitar que se pueda usar la webapp en Mockup -->
    <div v-if="$utils.isMockup() && route.name !== 'FakeChat'" class="fixed top-0 left-0 w-screen h-screen z-[7000]"></div>
</template>

<script setup>

import { onMounted, ref, provide, watch, computed } from 'vue';
import { getPusherInstance, isChannelSubscribed } from '@/utils/pusherSingleton.js'
import { $currentPeriod } from '@/utils/helpers';
import IconsQueryModal from './Components/IconsQueryModal.vue'
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
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore()
import { useAuthStore } from '@/stores/modules/auth';
const authStore = useAuthStore()
import { useQueryStore } from '@/stores/modules/query';
const queryStore = useQueryStore();

const hideAppMenu = ref(false);
const channelChat = ref(null);
const channelUpdateStay = ref(null);

const pusher = ref(null);   
const isSubscribed = ref(false);
provide('hideAppMenu',hideAppMenu)


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

        const channelUpdateLocalStay = 'private-reload-data-stay-webapp.' + stayStore.stayData?.id;
        if (!isChannelSubscribed(channelUpdateLocalStay)) {
            channelUpdateStay.value = channelUpdateLocalStay;
            pusher.value = getPusherInstance();
            channelUpdateStay.value = pusher.value.subscribe(channelUpdateStay.value);
            channelUpdateStay.value.bind('App\\Events\\ReloadDataStayWebapp', async (data) => {
                // console.log('test ReloadDataStayWebapp', data)
                if(authStore.sessionActive){
                    await stayStore.reloadLocalStay();
                    // console.log('test reloadLocalStay',stayStore.stayData)
                }
            });
        isSubscribed.value = true; // Marcar como suscrito
        }
        
    } else if (!stayStore.stayData && isSubscribed.value) {
        // Lógica para desuscribirse del canal si stayStore.stayData es null o undefined
        if (channelChat.value) {
            pusher.value.unsubscribe(channelChat.value);
            isSubscribed.value = false; // Marcar como no suscrito
        }

        if (channelUpdateStay.value) {
            pusher.value.unsubscribe(channelUpdateStay.value);
            isSubscribed.value = false; // Marcar como no suscrito
        }
    }
};

const unSubscribePusher = () =>{
    if (channelChat.value && !isMockup()) {
        channelChat.value.unbind('App\\Events\\NotifyUnreadMsgGuest');
        pusher.value.unsubscribe(channelChat.value);
    }
    
}
const guestData = computed(() => guestStore.guestData);

watch(() => stayStore.stayData, async (newStayData) => {
    if (!isMockup()) {
        // stayData = newStayData;
        if(newStayData){
            unSubscribePusher();
            connectPusher();
        }
    }
    
    if(newStayData && guestData.value && !queryStore.currentQuery){
        // console.log('entra a getCurrentAndSettingsQuery')
        queryStore.$getCurrentAndSettingsQuery(stayStore.stayData.id, guestStore.guestData.id, $currentPeriod(), guestStore.guestData.name)
    }

    let localOpen = localStorage.getItem('queryPopUpHasBeenOpen')
    if(newStayData && guestData.value && localOpen !== 'true'){
        setTimeout(() => {
            if(queryStore.hasPendingQuery && !isMockup()){
                queryStore.$firstOpenPopUp();
            }
        }, 20000);
    }
}, { immediate: true });

const showMenu = computed(() => {
    if(isMockup()) return true;
    let hiddenMenuByRoute = route?.meta?.hiddenMenu;
    if (hiddenMenuByRoute) return false;
    let guestId = guestStore.guestData ? guestStore.guestData?.id : false;
    let stayId = stayStore.stayData ? stayStore.stayData?.id : false;
    let hiddenMenuByRef = !hideAppMenu.value;
    let existsUrlParam = !getUrlParam('acform');
    let show = existsUrlParam && hiddenMenuByRef && stayId && guestId;
    return show;
});
</script>
