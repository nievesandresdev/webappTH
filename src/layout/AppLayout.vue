<template>

    <!-- <div class="xs:hcursor-mobile"> -->

        <router-view></router-view>

        <MenuMobile v-if="!hideAppMenu" />
    <!-- </div> -->

</template>

<script setup>

import { onMounted, ref, provide } from 'vue';
import MenuMobile from './Components/AppMenu.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const hideAppMenu = ref(false);
provide('hideAppMenu',hideAppMenu)

</script>
