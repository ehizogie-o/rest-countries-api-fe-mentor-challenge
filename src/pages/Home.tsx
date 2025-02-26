import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getCounties } from "../api/countries";
import CountryCard from "../components/CountryCard";
import { Country } from "../types/countryDetails";
import NormalInputField, { SelectField } from "../components/SearchFields";

const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCounties();
        setCountries(response.slice(196, 230));
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountries();
  }, []);
  return (
    <Box>
      <Box display="flex">
        <NormalInputField />
        <SelectField />
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={5}
        mt={5}
        sx={{ justifyContent: "space-between" }}
      >
        {countries.map((country) => {
          return <CountryCard key={country.id} cardProps={country} />;
        })}
      </Box>
    </Box>
  );
};

export default Home;
