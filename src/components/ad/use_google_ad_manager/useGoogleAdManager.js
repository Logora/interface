import { useEffect } from 'react';

export const useGoogleAdManager = (enable = true, enableDidomi = false, refreshRate = 8000) => {
    useEffect(() => {
        if (enable === true && typeof window !== 'undefined') {
            if (!(window.googletag && googletag.apiReady)) {
                const libScript = document.createElement("script");
                libScript.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
                libScript.async = true;
                if (enableDidomi === true) {
                    libScript.type = "didomi/javascript";
                    libScript.setAttribute("data-vendor-raw", "didomi:google");
                    libScript.setAttribute("data-purposes", "cookies");
                }
                document.body.appendChild(libScript);
            }

            const googletag = window.googletag || (window.googletag = { cmd: [] });

            googletag.cmd.push(function () {
                googletag.pubads().enableSingleRequest();
                googletag.pubads().disableInitialLoad();
                googletag.enableServices();

                googletag.pubads().addEventListener('impressionViewable', function (event) {
                    setTimeout(function () {
                        googletag.cmd.push(function () {
                            googletag.pubads().refresh([event.slot]);
                        });
                    }, refreshRate);
                });
            });
        }
    }, []);

    return null;
}