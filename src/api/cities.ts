import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';

export const getCities = async () => {
  return await axiosDefaultConfig.get(routes.GET_CITIES);
};
