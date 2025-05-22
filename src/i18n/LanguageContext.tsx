// src/i18n/LanguageContext.tsx
import React, { createContext, useContext, useState } from 'react';

export type Lang = 'en' | 'es';
export const LanguageContext = createContext<{
    lang: Lang;
    setLang: (l: Lang) => void;
}>({
    lang: 'en',
    setLang: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                              children,
                                                                          }) => {
    const [lang, setLang] = useState<Lang>('en');
    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
};

export function useLanguage() {
    return useContext(LanguageContext);
}
