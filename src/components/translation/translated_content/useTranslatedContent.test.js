import React from 'react';
import { render, screen } from '@testing-library/react';
import { useTranslatedContent } from './useTranslatedContent';
import { IntlProvider } from 'react-intl';

describe('useTranslatedContent', () => {
    it('should render translated content', () => {
        const TranslatedContent = () => {
            const translation_entries = [
                {
                    target_language: "fr",
                    is_approved: true,
                    origin_field: "title",
                    translated_content: "Un titre"
                }
            ];
            const title = useTranslatedContent("A title", "en", "title", translation_entries);
        
            return (
                <>
                    { title.translatedContent }
                </>
            );
        }
    
        const component = render(
            <IntlProvider locale="fr">
                <TranslatedContent />
            </IntlProvider>
        );
    
        expect(screen.getByText("Un titre"));
    });

    it('should not render translated content when intl locale and target language are not the same', () => {
        const TranslatedContent = () => {
            const translation_entries = [
                {
                    target_language: "fr",
                    is_approved: true,
                    origin_field: "title",
                    translated_content: "Un titre"
                }
            ];
            const title = useTranslatedContent("A title", "en", "title", translation_entries);
        
            return (
                <>
                    { title.translatedContent }
                </>
            );
        }
    
        const component = render(
            <IntlProvider locale="en">
                <TranslatedContent />
            </IntlProvider>
        );
    
        expect(screen.getByText("A title"));
    });

    it('should not render translated content when origin field and target field are not the same', () => {
        const TranslatedContent = () => {
            const translation_entries = [
                {
                    target_language: "fr",
                    is_approved: true,
                    origin_field: "name",
                    translated_content: "Un titre"
                }
            ];
            const title = useTranslatedContent("A title", "en", "title", translation_entries);
        
            return (
                <>
                    { title.translatedContent }
                </>
            );
        }
    
        const component = render(
            <IntlProvider locale="fr">
                <TranslatedContent />
            </IntlProvider>
        );
    
        expect(screen.getByText("A title"));
    });

    it('should not render translated content if it is not approved', () => {
        const TranslatedContent = () => {
            const translation_entries = [
                {
                    target_language: "fr",
                    is_approved: false,
                    origin_field: "title",
                    translated_content: "Un titre"
                }
            ];
            const title = useTranslatedContent("A title", "en", "title", translation_entries);
        
            return (
                <>
                    { title.translatedContent }
                </>
            );
        }
    
        const component = render(
            <IntlProvider locale="fr">
                <TranslatedContent />
            </IntlProvider>
        );
    
        expect(screen.getByText("A title"));
    });
});
