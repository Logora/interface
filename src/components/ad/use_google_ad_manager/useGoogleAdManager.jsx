import { useEffect } from "react";

const GPT_SRC = "https://securepubads.g.doubleclick.net/tag/gpt.js";

const loadGptScript = (enableDidomi = false) => {
	if (typeof window === "undefined" || typeof document === "undefined") {
		return;
	}
	if (document.querySelector(`script[src="${GPT_SRC}"]`)) {
		return;
	}
	const libScript = document.createElement("script");
	libScript.src = GPT_SRC;
	libScript.async = true;
	if (enableDidomi === true) {
		libScript.type = "didomi/javascript";
		libScript.setAttribute("data-vendor-raw", "didomi:google");
		libScript.setAttribute("data-purposes", "cookies");
	}
	document.body.appendChild(libScript);
};

let gptServicesEnabled = false;

const ensureGptServices = () => {
	if (typeof window === "undefined") {
		return;
	}
	const googletag = window.googletag || (window.googletag = { cmd: [] });
	if (gptServicesEnabled) {
		return;
	}
	gptServicesEnabled = true;
	googletag.cmd.push(() => {
		googletag.enableServices();
	});
};

export const useGoogleAdManager = (enable = true, enableDidomi = false) => {
	useEffect(() => {
		if (enable !== true || typeof window === "undefined") {
			return;
		}
		loadGptScript(enableDidomi);
		ensureGptServices();
	}, []);

	return null;
};
