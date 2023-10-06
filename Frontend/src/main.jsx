import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Auth from './pages/Auth.jsx';
import Home from './pages/Home.jsx';
import NewsWriter from './pages/NewsWriter.jsx';
import "./templates/main.scss";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />
  },
  {
    path: "/Home",
    element: <Home />
  },
  {
    path: "/NewsWriter",
    element: <NewsWriter />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
);
