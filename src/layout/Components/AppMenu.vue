<template>
    <div v-if="hotelStore.hotelData" class="container-menu fixed bottom-0 left-0 px-1 sp:px-4 pb-1.5 sp:pb-2 w-full z-[4000]">
        
        <div class="
            menu rounded-[14px] sp:rounded-[20px] py-[6px] sp:py-[10px] px-1 sp:px-4 
            flex border border-white bg-gradient-h justify-between
        ">
            <template
                v-for="item in menuItems"
            >
                <router-link
                    class="menu__item rounded-[5px] sp:rounded-[8px] py-[6px] sp:py-[10px] w-[36px] sp:w-[60px] h-[36px] sp:h-[60px] space-y-[2px] sp:space-y-1 text-center flex flex-col justify-center relative"
                    :to="item.to"
                    :style="{backgroundColor:validRoute(item) ? chainStore.$bgColor0 : ''}"
                    v-if="!item.exclude"
                >
                    <BaseBadge
                        size="medium"
                        :showBadge="
                            !$utils.isMockup() &&
                            (chatStore.countUnreadMessages || queryStore.hasPendingQuery  ) &&
                            (item.title == 'layout.header.messages')
                        "
                        classes="absolute top-[1px] right-4 border-[1.2px] rounded-full" 
                    />
                    <img
                        v-if="!validRoute(item)"
                        :src="validRoute(item) ? `/assets/icons/${item.iconSelected}.svg` : `/assets/icons/${item.iconDefault}.svg`"
                        :alt="item.title"
                        class="mx-auto size-[16px] sp:size-6"
                    >
                    <IconCustomColor 
                        v-else
                        class="mx-auto"
                        :width="innerWidth <= 300 ? '16' : '24'"
                        :height="innerWidth <= 300 ? '16' : '24'"
                        :name="item.iconDefault" 
                        :color="validRoute(item) ? chainStore.$colorContrast0 : chainStore.$bgColor0" 
                        only-change-background 
                    />
                    <span
                        class="text-[7px] sp:text-[10px] font-bold leading-none lato"
                        :class="validRoute(item) ? `text-white` : `htext-black-100`"
                        :style="{
                            color:validRoute(item) ? chainStore.$colorContrast0 : ''
                        }"
                    >
                        {{ $utils.titleCase($t(item.title)) }}
                    </span>
                </router-link>
            </template>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, computed, ref  } from 'vue';
import IconCustomColor from '@/components/IconCustomColor.vue';
import BaseBadge from '@/components/BaseBadge.vue';

import { $formatTypeLodging } from '@/utils/helpers'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

import $utils from '@/utils/utils';

import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();
import { useChatStore } from '@/stores/modules/chat';
const chatStore = useChatStore()
import { useQueryStore } from '@/stores/modules/query';
const queryStore = useQueryStore()

const innerWidth = window.innerWidth

const menuItems = reactive([
    {
        title: 'layout.header.home',
        exclude: false,
        iconDefault: 'WA.MENU.DEFAULT.HOME',
        iconSelected: 'WA.MENU.SELECTED.HOME',
        to: `/${route.params.hotelSlug}`,
        routeNameIncludes: ['Home'],
    },
    {
        title: $formatTypeLodging(),
        exclude: !hotelStore.hotelData?.show_profile,
        iconDefault: 'WA.MENU.DEFAULT.ALOJAMIENTO',
        iconSelected: 'WA.MENU.SELECTED.ALOJAMIENTO',
        to: `/${route.params.hotelSlug}/alojamiento`, 
        routeNameIncludes: ['ShowHotel','FacilityList','ShowFacility'],
    },
    {
         title: 'layout.header.facilities',
         exclude: hotelStore.hotelData?.show_profile || !hotelStore.hotelData?.show_facilities,
         iconDefault: 'WA.MENU.DEFAULT.ALOJAMIENTO',
         iconSelected: 'WA.MENU.SELECTED.ALOJAMIENTO',
         to: `/${route.params.hotelSlug}/alojamiento`, 
         routeNameIncludes: ['ShowHotel','FacilityList','ShowFacility'],
     },
    {
        title: 'layout.header.destination',
        exclude: !hotelStore.hotelData?.show_places,
        iconDefault: 'WA.MENU.DEFAULT.DESTINO',
        iconSelected: 'WA.MENU.SELECTED.DESTINO',
        to: `/${route.params.hotelSlug}/lugares`,
        routeNameIncludes: ['PlaceList', 'PlaceDetail'],
    },
    {
        title: 'service.title',
        exclude: !hotelStore.hotelData?.show_confort && !hotelStore.hotelData?.show_transport && !hotelStore.hotelData?.show_experiences,
        iconDefault: 'WA.MENU.DEFAULT.SERVICE',
        iconSelected: 'WA.MENU.SELECTED.SERVICE',
        to: `/${route.params.hotelSlug}/servicios/confort`,
        routeNameIncludes: ['Confort', 'Transport', 'Activity', 'DetailServiceConfort', ',DetailServiceTransport' , 'DetailServiceActivity'],
    },
    // {
    //     title: 'layout.header.experiences',
    //     exclude: !hotelStore.hotelData.show_experiences,
    //     iconDefault: 'WA.MENU.DEFAULT.EXPERIENCIAS',
    //     iconSelected: 'WA.MENU.SELECTED.EXPERIENCIAS',
    //     to: `/${route.params.hotelSlug}/experiencias`,
    //     routeNameIncludes: ['ExperienceList', 'ExperienceDetail'],
    // },
    {
        title: 'layout.header.messages',
        exclude: !hotelStore?.hotelData?.chatSettings.show_guest || !hotelStore?.hotelData?.chat_service_enabled,
        iconDefault: 'WA.MENU.DEFAULT.MENSAJES',
        iconSelected: 'WA.MENU.SELECTED.MENSAJES',
        to: `/${route.params.hotelSlug}/chat`,
        routeNameIncludes: ['Chat','Inbox','FakeChat','FakeInboxIndex','FakeLinksOtas'],
    },
    {
        title: 'Inbox',
        exclude: hotelStore?.hotelData?.chatSettings.show_guest && hotelStore?.hotelData?.chat_service_enabled,
        iconDefault: 'WA.MENU.DEFAULT.MENSAJES',
        iconSelected: 'WA.MENU.SELECTED.MENSAJES',
        to: `/${route.params.hotelSlug}/inbox`,
        routeNameIncludes: ['Chat','Inbox','FakeChat','FakeInboxIndex','FakeLinksOtas'],
    },
]);

const showChatToGuest = ref(true)
// COMPUTED
const itemMenuSelected = computed(() => {
    return router.name;
});

onMounted(() => {
    // chainStore.$getCustomatizacion(); 
    showChatToGuest.value = hotelStore.hotelData?.chatSettings?.show_guest && hotelStore.hotelData?.chat_service_enabled;
    if (!showChatToGuest.value) {
        const msgLink = menuItems.find(item => item.title === 'Mensajes');
        if (msgLink) {
            msgLink.title = 'Inbox';
            msgLink.to =  `/${route.params.hotelSlug}/inbox`;
        }
    }
    queryStore.$existingPendingQuery()
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
    .menu__item-hover {
        box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 1px 0px rgba(0, 0, 0, 0.04);
    }
</style>