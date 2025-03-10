import axios from "axios";
import { Country } from "../types/countryDetails";

type ApiCountry = {
    cca3: string;
    flags: { png: string };
    name: { common: string };
    population: number;
    region: string;
    capital?: string[];
};


export const getCountries = async (): Promise<Country[]> => {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const originalData = response.data;

        const formattedCountries: Country[] = originalData.map((country: ApiCountry) => ({
            id: country.cca3,
            image: country.flags.png,
            name: country.name.common,
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
export const getCountriesByRegion = async (region: string) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
        const originalData = response.data;

        const formattedCountries: Country[] = originalData.map((country: ApiCountry) => ({
            id: country.cca3,
            image: country.flags.png,
            name: country.name.common,
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

export const getCountriesById = async (id: string) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${id}`)
        return response.data[0]
    } catch (error) {
        console.log(error)
        return
    }
}