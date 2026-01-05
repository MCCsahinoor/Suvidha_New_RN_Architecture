// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './languages/en.json';
import hiTranslation from './languages/hi.json';

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'hi',
    fallbackLng: 'en',
    resources: {
        en: {
            translation: enTranslation,
        },
        hi: {
            translation: hiTranslation,
        },
    },
    interpolation: {
        escapeValue: false
    },
    react: {
        useSuspense: false,
    }
});

export default i18n;

