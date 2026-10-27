import React, { useEffect } from "react";
import styles from "./AdUnit.module.scss";

export const AdUnit = ({
	id,
	adPath,
	sizes = [],
	targeting,
	enableDidomi = false,
	refreshRate = 30000,
}) => {
	if (!id || !adPath) {
		return null;
	}
	const divId = `div-gpt-ad-${id}`;

	useEffect(() => {
		if (typeof window === "undefined" || !divId || !adPath) {
			return;
		}
		const googletag = window.googletag || (window.googletag = { cmd: [] });
		let slot;
		let refreshTimer;

		const handleImpressionViewable = (event) => {
			if (event.slot !== slot) {
				return;
			}
			clearTimeout(refreshTimer);
			refreshTimer = setTimeout(() => {
				googletag.cmd.push(() => {
					googletag.pubads().refresh([slot]);
				});
			}, refreshRate);
		};

		googletag.cmd.push(() => {
			slot = googletag
				.pubads()
				.getSlots()
				.find((definedSlot) => definedSlot.getSlotElementId() === divId);
			if (!slot) {
				slot = googletag
					.defineSlot(adPath, sizes, divId)
					.setTargeting("origine", ["logora"])
					.addService(googletag.pubads());
				for (const [key, value] of Object.entries(targeting || {})) {
					slot.setTargeting(key, value);
				}
				googletag.display(divId);
			}
			if (refreshRate > 0) {
				googletag
					.pubads()
					.addEventListener("impressionViewable", handleImpressionViewable);
			}
		});

		return () => {
			clearTimeout(refreshTimer);
			const googletagLib = window.googletag || { cmd: [] };
			googletagLib.cmd.push(() => {
				googletagLib
					.pubads()
					.removeEventListener("impressionViewable", handleImpressionViewable);
				if (slot) {
					googletagLib.destroySlots([slot]);
				}
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
