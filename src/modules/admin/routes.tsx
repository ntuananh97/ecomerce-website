import { RouteObject } from 'react-router-dom';

// import AdminLayout from '@/layouts/AdminLayout';
// import AdminPageA from './pages/AdminPageA';
// import AdminPageB from './pages/AdminPageB';

// Mảng route dành riêng cho admin
export const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    // element: <AdminLayout />,
    children: [
      {
        path: 'page-a',
        // element: <AdminPageA />
      },
      {
        path: 'page-b',
        // element: <AdminPageB />
      }
    ]
  }
];
