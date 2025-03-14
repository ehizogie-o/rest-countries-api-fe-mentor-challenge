import { Box, Pagination } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import {
  getCountries,
  getCountriesByName,
  getCountriesByRegion,
} from "../api/countries";
import CountryCard from "../components/CountryCard";
import { Country } from "../types/countryDetails";
import NormalInputField, { SelectField } from "../components/SearchFields";
import { useDebounce } from "use-debounce";
import SkeletonLoader from "../components/SkeletonLoader";

const arr = Array.from({ length: 4 }, (_, i) => i + 1);

const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedQuery] = useDebounce(searchValue, 500);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [count, setCount] = useState<number>(2);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(24);
  const itemsPerPage = 12;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSelectedRegion = (region: string) => {
    setSelectedRegion(region);
  };

  useEffect(() => {
    if (searchValue === "") {
      const fetchCountries = async () => {
        setCountries([]);
        setTotal(0);
        setCount(0);
        try {
          const response = await getCountries();
          const newTotal = response.length;
          setTotal(newTotal);
          setCount(Math.round(response.length / itemsPerPage));
          setCountries(response.slice(0, itemsPerPage));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchCountries();
    } else {
      if (debouncedQuery) {
        const fetchCountriesByName = async () => {
          setCountries([]);
          setTotal(0);
          setCount(0);
          try {
            const response = await getCountriesByName(debouncedQuery);
            const newTotal = response.length;
            setTotal(newTotal);
            setCount(Math.round(response.length / itemsPerPage));
            setCountries(response.slice(0, itemsPerPage));
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        fetchCountriesByName();
      }
    }
  }, [searchValue, debouncedQuery, selectedRegion]);

  const handleGetCountriesByRegion = async (region: string) => {
    setCountries([]);
    setTotal(0);
    setCount(0);

    try {
      const response = region
        ? await getCountriesByRegion(region)
        : await getCountries();

      console.log(response);

      // Update total and count
      const newTotal = response.length;
      setTotal(newTotal);
      setCount(Math.ceil(newTotal / itemsPerPage)); // Use `ceil` for accurate pagination

      // Slice results for pagination
      const paginatedData = response.slice(0, itemsPerPage);
      console.log(paginatedData);
      setCountries(paginatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
        console.error("Error fetching data:", error);
      }
    };
    fetchAndSliceCountries();
  }, [page, selectedRegion]);

  return (
    <Box>
      <Box display="flex">
        <NormalInputField
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <SelectField
          onGetCountries={handleGetCountriesByRegion}
          onSelectRegion={handleSelectedRegion}
        />
      </Box>
      <Grid container mt="50px" spacing="70px">
        {countries.length === 0
          ? arr.map(() => {
              return (
                <Grid size={3}>
                  <SkeletonLoader />
                </Grid>
              );
            })
          : countries.map((country) => {
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
