import { useState, useCallback } from 'react';
import { HoveredCountry, CountryGeography } from '../types/map';

export const useMap = () => {
  const [hoveredCountry, setHoveredCountry] = useState<HoveredCountry | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleCountryHover = useCallback((
    countryName: string | null, 
    event?: React.MouseEvent
  ) => {
    if (countryName && event) {
      setHoveredCountry({
        name: countryName,
        position: { x: event.clientX, y: event.clientY }
      });
      setTooltipPosition({ x: event.clientX, y: event.clientY });
    } else {
      setHoveredCountry(null);
    }
  }, []);

  const handleCountryClick = useCallback((
    countryName: string,
    geography: CountryGeography
  ) => {
    setSelectedCountry(countryName);
    console.log('Country selected:', countryName, geography);
    // You can add more logic here (navigation, data fetching, etc.)
  }, []);

  const handleCountryLeave = useCallback(() => {
    setHoveredCountry(null);
  }, []);

  return {
    hoveredCountry,
    selectedCountry,
    tooltipPosition,
    handleCountryHover,
    handleCountryClick,
    handleCountryLeave,
  };
};