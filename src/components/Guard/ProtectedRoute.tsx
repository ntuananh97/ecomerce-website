import useAuthStore from '@/store/useAuthStore';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthRoutes, getAuthRoutes } from '@/routes/routes';
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, getMe, loading: { checkAuth } } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      getMe();
    }
  }, [getMe, isAuthenticated]);

  if (checkAuth) {
    return <div></div>;
  }

  if (!isAuthenticated) {
    // Redirect to login page while saving the attempted URL
    return <Navigate to={getAuthRoutes(AuthRoutes.Login)} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 