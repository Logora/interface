import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

export const getTranslatedContent = (originalContent, originalLanguage, targetField, translations, locale) => {
    const isValidTranslation = (translationEntry) => {
        return translationEntry.target_language?.substring(0, 2) === locale?.substring(0, 2) && 
               translationEntry.is_approved && 
               translationEntry.origin_field === targetField;
    }
    
    if (locale?.substring(0, 2) !== originalLanguage?.substring(0, 2) && translations?.length > 0) {
        let currentTranslatedContent = translations.filter(t => isValidTranslation(t))[0];
        if (currentTranslatedContent) {
            return currentTranslatedContent.translated_content;
        }
    }
    return originalContent;
};

export const useTranslatedContent = (originalContent, originalLanguage, targetField, translations) => {
    const intl = useIntl();
    const [isTranslated, setIsTranslated] = useState(false);

    const [translatedContent, setTranslatedContent] = useState(
        getTranslatedContent(originalContent, originalLanguage, targetField, translations, intl.locale)
    );

    useEffect(() => {
        if(originalContent) {
            setTranslatedContent(
                getTranslatedContent(originalContent, originalLanguage, targetField, translations, intl.locale)
            );
        }
    }, [originalContent]);

    useEffect(() => {
        if(translatedContent !== originalContent) {
            setIsTranslated(true);
        }
    }, [translatedContent]);

    const toggleContent = () => {
        if (translatedContent === originalContent) {
            setTranslatedContent(
                getTranslatedContent(originalContent, originalLanguage, targetField, translations, intl.locale)
            );
        } else {
            setTranslatedContent(originalContent);
        }
    }

    return {
        translatedContent,
        toggleContent,
        isTranslated
    };
};