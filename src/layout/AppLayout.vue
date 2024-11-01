<template>

    <div class="relative flex flex-col wrapper xs:hcursor-mobile">
        <AppHeader />

        <router-view></router-view>

        <MenuMobile />
    </div>

</template>

<script setup>

import AppHeader from './Components/AppHeader.vue'
import MenuMobile from './Components/AppMenu.vue'

</script>