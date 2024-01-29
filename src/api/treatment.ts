import { Treatment, TreatmentEdit } from 'models/Treatments';
import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';
import { defaultPageSize } from './paginationConfig';

export const getTreatments = async (page: number, search: string) => {
  return await axiosDefaultConfig.get(routes.GET_TREATMENTS, {
    params: {
      'filters[$or][0][name][$containsi]': search,
      'filters[$or][1][id][$containsi]': search,
      'pagination[page]': page,
      'pagination[pageSize]': defaultPageSize,
    },
  });
};

export const getTreatmentsHook = async () => {
  return await axiosDefaultConfig.get(routes.GET_TREATMENTS_HOOK);
};

export const createTreatment = async (treatment: Treatment) => {
  return await axiosDefaultConfig.post(routes.POST_TREATMENT, {
    data: treatment,
  });
};

export const getTreatment = async (id: string) => {
  return await axiosDefaultConfig.get(routes.GET_TREATMENT.replace('{id}', id));
};

export const editTreatment = async (treatment: TreatmentEdit) => {
  return await axiosDefaultConfig.put(routes.PUT_TREATMENT.replace('{id}', treatment.treatmentId.toString()), {
    data: treatment,
  });
};

export const desactivateTreatment = async (treatmentId: string | number) => {
  return await axiosDefaultConfig.put(routes.PUT_TREATMENT.replace('{id}', treatmentId.toString()), {
    data: {
      deactivationDate: new Date().toISOString(),
    },
  });
};
