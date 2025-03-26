// src/routes/index.ts

import { adminRoutes } from '@/modules/admin/routes';
import { clientRoutes } from '@/modules/client/routes';
import { useRoutes } from 'react-router-dom';

export function AppRoutes() {
  // Gom route của admin và client
  const routes = [...clientRoutes, ...adminRoutes];

  // useRoutes sẽ dựa vào mảng RouteObject[] để render
  const element = useRoutes(routes);

  return <>{element}</>;
}
