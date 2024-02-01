export interface CityAttributes {
  cityName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface City {
  id: number;
  attributes: CityAttributes;
}
