import { useContext } from 'react';
import { ResponsiveContext } from './ResponsiveContext';

export const useResponsive = () => {
  const { isMobile, isTablet, isDesktop } = useContext(ResponsiveContext) || {};

  return { isMobile, isTablet, isDesktop };
}