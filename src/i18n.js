import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import I18NextHttpBackend from 'i18next-http-backend'


i18n
    .use(I18NextHttpBackend)
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        lng: ['en', 'ru'],
        resources: {
            en: {translation: require('./locales/en/translation.json')},
            ru: {translation: require('./locales/ru/translation.json')}
        }
    })

export default i18n