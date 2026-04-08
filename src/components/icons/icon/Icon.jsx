import React, { useContext } from 'react';
import { IconContext } from '@logora/debate/icons/icon_provider';

export const Icon = ({ name, height = 20, width = 20, className, ...rest }) => {
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

