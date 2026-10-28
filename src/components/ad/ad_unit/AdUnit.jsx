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
	const divId = `div-gpt-ad-${id}`;
	const slotRef = useRef(null);
	const timerRef = useRef(null);

	useEffect(() => {
		if (typeof window === "undefined" || !id || !adPath) {
			return;
		}
		const googletag = window.googletag || (window.googletag = { cmd: [] });
		let cancelled = false;

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
		});

		return () => {
			cancelled = true;
			const slot = slotRef.current;
			slotRef.current = null;
			if (typeof window === "undefined" || !window.googletag || !slot) {
				return;
			}
			window.googletag.cmd.push(() => {
				window.googletag.destroySlots([slot]);
			});
		};
	}, []);

	useEffect(() => {
		if (typeof window === "undefined" || refresh !== true || !id || !adPath) {
			return;
		}
		const googletag = window.googletag || (window.googletag = { cmd: [] });
		const interval = Math.max(refreshInterval, MIN_REFRESH_INTERVAL);
		let cancelled = false;
		let handler = null;

		googletag.cmd.push(() => {
			if (cancelled || !slotRef.current) {
				return;
			}
			const pubads = googletag.pubads();
			handler = (event) => {
				if (event.slot !== slotRef.current || timerRef.current) {
					return;
				}
				timerRef.current = setTimeout(() => {
					timerRef.current = null;
					const slot = slotRef.current;
					if (cancelled || !slot || document.visibilityState !== "visible") {
						return;
					}
					googletag.cmd.push(() => {
						if (cancelled) {
							return;
						}
						pubads.refresh([slot]);
					});
				}, interval);
			};
			pubads.addEventListener("impressionViewable", handler);
		});

		return () => {
			cancelled = true;
			if (timerRef.current) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
			}
			const registered = handler;
			handler = null;
			if (typeof window === "undefined" || !window.googletag || !registered) {
				return;
			}
			window.googletag.cmd.push(() => {
				window.googletag
					.pubads()
					.removeEventListener("impressionViewable", registered);
			});
		};
	}, [refresh, refreshInterval, divId]);

	if (!id || !adPath) {
		return null;
	}
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
