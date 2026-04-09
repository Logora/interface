import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const Link = ({
	className,
	to,
	external,
	rel = "nofollow",
	target = "_self",
	children,
	...rest
}) => {
	if (external) {
		return (
			<a
				href={to}
				className={className}
				role="link"
				target={target}
				rel={rel}
				{...rest}
			>
				{children}
			</a>
		);
	}
	return (
		<RouterLink
			to={to}
			role="link"
			className={className}
			target={target}
			rel={rel}
			{...rest}
		>
			{children}
		</RouterLink>
	);
};
