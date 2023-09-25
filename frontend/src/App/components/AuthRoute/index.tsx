import { useAuth } from '../../../context/AuthProvider';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthRoute = () => {
  const { session } = useAuth();
  const location = useLocation();

  return session ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} replace state={{ path: location.pathname }} />
  );
};

export default AuthRoute;
