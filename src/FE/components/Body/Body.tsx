import Grid from "@mui/material/Grid";
import Map from '@/FE/components/Body/components/Map/Map';

type BodyProps = {
  mapRef: React.MutableRefObject<mapboxgl.Map | null>;
}

export default function Body({ mapRef }: BodyProps) {
  return (
    <Grid className="body_container" sx={{ flex: 1, width: "100vw", height: "100vh" }}>
      <Map mapRef={mapRef} />
    </Grid>
  )
}
