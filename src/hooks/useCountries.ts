import { useState, useEffect } from "react";

// Define the structure of the GeoJSON/TopoJSON data
interface TopoJSONData {
  objects: {
    countries: {
      geometries: Array<{
        properties?: {
          name: string;
          [key: string]: any;
        };
        [key: string]: any;
      }>;
    };
  };
}

export const useCountries = (geoUrl: string) => {
  const [countries, setCountries] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCountryNames = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(geoUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: TopoJSONData = await response.json();
        
        if (!data?.objects?.countries?.geometries) {
          throw new Error('Invalid data structure: could not find countries geometries');
        }

        const countriesData = data.objects.countries;

        const names: string[] = countriesData.geometries
          .map((geo) => geo.properties?.name)
          .filter((name): name is string => Boolean(name)) // Type guard to filter out undefined
          .sort((a: string, b: string) => a.localeCompare(b));
        
        setCountries(names);
        setError(null);
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error('Unknown error occurred');
        setError(errorObj);
        console.error('Error fetching country names:', errorObj);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryNames();
  }, [geoUrl]);

  return { countries, loading, error };
};