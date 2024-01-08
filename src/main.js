import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import './assets/css/style.css'; 
import './assets/css/custom.css'; 
import './assets/css/buttons.css'; 
import './assets/css/inputs.css'; 
import './assets/css/colors.css';

import './assets/css/tailwind.css';

import { i18n }  from './i18n'
import { pinia } from './stores';
import * as utils from './utils/utils.js'
// import { useHotelStore } from '@/stores/modules/hotel'

function initializeApp () {

  // const hotelStore = useHotelStore(pinia)

  try {

    // await hotelStore.$loadHotel()
    

  } catch (error) {

    console.error('Error al cargar los datos del hotel:', error)

  } finally {



    const app = createApp(App);

    app.use(pinia)
    app.use(i18n)
    app.use(router)
    app.config.globalProperties.$utils = utils
    app.mount('#app')

  }

}

initializeApp()