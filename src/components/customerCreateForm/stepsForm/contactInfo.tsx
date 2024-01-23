import { CustomerCreateData } from 'models/Customer';
import { FC } from 'react';
import styles from '../customerCreateForm.module.scss';
import * as yup from 'yup';
import { contactInfoSchema } from 'util/validations/customerShema';

interface ContactInfoProps {
  setStep: (state: number) => void;
  customerData: CustomerCreateData;
  setCustomerData: (state: CustomerCreateData) => void;
}

const schema = yup.object().shape(contactInfoSchema);

const ContactInfo: FC<ContactInfoProps> = ({ setStep, customerData, setCustomerData }) => {
  return <div>Contact Info</div>;
};

export default ContactInfo;
