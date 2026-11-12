import React, { createContext, useContext, useState, useEffect } from 'react';
import uz from '../translations/uz.json';
import ru from '../translations/ru.json';
import en from '../translations/en.json';

const translations = { uz, ru, en };
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('avtoqism_lang') || 'uz';
  });

  useEffect(() => {
    localStorage.setItem('avtoqism_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLanguage = (newLang) => {
    if (translations[newLang]) {
      setLang(newLang);
    }
  };

  /**
   * Helper function to get translated text by dot-separated key, e.g. 'header.search'
   */
  const t = (keyPath, fallback = '') => {
    const keys = keyPath.split('.');
    let current = translations[lang] || translations.uz;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to UZ if missing
        let uzFallback = translations.uz;
        for (const k of keys) {
          if (uzFallback && typeof uzFallback === 'object' && k in uzFallback) {
            uzFallback = uzFallback[k];
          } else {
            return fallback || keyPath;
          }
        }
        return uzFallback || fallback || keyPath;
      }
    }
    return current !== undefined ? current : fallback || keyPath;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
