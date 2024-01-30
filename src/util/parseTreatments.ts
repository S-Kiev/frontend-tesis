import { TreatmentGetData } from 'models/Treatments';

export const parseTreatments = (treatment: TreatmentGetData[]): { value: string; label: string; show: boolean }[] => {
  return treatment?.map(item => {
    const { id, attributes } = item;
    const { name, deactivationDate } = attributes;
    return {
      value: id.toString(),
      label: name,
      show: deactivationDate ? new Date(deactivationDate) >= new Date(Date.now()) : true,
    };
  });
};
