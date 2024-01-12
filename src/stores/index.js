import { createPinia } from 'pinia'
import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { i18n } from '@/i18n';


export const pinia = createPinia();

export const useMainStore = defineStore('main', () => {
    // const URL_STORAGE = ref(process.env.VUE_APP_STORAGE_URL)
    const URL_STORAGE = 'https://test.thehoster.io/'
    return {
        URL_STORAGE,
    }
})