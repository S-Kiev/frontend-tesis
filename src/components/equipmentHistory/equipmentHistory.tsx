import TableHeader from 'components/tableHeader/tableHeader';
import { EquipmentHistoryItem } from 'models/equipmentHistory';
import { FC } from 'react';
import { Table } from 'react-bootstrap';
import RowEquipmentHistoryTable from './rowEquipmentHistory';

interface EquipmentHistoryTableProps {
  equipmentData: EquipmentHistoryItem[];
}

const EquipmentHistoryTable: FC<EquipmentHistoryTableProps> = ({ equipmentData }) => {
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
        {equipmentData.map(element => (
          <RowEquipmentHistoryTable equipmentDataItem={element} />
        ))}
      </tbody>
    </Table>
  );
};

export default EquipmentHistoryTable;
