<template>
    <div v-if="hotelStore.hotelData" class="container-menu fixed bottom-0 left-0 px-1 sp:px-4 pb-1.5 sp:pb-2 w-full z-[4000]">
        
        <div class="
            menu rounded-[14px] sp:rounded-[20px] py-[6px] sp:py-[10px] px-1 sp:px-4 
            flex border border-white bg-gradient-h justify-between
        ">
            <template
                v-for="item in menuItems"
            >
                <span
                    class="menu__item rounded-[5px] sp:rounded-[8px] py-[6px] sp:py-[10px] w-[36px] sp:w-[60px] h-[36px] sp:h-[60px] space-y-[2px] sp:space-y-1 text-center flex flex-col justify-center relative"
                    :style="{backgroundColor:validRoute(item) ? chainStore.$bgColor0 : ''}"
                    v-if="!item.exclude"
                    @click="goItem(item)"
                >
                    <BaseBadge
                        size="medium"
                        :showBadge="
                            !$utils.isMockup() &&
                            chatStore.countUnreadMessages &&
                            (item.title == 'layout.header.messages' || item.title == 'Inbox')
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
                </span>
            </template>
        </div>
    </div>

    <BottomModal :isOpen="isOpenContactModal" @update:isOpen="isOpenContactModal = $event">
        <div class="flex items-center gap-1 lato">
            <img src="/assets/icons/WA.MENU.DEFAULT.MENSAJES.svg" class="w-8 h-8 text-[#333333]" alt="Normas Icon" />
            <p class="text-[16px] sp:text-[20px] font-bold text-[#333333] lato leading-[26px] sp:leading-[28px]">{{ $t('contact.titleModal') }}</p>
        </div>
        <div class="mt-[16px] sp:mt-[28px]">
            <template v-for="(item, index) in contactList" :key="item.title">
                <div 
                    v-if="!item.exclude"
                    class="flex items-center gap-2 pt-2"
                    :class="{'border-b hborder-gray-400 pb-3': (index < contactList.length - 1),'pb-2': !(index < contactList.length - 1)}"
                    @click="handleContact(item)"
                >
                    <img 
                        :src="`/assets/icons/${item.iconDefault}.svg`" 
                        class="w-4 sp:w-6 h-4 sp:h-6"
                    />
                    <p class="lato text-[10px] sp:text-sm leading-[12px] sp:leading-[16px]">{{ $t(item.title) }}</p>
                </div>
            </template>
        </div>
    </BottomModal>
    <SentEmailModal />
    <ModalOpenWhatsapp />
</template>

<script setup>
import { onMounted, reactive, computed, ref, provide } from 'vue';
import IconCustomColor from '@/components/IconCustomColor.vue';
import BaseBadge from '@/components/BaseBadge.vue';
import BottomModal from '@/components/Modal/GeneralBottomSheet.vue';
import SentEmailModal from '@/layout/Components/SentEmailModal.vue';
import ModalOpenWhatsapp from '@/layout/Components/ModalOpenWhatsapp.vue';
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
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const innerWidth = window.innerWidth

const showChatToGuest = ref(true)
const isOpenContactModal = ref(false)
const isOpenSentEmailModal = ref(false)
const isOpenWhatsappModal = ref(false)
const contactItemsActive = ref(0)
provide('isOpenSentEmailModal', isOpenSentEmailModal)
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

const goItem = (item)=>{
    if(item.type == 'button'){
        item.action()
    }else{
        router.push(item.to)
    }
}

const openContactModal = ()=>{
    isOpenContactModal.value = true
}

const validRoute = (item)=> {
    return item.routeNameIncludes.includes(route.name)
}

const dynamicTitle = (item) => {
    if (item.title === 'Hotel' && route.name === 'FacilityList') {
        return 'Instalaciones';
    }
    return item.title;
};

const goChat = () => {
    console.log('goChat')
    router.push({ name: 'Chat', params: { hotelSlug: route.params.hotelSlug } })
}

const openModalWhatsapp = () => {
    isOpenWhatsappModal.value = true
}

