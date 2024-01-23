import { CustomerCreateData } from 'models/Customer';
import { FC } from 'react';
import styles from '../customerCreateForm.module.scss';
import * as yup from 'yup';
import { medicalInfoSchema } from 'util/validations/customerShema';

interface MedicalInfoProps {
  setStep: (state: number) => void;
  customerData: CustomerCreateData;
  setCustomerData: (state: CustomerCreateData) => void;
}

const schema = yup.object().shape(medicalInfoSchema);

const MedicalInfo: FC<MedicalInfoProps> = ({ setStep, customerData, setCustomerData }) => {
  return <div>Medical Info</div>;
};

export default MedicalInfo;
