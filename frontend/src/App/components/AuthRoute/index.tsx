import { useAuth } from '../../../context/AuthProvider';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthRoute = () => {
  const { loading, auth } = useAuth();
  const location = useLocation();

  return loading || auth ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} replace state={{ path: location.pathname }} />
  );
};

export default AuthRoute;
