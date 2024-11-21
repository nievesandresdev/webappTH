<template>
    <div class="container-menu fixed bottom-0 left-0 px-2 sp:px-4 pb-1 sp:pb-2 w-full z-[4000]">
        
        <div class="menu rounded-[10px] sp:rounded-[20px] bg-white py-[5px] sp:py-[10px] px-2 sp:px-4 space-x-[1px] sp:space-x-1 flex justify-around">
            <template
                v-for="item in menuItems"
            >
                <router-link
                    class="menu__item py-[4px] sp:py-[10px] w-[27px] sp:w-[60px] h-[27px] sp:h-[60px] space-y-[1px] sp:space-y-1 text-center flex flex-col justify-center relative"
                    :to="item.to"
                    :style="{backgroundColor:validRoute(item) ? chainStore.$bgColor0 : ''}"
                    v-if="!item.exclude"
                >
                    <!-- <img   
                        :src="validRoute(item) ? `/assets/icons/${item.iconSelected}.svg` : `/assets/icons/${item.iconDefault}.svg`"
                        :alt="item.title"
                    > -->
                    <IconCustomColor 
                        class="mx-auto"
                        :width="$utils.isMockup() ? '16' : '24'"
                        :height="$utils.isMockup() ? '16' : '24'"
                        :name="item.iconDefault" 
                        :color="validRoute(item) ? chainStore.$colorContrast0 : chainStore.$bgColor0" 
                        only-change-background 
                    />
                    <span
                        class="text-[4px] sp:text-[10px] font-bold leading-none lato"
                        :class="validRoute(item) ? `text-white` : `htext-black-100`"
                        :style="{
                            color:validRoute(item) ? chainStore.$colorContrast0 : chainStore.$bgColor0
                        }"
                    >
                        {{ dynamicTitle(item) }}
                    </span>
                    <img 
                        v-if="chatStore.countUnreadMessages && item.iconDefault == 'WA.MENU.DEFAULT.MENSAJES'"
                        class="absolute top-[6px] right-[18px] w-[12px] h-[12px] z-10"
                        src="/assets/icons/item-dot.svg"
                    >
                </router-link>
            </template>
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
import { useChatStore } from '@/stores/modules/chat';
const chatStore = useChatStore()

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
        to: `/${route.params.hotelSlug}/alojamiento`, 
        routeNameIncludes: ['ShowHotel'],
    },
    {
        title: 'Destino',
        exclude: false,
        iconDefault: 'WA.MENU.DEFAULT.DESTINO',
        iconSelected: 'WA.MENU.SELECTED.DESTINO',
        to: `/${route.params.hotelSlug}/lugares`,
        routeNameIncludes: ['PlaceList', 'PlaceDetail'],
    },
    {
        title: 'Experiencias',
        exclude: !hotelStore.hotelData.show_experiences,
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
    if (!showChatToGuest.value) {
        const msgLink = menuItems.find(item => item.title === 'Mensajes');
        if (msgLink) {
            msgLink.title = 'Inbox';
            msgLink.to =  `/${route.params.hotelSlug}/inbox`;
        }
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