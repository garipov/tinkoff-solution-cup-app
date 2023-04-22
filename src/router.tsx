import { createHashRouter } from 'react-router-dom';

import { Layout } from './compnents/Layout/Layout';
import { Main } from './pages/MainPage/MainPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Main />,
      },
    ],
  },
]);
