import React, { useEffect } from 'react';
import styles from "./AdUnit.module.scss";
import PropTypes from 'prop-types';

export const AdUnit = ({ id, adPath, sizes = [], targeting, enableDidomi = false, refreshRate = 8000 }) => {
    if(!id || !adPath) {
        return null;
    }

    useEffect(() => {
        if(typeof window !== 'undefined' && id && adPath) {
            window.googletag = window.googletag || {cmd: []};
            googletag.cmd.push(function() {
                var slot = googletag.defineSlot(adPath, sizes, id)
                    .setTargeting('origine', ['logora'])
                    .addService(googletag.pubads());
                for (const [key, value] of Object.entries(targeting || {})) {
                    slot.setTargeting(key, value);
                }
                googletag.pubads().disableInitialLoad();
                googletag.enableServices();
                googletag.display(id);

                googletag.pubads().addEventListener('impressionViewable', function(event) {
                    var s = event.slot;
                    setTimeout(function () {
                        googletag.pubads().refresh([s]);
                    }, refreshRate);
                });
            });

            return () => {
                const googletag = window.googletag || {cmd: []};
                googletag.cmd.push(function() {
                    googletag.destroySlots();
                });
            }
        }
    });

    if(enableDidomi === true) {
        return (
            <script type="didomi/html" data-vendor="didomi:google" data-purposes="cookies">
                <div className={styles.adContainer}>
                    <div className={styles.adUnit} id={id}></div>
                </div>
            </script>
        );
    } else {
        return (
            <div className={styles.adContainer}>
                <div className={styles.adUnit} id={id}></div>
            </div>
        );
    }
}

AdUnit.propTypes = {
    /** A string to be used as container div id */
    id: PropTypes.string.isRequired,
    /** Ad slot path */
    adPath: PropTypes.string.isRequired,
    /** An optional object which includes ad targeting key-value pairs */
    targeting: PropTypes.object,
    /** Sizes of slot */
    sizes: PropTypes.array,
    /** Ad refresh rate */
    refreshRate: PropTypes.number,
    /** Whether to add didomi attributes to manage user consent */
    enableDidomi: PropTypes.bool
};

AdUnit.defaultProps = {
    sizes: [],
    refreshRate: 8000,
    enableDidomi: false
};