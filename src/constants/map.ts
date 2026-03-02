import { MapConfig, MapStyles } from '../types/map';

// World map GeoJSON URL
export const WORLD_MAP_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

// Default map styles
export const DEFAULT_MAP_STYLES: MapStyles = {
  defaultFill: '#DDD',
  defaultStroke: '#333',
  defaultStrokeWidth: 0.5,
  hoverFill: '#333',
  hoverStroke: '#111',
  hoverStrokeWidth: 2,
  pressedFill: '#333',
  backgroundColor: '#1e3b5c',
};

// Default map configuration
export const DEFAULT_MAP_CONFIG: MapConfig = {
  width: 800,
  height: 600,
  projection: 'geoEqualEarth',
  scale: 147,
  showGraticule: false,
  showSphere: false,
};

// Available projections
export const MAP_PROJECTIONS = {
  geoEqualEarth: 'geoEqualEarth',
  geoMercator: 'geoMercator',
  geoOrthographic: 'geoOrthographic',
} as const;