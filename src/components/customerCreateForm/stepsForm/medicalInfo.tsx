import { CustomerCreateData } from 'models/Customer';
import { FC } from 'react';
import styles from '../customerCreateForm.module.scss';

interface MedicalInfoProps {
  setStep: (state: number) => void;
  customerData: CustomerCreateData;
  setCustomerData: (state: CustomerCreateData) => void;
}

const MedicalInfo: FC<MedicalInfoProps> = ({ setStep, customerData, setCustomerData }) => {
  return <div>Medical Info</div>;
};

export default MedicalInfo;
