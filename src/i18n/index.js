
import { createI18n } from 'vue-i18n';

import placeEn from './en/place';
import placeEs from './es/place';
import placeFr from './fr/place';

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

import GuestEn from './en/guest';
import GuestEs from './es/guest';
import GuestFr from './fr/guest';

import ChatEn from './en/chat';
import ChatEs from './es/chat';
import ChatFr from './fr/chat';

import FacilityEn from './en/facility';
import FacilityEs from './es/facility';
import FacilityFr from './fr/facility';

import AboutEn from './en/about';
import AboutEs from './es/about';
import AboutFr from './fr/about';

import QueryEn from './en/query';
import QueryEs from './es/query';
import QueryFr from './fr/query';

import LanguageEn from './en/language';
import LanguageEs from './es/language';
import LanguageFr from './fr/language';

const messages = {
  en: {
    place: placeEn,
    experience: experienceEn,
    category: categoryEn,
    home: HomeEn,
    layout: layoutEn,
    messageRequest: messageRequestEn,
    stay: StayEn,
    guest: GuestEn,
    chat: ChatEn,
    facility: FacilityEn,
    about: AboutEn,
    query: QueryEn,
    language: LanguageEn,
    // más módulos...
  },
  es: {
    place: placeEs,
    experience: experienceEs,
    category: categoryEs,
    home: HomeEs,
    layout: layoutEs,
    messageRequest: messageRequestEs,
    stay: StayEs,
    guest: GuestEs,
    chat: ChatEs,
    facility: FacilityEs,
    about: AboutEs,
    query: QueryEs,
    language: LanguageEs,
    // más módulos...
  },
  fr: {
    place: placeFr,
    experience: experienceFr,
    category: categoryFr,
    home: HomeFr,
    layout: layoutFr,
    messageRequest: messageRequestFr,
    stay: StayFr,
    guest: GuestFr,
    chat: ChatFr,
    facility: FacilityFr,
    about: AboutFr,
    query: QueryFr,
    language: LanguageFr,
    // más módulos...
  },
};

// Configuración de i18n
const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages,
});

export { i18n };
