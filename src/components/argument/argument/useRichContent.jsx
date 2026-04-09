import { lexicalToHtml } from "@logora/debate/input/text_editor";
import { useEffect, useState } from "react";

export const useRichContent = (argument) => {
	const [richContent, setRichContent] = useState(null);

	useEffect(() => {
		if (argument.rich_content && argument.is_deleted != true) {
			const rawContent = JSON.parse(argument.rich_content);
			if (rawContent.hasOwnProperty("root")) {
				const html = lexicalToHtml(rawContent);
				setRichContent(html);
			}
		}
	}, [argument.rich_content]);

	return richContent;
};
