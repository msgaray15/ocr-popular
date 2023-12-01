import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import { jwtToDataUser } from './service/tools';
import TopBar from './components/parcials/TopBar';
import VideoFeed from './components/main/VideoFeed';
import VideoJS from './components/main/VideoJS';
import Index from './components/main/Index';



function App() {
  const regirectToLogin = "http://localhost:3000/";
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const access = urlParams.get('access');
    access != null ? sessionStorage.setItem("token", "Bearer " + urlParams.get('access')) : window.location.href = regirectToLogin;
    const getDataUser = jwtToDataUser();
    getDataUser != null && getDataUser?.rol?.name === "Vigilante" ? setDataUser(getDataUser) : window.location.href = regirectToLogin;
  }, []);

  return (
    <>
    <TopBar nameUser={dataUser?.person?.name} />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>

  );
}

export default App;
