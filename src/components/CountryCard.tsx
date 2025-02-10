import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Country } from "../types/countryDetails";

const CountryCard = ({ cardProps }: { cardProps: Country }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          image={cardProps.image}
          alt={cardProps.name}
          height="200px"
          width="100px"
        />
        <CardContent>
          <Typography>{cardProps.name}</Typography>
          <Typography>
            <strong>Population:</strong> {cardProps.population}
          </Typography>
          <Typography>
            <strong>Region:</strong> {cardProps.region}
          </Typography>
          <Typography>
            <strong>Capital:</strong> {cardProps.capital}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default CountryCard;
