import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import WestIcon from "@mui/icons-material/West";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCountriesById } from "../api/countries";
import NavBtn from "../components/NavBtn";

function formatString(str: string): string {
  const formattedWord = str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (match) => match.toUpperCase());
  return formattedWord;
}

const Details = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const [countryDetails, setCountryDetails] = useState({
    image: "",
    name: "",
    nativeName: "",
    population: 0,
    region: "",
    subRegion: "",
    capital: "",
    topLevelDomain: "",
    currency: "",
    languages: [] as string[],
    borderCountries: [] as string[],
  });

  useEffect(() => {
    if (!id) return;

    const fetchCountry = async () => {
      try {
        const response = await getCountriesById(id);
        console.log(response);
        setCountryDetails({
          image: response.flags.png,
          name: response.name.official,
          nativeName:
            response.name.nativeName[Object.keys(response.name.nativeName)[0]]
              .common,
          population: response.population,
          region: response.region,
          subRegion: response.subregion,
          capital: response.capital[0],
          topLevelDomain: response.tld[0],
          currency: Object.keys(response.currencies)[0],
          languages: Object.values(response.languages),
          borderCountries: response.borders || [],
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountry();
  }, [id]);
  return (
    <Box>
      <NavBtn label="Back" icon={WestIcon} />
      <Grid container mt={5}>
        <Grid size={6}>
          <Box component="img" src={countryDetails.image} />
        </Grid>
        <Grid size={6}>
          <Typography>{countryDetails.name}</Typography>
          <Grid container>
            <Grid size={6}>
              {Object.keys(countryDetails)
                .slice(2, 7)
                .map((value) => {
                  const data =
                    countryDetails[value as keyof typeof countryDetails];
                  return (
                    <Typography>
                      <strong>{formatString(value)}</strong>:{" "}
                      {Array.isArray(data)
                        ? data.join(", ") // Convert arrays to comma-separated string
                        : data}
                    </Typography>
                  );
                })}
            </Grid>
            <Grid size={6}>
              {Object.keys(countryDetails)
                .slice(7, 10)
                .map((value) => {
                  const data =
                    countryDetails[value as keyof typeof countryDetails];
                  return (
                    <Typography>
                      <strong>{formatString(value)}</strong>:{" "}
                      {Array.isArray(data)
                        ? data.join(", ") // Convert arrays to comma-separated string
                        : data}
                    </Typography>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Details;
