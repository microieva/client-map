import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { WorldMap } from './components/map';
import './App.css';
import { Typography, Backdrop, CircularProgress, Container } from '@mui/material';
import { apiClient } from './config/api';
import { useCountries } from './hooks/useCountries';
import { WORLD_MAP_URL } from './constants/map';
import { NotFoundPage, ArticlePage, CountryPage } from './pages';
import { CountriesData, CountriesResult } from './types/api';
import Header from './components/layout/Header';

function App() {
  const { countries, loading, error } = useCountries(WORLD_MAP_URL);
  const [values, setValues] = useState<CountriesResult | undefined>(undefined);
  const [ids, setIds] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleCountryHover = (countryName: string | null) => {
    if (countryName) {

    }
  };
  const handleCountryClick = (countryName:string)=> {
    setIds(values?.[countryName]?.articleIds ?? []);

    const name = countryName
      .toLowerCase()
      .replace(/\s+/g, '-')     
      .replace(/[^\w-]+/g, ''); 
      
    navigate(`/country/${name}`);
  }

  useEffect(()=> {
    const getValues = async () => {
      const response = await apiClient.post('/countries', countries);
      if (response) {
        return response.data.data
      }
    }
    if (countries) getValues().then((data: CountriesData) => setValues(data.countries))
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
            {loading ? 
              <Container sx={{width: "100vw", height:"100vh", alignContent:"center"}}>
                <Typography 
                    sx={{textAlign:"center"}}
                    component="h3"
                  >
                    Loading ..
                </Typography>

              </Container>
            :
            <>
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
                <Header />
                
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
            </>}
          </div>}/>

      <Route path="/country/:countryName" element={<CountryPage ids={ids}/>} />
      <Route path="/article/:articleId" element={<ArticlePage />} />
      <Route path="*" element={<NotFoundPage />} />
     </Routes>
  );
}

export default App;