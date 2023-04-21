import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

export const Main: FC = () => {
  return (
    <>
      <h1>Basic App</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/second">Second page</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};
