import TableHeader from 'components/tableHeader/tableHeader';
import { ConsultationData } from 'models/Consultation';
import { FC } from 'react';
import { Table } from 'react-bootstrap';
import RowConsultationTable from './rowConsultationsTable';

interface ConsultationsTableProps {
  consultationsData: ConsultationData[];
}

const ConsultationsTable: FC<ConsultationsTableProps> = ({ consultationsData }) => {
  const headersList: { title: string; col: number }[] = [
    { title: 'ID', col: 0 },
    { title: 'Cliente', col: 1 },
    { title: 'Fecha', col: 2 },
    { title: 'Responsable', col: 3 },
    { title: 'Estado', col: 4 },
    { title: '', col: 5 },
  ];

  return (
    <Table responsive="md">
      <TableHeader headersList={headersList} />
      <tbody>
        {consultationsData.map(element => (
          <RowConsultationTable consultationData={element} />
        ))}
      </tbody>
    </Table>
  );
};

export default ConsultationsTable;
