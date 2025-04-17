import {createRoot} from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from "./components/Home";
import {Contact} from "./components/Contact";
import {Error} from "./components/Error";
import { CountryDetail } from './components/CountryDetail';

import {App} from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {path: '/', element: <Home /> },
      {path: '/contact', element: <Contact/> },
      {path: '/:countryPage', element: <CountryDetail
      /> },
    ],
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);