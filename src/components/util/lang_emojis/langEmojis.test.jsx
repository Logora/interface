import { LANGUAGES, getLocaleIcon, getLocaleName } from "./langEmojis";

describe('LANGUAGES', () => {
    it('should have the correct properties', () => {
        LANGUAGES.forEach(language => {
            expect(language).toHaveProperty('name');
            expect(language).toHaveProperty('icon');
        });
    });

    it('each language object should be unique by name', () => {
        const languageNames = LANGUAGES.map(lang => lang.name);
        const uniqueNames = new Set(languageNames);
        expect(uniqueNames.size).toBe(languageNames.length);
    });

    it('each language object should be unique by icon', () => {
        const languageIcons = LANGUAGES.map(lang => lang.icon);
        const uniqueIcons = new Set(languageIcons);
        expect(uniqueIcons.size).toBe(languageIcons.length);
    });
});

describe('getLocaleIcon', () => {
    it('should return the correct icon for a given locale', () => {
        expect(getLocaleIcon('fr', 'CH')).toBe(' 🇨🇭 🇫🇷');
        expect(getLocaleIcon('en')).toBe(' 🇬🇧');
        expect(getLocaleIcon('de')).toBe(' 🇩🇪');
    });

    it('should return undefined for an unknown locale', () => {
        expect(getLocaleIcon('unknown')).toBeUndefined();
    });

    it('should return undefined for a null input', () => {
        expect(getLocaleIcon(null)).toBeUndefined();
    });

    it('should return undefined for an empty string input', () => {
        expect(getLocaleIcon('')).toBeUndefined();
    });
});

describe('getLocaleName', () => {
    it('should return the correct name for a given locale', () => {
        expect(getLocaleName('fr')).toBe('fr');
        expect(getLocaleName('en')).toBe('en');
        expect(getLocaleName('de')).toBe('de');
    });

    it('should return undefined for an unknown locale', () => {
        expect(getLocaleName('unknown')).toBeUndefined();
    });

    it('should return undefined for a null input', () => {
        expect(getLocaleName(null)).toBeUndefined();
    });

    it('should return undefined for an empty string input', () => {
        expect(getLocaleName('')).toBeUndefined();
    });
});