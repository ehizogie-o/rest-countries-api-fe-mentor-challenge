import { TextField, InputAdornment, MenuItem, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { regions } from "../data/regions";
import { useState } from "react";

interface SelectFieldProps {
  onGetCountries: (region: string) => void;
  onSelectRegion: (region: string) => void;
}

const NormalInputField = () => {
  return (
    <TextField
      placeholder="Search for a country..."
      size="small"
      sx={{
        width: "40%",
        bgcolor: "#fff",
        borderRadius: 1,
        boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.1)",
        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export function SelectField({
  onGetCountries,
  onSelectRegion,
}: SelectFieldProps) {
  const [countryRegion, setRegion] = useState("");
  return (
    <TextField
      select
      label="Filter by Region"
      size="small"
      value={countryRegion}
      sx={{
        width: "20%",
        bgcolor: "#fff",
        ml: "auto",
        borderRadius: 1,
        boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.1)",
        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
      }}
      onChange={(e) => {
        const selectedRegion = e.target.value; // Get the new value
        setRegion(selectedRegion); // Update state
        onSelectRegion(selectedRegion); // Update state
        onGetCountries(selectedRegion); // Use the new value immediately
      }}
    >
      <MenuItem value="">
        <Typography color="grey">Filter by Region</Typography>
      </MenuItem>
      {regions.map((region, i) => {
        return (
          <MenuItem key={i} value={region}>
            {region}
          </MenuItem>
        );
      })}
    </TextField>
  );
}

export default NormalInputField;
