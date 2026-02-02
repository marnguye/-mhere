import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

type MapProps = {
  mapRef: React.MutableRefObject<mapboxgl.Map | null>;
}

export default function Map({ mapRef }: MapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [userMarker, setUserMarker] = useState<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center: [1, 0],
      zoom: 2,
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  const showMe = () => {
    if (!navigator.geolocation || !mapRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (userMarker) userMarker.setLngLat([longitude, latitude]);
        else {
          const marker = new mapboxgl.Marker({ color: 'red' })
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current!);
          setUserMarker(marker);
        }

        mapRef.current!.flyTo({ center: [longitude, latitude], zoom: 12 });
      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );
  };
  return (
    <Box className="relative w-full h-full">
      <Box
        ref={containerRef}
        className="w-full h-full"
      />
      <Button
        onClick={showMe}
        sx={{ position: "absolute", width: 200, height: 55, borderRadius: "15px", bottom: 0, right: 0, zIndex: 10, bgcolor: "#ee5b2b", color: "#fff", fontSize: 20, m: 2, }}
      >
        My Location
      </Button>
    </Box >
  );
}
