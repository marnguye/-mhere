import Grid from "@mui/material/Grid";
import Map from '@/FE/components/Body/components/Map/Map';

type BodyProps = {
  mapRef: React.MutableRefObject<mapboxgl.Map | null>;
}

export default function Body({ mapRef }: BodyProps) {
  return (
    <Grid className="body_container w-full h-full" flex={1}>
      <Map mapRef={mapRef} />
    </Grid>
  )
}
