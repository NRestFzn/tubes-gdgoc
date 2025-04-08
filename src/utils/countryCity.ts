import data from '../lib/countries-cities.json';

const countryCity = {
  getCountries: (): string[] => {
    const countries: string[] = [];
    for (let key in data['countries']) {
      countries.push(key);
    }
    return countries;
  },

  getCities: (country: keyof (typeof data)['countries']): string[] => {
    return data['countries'][country] || [];
  },
};

export default countryCity;
