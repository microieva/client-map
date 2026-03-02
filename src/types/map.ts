export interface CountryGeography {
  rsmKey: string;
  properties: {
    name: string;
    [key: string]: any;
  };
}

export interface MapStyles {
  defaultFill?: string;
  defaultStroke?: string;
  defaultStrokeWidth?: number;
  hoverFill?: string;
  hoverStroke?: string;
  hoverStrokeWidth?: number;
  pressedFill?: string;
  backgroundColor?: string;
}

export interface MapConfig {
  width?: number;
  height?: number;
  projection?: 'geoEqualEarth' | 'geoMercator' | 'geoOrthographic';
  scale?: number;
  showGraticule?: boolean;
  showSphere?: boolean;
}

export interface HoveredCountry {
  name: string;
  position: { x: number; y: number };
}

export interface MapInteractions {
  onCountryClick?: (countryName: string, geography: CountryGeography) => void;
  onCountryHover?: (countryName: string | null, event?: React.MouseEvent) => void;
  onCountryLeave?: () => void;
}