const { phone, phone_optional, contact_whatsapp_number, contact_email, chat_service_enabled, show_contact } = hotelStore.hotelData

const contactList = computed(() => {
    return [
        {
            title:'contact.call'+`${!showListModal.value ? '-mainMenu' : ''}`,
            iconDefault: 'WA.llamar',
            iconSelected: 'WA.llamar',
            to: `tel:${hotelStore.hotelData?.phone}`,
            exclude: !hotelStore.hotelData?.show_contact || !hotelStore.hotelData?.phone?.trim(),
            routeNameIncludes: [],
        },
        {
            title: 'contact.call'+`${!showListModal.value ? '-mainMenu' : ''}`,
            subtitle: 'contact.second-line',
            iconDefault: 'WA.llamar',
            iconSelected: 'WA.llamar',
            to: `tel:${hotelStore.hotelData?.phone_optional}`,
            exclude: !hotelStore.hotelData?.show_contact || !hotelStore.hotelData?.phone_optional?.trim(),
            routeNameIncludes: [],
        },
        {
            title: 'contact.contact-by-whatsapp'+`${!showListModal.value ? '-mainMenu' : ''}`,
            iconDefault: 'WA.Whatsapp',
            iconSelected: 'WA.Whatsapp',
            to: `https://wa.me/${hotelStore.hotelData?.contact_whatsapp_number}`,
            exclude: !hotelStore.hotelData?.show_contact || !hotelStore.hotelData?.contact_whatsapp_number?.trim(),
            routeNameIncludes: ['Contact'],
            type: 'button',
            action: () => openModalWhatsapp()
        },
        {
            title: 'contact.sent-email'+`${!showListModal.value ? '-mainMenu' : ''}`,
            iconDefault: 'WA.mail',
            iconSelected: 'WA.mail',
            to: null,
            exclude: !hotelStore.hotelData?.show_contact || !hotelStore.hotelData?.contact_email?.trim(),
            routeNameIncludes: ['Contact'],
            type: 'button',
            action: () => isOpenSentEmailModal.value = true
        },
        {
            title: 'contact.chating'+`${!showListModal.value ? '-mainMenu' : ''}`,
            iconDefault: 'WA.Chat',
            iconSelected: 'WA.Chat',
            to: 'https://wa.me/573178965432',
            exclude: !hotelStore.hotelData?.chatSettings?.show_guest || !hotelStore.hotelData?.chat_service_enabled,
            type: 'button',
            routeNameIncludes: ['Chat'],
            action: () => goChat(),
        }
    ]
})

const showListModal = computed(() => {
    return show_contact && contactItemsActive.value > 1
})

const posibleItemsContact = computed(() => {
    return [
        Boolean(phone?.trim()), 
        Boolean(phone_optional?.trim()), 
        Boolean(contact_whatsapp_number?.trim()), 
        Boolean(contact_email?.trim()),
        Boolean(hotelStore.hotelData?.chatSettings?.show_guest && chat_service_enabled)
    ];
});

const contactMenuItems = computed(() => {
    for(let item of posibleItemsContact.value){
        if(item){   
            contactItemsActive.value++;
        }
    }

    // console.log('test itemsActive',contactItemsActive.value)
    if(showListModal.value){
        return [{
            title: 'contact.title',
            exclude: false,
            iconDefault: 'WA.MENU.DEFAULT.MENSAJES',
            iconSelected: 'WA.MENU.SELECTED.MENSAJES',
            to: null,
            routeNameIncludes: ['Contact'],
            type : 'button',
            action: openContactModal
        }]
    }else{
        return contactList.value;
    }
})

const handleContact = (item) => {
    isOpenContactModal.value = false
    if (item.type == 'button') {
        item.action()
    }else{
        window.open(item.to, '_blank');
    }
}



