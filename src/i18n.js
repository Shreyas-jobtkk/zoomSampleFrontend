// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../src/locales/en.json";
import ja from "../src/locales/ja.json";
import jaKana from "../src/locales/ja-kana.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ja: { translation: ja },
    jaKana: { translation: jaKana },
  },
  lng: "ja", // default language
  fallbackLng: "ja",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
