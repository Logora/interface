import en from './en.json';
import fr from './fr.json';
import es from './es.json';

export const locales = { fr, en, es };

export const localesAsync = {
    fr: () => import('./fr.json'),
    en: () => import('./en.json'),
    es: () => import('./es.json')
}