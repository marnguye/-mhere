import "./App.css";
import { useRef } from 'react';
import Grid from "@mui/material/Grid";
import Header from "@/FE/components/Header/Header";
import Body from "@/FE/components/Body/Body";

function App() {
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const flyToCountry = (country: any) => {

    if (!mapRef.current) return;
    if (country.bbox) {
      mapRef.current.fitBounds(
        [
          [country.bbox[0], country.bbox[1]],
          [country.bbox[2], country.bbox[3]],
        ],
        { padding: 40 }
      )
    } else {
      mapRef.current.flyTo({ center: country.center, zoom: 5 })
    }
  }
  return (
    <Grid sx={{ height: "100vh", overflow: "hidden", }}>
      <Header onCountrySelect={flyToCountry} />
      <Body mapRef={mapRef} />
    </Grid>
  );
}

export default App;
