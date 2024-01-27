import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';

export const uploadAttachmentInformedConsent = async (payload: { id: string; attachment: any }) => {
  const formData = new FormData();
  formData.append('ref', 'api::customer-medical-information.customer-medical-information');
  formData.append('refId', payload.id);
  formData.append('field', 'informedConsent');
  formData.append('files', payload.attachment);
  return axiosDefaultConfig.post(routes.UPLOAD_FILE, formData);
};

export const uploadUpdateFile = async (payload: { idFile: string; newAttachment: any }) => {
  const formData = new FormData();
  formData.append('files', payload.newAttachment);
  return axiosDefaultConfig.post(routes.UPLOAD_UPDATE_FILE.replace('{id}', payload.idFile.toString()), formData);
};
