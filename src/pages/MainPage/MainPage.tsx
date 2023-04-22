import { FC } from 'react';

import { Transactions } from '../../compnents/Transactions/Transactions';
import { TransactionForm } from '../../compnents/TransactionForm/TransactionForm';

export const Main: FC = () => {
  return (
    <>
      <h2>Итория операций</h2>
      <Transactions />

      <h2>Новая операция</h2>
      <TransactionForm />
    </>
  );
};
