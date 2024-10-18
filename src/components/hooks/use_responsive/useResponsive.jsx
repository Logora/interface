import { useContext } from 'react';
import { ResponsiveContext } from './ResponsiveContext';

export const useResponsive = () => {
  const { isMobile, isTablet, isDesktop, elementWidth } = useContext(ResponsiveContext) || {};

  return { isMobile, isTablet, isDesktop, elementWidth };
}