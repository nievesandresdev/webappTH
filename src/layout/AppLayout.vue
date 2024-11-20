<template>

    <div class="hcursor-mobile" id="app-container">

        <router-view></router-view>
        <MenuMobile v-show="!hideAppMenu && stayStore.stayData && guestStore.guestData" />
    </div>

</template>

<script setup>

import { onMounted, ref, provide, watch } from 'vue';
import { getPusherInstance, isChannelSubscribed } from '@/utils/pusherSingleton.js'
import { isMockup } from '@/utils/utils.js'
import MenuMobile from './Components/AppMenu.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
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
</script>
