<template>
    <HeaderProfile 
        :tabs="tabsMenu" 
        :fixed="false"
    />
</template>
<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import $utils from '@/utils/utils';
import { useI18n } from 'vue-i18n';
//
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

import HeaderProfile from '@/layout/Components/HeaderProfile.vue';
const tabsMenu = computed(() => [
    {    
        title: $utils.titleCase(t('checkin.header.mystay')),
        exclude: false,
        iconDefault: `WA.stay.DISABLED`,
        iconSelected: `WA.stay`,
        isActive: route.name == 'MyStay',
        onClick: () => router.push({ name: 'MyStay' }),
        notify: 0
    },
    {    
        title: $utils.titleCase(t('checkin.header.guests')),
        exclude: false,
        iconDefault: `WA.huespedes`,
        iconSelected: `WA.huespedes`,
        isActive: route.name === 'Guests',
        onClick: () => router.push({ name: 'Guests' }),
        notify: 0
    }
]);
</script>
