import TableHeader from 'components/tableHeader/tableHeader';
import { ConsultationData } from 'models/Consultation';
import { FC } from 'react';
import { Table } from 'react-bootstrap';
import RowConsultationHistoryTable from './rowCustomerHistoryTable';

interface CustomerHistoryTableProps {
  data: ConsultationData[];
}

const CustomerHistoryTable: FC<CustomerHistoryTableProps> = ({ data }) => {
  const headersList: { title: string; col: number }[] = [
    { title: 'Fecha de Comienzo', col: 0 },
    { title: 'Fecha de Fin', col: 1 },
    { title: 'Responsable', col: 2 },
    { title: 'Tratamientos', col: 3 },
    { title: 'Estado consulta', col: 4 },
    { title: 'Estado pago', col: 5 },
    { title: '', col: 6 },
  ];

  return (
    <Table responsive="md">
      <TableHeader headersList={headersList} />
      <tbody>
        {data.map(element => (
          <RowConsultationHistoryTable dataItem={element} />
        ))}
      </tbody>
    </Table>
  );
};

export default CustomerHistoryTable;
