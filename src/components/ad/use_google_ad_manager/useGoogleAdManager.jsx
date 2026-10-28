import { useEffect } from "react";

export const GPT_SRC = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";

const isGptPresent = () => {
	if (typeof window === "undefined" || typeof document === "undefined") {
		return true;
	}
	if (window.googletag && window.googletag.apiReady) {
		return true;
	}
	const scripts = document.querySelectorAll("script[src]");
	for (const script of scripts) {
		if (/\/gpt\.js(\?|$)/.test(script.src)) {
			return true;
		}
	}
	return false;
};

const loadGptScript = (enableDidomi = false) => {
	if (isGptPresent()) {
		return false;
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
	return true;
};

let gptServicesEnabled = false;

const ensureGptServices = () => {
	if (typeof window === "undefined" || gptServicesEnabled) {
		return;
	}
	const googletag = window.googletag || (window.googletag = { cmd: [] });
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
		if (!loadGptScript(enableDidomi)) {
			return;
		}
		ensureGptServices();
	}, []);

	return null;
};
