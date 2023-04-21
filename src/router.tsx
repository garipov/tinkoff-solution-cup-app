import { createHashRouter } from 'react-router-dom';

import { Main } from './pages/MainPage/MainPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { SecondPage } from './pages/SecondPage/SecondPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'second',
        element: <SecondPage />,
      },
    ],
  },
]);
