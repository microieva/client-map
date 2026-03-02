import React from 'react';
import { WorldMap } from './components/map';
import './App.css';
import { Box, AppBar, Chip } from '@mui/material';

function App() {
  const handleCountryClick = (countryName: string) => {
    console.log(`Navigating to ${countryName}...`);
    // Add navigation logic here
  };

  const handleCountryHover = (countryName: string | null) => {
    if (countryName) {
      console.log(`Hovering over ${countryName}`);
    }
  };

  return (
    <div className="app">
      <main className="landing">
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{flexDirection: "row", p:"5px", gap:1, background:"darkgray"}}>
              <Chip size="small" label="categories" title="categories"/>
              <Chip  size="small" label="categories" title="categories"/>
              <Chip  size="small" label="categories" title="categories"/>
              <Chip  size="small" label="categories" title="categories"/>
            </AppBar>
          </Box>
        
        <section className="map-container">
          <WorldMap
            defaultFill="#E5E7EB"
            defaultStroke="#4B5563"
            defaultStrokeWidth={0.8}
            hoverFill="#4B5563"
            hoverStroke="#4B5563"
            hoverStrokeWidth={1}
            backgroundColor="#F9FAFB"
            
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
          />
        </section>
      </main>
    </div>
  );
}

export default App;