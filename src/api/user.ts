import { axiosDefaultConfig } from './axiosConfig';
import { routes } from './apiRoutes';

export const getUserData = async () => {
  return await axiosDefaultConfig.get(routes.USER_DATA);
};

export const sendCode = async (email: string) => {
  return await axiosDefaultConfig.post(routes.SEND_CODE, {
    email: email,
  });
};

export const changePasswordByWhatsapp = async (data: { id: number | null; code: string; newPassword: string }) => {
  return await axiosDefaultConfig.put(routes.RESET_PASSWORD, {
    id: data.id,
    code: data.code,
    newPassword: data.newPassword,
  });
};
