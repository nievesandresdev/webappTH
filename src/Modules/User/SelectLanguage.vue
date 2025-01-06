<template>
    <SectionBar :title="$t('language.title')" />
    <div class="px-3 full-height mt-[100px]" ref="formContainer">
        <div class="flex items-center mb-4 justify-between" v-for="(lg, index) in sortedLanguages" :key="index">
            <div class="flex gap-2">
                <img :src="`/assets/icons/languages/${lg.abbreviation}.svg`" class="h-6 w-6">
                <span 
                    class="lato text-base" 
                    :class="{
                        'font-bold' : lg.abbreviation === selectedLanguage ,
                        'font-medium' : lg.abbreviation != selectedLanguage
                    }"
                 >
                     {{ lg.translatedName }}
                </span>
            </div>
            <input type="radio" class="hborder-black-100 w-4 h-4" name="language" :id="lg.abbreviation" :value="lg.abbreviation"  v-model="selectedLanguage" @change="handleChangeLanguage(lg.abbreviation)" :checked="lg.abbreviation === selectedLanguage">
        </div>
    </div>

  
</template>

<script setup>
import {  onMounted, ref,computed } from 'vue';
import SectionBar from '@/components/SectionBar.vue';
import $utils from '@/utils/utils';

import { useRouter } from 'vue-router';
const router = useRouter();

import { useI18n } from 'vue-i18n'; 
 const { t } = useI18n();


import { useLocaleStore } from '@/stores/modules/locale'
const localeStore = useLocaleStore()


import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();

const languages = ref({})
const guestData = ref({})
const selectedLanguage = ref(localeStore.localeCurrent)

const getLanguages = async () => {
    const response = await localeStore.$apiGetAllForItem();
    languages.value = response.data
}

onMounted(() => {
    guestData.value = guestStore.getLocalGuest();
    getLanguages()
})

 const sortedLanguages = computed(() => {
    return localeStore.availableLocation.map(lg => { 
        return { 
            abbreviation: lg, 
            translatedName: $utils.capitalize(t(`language.${lg}`)) 
        }; 
    }).sort((a, b) => a.translatedName.localeCompare(b.translatedName)); 
});

const handleChangeLanguage = async (lg) => {
    selectedLanguage.value = lg
    await guestStore.updateLanguage(lg)
    setTimeout(() => {
        localeStore.$change(lg)
        window.location.href = './perfil'
    }, 500)
}

</script>

<style scoped>
    input[type="radio"] {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2.9px solid #BFBFBF; /* Borde negro */
        background-color: #fff; /* Fondo blanco */
        position: relative;
        cursor: pointer;
    }

    input[type="radio"]:checked {
        background-color: #000; /* Fondo negro cuando está seleccionado */
        border-color: #000;
    }

    input[type="radio"]:checked::before {
        content: '';
        position: absolute;
        top: 4px;
        left: 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #fff; /* El círculo interior blanco */
    }

</style>
