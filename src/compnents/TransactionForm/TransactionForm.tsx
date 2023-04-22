import { FC } from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import { mutate } from 'swr';

import { fetchApi } from '../../utils/fetchApi';

export const TransactionForm: FC = () => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(e) => {
        fetchApi('transactions', {
          body: {
            ...e,
            date: e.date.toDate(),
          },
        }).then(() => {
          mutate((key: string | string[]) => {
            return key === 'transactions' || key[0] === 'transactions';
          });
        });
      }}
    >
      <Form.Item label="Дата" name="date" required>
        <DatePicker showTime />
      </Form.Item>
      <Form.Item label="Операция" name="operation" required>
        <Input />
      </Form.Item>
      <Form.Item label="Категория" name="category" required>
        <Input />
        {/* <Select options={categories.map((v) => ({ value: v, label: v.title }))} /> */}
      </Form.Item>
      <Form.Item label="Сумма" name="amount" required>
        <Input type="number" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};
