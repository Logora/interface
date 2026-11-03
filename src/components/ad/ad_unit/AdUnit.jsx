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
	const pendingRef = useRef(false);
	const prevRef = useRef(null);

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
			slot.setConfig({ collapseDiv: "ON_NO_FILL" });
			slot.addService(pubads);
			slotRef.current = slot;
			googletag.display(divId);
			if (pubads.isInitialLoadDisabled()) {
				pubads.refresh([slot]);
			}
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
	}, [id, adPath]);

	useEffect(() => {
		const prev = prevRef.current;
		const divStable = prev !== null && prev.divId === divId;
		const rearmWanted =
			divStable &&
			refresh === true &&
			(prev.refresh !== true || prev.refreshInterval !== refreshInterval);
		prevRef.current = { refresh, refreshInterval, divId };
		if (typeof window === "undefined" || refresh !== true || !id || !adPath) {
			return;
		}
		const googletag = window.googletag || (window.googletag = { cmd: [] });
		const interval = Math.max(refreshInterval, MIN_REFRESH_INTERVAL);
		let cancelled = false;
		let handler = null;

		const fireRefresh = () => {
			const slot = slotRef.current;
			if (cancelled || !slot) {
				return;
			}
			googletag.cmd.push(() => {
				if (cancelled) {
					return;
				}
				googletag.pubads().refresh([slot]);
			});
		};

		const scheduleRefresh = () => {
			if (cancelled || timerRef.current) {
				return;
			}
			timerRef.current = setTimeout(() => {
				timerRef.current = null;
				if (cancelled || !slotRef.current) {
					return;
				}
				if (document.visibilityState !== "visible") {
					pendingRef.current = true;
					return;
				}
				fireRefresh();
			}, interval);
		};

		const handleVisibilityChange = () => {
			if (
				document.visibilityState === "visible" &&
				pendingRef.current &&
				!cancelled
			) {
				pendingRef.current = false;
				scheduleRefresh();
			}
		};

		googletag.cmd.push(() => {
			if (cancelled || !slotRef.current) {
				return;
			}
			handler = (event) => {
				if (event.slot !== slotRef.current || timerRef.current) {
					return;
				}
				scheduleRefresh();
			};
			googletag.pubads().addEventListener("impressionViewable", handler);
			if (rearmWanted && document.visibilityState === "visible") {
				scheduleRefresh();
			}
		});
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			cancelled = true;
			if (timerRef.current) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
			}
			pendingRef.current = false;
			const registered = handler;
			handler = null;
			document.removeEventListener("visibilitychange", handleVisibilityChange);
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
