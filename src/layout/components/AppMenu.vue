<template>
    <div class="container-menu fixed bottom-0 left-0 px-4 pb-2 w-full">
        {{itemMenuSelected}}
        <div class="menu rounded-[20px] bg-black-100 py-[10px] px-[16px] space-x-1 flex justify-around">
            <router-link
                v-for="item in menuItems" class="menu__item py-[10px] w-[60px] h-[60px] space-y-1 text-center"
                :to="item.to"
                :class="item.routeNameIncludes.includes($route.name) ? 'menu__item-hover' : ''"

            >
                <img
                    class="mx-auto  w-6 h-6 sp:w-6 sp:h-6"
                    :src="item.routeNameIncludes.includes($route.name) ? `/assets/icons/${item.iconSelected}.svg` : `/assets/icons/${item.iconDefault}.svg`"
                    :alt="item.title"
                >
                <span
                    class="text-[10px] font-bold leading-none lato"
                    :class="item.routeNameIncludes.includes($route.name) ? `text-white` : `htext-black-100`"
                >
                    {{ item.title }}
                </span>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, watch, provide, inject, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const menuItems = reactive([
    {
        title: 'Home',
        exclude: false,
        iconDefault: 'WA.MENU.DEFAULT.HOME',
        iconSelected: 'WA.MENU.SELECTED.HOME',
        to: '/',
        routeNameIncludes: ['Home'],
    },
    {
        title: 'Hotel',
        exclude: false,
        iconDefault: 'WA.MENU.DEFAULT.ALOJAMIENTO',
        iconSelected: 'WA.MENU.SELECTED.ALOJAMIENTO',
        to: '/',
        routeNameIncludes: [],
    },
    {
        title: 'Destino',
        exclude: false,
        iconDefault: 'WA.MENU.DEFAULT.DESTINO',
        iconSelected: 'WA.MENU.SELECTED.DESTINO',
        to: '/lugares',
        routeNameIncludes: ['PlaceList'],
    },
    {
        title: 'Experiencias',
        exclude: false,
        iconDefault: 'WA.MENU.DEFAULT.EXPERIENCIAS',
        iconSelected: 'WA.MENU.SELECTED.EXPERIENCIAS',
        to: '/',
        routeNameIncludes: [],
    },
    {
        title: 'Mensajes',
        exclude: false,
        iconDefault: 'WA.MENU.DEFAULT.MENSAJES',
        iconSelected: 'WA.MENU.SELECTED.MENSAJES',
        to: '/',
        routeNameIncludes: [],
    },
]);

// COMPUTED
const itemMenuSelected = computed(() => {
    return router.name;
});

</script>

<style lang="scss">
    .menu {
        box-shadow: -3px 0px 6px 0px rgba(0, 0, 0, 0.10), 0px -3px 6px 0px rgba(0, 0, 0, 0.12), 0px 3px 6px 0px rgba(0, 0, 0, 0.12), 3px 0px 6px 0px rgba(0, 0, 0, 0.10);
    }
    .menu__item {
        border-radius: 8px;
    }
    .menu__item-hover {
        background: #333;
        box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 1px 0px rgba(0, 0, 0, 0.04);
    }
</style>