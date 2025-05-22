import { useLanguage } from './LanguageContext';
import { translations } from './translations';

export type TranslationKey = keyof typeof translations;

export function useTranslation(key: TranslationKey): any {
    const { lang } = useLanguage();
    return (translations[key] as any)[lang];
}
