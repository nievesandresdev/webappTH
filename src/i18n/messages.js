

import HomeEn from './en/home';
import HomeEs from './es/home';
import messageRequestEn from './en/messageRequest';
import messageRequestEs from './es/messageRequest';

const messages = {
  en: {
    home: HomeEn,
    messageRequest: messageRequestEn,
    // más módulos...
  },
  es: {
    home: HomeEs,
    messageRequest: messageRequestEs
    // más módulos...
  },
};

export default messages;