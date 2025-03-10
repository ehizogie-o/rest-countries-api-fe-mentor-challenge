import { Box, Pagination } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { getCountries, getCountriesByRegion } from "../api/countries";
import CountryCard from "../components/CountryCard";
import { Country } from "../types/countryDetails";
import NormalInputField, { SelectField } from "../components/SearchFields";

const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [count, setCount] = useState<number>(2);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(24);
  const itemsPerPage = 12;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        const newTotal = response.length;
        setTotal(newTotal);
        setCount(Math.round(response.length / itemsPerPage));
        setCountries(response.slice(0, itemsPerPage));
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountries();
  }, []);

  const handleSelectedRegion = (region: string) => {
    setSelectedRegion(region);
  };

  const handleGetCountriesByRegion = (region: string) => {
    const fetchCountriesByRegion = async () => {
      try {
        const response = await getCountriesByRegion(region);
        console.log(response);

        // Correctly update total and count
        const newTotal = response.length;
        setTotal(newTotal);
        setCount(Math.round(newTotal / itemsPerPage));

        // Slice the results for pagination
        const value = response.slice(0, itemsPerPage);
        console.log(value);
        setCountries(value);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountriesByRegion();
  };

  useEffect(() => {
    const fetchAndSliceCountries = async () => {
      try {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        if (selectedRegion === "") {
          const response = await getCountries();
          setCountries(response.slice(startIndex, endIndex));
        } else {
          const response = await getCountriesByRegion(selectedRegion);
          setCountries(response.slice(startIndex, endIndex));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAndSliceCountries();
  }, [page, selectedRegion]);

  return (
    <Box>
      <Box display="flex">
        <NormalInputField />
        <SelectField
          onGetCountries={handleGetCountriesByRegion}
          onSelectRegion={handleSelectedRegion}
        />
      </Box>
      <Grid container mt="50px" spacing="70px">
        {countries.map((country) => {
          return (
            <Grid size={3} key={country.id}>
              <CountryCard cardProps={country} />
            </Grid>
          );
        })}
      </Grid>
      <Box pt={5} display="flex" justifyContent="center">
        <Pagination
          size="large"
          siblingCount={2}
          count={count}
          page={page}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default Home;
