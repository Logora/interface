import { LANGUAGES } from "./langEmojis";

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