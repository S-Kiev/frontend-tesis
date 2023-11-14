import { axiosDefaultConfig } from './axiosConfig';
import { routes } from './apiRoutes';

interface LoginData {
  identifier: string;
  password: string;
}

export const login = async (data: LoginData) => {
  return await axiosDefaultConfig.post(routes.LOGIN, data);
};
