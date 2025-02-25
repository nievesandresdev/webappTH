<template>
<div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]" />
  <AppHeader
    :title="titleHeader"
    :tabs="tabs.tabsHeader"
    :showSubHeader=" hotelData?.show_facilities == 1 && hotelData?.show_profile == 1"
    fixed
  />
<TransitionBook
    :custom-transitions="{
        ShowHotel: 1,
        FacilityList: 2,
    }"
>
  <router-view v-slot="{ Component }">
    <component :is="Component" :key="$route.name" />
  </router-view>
</TransitionBook>
</template>

<script setup>
import { ref, onMounted, computed, watch, provide } from 'vue';
import router from '@/router';

import { useRoute } from "vue-router";
const route = useRoute();

import { useTabs } from '@/stores/modules/tabs';
const tabs = useTabs();

import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();

import TransitionBook from '@/components/Transition/TransitionBook.vue';
import AppHeader from '@/layout/Components/AppHeader.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { isMockup, titleCase } from '@/utils/utils.js';
import { $formatTypeLodging } from '@/utils/helpers';

// DATA
const tabsHeader = ref([]);

// COMPUTED
const hotelData = computed(() => hotelStore.hotelData);
const titleHeader = computed(() => {
  if(!hotelData) {
    return '';
  }
  return hotelData.value?.show_profile == 1 ? titleCase($formatTypeLodging()) : t('hotel.facilities')
});

// WATCH
watch(hotelData, (valueCurrent, valueOld) => {
    if (!valueOld && valueCurrent) {
        loadData();
    }
}, { immediate: true });

watch(route, () => {
    loadTabsHeader();
});

async function loadData () {
    loadTabsHeader();
    // if (hotelData.value.show_facilities != 1) {
    //      router.push({ name: 'ShowHotel', query: { mockup: isMockup() } });
    // }
}


function loadTabsHeader () {
    const tabInformation = {
      title: t('hotel.information'),
      exclude: !hotelData.value?.show_profile,
      iconDefault: 'WA.alojamiento',
      iconSelected: `WA.alojamiento`,
      routeName: 'ShowHotel',
      isActive: router.currentRoute.value.name === 'ShowHotel',
      onClick: () => changeTab('ShowHotel'),
    }
    const tabFacility = {
      title: t('hotel.facilities'),
      exclude: !hotelData.value?.show_facilities,
      iconDefault: 'WA.Instalaciones',
      iconSelected: `WA.Instalaciones`,
      routeName: 'FacilityList',
      isActive: router.currentRoute.value.name === 'FacilityList',
      onClick: () => changeTab('FacilityList'),
    }
    tabsHeader.value  = [tabInformation, tabFacility];

    tabs.setTabsHeader([tabInformation, tabFacility], router);
}

function changeTab (r) {
  router.push({ name: r });
}

// PROVIDE
provide('hotelData', hotelData);
</script>