import React, { useEffect } from 'react';
import styles from "./AdUnit.module.scss";
import PropTypes from 'prop-types';

export const AdUnit = ({ id, adPath, sizes = [], targeting, enableDidomi = false }) => {
    if(!id || !adPath) {
        return null;
    }
    const divId = `div-gpt-ad-${id}`;

    useEffect(() => {
        if(typeof window !== 'undefined' && divId && adPath) {
            const googletag = window.googletag || (window.googletag = { cmd: [] });
            let slot;

            googletag.cmd.push(function() {
                slot = googletag
                    .defineSlot(adPath, sizes, divId)
                    .setTargeting('origine', ['logora'])
                    .addService(googletag.pubads());
                for (const [key, value] of Object.entries(targeting || {})) {
                    slot.setTargeting(key, value);
                }

                googletag.display(divId);
                googletag.pubads().refresh([slot]);
            });

            return () => {
                const googletag = window.googletag || {cmd: []};
                googletag.cmd.push(function() {
                    googletag.destroySlots([slot]);
                });
            }
        }
    });

    if(enableDidomi === true) {
        return (
            <script type="didomi/html" data-vendor="didomi:google" data-purposes="cookies">
                <div className={styles.adContainer}>
                    <div className={styles.adUnit} id={divId}></div>
                </div>
            </script>
        );
    } else {
        return (
            <div className={styles.adContainer}>
                <div className={styles.adUnit} id={divId}></div>
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
    /** Whether to add didomi attributes to manage user consent */
    enableDidomi: PropTypes.bool
};

AdUnit.defaultProps = {
    sizes: [],
    enableDidomi: false
};