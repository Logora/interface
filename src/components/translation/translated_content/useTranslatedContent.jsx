import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

export const useTranslatedContent = (originalContent, originalLanguage, targetField, translations) => {
    const intl = useIntl();
    const [isTranslated, setIsTranslated] = useState(false);

    const isValidTranslation = (translationEntry) => {
        return translationEntry.target_language === intl.locale && translationEntry.is_approved && translationEntry.origin_field === targetField
    }
    
    const getTranslatedContent = () => {
        if (intl.locale.substring(0, 2) !== originalLanguage.substring(0, 2) && translations?.length > 0) {
            let currentTranslatedContent = translations.filter(t => isValidTranslation(t))[0];
            if (currentTranslatedContent) {
                return currentTranslatedContent.translated_content;
            }
        }
        return originalContent;
    }

    const [translatedContent, setTranslatedContent] = useState(getTranslatedContent());

    useEffect(() => {
        if(originalContent) {
            setTranslatedContent(getTranslatedContent());
        }
    }, [originalContent]);

    useEffect(() => {
        if(translatedContent !== originalContent) {
            setIsTranslated(true);
        }
    }, [translatedContent]);

    const toggleContent = () => {
        if (translatedContent === originalContent) {
            setTranslatedContent(getTranslatedContent());
        } else {
            setTranslatedContent(originalContent);
        }
    }

    return {
        translatedContent,
        toggleContent,
        isTranslated
    }
}