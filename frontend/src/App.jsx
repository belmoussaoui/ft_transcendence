import './App.css'
import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/navbar/Sidebar';
import Page from './pages/Page';


function App() {
  return (
    <>
        <Sidebar></Sidebar>
        <Page></Page>
    </>
  )
}

export default App;
