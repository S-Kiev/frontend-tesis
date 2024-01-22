import TableHeader from 'components/tableHeader/tableHeader';
import { CustomerData } from 'models/Customer';
import { FC } from 'react';
import { Table } from 'react-bootstrap';
import RowCustomersTable from './rowCustomersTable';

interface CustomersTableProps {
  customersData: CustomerData[];
  search: string;
}

const CustomersTable: FC<CustomersTableProps> = ({ customersData, search }) => {
  const headersList: { title: string; col: number }[] = [
    { title: 'ID', col: 0 },
    { title: 'Cliente', col: 1 },
    { title: 'Contacto', col: 2 },
    { title: '', col: 3 },
  ];

  return (
    <Table responsive="md">
      <TableHeader headersList={headersList} />
      <tbody>
        {customersData.map(element => (
          <RowCustomersTable customerData={element} search={search} />
        ))}
      </tbody>
    </Table>
  );
};

export default CustomersTable;
