<template>
    <AppHeader 
        :title="titleHead" 
        :tabs="tabsMenu"
        v-if="hotelStore?.hotelData?.chatSettings?.show_guest"
    />
    <AppHeader 
        v-else
        title="Inbox"
    />
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
import AppHeader from '@/layout/Components/AppHeader.vue';
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore()
import { useChatStore } from '@/stores/modules/chat';
const chatStore = useChatStore()
import { useQueryStore } from '@/stores/modules/query';
const queryStore = useQueryStore();

//DATA

const tabsMenu = computed(() => [
    {    
        title: 'Chat',
        exclude: false,
        iconDefault: `WA.Chat.DISABLED`,
        iconSelected: `WA.Chat`,
        isActive: route.name == 'Chat',
        onClick: () => router.push({ name: 'Chat' }),
        notify: chatStore.countUnreadMessages 
    },
    {    
        title: 'Inbox',
        exclude: false,
        iconDefault: `WA.inbox.DISABLED`,
        iconSelected: `WA.inbox`,
        isActive: route.name === 'Inbox',
        onClick: () => router.push({ name: 'Inbox' }),
        notify: queryStore.hasPendingQuery
    }
]);

const titleHead = computed(()=>{
    let titleChat = hotelStore?.hotelData?.chatSettings?.name
    if(route.name == 'Chat'){
        return titleChat;
    }
    return 'Mensajes';
})
</script>