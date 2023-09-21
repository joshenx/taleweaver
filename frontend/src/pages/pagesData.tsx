import { routerType } from '../types/router.types';
import Home from './Home';
import PageNotFound from './PageNotFound';
import CreateStory from './CreateStory';

const pagesData: routerType[] = [
  {
    path: '',
    element: <Home />,
    title: 'Home',
  },
  {
    path: 'create',
    element: <CreateStory />,
    title: 'Weave Story',
  },
  {
    path: '*',
    element: <PageNotFound />,
    title: 'error404',
  },
];

export default pagesData;
