import React from 'react';
import { useTranslatedContent } from '@logora/debate.translation.translated_content';
import PropTypes from "prop-types";

export const TranslatedContent = ({ originalContent, originalLanguage, targetField, translations }) => {
    const translatedContent = useTranslatedContent(originalContent, originalLanguage, targetField, translations);

    return (
        <>
            { translatedContent.translatedContent }
        </>
    )
}

TranslatedContent.propTypes = {
    /** The content in its original language */
    originalContent: PropTypes.string.isRequired,
    /** The original language */
    originalLanguage: PropTypes.string.isRequired,
    /** Type of the target field  */
    targetField: PropTypes.string.isRequired,
    /** An array containing the other translations  */
    translations: PropTypes.array.isRequired,
  };