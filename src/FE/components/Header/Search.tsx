import detectPlatform from '@/FE/utils/detectPlatform';
import { triggerShortcut } from '@/FE/utils/handleShortcut';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useRef, useState } from 'react';

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
  const ref = useRef<HTMLInputElement>(null);

  triggerShortcut(() => ref.current?.focus());

  const search = async (q: string) => {
    if (!q) return;
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json` +
      `?types=country&limit=5&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
    )
    const data = await res.json();
    setOptions(data.features);
  }

  const platform = detectPlatform();

  const placeholder: Record<string, string> = {
    mac: "⌘ + /",
    windows: "CTRL + /",
    linux: "SUPER + /",
    mobile: "Search for a place",
    other: "Search for a place",
  }

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(opt: any) => opt?.place_name}
      onInputChange={(_, val) => search(val)}
      onChange={(_, val) => val && onSelect(val)}
      renderInput={(param) => (
        <TextField
          {...param}
          inputRef={ref}
          placeholder={placeholder[platform]}
          size='small'
        />
      )}
      sx={{
        width: 1, p: 2,
        "& .MuiInputBase-root": { borderRadius: "11px", bgcolor: "#71797E" },
        "& .MuiIconButton-root": { display: "none" }
      }}
    />
  )
}
