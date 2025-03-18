import { Box, Typography, Grid2 as Grid } from "@mui/material";
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

const formatData = (data: string | number | string[]) => {
  if (!data) return "N/A";
  if (Array.isArray(data)) return data.join(", ");
  if (typeof data === "number") return data.toLocaleString();
  return data;
};

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
          currency:
            response.currencies[Object.keys(response.currencies)[0]].name,
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
      <NavBtn label="Back" icon={WestIcon} link="/" />
      <Grid container mt={5} alignItems="center">
        <Grid size={{ md: 6, sm: 12 }}>
          <Box
            component="img"
            src={countryDetails.image}
            width="90%"
            height={350}
          />
        </Grid>
        <Grid size={{ md: 6, sm: 12 }} sx={{ mt: { xs: 3, sm: 3, md: 0 } }}>
          <Typography variant="h4" fontWeight={700} mb={3}>
            {countryDetails.name}
          </Typography>
          <Grid container>
            <Grid size={{ md: 6, sm: 12 }}>
              {Object.keys(countryDetails)
                .slice(2, 7)
                .map((value) => {
                  const data =
                    countryDetails[value as keyof typeof countryDetails];
                  return (
                    <Typography mb={1}>
                      <strong>{formatString(value)}</strong>:{" "}
                      {data
                        ? Array.isArray(data)
                          ? data.join(", ") // Convert arrays to comma-separated string
                          : typeof data === "number" && data > 999
                          ? data.toLocaleString()
                          : data
                        : "N/A"}
                    </Typography>
                  );
                })}
            </Grid>
            <Grid size={{ md: 6, sm: 12 }}>
              {Object.keys(countryDetails)
                .slice(7, 10)
                .map((value) => {
                  const data =
                    countryDetails[value as keyof typeof countryDetails];
                  return (
                    <Typography mb={1}>
                      <strong>{formatString(value)}</strong>: {formatData(data)}
                    </Typography>
                  );
                })}
            </Grid>
          </Grid>

          <Box display="flex" alignItems="center" gap={1} mt={5}>
            <Typography>
              <strong>Border Countries:</strong>{" "}
            </Typography>
            {countryDetails.borderCountries.length === 0 ? (
              "N/A"
            ) : (
              <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" flexDirection="row" gap={1}>
                  {countryDetails.borderCountries
                    .slice(0, 5)
                    .map((country, index) => {
                      return (
                        <Box
                          key={index}
                          sx={{
                            bgcolor: "#fff",
                            color: "#000",
                            textTransform: "none",
                            px: 4,
                            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
                            borderRadius: 1,
                          }}
                        >
                          {country}
                        </Box>
                      );
                    })}
                </Box>
                {countryDetails.borderCountries.length > 5 && (
                  <Box display="flex" flexDirection="row" gap={1}>
                    {countryDetails.borderCountries
                      .slice(5)
                      .map((country, index) => {
                        return (
                          <Box
                            key={index}
                            sx={{
                              bgcolor: "#fff",
                              color: "#000",
                              textTransform: "none",
                              px: 4,
                              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
                              borderRadius: 1,
                            }}
                          >
                            {country}
                          </Box>
                        );
                      })}
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Details;
