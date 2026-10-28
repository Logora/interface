import React, { useEffect, useRef } from "react";
import styles from "./AdUnit.module.scss";

export const MIN_REFRESH_INTERVAL = 30000;

export const AdUnit = ({
	id,
	adPath,
	sizes = [],
	targeting,
	enableDidomi = false,
	refresh = false,
	refreshInterval = MIN_REFRESH_INTERVAL,
}) => {
	if (!id || !adPath) {
		return null;
	}
	const divId = `div-gpt-ad-${id}`;
	const slotRef = useRef(null);
	const timerRef = useRef(null);

	useEffect(() => {
		if (typeof window === "undefined" || !divId || !adPath) {
			return;
		}
		const googletag = window.googletag || (window.googletag = { cmd: [] });
		let cancelled = false;
		let viewableHandler = null;

		const clearRefreshTimer = () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
			}
		};

		googletag.cmd.push(() => {
			if (cancelled) {
				return;
			}
			const pubads = googletag.pubads();
			const stale = pubads
				.getSlots()
				.filter((slot) => slot.getSlotElementId() === divId);
			if (stale.length > 0) {
				googletag.destroySlots(stale);
			}
			const slot = googletag.defineSlot(adPath, sizes, divId);
			if (!slot) {
				return;
			}
			slot.setTargeting("origine", ["logora"]);
			for (const [key, value] of Object.entries(targeting || {})) {
				slot.setTargeting(key, value);
			}
			slot.setCollapseEmptyDiv(true);
			slot.addService(pubads);
			slotRef.current = slot;
			googletag.display(divId);

			if (refresh === true) {
				const interval = Math.max(refreshInterval, MIN_REFRESH_INTERVAL);
				viewableHandler = (event) => {
					if (event.slot !== slotRef.current || timerRef.current) {
						return;
					}
					timerRef.current = setTimeout(() => {
						timerRef.current = null;
						if (cancelled || document.visibilityState !== "visible") {
							return;
						}
						googletag.cmd.push(() => {
							if (cancelled || !slotRef.current) {
								return;
							}
							pubads.refresh([slotRef.current]);
						});
					}, interval);
				};
				pubads.addEventListener("impressionViewable", viewableHandler);
			}
		});

		return () => {
			cancelled = true;
			clearRefreshTimer();
			const slot = slotRef.current;
			const handler = viewableHandler;
			slotRef.current = null;
			viewableHandler = null;
			if (typeof window === "undefined" || !window.googletag || !slot) {
				return;
			}
			const gtag = window.googletag;
			gtag.cmd.push(() => {
				if (handler) {
					gtag.pubads().removeEventListener("impressionViewable", handler);
				}
				gtag.destroySlots([slot]);
			});
		};
	}, []);

	if (enableDidomi === true) {
		return (
			<script
				type="didomi/html"
				data-vendor="didomi:google"
				data-purposes="cookies"
			>
				<div className={styles.adContainer}>
					<div className={styles.adUnit} id={divId} />
				</div>
			</script>
		);
	}
	return (
		<div className={styles.adContainer}>
			<div className={styles.adUnit} id={divId} />
		</div>
	);
};
