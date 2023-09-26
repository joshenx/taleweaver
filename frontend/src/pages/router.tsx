import { Route, Routes } from 'react-router-dom';
import { routerType } from '../types/router.types';
import pagesData from './pagesData';
import AuthRoute from '../App/components/AuthRoute';
import { useEffect } from 'react';
import ReactGA4 from 'react-ga4';

const Router = () => {
  useEffect(() =>
    ReactGA4.send({ 
      hitType: 'pageview',
      page: window.location.pathname + window.location.search
    }), []);

  const pageRoutes = pagesData.map(
    ({ path, title, element, authRequired }: routerType) => {
      return !authRequired ? (
        <Route key={title} path={`/${path}`} element={element} />
      ) : null;
    },
  );

  const authPageRoutes = pagesData.map(
    ({ path, title, element, authRequired }: routerType) => {
      return authRequired ? (
        <Route key={title} path={`/${path}`} element={element} />
      ) : null;
    },
  );

  return (
    <Routes>
      <Route element={<AuthRoute />}>{authPageRoutes}</Route>
      {pageRoutes}
    </Routes>
  );
};

export default Router;
