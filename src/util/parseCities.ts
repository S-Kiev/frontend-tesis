import { City, CityParse } from 'models/City';

export const parseCities = (cieties: City[]): CityParse[] => {
  return cieties.map(item => {
    const { id, attributes } = item;
    const { cityName } = attributes;
    return { id, name: cityName } as CityParse;
  });
};
