import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import routes from '../routes';

const AuthRequire = ({ children }) => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  if (!loggedIn) {
    return <Navigate to={routes.loginPagePath} state={{ from: location }} replace />;
  }

  return children;
};

export default AuthRequire;
