import { useEffect } from 'react';

export const useMatomo = (matomoHost, matomoContainerTag, enable = true) => {
    useEffect(() => {
      if(enable && matomoHost && matomoContainerTag) {
        const script = document.createElement("script");
        script.async = true;
        script.text = "var _mtm = window._mtm = window._mtm || []; \
        _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'}); \
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0]; \
        g.async=true; g.src='https://" + matomoHost + "/js/container_" + matomoContainerTag + ".js'; s.parentNode.insertBefore(g,s);";
        document.body.appendChild(script);
      }
    }, []);

    return null;
}