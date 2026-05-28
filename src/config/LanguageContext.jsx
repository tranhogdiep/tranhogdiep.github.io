import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguageState] = useState(() => {
        // Initialize from localStorage, fallback to browser settings or 'en'
        const savedLang = localStorage.getItem('site_language');
        if (savedLang === 'en' || savedLang === 'vi') {
            return savedLang;
        }
        
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang && browserLang.startsWith('vi')) {
            return 'vi';
        }
        return 'en';
    });

    const setLanguage = (lang) => {
        if (lang === 'en' || lang === 'vi') {
            setLanguageState(lang);
            localStorage.setItem('site_language', lang);
            
            // Optional: Update html lang attribute
            document.documentElement.lang = lang;
        }
    };

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    // Translate helper function supporting nested paths (e.g., 'header.about')
    const t = (path) => {
        const keys = path.split('.');
        
        // 1. Try to find the key in the current language translations
        let current = translations[language];
        let found = true;
        for (const key of keys) {
            if (current && current[key] !== undefined) {
                current = current[key];
            } else {
                found = false;
                break;
            }
        }
        
        if (found) return current;

        // 2. Fallback to English translation
        let fallback = translations.en;
        for (const key of keys) {
            if (fallback && fallback[key] !== undefined) {
                fallback = fallback[key];
            } else {
                return path; // Return the path key itself if everything fails
            }
        }
        return fallback;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
export default LanguageContext;
