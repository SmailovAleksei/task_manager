import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ruTranslation from './locales/ru.json';
import enTranslation from './locales/en.json';

i18n
    .use(LanguageDetector) // Автоопределение языка + сохранение выбора в localStorage
    .use(initReactI18next) // Интеграция с React
    .init({
        resources: {
            ru: ruTranslation,
            en: enTranslation
        },
        fallbackLng: 'ru', // Язык по умолчанию, если язык браузера не ru/en
        interpolation: {
            escapeValue: false // React уже защищает от XSS
        },
        detection: {
            order: ['localStorage', 'navigator'], // Сначала проверяем сохраненный выбор, затем язык браузера
            caches: ['localStorage'] // Где сохранять выбранный язык
        }
    });

export default i18n;
