// src/components/LanguageToggle.tsx
import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import ReactCountryFlag from 'react-country-flag';

const LanguageToggle: React.FC = () => {
    const { lang, setLang } = useLanguage();
    const nextLang = lang === 'en' ? 'es' : 'en';
    const countryCode = nextLang === 'en' ? 'US' : 'MX';

    return (
        <button
            aria-label={`Switch language to ${
                nextLang === 'en' ? 'English' : 'Español'
            }`}
            onClick={() => setLang(nextLang)}
            className="
        fixed bottom-4 left-4 z-50
        w-12 h-12
        bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]
        border border-gray-300 dark:border-gray-600
        rounded-full
        flex items-center justify-center
        overflow-hidden
      "
        >
            {/* Flag background */}
            <ReactCountryFlag
                countryCode={countryCode}
                svg
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.2,
                }}
            />

            {/* Foreground text */}
            <span className="relative text-base font-medium">
        {lang === 'en' ? 'ES' : 'EN'}
      </span>
        </button>
    );
};

export default LanguageToggle;
