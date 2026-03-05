import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere
} from 'react-simple-maps';
import { WORLD_MAP_URL, DEFAULT_MAP_STYLES, DEFAULT_MAP_CONFIG } from '../../constants/map';
import { MapStyles, MapConfig, MapInteractions } from '../../types/map';
import { useMap } from '../../hooks/useMap';
import CountryTooltip from './CountryTooltip';

interface WorldMapProps extends MapStyles, MapConfig, MapInteractions {
  className?: string;
  values?: Object
}

const WorldMap: React.FC<WorldMapProps> = ({
  defaultFill = DEFAULT_MAP_STYLES.defaultFill,
  defaultStroke = DEFAULT_MAP_STYLES.defaultStroke,
  defaultStrokeWidth = DEFAULT_MAP_STYLES.defaultStrokeWidth,
  hoverFill = DEFAULT_MAP_STYLES.hoverFill,
  hoverStroke = DEFAULT_MAP_STYLES.hoverStroke,
  hoverStrokeWidth = DEFAULT_MAP_STYLES.hoverStrokeWidth,
  pressedFill = DEFAULT_MAP_STYLES.pressedFill,
  backgroundColor = DEFAULT_MAP_STYLES.backgroundColor,
  
  projection = DEFAULT_MAP_CONFIG.projection,
  //scale = DEFAULT_MAP_CONFIG.scale,
  showGraticule = DEFAULT_MAP_CONFIG.showGraticule,
  showSphere = DEFAULT_MAP_CONFIG.showSphere,
  
  onCountryClick,
  onCountryHover,
  onCountryLeave,
  
  className = '',
  values
}) => {
  const [hoveredGeography, setHoveredGeography] = useState<any>(null);
  const { hoveredCountry, handleCountryHover, handleCountryClick, handleCountryLeave } = 
    useMap();


  const handleGeographyHover = (geography: any, event: React.MouseEvent) => {
    setHoveredGeography(geography);
    const countryName = geography.properties.name;
    const numberOfArticlesPerCountry = values && (values as any)[countryName]
    handleCountryHover(countryName, numberOfArticlesPerCountry, event);
    onCountryHover?.(countryName, event);
  };

  const handleGeographyLeave = () => {
    setHoveredGeography(null);
    handleCountryLeave();
    onCountryLeave?.();
  };

  const handleGeographyClick = (geography: any) => {
    const countryName = geography.properties.name;
    handleCountryClick(countryName);
    onCountryClick?.(countryName, geography);
  };

  const color = (number: number): string => {
    const startColor = { r: 0, g: 116, b: 152 };  // #007498
    const endColor = { r: 41, g: 47, b: 86 };     // #292f56
    
    const minValue = 1;
    const maxValue = 10;
    const clampedNumber = Math.max(minValue, Math.min(maxValue, number));
    const factor = (clampedNumber - minValue) / (maxValue - minValue);
    
    const r = Math.round(startColor.r + (endColor.r - startColor.r) * factor);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * factor);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * factor);
    
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  return (
    <div 
      style={{ 
        backgroundColor, 
        position: 'relative'
      }}
      className={className}
    >
      <ComposableMap
        projection={projection}
        projectionConfig={{
          scale: 219,
        }}
        style={{
          maxHeight:`calc(100vh - 2rem)`,
          width:"stretch"
        }}
      >
        {showSphere && <Sphere id="sphere" fill="transparent" stroke="#E4E5E6" strokeWidth={0.5} />}
        {showGraticule && <Graticule stroke="#E4E5E6" strokeWidth={0.5} />}
        
        <Geographies geography={WORLD_MAP_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isHovered = hoveredGeography?.rsmKey === geo.rsmKey;
              isHovered;
              let number = 0;
              const name = geo.properties.name;
              if (values && (values as any)[name]) { number = (values as any)[name]}

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(event) => handleGeographyHover(geo, event)}
                  onMouseLeave={handleGeographyLeave}
                  onClick={() => handleGeographyClick(geo)}
                  style={{
                    default: {
                      fill: number === 0 ? defaultFill : color(number),
                      stroke: defaultStroke,
                      strokeWidth: defaultStrokeWidth,
                      outline: 'none',
                    },
                    hover: {
                      fill: hoverFill,
                      stroke: hoverStroke,
                      strokeWidth: hoverStrokeWidth,
                      outline: 'none',
                      cursor: 'pointer',
                    },
                    pressed: {
                      fill: pressedFill,
                      outline: 'none',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      
      {hoveredCountry && (
        <CountryTooltip
          countryName={hoveredCountry.name}
          numberOfArticles={hoveredCountry.numberOfArticles}
          position={hoveredCountry.position}
        />
      )}
    </div>
  );
};

export default WorldMap;