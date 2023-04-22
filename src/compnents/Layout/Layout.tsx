import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import css from './Layout.module.scss';

export const Layout: FC = () => {
  return (
    <div className={css.body}>
      <Outlet />
    </div>
  );
};
