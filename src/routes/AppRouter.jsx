import { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { appRoutes } from '@/routes/index';

const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

const AppRouter = props => {
  return (
    <>
      <ScrollToTopOnRouteChange />
      <Routes>
        {(appRoutes || []).map((route, idx) => (
          <Route
            key={idx + route.name}
            path={route.path}
            element={<Suspense {...props}>{route.element}</Suspense>}
          />
        ))}
      </Routes>
    </>
  );
};
export default AppRouter;