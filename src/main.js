import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './assets/css/custom.css'; 
import './assets/css/tailwind.css';
import messages from './i18n/messages';
import { createI18n } from 'vue-i18n';
import { pinia } from './stores';
import * as utils from './utils/utils.js'

// Configuración de i18n
const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
  });

const app = createApp(App);

app.use(pinia);
app.use(i18n);
app.use(router);
app.config.globalProperties.$utils = utils;
app.mount('#app');
