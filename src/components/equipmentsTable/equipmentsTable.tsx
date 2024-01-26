import TableHeader from 'components/tableHeader/tableHeader';
import { EquipmentData } from 'models/Equipment';
import { FC } from 'react';
import { Table } from 'react-bootstrap';
import RowEquipmentTable from './rowEquipmentsTable';

interface EquipmentsTableProps {
  equipmentData: EquipmentData[];
  search: string;
}

const EquipmentsTable: FC<EquipmentsTableProps> = ({ equipmentData, search }) => {
  const headersList: { title: string; col: number }[] = [
    { title: 'ID', col: 0 },
    { title: 'Equipo', col: 1 },
    { title: 'Estado', col: 2 },
    { title: '', col: 3 },
  ];

  return (
    <Table responsive="md">
      <TableHeader headersList={headersList} />
      <tbody>
        {equipmentData.map(element => (
          <RowEquipmentTable equipmentData={element} search={search} />
        ))}
      </tbody>
    </Table>
  );
};

export default EquipmentsTable;
