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
        w-24 h-12
        bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]
        border border-gray-800 dark:border-gray-200
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
                    top: -10,
                    width: '100%',
                    height: 'auto',
                    opacity: 0.35,
                }}
            />

            {/* Foreground text */}
            <span className="relative text-base font-medium">
        {lang === 'en' ? 'En Español' : 'English'}
      </span>
        </button>
    );
};

export default LanguageToggle;
