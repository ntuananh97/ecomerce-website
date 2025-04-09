import { hasPermission } from "@/utils/permission";
import { Navigate } from "react-router-dom";
import { getAdminRoutes, AdminRoutes } from "@/routes/routes";

const AuthorizationGuard = ({
  permissions,
  children,
}: {
  permissions: string[];
  children: React.ReactNode;
}) => {
  return hasPermission(permissions) ? (
    children
  ) : (
    <Navigate to={getAdminRoutes(AdminRoutes.Unauthorized)} />
  );
};

export default AuthorizationGuard;
