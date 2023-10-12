import React, { useContext } from 'react';
import { IconContext } from '@logora/debate.icons.icon_provider';
import PropTypes from "prop-types";

export const Icon = ({ name, height, width, className, ...rest }) => {
    const { iconLibrary } = useContext(IconContext);

    if (!iconLibrary || !name) {
      return null;
    }
  
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const IconComponent = iconLibrary[capitalizeFirstLetter(name)];
  
    return IconComponent ? <IconComponent height={height} width={width} className={className} {...rest} /> : null;
};

Icon.propTypes = {
    /** Icon name */
    name: PropTypes.string.isRequired,
    /** Icon height in pixels */
    height: PropTypes.number,
    /** Icon width in pixels */
    width: PropTypes.number,
    /** Icon class name */
    className: PropTypes.string,
    /** Extra props passed to the icon */
    rest: PropTypes.object
  };