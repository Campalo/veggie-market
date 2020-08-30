import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import fr from "./locales/fr";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next which will make i18n available for all components via the context api.
  .init({
    resources: {
      en,
      fr,
    },
    lng: "fr",
    interpolation: {
      escapeValue: false // react already saves from xss
    }
  });

export default i18n;