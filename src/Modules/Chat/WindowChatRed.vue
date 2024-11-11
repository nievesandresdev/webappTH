<template>
    <AppHeader title="Chat" :tabs="tabsMenu"/>
    <div>
        new chat
        <img class="w-10 h-10" src="/assets/icons/WA.inbox.DISABLED.svg" alt="">
    </div>
</template>
<script setup>
import AppHeader from '@/layout/Components/AppHeader.vue';

const tabsMenu = [
    {    
        title: 'Chat',
        exclude: false,
        iconDefault: `WA.Chat`,
        iconSelected: `WA.Chat`,
        isActive: true,
        onClick: () => {},
    },
    {    
        title: 'Inbox',
        exclude: false,
        iconDefault: `WA.inbox.DISABLED`,
        iconSelected: `WA.inbox`,
        isActive: false,
        onClick: () => {},
    }
];
</script>