import { Box, InputAdornment, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { getCounties } from "../api/countries";
import CountryCard from "../components/CountryCard";
import { Country } from "../types/countryDetails";

const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCounties();
        console.log(response.slice(0, 5));
        setCountries(response.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountries();
  }, []);
  return (
    <Box>
      <Box display="flex">
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
        <TextField
          select
          label="Filter by Region"
          size="small"
          sx={{
            width: "20%",
            bgcolor: "#fff",
            ml: "auto",
            borderRadius: 1,
            boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.1)",
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          }}
        />
      </Box>
      <Grid container gap={2} mt={3}>
        {countries.map((country) => {
          console.log(countries[0]);
          return (
            <Grid size={4} key={country.id}>
              <CountryCard cardProps={country} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Home;
