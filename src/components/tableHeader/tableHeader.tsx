import { FC } from 'react';

interface TableHeaderProps {
  headersList: { title: string; col: number }[];
}

const TableHeader: FC<TableHeaderProps> = ({ headersList }) => {
  return (
    <thead>
      <tr>
        {headersList.map(element => (
          <th>{element.title}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
