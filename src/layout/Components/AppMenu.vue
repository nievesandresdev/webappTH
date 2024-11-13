<template>
    <div class="container-menu fixed bottom-0 left-0 px-4 pb-2 w-full z-[3000]">
        
        <div class="menu rounded-[20px] bg-white py-[10px] px-[16px] space-x-1 flex justify-around">
            <router-link
                v-for="item in menuItems" class="menu__item py-[10px] w-[60px] h-[60px] space-y-1 text-center"
                :to="item.to"
                :style="{backgroundColor:validRoute(item) ? chainStore.$bgColor0 : ''}"
            >
                <!-- <img   
                    :src="validRoute(item) ? `/assets/icons/${item.iconSelected}.svg` : `/assets/icons/${item.iconDefault}.svg`"
                    :alt="item.title"
                > -->
                
                <IconCustomColor 
                    class="mx-auto w-6 h-6"
                    :name="item.iconDefault" 
                    :color="validRoute(item) ? chainStore.$colorContrast0 : chainStore.$bgColor0" 
                    only-change-background 
                />
                <span
                    class="text-[10px] font-bold leading-none lato"
                    :class="validRoute(item) ? `text-white` : `htext-black-100`"
                    :style="{
                        color:validRoute(item) ? chainStore.$colorContrast0 : chainStore.$bgColor0
                    }"
                >
                    {{ dynamicTitle(item) }}
                </span>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, computed, ref  } from 'vue';
import IconCustomColor from '@/components/IconCustomColor.vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

const menuItems = reactive([
    {
        title: 'Home',
        exclude: false,
        iconDefault: 'WA.MENU.DEFAULT.HOME',
        iconSelected: 'WA.MENU.SELECTED.HOME',
        to: `/${route.params.hotelSlug}`,
        routeNameIncludes: ['Home'],
    },
    {
        title: 'Hotel',
        exclude: false,
        iconDefault: 'WA.MENU.DEFAULT.ALOJAMIENTO',
        iconSelected: 'WA.MENU.SELECTED.ALOJAMIENTO',
        to: `/${route.params.hotelSlug}/alojamiento`, // Incluye el prefijo dinámico
        routeNameIncludes: ['ShowHotel'],
    },
    {
        title: 'Destino',
        exclude: false,
        iconDefault: 'WA.MENU.DEFAULT.DESTINO',
        iconSelected: 'WA.MENU.SELECTED.DESTINO',
        to: `/${route.params.hotelSlug}/lugares`,
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
        to: `/${route.params.hotelSlug}/chat`,
        routeNameIncludes: ['Chat','Inbox'],
    },
]);

const showChatToGuest = ref(true)
// COMPUTED
const itemMenuSelected = computed(() => {
    return router.name;
});

onMounted(() => {
    // chainStore.$getCustomatizacion(); 
    showChatToGuest.value = hotelStore.hotelData?.chatSettings?.show_guest;
    console.log('test sdata', hotelStore.hotelData?.chatSettings);
    console.log('test showChatToGuest', showChatToGuest.value);
    if (!showChatToGuest.value) {
        const msgLink = menuItems.find(item => item.title === 'Mensajes');
        console.log('test msgLink', msgLink);
        if (msgLink) {
            msgLink.title = 'Inbox';
            msgLink.to =  `/${route.params.hotelSlug}/inbox`;
        }
        console.log('test msgLink', msgLink);
    }
    
});


const validRoute = (item)=> {
    return item.routeNameIncludes.includes(route.name)
}

const dynamicTitle = (item) => {
    if (item.title === 'Hotel' && route.name === 'FacilityList') {
        return 'Instalaciones';
    }
    return item.title;
};


</script>

<style lang="scss">
    .menu {
        box-shadow: -3px 0px 6px 0px rgba(0, 0, 0, 0.10), 0px -3px 6px 0px rgba(0, 0, 0, 0.12), 0px 3px 6px 0px rgba(0, 0, 0, 0.12), 3px 0px 6px 0px rgba(0, 0, 0, 0.10);
    }
    .menu__item {
        border-radius: 8px;
    }
    .menu__item-hover {
        box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 1px 0px rgba(0, 0, 0, 0.04);
    }
</style>