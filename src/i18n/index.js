
import { createI18n } from 'vue-i18n';

import placeEn from './en/place';
import placeEs from './es/place';
import placeFr from './fr/place';
import placeIt from './it/place';
import placePt from './pt/place';
import placeDe from './de/place';

import experienceEn from './en/experience';
import experienceEs from './es/experience';
import experienceFr from './fr/experience';
import experienceIt from './it/experience';
import experiencePt from './pt/experience';
import experienceDe from './de/experience';

import categoryEn from './en/category';
import categoryEs from './es/category';
import categoryFr from './fr/category';
import categoryIt from './it/category';
import categoryPt from './pt/category';
import categoryDe from './de/category';

import HomeEn from './en/home';
import HomeEs from './es/home';
import HomeFr from './fr/home';
import HomeIt from './it/home';
import HomePt from './pt/home';
import HomeDe from './de/home';

import layoutEn from './en/layout';
import layoutEs from './es/layout';
import layoutFr from './fr/layout';
import layoutIt from './it/layout';
import layoutPt from './pt/layout';
import layoutDe from './De/layout';

import messageRequestEn from './en/messageRequest';
import messageRequestEs from './es/messageRequest';
import messageRequestFr from './fr/messageRequest';
import messageRequestIt from './it/messageRequest';
import messageRequestPt from './pt/messageRequest';
import messageRequestDe from './de/messageRequest';

import StayEn from './en/stay';
import StayEs from './es/stay';
import StayFr from './fr/stay';
import StayIt from './it/stay';
import StayPt from './pt/stay';
import StayDe from './de/stay';

import GuestEn from './en/guest';
import GuestEs from './es/guest';
import GuestFr from './fr/guest';
import GuestIt from './it/guest';
import GuestPt from './pt/guest';
import GuestDe from './de/guest';

import ChatEn from './en/chat';
import ChatEs from './es/chat';
import ChatFr from './fr/chat';
import ChatIt from './it/chat';
import ChatPt from './pt/chat';
import ChatDe from './de/chat';

import FacilityEn from './en/facility';
import FacilityEs from './es/facility';
import FacilityFr from './fr/facility';
import FacilityIt from './it/facility';
import FacilityPt from './pt/facility';
import FacilityDe from './de/facility';

import AboutEn from './en/about';
import AboutEs from './es/about';
import AboutFr from './fr/about';
import AboutIt from './it/about';
import AboutPt from './pt/about';
import AboutDe from './de/about';

import QueryEn from './en/query';
import QueryEs from './es/query';
import QueryFr from './fr/query';
import QueryIt from './it/query';
import QueryPt from './pt/query';
import QueryDe from './de/query';

import LanguageEn from './en/language';
import LanguageEs from './es/language';
import LanguageFr from './fr/language';
import LanguageIt from './it/language';
import LanguagePt from './pt/language';
import LanguageDe from './de/language';

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
  it: {
    place: placeIt,
    experience: experienceIt,
    category: categoryIt,
    home: HomeIt,
    layout: layoutIt,
    messageRequest: messageRequIttFr,
    stay: StayIt,
    guest: GuestIt,
    chat: ChatIt,
    facility: FacilityIt,
    about: AboutIt,
    query: QueryIt,
    language: LanguageIt,
    // más módulos...
  },
  pt: {
    place: placePt,
    experience: experiencePt,
    category: categoryPt,
    home: HomePt,
    layout: layoutPt,
    messageRequest: messageRequIttPt,
    stay: StayPt,
    guest: GuestPt,
    chat: ChatPt,
    facility: FacilityPt,
    about: AboutPt,
    query: QueryPt,
    language: LanguagePt,
    // más módulos...
  },
  pt: {
    place: placeDe,
    experience: experienceDe,
    category: categoryDe,
    home: HomeDe,
    layout: layoutDe,
    messageRequest: messageRequIttDe,
    stay: StayDe,
    guest: GuestDe,
    chat: ChatDe,
    facility: FacilityDe,
    about: AboutDe,
    query: QueryDe,
    language: LanguageDe,
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
