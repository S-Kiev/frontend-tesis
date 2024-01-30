import { CustomerData } from 'models/Customer';

export const parseCustomers = (customer: CustomerData[]): { value: number; label: string }[] => {
  return customer?.map(item => {
    const { id, attributes } = item;
    const { name, lastname } = attributes;
    return { value: id, label: `${name} ${lastname}` };
  });
};
