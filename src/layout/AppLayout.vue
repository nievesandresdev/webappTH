<template>

    <div class="relative flex flex-col wrapper xs:hcursor-mobile">

        <router-view></router-view>

        <MenuMobile />
    </div>

</template>

<script setup>

import MenuMobile from './components/AppMenu.vue'

</script>