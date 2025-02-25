
import { createI18n } from 'vue-i18n';


function loadLocaleMessages() {
  const locales = require.context('./', true, /[A-Za-z0-9-_,\s]+\.js$/i);
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/\.\/([A-Za-z0-9-_]+)\/([A-Za-z0-9-_]+)\.js$/i);
    if (matched && matched.length > 2) {
      const locale = matched[1];
      const modulee = matched[2];
      if (!messages[locale]) messages[locale] = {};
      messages[locale][modulee] = locales(key).default;
    }
  });
  return messages;
}

// Configuración de i18n
const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages: loadLocaleMessages(),
  globalInjection: true
});

export { i18n };