const menuItems = reactive([
    {
        title: 'layout.header.home',
        exclude: false,
        iconDefault: 'WA.MENU.DEFAULT.HOME',
        iconSelected: 'WA.MENU.SELECTED.HOME',
        to: `/${route.params.hotelSlug}`,
        routeNameIncludes: ['Home'],
        type : 'link'
    },
    {
        title: $formatTypeLodging(),
        exclude: !hotelStore.hotelData?.show_profile,
        iconDefault: 'WA.MENU.DEFAULT.ALOJAMIENTO',
        iconSelected: 'WA.MENU.SELECTED.ALOJAMIENTO',
        to: `/${route.params.hotelSlug}/alojamiento`, 
        routeNameIncludes: ['ShowHotel','FacilityList','ShowFacility'],
        type : 'link'
    },
    {
         title: 'layout.header.facilities',
         exclude: hotelStore.hotelData?.show_profile || !hotelStore.hotelData?.show_facilities,
         iconDefault: 'WA.MENU.DEFAULT.ALOJAMIENTO',
         iconSelected: 'WA.MENU.SELECTED.ALOJAMIENTO',
         to: `/${route.params.hotelSlug}/alojamiento`, 
         routeNameIncludes: ['ShowHotel','FacilityList','ShowFacility'],
         type : 'link'
     },
    {
        title: 'layout.header.destination',
        exclude: !hotelStore.hotelData?.show_places,
        iconDefault: 'WA.MENU.DEFAULT.DESTINO',
        iconSelected: 'WA.MENU.SELECTED.DESTINO',
        to: `/${route.params.hotelSlug}/lugares`,
        routeNameIncludes: ['PlaceList', 'PlaceDetail'],
        type : 'link'
    },
    {
        title: 'service.title',
        exclude: !hotelStore.hotelData?.show_confort && !hotelStore.hotelData?.show_transport && !hotelStore.hotelData?.show_experiences,
        iconDefault: 'WA.MENU.DEFAULT.SERVICE',
        iconSelected: 'WA.MENU.SELECTED.SERVICE',
        to: `/${route.params.hotelSlug}/servicios/confort`,
        routeNameIncludes: ['Confort', 'Transport', 'Activity', 'DetailServiceConfort', ',DetailServiceTransport' , 'DetailServiceActivity'],
        type : 'link'
    },
    ...contactMenuItems.value,
    // {
    //     title: 'layout.header.experiences',
    //     exclude: !hotelStore.hotelData.show_experiences,
    //     iconDefault: 'WA.MENU.DEFAULT.EXPERIENCIAS',
    //     iconSelected: 'WA.MENU.SELECTED.EXPERIENCIAS',
    //     to: `/${route.params.hotelSlug}/experiencias`,
    //     routeNameIncludes: ['ExperienceList', 'ExperienceDetail'],
    // },
    // {
    //     title: 'layout.header.messages',
    //     exclude: !hotelStore?.hotelData?.chatSettings.show_guest || !hotelStore?.hotelData?.chat_service_enabled,
    //     iconDefault: 'WA.MENU.DEFAULT.MENSAJES',
    //     iconSelected: 'WA.MENU.SELECTED.MENSAJES',
    //     to: `/${route.params.hotelSlug}/chat`,
    //     routeNameIncludes: ['Chat','Inbox','FakeChat','FakeInboxIndex','FakeLinksOtas'],
    // },
    // {
    //     title: 'Inbox',
    //     exclude: hotelStore?.hotelData?.chatSettings.show_guest && hotelStore?.hotelData?.chat_service_enabled,
    //     iconDefault: 'WA.MENU.DEFAULT.MENSAJES',
    //     iconSelected: 'WA.MENU.SELECTED.MENSAJES',
    //     to: `/${route.params.hotelSlug}/inbox`,
    //     routeNameIncludes: ['Chat','Inbox','FakeChat','FakeInboxIndex','FakeLinksOtas'],
    // },
]);

provide('isOpenWhatsappModal', isOpenWhatsappModal)
</script>

<style lang="scss">
    .menu {
        box-shadow: -3px 0px 6px 0px rgba(0, 0, 0, 0.10), 0px -3px 6px 0px rgba(0, 0, 0, 0.12), 0px 3px 6px 0px rgba(0, 0, 0, 0.12), 3px 0px 6px 0px rgba(0, 0, 0, 0.10);
    }
    .menu__item-hover {
        box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 1px 0px rgba(0, 0, 0, 0.04);
    }
</style>