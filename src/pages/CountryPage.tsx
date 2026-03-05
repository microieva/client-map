import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCountries } from '../hooks/useCountries';
import { WORLD_MAP_URL } from '../constants/map';
import { Typography } from '@mui/material';

const CountryPage: React.FC = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const navigate = useNavigate();
  const { countries, loading: countriesLoading } = useCountries(WORLD_MAP_URL);
  
  const [originalCountryName, setOriginalCountryName] = useState<string>('');
  const [countryData, setCountryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!countries || countriesLoading) return;
    const found = countries.find(
      c => c.toLowerCase().replace(/\s+/g, '-') === countryName
    );

    if (found) {
      setOriginalCountryName(found);
      fetchArticles(found);
    } else {
      navigate('/404', { replace: true });
    }
  }, [countryName, countries, countriesLoading]);

  const fetchArticles = async (country: string) => {
    try {
      setLoading(true);
      // const response = await fetch(`/countries/${encodeURIComponent(country)}`);
      // const data = await response.json();
      setCountryData(country);
    } catch (error) {
      console.error('Error fetching country data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (countriesLoading || loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="country-page">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Map
      </button>
      
      <h1>{originalCountryName}</h1>
      
      <div className="country-content">
        COUNTRY CONTENT
        {countryData && (
          <Typography component="h4">{countryData}</Typography>
        )}
      </div>
    </div>
  );
};

export default CountryPage;