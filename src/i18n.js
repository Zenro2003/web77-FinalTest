// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import translationsEN from './locales/en.json';
import translationsVI from './locales/vi.json';

// Configurations
i18n
  .use(initReactI18next) // Pass i18n to react-i18next
  .init({
    resources: {
      en: { translation: translationsEN },
      vi: { translation: translationsVI },
      // Add more languages as needed
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
