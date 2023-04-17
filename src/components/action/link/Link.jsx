import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const Link = (props) => {
    const { className, to, external, rel, target, children, ...rest } = props;

    if(external) {
        return (
            <a 
                href={to} 
                className={className} 
                role="link"
                target={target ? target : "_self"} 
                rel={rel ? rel : "nofollow"} 
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
                target={target ? target : "_self"} 
                rel={rel ? rel : "nofollow"} 
                {...rest}
            >
                { children }
            </RouterLink>
        );
    }
}