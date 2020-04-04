import i18n, {
  LanguageDetectorAsyncModule,
  LanguageDetectorModule,
} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules, Platform} from 'react-native';

import translation_en from './en.json';
import translation_sv from './sv.json';

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    const decidedLang = (deviceLanguage || 'en').substr(0, 2);
    callback(decidedLang);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

const resources = {
  en: {
    translation: translation_en,
  },
  sv: {
    translation: translation_sv,
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
