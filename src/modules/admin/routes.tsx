import { AdminLayout } from "@/layouts/AdminLayout";
import { RouteObject } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import { AdminRoutes } from "@/routes/routes";
import ProtectedRoute from "@/components/Guard/ProtectedRoute";
import MyProfile from "./pages/MyProfile";
import Role from "./pages/Role";
import RolePermission from "./pages/Role/RolePermission";
import Unauthorized from "./pages/Unauthorized";
import AuthorizationGuard from "@/components/Guard/AuthorizationGuard";
import { PERMISSIONS } from "@/constants/permissions";

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
        element: (
          <AuthorizationGuard permissions={[PERMISSIONS.DASHBOARD]}>
            <Dashboard />
          </AuthorizationGuard>
        ),
        handle: { crumb: () => "Dashboard" },
      },
      {
        path: AdminRoutes.MyProfile,
        element: <MyProfile />,
        handle: { crumb: () => "My Profile" },
      },
      {
        path: AdminRoutes.Role,
        element: (
          <AuthorizationGuard permissions={[PERMISSIONS.SYSTEM.ROLE.VIEW]}>
            <Role />
          </AuthorizationGuard>
        ),
        handle: { crumb: () => "Role" },
      },
      {
        path: AdminRoutes.RolePermission,
        element: (
          <AuthorizationGuard permissions={[PERMISSIONS.SYSTEM.ROLE.UPDATE]}>
            <RolePermission />
          </AuthorizationGuard>
        ),
        handle: { crumb: () => "Role Permissions" },
      },
      {
        path: AdminRoutes.Unauthorized,
        element: <Unauthorized />,
        handle: { crumb: () => "Unauthorized" },
      },
    ],
  },
];
