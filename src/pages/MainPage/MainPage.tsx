import { FC } from 'react';

import { Transactions } from '../../compnents/Transactions/Transactions';

export const Main: FC = () => {
  return (
    <>
      <h2>Итория операций</h2>
      <Transactions />
    </>
  );
};
