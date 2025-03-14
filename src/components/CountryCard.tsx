import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Country } from "../types/countryDetails";
import { useNavigate } from "react-router-dom";

const CountryCard = ({ cardProps }: { cardProps: Country }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: "300px",
        minHeight: "400px",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
      onClick={() => {
        navigate(`/details/${cardProps.id}`);
      }}
    >
      <CardMedia
        component="img"
        image={cardProps.image}
        alt={cardProps.name}
        height="180px"
      />
      <CardContent sx={{ px: 3, py: 0 }}>
        <Typography fontWeight="bold" variant="h6" my={3}>
          {cardProps.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Population:</strong> {cardProps.population.toLocaleString()}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Region:</strong> {cardProps.region}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Capital:</strong> {cardProps.capital}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default CountryCard;
