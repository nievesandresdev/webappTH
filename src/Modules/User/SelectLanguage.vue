<template>
    <SectionBar :title="$t('language.title')" />
    <div class="px-3 mt-6 full-height" ref="formContainer">
        <!-- <pre>{{ localeStore.availableLocation }}</pre> -->
        <div class="flex items-center justify-between" v-for="(lg, index) in localeStore.availableLocation" :key="index">
            <div class="flex gap-2">
                <img :src="`/assets/icons/languages/${lg.abbreviation}.svg`" class="h-6 w-6">
                <span class="lato text-base font-medium">  {{ $utils.capitalize($t(`language.${lg.abbreviation}`)) }}</span>
            </div>
            <input type="checkbox" class="hborder-black-100 w-4 h-4">
        </div>
    </div>

  
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import SectionBar from '@/components/SectionBar.vue';
import {
    getForItemApi,
} from '@/api/services/language.services'

import { useLocaleStore } from '@/stores/modules/locale'
const localeStore = useLocaleStore()


import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();

const languages = ref({})
const guestData = ref({})

const getLanguages = async () => {

    let languages = ['es', 'it', 'en', 'fr', 'de'];
    const params = {
        languages: languages,
        selected: guestData.value.lang_web // Asegúrate de que guestData.lang_web esté disponible
    };
    const response = await getForItemApi(params);
    languages.value = response.data

    console.log('sssdsd',languages.value)
}

onMounted(async() => {
    guestData.value = guestStore.getLocalGuest();

    
    const response = await localeStore.$apiGetAllForItem();
    languages.value = response.data
    


    //getLanguages()
})

</script>

<style scoped>
.full-height {
    height: 100%;
    overflow: hidden;
}
.shadow-small {
    box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12),
        0px 3px 1px 0px rgba(0, 0, 0, 0.04);
}
</style>
