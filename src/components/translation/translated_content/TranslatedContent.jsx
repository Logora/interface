import React from "react";
import { useTranslatedContent } from "./useTranslatedContent";

export const TranslatedContent = ({
	originalContent,
	originalLanguage,
	targetField,
	translations,
}) => {
	const translatedContent = useTranslatedContent(
		originalContent,
		originalLanguage,
		targetField,
		translations,
	);

	return <>{translatedContent.translatedContent}</>;
};
