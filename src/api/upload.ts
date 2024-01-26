import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';

export const uploadAttachmentInformedConsent = async payload => {
  const formData = new FormData();
  formData.append('ref', 'api::customer-medical-information.customer-medical-information');
  formData.append('refId', payload.id);
  formData.append('field', 'informedConsent');
  formData.append('files', payload.attachment);
  return axiosDefaultConfig.post(routes.UPLOAD_FILE, formData);
};
