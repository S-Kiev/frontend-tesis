import { axiosDefaultConfig } from './axiosConfig';
import { routes } from './apiRoutes';

export const getUserData = async () => {
  return await axiosDefaultConfig.get(routes.USER_DATA);
};