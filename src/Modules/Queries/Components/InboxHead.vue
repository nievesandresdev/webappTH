<template>
    <template v-if="!isDesktop">
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
    <template v-else>
        <div class="bg-white shadow-guest py-5">
            <p class="w-[650px] mx-auto roboto text-[30px] font-medium leading-[106%]">
                {{hotelStore.hotelData.type}} {{hotelStore.hotelData.name}}
            </p>  
        </div>
    </template>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import AppHeader from '@/layout/Components/AppHeader.vue';
import $utils from '@/utils/utils';

import { useMediaQuery } from '@/composables/useMediaQuery.js'
const { isDesktop } = useMediaQuery()

  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();


import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore()
import { useChatStore } from '@/stores/modules/chat';
const chatStore = useChatStore()
import { useQueryStore } from '@/stores/modules/query';
const queryStore = useQueryStore();

//DATA

const tabsMenu = computed(() => [
    {    
        title: $utils.titleCase(t('chat.tabs.chat')),
        exclude: false,
        iconDefault: `WA.Chat.DISABLED`,
        iconSelected: `WA.Chat`,
        isActive: route.name == 'Chat' || route.name == 'FakeChat',
        onClick: () => router.push({ name: 'Chat' }),
        notify: chatStore.countUnreadMessages 
    },
    {    
        title: $utils.titleCase(t('chat.tabs.inbox')),
        exclude: false,
        iconDefault: `WA.inbox.DISABLED`,
        iconSelected: `WA.inbox`,
        isActive: route.name === 'Inbox' || route.name === 'FakeInboxIndex' || route.name === 'FakeLinksOtas',
        onClick: () => router.push({ name: 'Inbox' }),
        notify: queryStore.hasPendingQuery
    }
]);

const titleHead = computed(()=>{
    let titleChat = hotelStore?.hotelData?.chatSettings?.name
    if(route.name == 'Chat'){
        return titleChat;
    }
    return t('query.inbox.title');
})
</script>