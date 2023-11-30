import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/navbar/Sidebar';
import Page from './pages/Page';


function App() {
  const [count, setCount] = useState(0)
  const url = "http://localhost:8080/deepthought/answer";
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d))
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
        <Sidebar></Sidebar>
        <Page></Page>
    </>
  )
}

export default App;
