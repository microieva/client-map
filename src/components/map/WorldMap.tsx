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
}

const WorldMap: React.FC<WorldMapProps> = ({
  // Styles
  defaultFill = DEFAULT_MAP_STYLES.defaultFill,
  defaultStroke = DEFAULT_MAP_STYLES.defaultStroke,
  defaultStrokeWidth = DEFAULT_MAP_STYLES.defaultStrokeWidth,
  hoverFill = DEFAULT_MAP_STYLES.hoverFill,
  hoverStroke = DEFAULT_MAP_STYLES.hoverStroke,
  hoverStrokeWidth = DEFAULT_MAP_STYLES.hoverStrokeWidth,
  pressedFill = DEFAULT_MAP_STYLES.pressedFill,
  backgroundColor = DEFAULT_MAP_STYLES.backgroundColor,
  
  // Config
  width = DEFAULT_MAP_CONFIG.width,
  height = DEFAULT_MAP_CONFIG.height,
  projection = DEFAULT_MAP_CONFIG.projection,
  scale = DEFAULT_MAP_CONFIG.scale,
  showGraticule = DEFAULT_MAP_CONFIG.showGraticule,
  showSphere = DEFAULT_MAP_CONFIG.showSphere,
  
  // Interactions
  onCountryClick,
  onCountryHover,
  onCountryLeave,
  
  className = '',
}) => {
  const [hoveredGeography, setHoveredGeography] = useState<any>(null);
  const { hoveredCountry, handleCountryHover, handleCountryClick, handleCountryLeave } = 
    useMap();

  const handleGeographyHover = (geography: any, event: React.MouseEvent) => {
    setHoveredGeography(geography);
    const countryName = geography.properties.name;
    handleCountryHover(countryName, event);
    onCountryHover?.(countryName, event);
  };

  const handleGeographyLeave = () => {
    setHoveredGeography(null);
    handleCountryLeave();
    onCountryLeave?.();
  };

  const handleGeographyClick = (geography: any) => {
    const countryName = geography.properties.name;
    handleCountryClick(countryName, geography);
    onCountryClick?.(countryName, geography);
    console.log('GEO: ', geography)
  };

  return (
    <div 
      style={{ 
        backgroundColor, 
        width: '100%', 
        height: '100%',
        position: 'relative'
      }}
      className={className}
    >
      <ComposableMap
        width={width}
        height={height}
        projection={projection}
        projectionConfig={{
          scale,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {showSphere && <Sphere id="sphere" fill="transparent" stroke="#E4E5E6" strokeWidth={0.5} />}
        {showGraticule && <Graticule stroke="#E4E5E6" strokeWidth={0.5} />}
        
        <Geographies geography={WORLD_MAP_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isHovered = hoveredGeography?.rsmKey === geo.rsmKey;
              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(event) => handleGeographyHover(geo, event)}
                  onMouseLeave={handleGeographyLeave}
                  onClick={() => handleGeographyClick(geo)}
                  style={{
                    default: {
                      fill: defaultFill,
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
          position={hoveredCountry.position}
        />
      )}
    </div>
  );
};

export default WorldMap;