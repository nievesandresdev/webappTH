<template>
    <SectionBar :title="$t('language.title')" />
    <div class="px-3 mt-6 full-height" ref="formContainer">
        <!-- <pre>{{ localeStore.availableLocation }}</pre> -->
        <div class="flex items-center justify-between mb-4">
            <div class="flex gap-2">
                <img :src="`/assets/icons/languages/${localeStore.localeCurrent}.svg`" class="h-6 w-6">
                <span 
                class="lato text-base" 
                :class="{'font-bold' :localeStore.localeCurrent === selectedLanguage}"
                >  
                    {{ $utils.capitalize($t(`language.${localeStore.localeCurrent}`)) }}
                </span>
               
            </div>
            <input type="radio" name="language" :id="localeStore.localeCurrent" class="hborder-black-100 w-4 h-4" v-model="selectedLanguage" :checked="localeStore.localeCurrent == selectedLanguage">
        </div>
        <div class="flex items-center mb-4 justify-between" v-for="(lg, index) in localeStore.availableLocation" :key="index">
            <div class="flex gap-2">
                <img :src="`/assets/icons/languages/${lg.abbreviation}.svg`" class="h-6 w-6">
                <span 
                    class="lato text-base" 
                    :class="{
                        'font-bold' : lg.abbreviation === selectedLanguage ,
                        'font-medium' : lg.abbreviation != selectedLanguage
                    }"
                 >  
                    {{ $utils.capitalize($t(`language.${lg.abbreviation}`)) }}
                </span>
            </div>
            <input type="radio" class="hborder-black-100 w-4 h-4" name="language" :id="lg.abbreviation" :value="lg.abbreviation"  v-model="selectedLanguage" @change="handleChangeLanguage(lg.abbreviation)" :checked="lg.abbreviation === selectedLanguage">
        </div>
    </div>

  
</template>

<script setup>
import {  onMounted, ref } from 'vue';
import SectionBar from '@/components/SectionBar.vue';


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

const handleChangeLanguage = async (lg) => {
    console.log('lang', lg)
    selectedLanguage.value = lg
    await guestStore.updateLanguage(lg)
    setTimeout(() => {
        localeStore.$changeAndReload(lg)
    }, 600)
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
