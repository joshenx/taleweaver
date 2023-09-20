import { routerType } from '../types/router.types';
import Home from './Home';
import PageNotFound from './PageNotFound';

const pagesData: routerType[] = [
  {
    path: '',
    element: <Home />,
    title: 'Home',
  },
  {
    path: '*',
    element: <PageNotFound />,
    title: 'error404',
  },
];

export default pagesData;
