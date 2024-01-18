import Pagination from 'react-bootstrap/Pagination';
import { useEffect, useState } from 'react';
import { paginationData } from 'models/PaginationData';

interface Props {
  data: paginationData;
  changePage: (param: object) => void;
}

const PaginationComponent = ({ data, changePage }: Props) => {
  const [actualPage, setActualPage] = useState(data.page);
  const [items, setItems] = useState<Array<any>>([]);

  const loadItems = (page: number) => {
    let list: any[] = [];

    for (let number = 1; number <= data.pageCount; number++) {
      list.push(
        <Pagination.Item
          onClick={() => {
            handlePage(number);
          }}
          key={number}
          active={number === page}
        >
          {number}
        </Pagination.Item>,
      );
    }
    setItems(list);
  };

  const nextPage = () => {
    if (actualPage < data.pageCount) {
      changePage({ page: actualPage + 1, pageSize: data.pageSize });
      loadItems(actualPage + 1);
      setActualPage(actualPage + 1);
    }
  };

  const prevPage = () => {
    if (actualPage > 1) {
      changePage({ page: actualPage - 1, pageSize: data.pageSize });
      loadItems(actualPage - 1);
      setActualPage(actualPage - 1);
    }
  };

  const handlePage = (n: number) => {
    changePage({ page: n, pageSize: data.pageSize });
    loadItems(n);
    setActualPage(n);
  };

  useEffect(() => {
    loadItems(actualPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <Pagination>
        <Pagination.Prev onClick={() => prevPage()} disabled={1 === actualPage} />
        {items}
        <Pagination.Next onClick={() => nextPage()} disabled={data.pageCount === actualPage} />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
