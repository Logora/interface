import { useEffect } from "react";
import WebFontLoader from "webfontloader";

export const useFontLoader = (fontFamilies, enable = true) => {
	useEffect(() => {
		if (enable && fontFamilies?.length) {
			WebFontLoader.load({
				google: {
					families: fontFamilies,
				},
			});
		}
	}, [enable, fontFamilies]);

	return null;
};
