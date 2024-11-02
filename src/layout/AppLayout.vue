<template>

    <div class="relative flex flex-col wrapper xs:hcursor-mobile">

        <router-view></router-view>

        <MenuMobile />
    </div>

</template>

<script setup>

import { onMounted, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();


import MenuMobile from './Components/AppMenu.vue';

</script>