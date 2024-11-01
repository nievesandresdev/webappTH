<template>

    <div class="relative flex flex-col wrapper xs:hcursor-mobile">
        <AppHeader
            title="Hotel"
            :tabs="tabsHeader"
        />

        <router-view></router-view>

        <MenuMobile />
    </div>

</template>

<script setup>

import { onMounted, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

import AppHeader from './Components/AppHeader.vue';
import MenuMobile from './Components/AppMenu.vue';

const tabsHeader = reactive([
    {
        title: 'Información',
        exclude: false,
        iconDefault: 'WA.MENU.DEFAULT.ALOJAMIENTO',
        iconSelected: 'WA.MENU.SELECTED.ALOJAMIENTO',
        to: '/',
        routeNameIncludes: ['Home'],
        onClick: () => router.push('/'),
    },
    {
        title: 'Instalaciones',
        exclude: false,
        iconDefault: 'WA.MENU.DEFAULT.INSTALACIONES',
        iconSelected: 'WA.MENU.SELECTED.INSTALACIONES',
        to: '/',
        routeNameIncludes: [],
        onClick: () => router.push('/'),
    },
]);


</script>