import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

type CountryData = {
  id: string
  place_name: string
  center: [number, number]
  bbox?: [number, number, number, number];
}

type SearchCountryProps = {
  onSelect: (country: CountryData) => void;
}

export default function SearchCountry({ onSelect }: SearchCountryProps) {
  const [options, setOptions] = useState<CountryData[]>([]);

  const search = async (q: string) => {
    if (!q) return;
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json` +
      `?types=country&limit=5&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
    )
    const data = await res.json();
    setOptions(data.features);
  }

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(opt: any) => opt?.place_name}
      onInputChange={(_, val) => search(val)}
      onChange={(_, val) => val && onSelect(val)}
      renderInput={(param) => (
        <TextField {...param} label="Search for a place" size='small' />
      )}
      sx={{
        width: 1, p: 2,
        "& .MuiInputBase-root": { borderRadius: "10px", bgcolor: "#71797E" }
      }}
    />
  )
}
