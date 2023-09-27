import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from "prop-types";

export const Link = ({ className, to, external, rel = "nofollow", target = "_self", children, ...rest }) => {
    if(external) {
        return (
            <a 
                href={to} 
                className={className} 
                role="link"
                target={target} 
                rel={rel} 
                {...rest}
            >
                { children }
            </a>
        );
    } else {
        return (
            <RouterLink 
                to={to} 
                role="link"
                className={className} 
                target={target} 
                rel={rel} 
                {...rest}
            >
                { children }
            </RouterLink>
        );
    }
}

Link.propTypes = {
    /** href, or object passed to react-router */
    to: PropTypes.any,
    /** Class name to style the link */
    className: PropTypes.string,
    /** If `true`, will render a plain anchor tag instead of react-router's Link */
    external: PropTypes.bool,
    /** rel HTML attribute  */
    rel: PropTypes.string,
    /**  target HTML attribute */
    target: PropTypes.string,
    /**  Content of the link */
    children: PropTypes.node,
    /** Extra props passed to the component */
    rest: PropTypes.object
};