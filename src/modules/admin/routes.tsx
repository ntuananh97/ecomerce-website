import { AdminLayout } from '@/layouts/AdminLayout';
import { RouteObject } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import { AdminRoutes } from '@/routes/routes';
import ProtectedRoute from '@/components/Guard/ProtectedRoute';
import MyProfile from './pages/MyProfile';

export const adminRoutes: RouteObject[] = [
  {
    path: AdminRoutes.Admin,
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    // handle: { crumb: () => 'Admin' },
    children: [
      {
        path: AdminRoutes.Dashboard,
        element: <Dashboard />,
        handle: { crumb: () => 'Dashboard' },
      },
      {
        path: AdminRoutes.MyProfile,
        element: <MyProfile />,
        handle: { crumb: () => 'My Profile' },
      }
    ]
  }
];
