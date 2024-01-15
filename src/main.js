import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import './assets/css/style.css'; 
import './assets/css/custom.css'; 
import './assets/css/buttons.css'; 
import './assets/css/inputs.css'; 
import './assets/css/colors.css';

import './assets/css/tailwind.css';

import moment from 'moment'
import 'moment/locale/es'
import 'moment-timezone'

import { i18n }  from './i18n'
import { pinia } from './stores';
import * as utils from './utils/utils.js'
// import { useHotelStore } from '@/stores/modules/hotel'

function initializeApp () {
    moment.locale('es')
    moment.tz.setDefault('Europe/Madrid')

    const app = createApp(App);

    app.use(pinia)
    app.use(i18n)
    app.use(router)
    app.config.globalProperties.$utils = utils
    app.config.globalProperties.$moment = moment
    app.provide('$moment', app.config.globalProperties.$moment)
    app.mount('#app')

}

initializeApp()