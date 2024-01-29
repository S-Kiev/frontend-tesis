import TableHeader from 'components/tableHeader/tableHeader';
import { ConsultingRoomHistoryItem } from 'models/ConsultingRoomHistory';
import { FC } from 'react';
import { Table } from 'react-bootstrap';
import RowConsultingRoomHistoryTable from './rowConsultingRoomHistory';

interface ConsultingRoomtHistoryTableProps {
  data: ConsultingRoomHistoryItem[];
}

const ConsultingRoomtHistoryTable: FC<ConsultingRoomtHistoryTableProps> = ({ data }) => {
  const headersList: { title: string; col: number }[] = [
    { title: 'Estado', col: 0 },
    { title: 'Fecha de Comienzo', col: 1 },
    { title: 'Fecha de Fin', col: 2 },
    { title: 'Responsable', col: 3 },
    { title: '', col: 4 },
  ];

  return (
    <Table responsive="md">
      <TableHeader headersList={headersList} />
      <tbody>
        {data.map(element => (
          <RowConsultingRoomHistoryTable dataItem={element} />
        ))}
      </tbody>
    </Table>
  );
};

export default ConsultingRoomtHistoryTable;
