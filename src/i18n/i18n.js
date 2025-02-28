// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ja from "./locales/ja.json";
import jaKana from "./locales/jaKana.json";

i18n.use(initReactI18next).init({
  resources: {
    1: { translation: ja },
    2: { translation: en },
    3: { translation: jaKana },
  },
  lng: "1", // default language
  fallbackLng: "1",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
