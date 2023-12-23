import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import Sidebar from './components/navbar/Sidebar.jsx';
import Page from './pages/Page.jsx';
import Home from './pages/home/Home.jsx';
import Play from './pages/play/Play.jsx';
import TournamentPage from './pages/tournament/TournamentPage.jsx';
import "./main.css"
import "bootstrap/dist/css/bootstrap.min.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "play",
    element: <Play />,
  },
  {
    path: "tournament/",
    element: <TournamentPage />,
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
