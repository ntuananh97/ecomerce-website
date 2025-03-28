import { AdminLayout } from '@/layouts/AdminLayout';
import { RouteObject } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import { AdminRoutes } from '@/routes/routes';
import ProtectedRoute from '@/components/Guard/ProtectedRoute';

// Mảng route dành riêng cho admin
export const adminRoutes: RouteObject[] = [
  {
    path: AdminRoutes.Admin,
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: AdminRoutes.Dashboard,
        element: <Dashboard />
      }
    ]
  }
];
