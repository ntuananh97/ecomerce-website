import { RouteObject } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

export const clientRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
];
