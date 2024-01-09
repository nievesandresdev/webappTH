
import { createI18n } from 'vue-i18n';

import experienceEn from './en/experience';
import experienceEs from './es/experience';
import experienceFr from './fr/experience';

import categoryEn from './en/category';
import categoryEs from './es/category';
import categoryFr from './fr/category';

import HomeEn from './en/home';
import HomeEs from './es/home';
import HomeFr from './fr/home';

import layoutEn from './en/layout';
import layoutEs from './es/layout';
import layoutFr from './fr/layout';

import messageRequestEn from './en/messageRequest';
import messageRequestEs from './es/messageRequest';
import messageRequestFr from './fr/messageRequest';

import StayEn from './en/stay';
import StayEs from './es/stay';
import StayFr from './fr/stay';

const messages = {
  en: {
    experience: experienceEn,
    category: categoryEn,
    home: HomeEn,
    layout: layoutEn,
    messageRequest: messageRequestEn,
    stay: StayEn,
    // más módulos...
  },
  es: {
    experience: experienceEs,
    category: categoryEs,
    home: HomeEs,
    layout: layoutEs,
    messageRequest: messageRequestEs,
    stay: StayEs,
    // más módulos...
  },
  fr: {
    experience: experienceFr,
    category: categoryFr,
    home: HomeFr,
    layout: layoutFr,
    messageRequest: messageRequestFr,
    stay: StayFr,
    // más módulos...
  },
};

// Configuración de i18n
const i18n = createI18n({
  locale: localStorage.getItem('locale') || 'es',
  fallbackLocale: localStorage.getItem('locale') || 'es',
  messages,
});

export { i18n };