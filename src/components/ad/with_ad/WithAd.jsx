import React from "react";
import { AdUnit } from "@logora/debate/ad/ad_unit";

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

