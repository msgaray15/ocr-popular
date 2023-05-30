import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './components/main/Index';
import Sidebar from './components/parcials/Sidebar';
import TopBar from './components/parcials/TopBar';
import NotFound from './components/NotFound';
import DynamicBreadcrumb from './components/parcials/DynamicBreadcrumb';
import Recogniton from './components/main/vehicle/AuthenticateVehicle';
import { jwtToDataUser } from './service/tools';



function App() {
  const regirectToLogin = "http://localhost:3000/";
  const [dataUser, setDataUser] = useState({});
  const [show, setShow] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState([{ route: "/", name: "Inicio" }]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const access = urlParams.get('access');
    access != null ? sessionStorage.setItem("token", "Bearer " + urlParams.get('access')) : window.location.href = regirectToLogin;
    const getDataUser = jwtToDataUser();
    getDataUser != null && getDataUser?.rol?.name === "vigilante" ? setDataUser(getDataUser) : window.location.href = regirectToLogin;
  }, []);


  const handleClose = () => setShow(false);
  const handleShowMenu = () => setShow(true);

  return (
    <>
      <Sidebar show={show} onHide={handleClose} setBreadcrumb={setBreadcrumb} />
      <TopBar handleShowMenu={handleShowMenu} nameUser={dataUser?.person?.name} />
      <DynamicBreadcrumb breadcrumb={breadcrumb} setBreadcrumb={setBreadcrumb} />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/reconocimiento" element={<Recogniton setBreadcrumb={setBreadcrumb} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>

  );
}

export default App;
