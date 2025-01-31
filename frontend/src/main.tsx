import React from 'react';
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import './assets/main.css'
import { router } from './router/Routes.tsx';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);