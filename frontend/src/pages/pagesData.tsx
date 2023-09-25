import { routerType } from '../types/router.types';
import Home from './Home';
import PageNotFound from './PageNotFound';
import CreateStory from './CreateStory';
import Login from './Login';
import Register from './Register';
import PasswordReset from './PasswordReset';

const pagesData: routerType[] = [
  {
    path: '',
    element: <Home />,
    title: 'Home',
    authRequired: false,
  },
  {
    path: 'create',
    element: <CreateStory />,
    title: 'Weave Story',
    authRequired: true,
  },
  {
    path: 'login',
    element: <Login />,
    title: 'Login',
    authRequired: false,
  },
  {
    path: 'register',
    element: <Register />,
    title: 'Register',
    authRequired: false,
  },
  {
    path: 'password-reset',
    element: <PasswordReset />,
    title: 'Password Reset',
    authRequired: false,
  },
  {
    path: '*',
    element: <PageNotFound />,
    title: 'error404',
    authRequired: false,
  },
];

export default pagesData;
