import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { WorldMap } from './components/map';
import './App.css';
import { Box, AppBar, Chip, Typography, Backdrop, CircularProgress } from '@mui/material';
import { apiClient } from './config/api';
import { useCountries } from './hooks/useCountries';
import { WORLD_MAP_URL } from './constants/map';
import CountryPage from './pages/CountryPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { countries, loading, error } = useCountries(WORLD_MAP_URL);
  const [values, setValues] = useState<Object>()
  const navigate = useNavigate();

  const handleCountryHover = (countryName: string | null) => {
    if (countryName) {

    }
  };
  const handleCountryClick = (countryName:string)=> {
        const name = countryName
            .toLowerCase()
            .replace(/\s+/g, '-')     
            .replace(/[^\w-]+/g, ''); 
          
          navigate(`/country/${name}`);
  }

  useEffect(()=> {
    const getValues = async () => {
      const values = await apiClient.post('/countries', countries);
      if (values) {
        return values.data.data
      }
    }
    if (countries) getValues().then(data => setValues(data))
  },[countries])

  if (error) {
    return (
      <div className="app">
        <Typography 
            variant="body1" 
            component="h5"
          >
            Unexpected error: {error.message}
        </Typography>
      </div>
    )
  }

  return (
     <Routes>
       <Route 
        path="/" 
        element={
          <div className="app">
            {loading && 
              <Typography 
                  component="h3"
                >
                  Loading ..
              </Typography>
            }
              <Backdrop
              sx={{
                zIndex:1,
                backgroundColor: 'rgb(150 150 150 / 60%)'
              }}
              open={!values && !loading && !error}
            >
              <CircularProgress color="inherit" />
            </Backdrop> 
            <main className="landing">
                <Box sx={{ flexGrow: 0 }}>
                  <AppBar position="static" sx={{flexDirection: "row", p:"5px", gap:1, background:"darkgray"}}>
                    <Chip size="small" label="categories" title="categories"/>
                    <Chip  size="small" label="categories" title="categories"/>
                    <Chip  size="small" label="categories" title="categories"/>
                    <Chip  size="small" label="categories" title="categories"/>
                  </AppBar>
                </Box>
              
              {countries && 
                <section className="map-container">
                  <WorldMap
                    defaultFill="#E5E7EB"
                    defaultStroke="#4B5563"
                    defaultStrokeWidth={0.5}
                    hoverFill="#4B5563"
                    hoverStroke="#4B5563"
                    hoverStrokeWidth={1}
                    backgroundColor='transparent'
                    
                    // Configure map
                    // width={1920} // Large base width
                    // height={1080} // Large base height
                    // scale={200}
                    projection="geoEqualEarth"
                    
                    // Add interactions
                    onCountryClick={handleCountryClick}
                    onCountryHover={handleCountryHover}
                    
                    // Optional features
                    showGraticule={false}
                    showSphere={false}

                    values={values}
                  />
                </section>
              }
            </main>
          </div>}/>

          <Route path="/country/:countryName" element={<CountryPage />} />
          <Route path="*" element={<NotFoundPage />} />
     </Routes>
  );
}

export default App;