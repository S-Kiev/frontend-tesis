import { City } from 'models/City';

export const parseCities = (cieties: City[]) => {
  return cieties.map(item => {
    const { id, attributes } = item;
    const { cityName } = attributes;
    return { value: id, label: cityName };
  });
};
