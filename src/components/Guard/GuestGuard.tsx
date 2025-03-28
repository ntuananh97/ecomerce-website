import useAuthStore from '@/store/useAuthStore';
import { Navigate, Outlet,  } from 'react-router-dom';
import { Routes } from '@/routes/routes';


const GuestGuard = () => {
  const { isAuthenticated, loading: {checkAuth} } = useAuthStore();

  if (isAuthenticated && !checkAuth) {
    return <Navigate to={Routes.Home} replace />;
  }

  return <Outlet />;
};

export default GuestGuard; 