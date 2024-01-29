import {
  CustomerMedicalInfo,
  CustomerMedicalInfoEdit,
  CustomerPersonalInfo,
  CustomerPersonalInfoEdit,
} from 'models/Customer';
import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';
import { defaultPageSize } from './paginationConfig';

export const getCustomers = async (page: number, search: string) => {
  return await axiosDefaultConfig.get(routes.GET_CUSTOMERS, {
    params: {
      'filters[$or][0][name][$containsi]': search,
      'filters[$or][1][lastname][$containsi]': search,
      'pagination[page]': page,
      'pagination[pageSize]': defaultPageSize,
    },
  });
};

export const getCustomersHook = async () => {
  return await axiosDefaultConfig.get(routes.GET_CUSTOMERS_HOOK);
};

export const createCustomerPersonalInfo = async (personalInfo: CustomerPersonalInfo) => {
  return await axiosDefaultConfig.post(routes.POST_CUSTOMER_PERSONAL_INFO, {
    data: personalInfo,
  });
};

export const createCustomerMedicalInfo = async (medicalInfo: CustomerMedicalInfo) => {
  return await axiosDefaultConfig.post(routes.POST_CUSTOMER_MEDICAL_INFO, {
    data: medicalInfo,
  });
};

export const getCustomerInfo = async (id: string) => {
  return await axiosDefaultConfig.get(routes.GET_CUSTOMER_INFO.replace('{id}', id));
};

export const editCustomerPersonalInfo = async (personalInfo: CustomerPersonalInfoEdit) => {
  return await axiosDefaultConfig.put(
    routes.PUT_CUSTOMER_PERSONAL_INFO.replace('{id}', personalInfo.customerId.toString()),
    {
      data: personalInfo,
    },
  );
};

export const editCustomerMedicalInfo = async (medicalInfo: CustomerMedicalInfoEdit) => {
  return await axiosDefaultConfig.put(
    routes.PUT_CUSTOMER_MEDICAL_INFO.replace('{id}', medicalInfo.customerMedicalInfoId.toString()),
    {
      data: medicalInfo,
    },
  );
};
