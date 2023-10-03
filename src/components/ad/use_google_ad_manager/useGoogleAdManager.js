import { useEffect } from 'react';

export const useGoogleAdManager = (enable = true, enableDidomi = false) => {
    useEffect(() => {
        if(enable === true) {
            const libScript = document.createElement("script");
            libScript.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
            libScript.async = true;
            if(enableDidomi === true) {
                libScript.type = "didomi/javascript";
                libScript.setAttribute("data-vendor-raw", "didomi:google");
                libScript.setAttribute("data-purposes", "cookies");
            }
            document.body.appendChild(libScript);
        }
    }, []);
  
    return null;
}