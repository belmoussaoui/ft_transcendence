import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import Sidebar from './components/navbar/Sidebar.jsx';
import Page from './pages/Page.jsx';
import Home from './pages/home/Home.jsx';
import Play from './pages/play/Play.jsx';
import Tournament from './pages/tournament/Tournament.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "play/:playid",
    element: <Play />,
  },
  {
    path: "tournament/",
    element: <Tournament />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Sidebar></Sidebar>
    <Page>
      <RouterProvider router={router} />
    </Page>
  </React.StrictMode>,
)
