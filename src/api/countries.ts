import axios from "axios";
import { Country } from "../types/countryDetails";

type ApiCountry = {
    cca3: string;
    flags: { png: string };
    name: { official: string };
    population: number;
    region: string;
    capital?: string[];
};

export const getCounties = async (): Promise<Country[]> => {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const originalData = response.data;

        const formattedCountries: Country[] = originalData.map((country: ApiCountry) => ({
            id: country.cca3,
            image: country.flags.png,
            name: country.name.official,
            population: country.population,
            region: country.region,
            capital: country.capital?.[0] || "N/A",
        }));
        return formattedCountries;

    } catch (error) {
        console.log(error)
        return [];
    }
}