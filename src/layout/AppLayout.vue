<template>

    <div class="hcursor-mobile" id="app-container">

        <router-view></router-view>
        <MenuMobile 
            v-if="!isDesktop"
            v-show="showMenu" 
        />
    </div>

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

const hideAppMenu = ref(false);
const channelChat = ref(null);
const pusher = ref(null);   
const isSubscribed = ref(false);
provide('hideAppMenu',hideAppMenu)

onMounted(() => {
    
})

const connectPusher = () => {
    const guestData = guestStore.guestData;
    if (stayStore.stayData && !isSubscribed.value) {
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
    return !getUrlParam('acform') && !hideAppMenu.value && stayStore.stayData && guestStore.guestData && !route?.meta?.hiddenMenu;
});
</script>
