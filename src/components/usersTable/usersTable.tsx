import TableHeader from 'components/tableHeader/tableHeader';
import { FC } from 'react';
import { Table } from 'react-bootstrap';
import RowUsersTable from './rowUsersTable';
import styles from './usersTable.module.scss';

interface UsersTableProps {
  usersData: any;
}

const UsersTable: FC<UsersTableProps> = ({ usersData }) => {
  const headersList: { title: string; col: number }[] = [
    { title: 'Usuario', col: 0 },
    { title: 'Rol', col: 1 },
    { title: 'Estado', col: 2 },
    { title: 'Fecha de Creación', col: 3 },
    { title: '', col: 4 },
  ];

  return (
    <Table responsive="md">
      <TableHeader headersList={headersList} />
      <tbody>
        {usersData.map(element => (
          <RowUsersTable userData={element} />
        ))}
      </tbody>
    </Table>
  );
};

export default UsersTable;
