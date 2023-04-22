import { FC, useState } from 'react';
import { Alert, Table, Tag } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

import { Transaction } from '../../models/Transaction';
import { categories } from '../../const/categories';
import { Category } from '../../models/Category';
import { useSWRApi } from '../../hooks/useSWRApi';
import { currencyFormmater } from '../../utils/formatCurrency';
import { PaginateResponse } from '../../models/PaginateResponse';
import { stringifyParams } from '../../utils/stringifyParams';
import { filterEmptyParams } from '../../utils/filterEmptyParams';

const columns: ColumnsType<Transaction> = [
  {
    title: 'Дата',
    dataIndex: 'date',
    render: (value: string) => new Date(value).toLocaleString(),
  },
  {
    title: 'Операция',
    dataIndex: 'operation',
  },
  {
    title: 'Категория',
    dataIndex: 'category',
    render: ({ color, title }: Category) => <Tag color={color}>{title}</Tag>,
    filters: categories.map((c) => ({
      value: c.title,
      text: (
        <Tag color={c.color} key={c.title}>
          {c.title}
        </Tag>
      ),
    })),
  },
  {
    title: 'Сумма',
    dataIndex: 'amount',
    render: (value: number) => currencyFormmater.format(value),
  },
];

export const Transactions: FC = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});

  const {
    data: response,
    error,
    isLoading,
  } = useSWRApi<PaginateResponse<Transaction>>([
    'transactions',
    {
      params: {
        page: String(page),
        ...stringifyParams(filters),
      },
    },
  ]);

  const errorElement = error && (
    <Alert message={error.message} type="error" showIcon closable style={{ marginBottom: 20 }} />
  );

  const onChange: TableProps<Transaction>['onChange'] = (_, filters) => {
    setFilters(filterEmptyParams(filters));
  };

  return (
    <>
      {errorElement}
      <Table
        columns={columns}
        dataSource={response?.data}
        rowKey="id"
        loading={isLoading}
        onChange={onChange}
        pagination={{ total: response?.total, onChange: setPage }}
      />
    </>
  );
};
