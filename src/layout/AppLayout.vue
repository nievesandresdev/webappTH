<template>

    <div class="hcursor-mobile" id="app-container">

        <router-view></router-view>
        <MenuMobile v-show="!hideAppMenu && stayStore.stayData && guestStore.guestData" />
    </div>

</template>

<script setup>

import { onMounted, ref, provide } from 'vue';
import MenuMobile from './Components/AppMenu.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
//stores
import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();

const hideAppMenu = ref(false);
provide('hideAppMenu',hideAppMenu)

</script>
