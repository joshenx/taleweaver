import { routerType } from '../types/router.types';
import Home from './Home';
import PageNotFound from './PageNotFound';
import Login from './Login';
import GatedCreateStory from './CreateStory';

const pagesData: routerType[] = [
  {
    path: '',
    element: <Home />,
    title: 'Home',
  },
  {
    path: 'create',
    element: <GatedCreateStory />,
    title: 'Weave Story',
  },
  {
    path: 'login',
    element: <Login />,
    title: 'Login',
  },
  {
    path: '*',
    element: <PageNotFound />,
    title: 'error404',
  },
];

export default pagesData;
