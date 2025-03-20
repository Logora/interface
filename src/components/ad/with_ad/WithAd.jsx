import React from "react";
import { AdUnit } from "@logora/debate.ad.ad_unit";
import PropTypes from "prop-types";

export const WithAd = ({
	id,
	adPath,
	targeting,
	sizes,
	index,
	frequency = 3,
	enableDidomi = false,
	children,
	...rest
}) => {
	return (
		<>
			{React.cloneElement(children, rest)}
			{id && adPath && (index + 1) % frequency === 1 && (
				<AdUnit
					id={index ? `${id}-${index}` : id}
					adPath={adPath}
					targeting={targeting}
					sizes={sizes}
					enableDidomi={enableDidomi}
				/>
			)}
		</>
	);
};

WithAd.propTypes = {
	/** A string to be used as ad container div id */
	id: PropTypes.string,
	/** Ad slot path */
	adPath: PropTypes.string,
	/** An optional object which includes ad targeting key-value pairs */
	targeting: PropTypes.object,
	/** Sizes of slot */
	sizes: PropTypes.array,
	/** Index of the current item */
	index: PropTypes.number,
	/** Ads will be shown every N items according to this prop */
	frequency: PropTypes.number,
	/** Whether to add didomi attributes to manage user consent */
	enableDidomi: PropTypes.bool,
	/** Content below which an ad will be displayed */
	children: PropTypes.node,
	/** Extra props passed to children */
	rest: PropTypes.object,
};
