import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import { NotFoundPage, CountryPage, ArticlePage } from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/country/:countryName',
    element: <CountryPage />,
  },
  {
    path: '/article/:articleId',
    element: <ArticlePage />,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default router;