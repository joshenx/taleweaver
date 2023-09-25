import { routerType } from '../types/router.types';
import Home from './Home';
import PageNotFound from './PageNotFound';
import CreateStory from './CreateStory';
import Login from './Login';
import Register from './Register';
import PasswordReset from './PasswordReset';
import MyLibrary from './MyLibrary';
import PublicLibrary from './PublicLibrary';

const pagesData: routerType[] = [
  {
    path: '',
    element: <Home />,
    title: 'Home',
    authRequired: false,
    mainNav: true,
  },
  {
    path: 'create',
    element: <CreateStory />,
    title: 'Create',
    authRequired: true,
    mainNav: true,
  },
  {
    path: 'login',
    element: <Login />,
    title: 'Login',
    authRequired: false,
    mainNav: false,
  },
  {
    path: 'register',
    element: <Register />,
    title: 'Register',
    authRequired: false,
    mainNav: false,
  },
  {
    path: 'password-reset',
    element: <PasswordReset />,
    title: 'Password Reset',
    authRequired: false,
    mainNav: false,
  },
  {
    path: 'my-library',
    element: <MyLibrary />,
    title: 'My Library',
    authRequired: true,
    mainNav: true,
  },
  {
    path: 'public-library',
    element: <PublicLibrary />,
    title: 'Public Library',
    authRequired: false,
    mainNav: true,
  },
  {
    path: '*',
    element: <PageNotFound />,
    title: 'error404',
    authRequired: false,
    mainNav: false,
  },
];

export default pagesData;
