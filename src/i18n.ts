import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import viTranslation from './locales/vi.json';
i18n
  .use(LanguageDetector) // Phát hiện ngôn ngữ từ trình duyệt hoặc Local Storage
  .use(initReactI18next) // Tích hợp với React
  .init({
    resources: {
      en: { translation: enTranslation },
      vi: { translation: viTranslation },
    },
    fallbackLng: 'en', // Ngôn ngữ mặc định nếu không phát hiện được
    debug: false, // Bật debug trong quá trình phát triển
    interpolation: {
      escapeValue: false, // React đã xử lý XSS, không cần escape
    },
    detection: {
      order: ['localStorage', 'navigator'], // Ưu tiên Local Storage, sau đó là trình duyệt
      caches: ['localStorage'], // Lưu ngôn ngữ đã chọn vào Local Storage
    },
  });

export default i18n;