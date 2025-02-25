export type Country = {
    id: string;
    image: string;
    name: string;
    population: number;
    region: string;
    capital: string;
};

export type CountryDetails = {
    image: string,
    name: string,
    nativeName: string,
    population: number,
    region: string,
    subRegion: string,
    capital: string,
    topLevelDomain: string,
    currency: string,
    languages: object,
    borderCountries: Array<string>,
}