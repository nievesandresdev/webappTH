import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './assets/css/custom.css'; 
import './assets/css/tailwind.css';
import * as utils from './utils/utils.js'

const app = createApp(App);

app.use(router);
app.config.globalProperties.$utils = utils;
app.mount('#app');
