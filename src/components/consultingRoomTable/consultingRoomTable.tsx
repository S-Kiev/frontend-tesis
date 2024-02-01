import TableHeader from 'components/tableHeader/tableHeader';
import { ConsultingRoomData } from 'models/ConsultingRoom';
import { FC } from 'react';
import { Table } from 'react-bootstrap';
import RowConsultingRoom from './rowConsultingRoom';

interface ConsultingRoomTableProps {
  consultingsRoomsData: ConsultingRoomData[];
}

const ConsultingRoomTable: FC<ConsultingRoomTableProps> = ({ consultingsRoomsData }) => {
  const headersList: { title: string; col: number }[] = [
    { title: 'ID', col: 0 },
    { title: 'Nombre', col: 1 },
    { title: 'Acción necesaria', col: 2 },
    { title: 'Estado', col: 3 },
    { title: '', col: 4 },
  ];

  return (
    <Table responsive="md">
      <TableHeader headersList={headersList} />
      <tbody>
        {consultingsRoomsData.map(element => (
          <RowConsultingRoom consultingRoomData={element} />
        ))}
      </tbody>
    </Table>
  );
};

export default ConsultingRoomTable;
