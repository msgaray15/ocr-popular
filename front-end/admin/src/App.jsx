import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './components/main/Index';
import Vehicle from './components/main/vehicle/Vehicle';
import Sidebar from './components/parcials/Sidebar';
import TopBar from './components/parcials/TopBar';
import NotFound from './components/NotFound';
import DynamicBreadcrumb from './components/parcials/DynamicBreadcrumb';
import NewVehicle from './components/main/vehicle/NewVehicle';
import { jwtToDataUser } from './service/tools';
import Person from './components/main/person/Person';
import Rol from './components/main/rol/Rol';
import State from './components/main/state/State';
import TypeVehicle from './components/main/typeVehicle/TypeVehicle';
import User from './components/main/user/User';
import Control from './components/main/control/Control';
import NewPerson from './components/main/person/NewPerson';
import EditPerson from './components/main/person/EditPerson';
import Delete from './components/Delete';
import NewTypeVehicle from './components/main/typeVehicle/NewTypeVehicle';
import EditTypeVehicle from './components/main/typeVehicle/EditTypeVehicle';
import EditUser from './components/main/user/EditUser';
import NewUser from './components/main/user/NewUser';
import EditVehicle from './components/main/vehicle/EditVehicle';


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
    getDataUser != null && getDataUser?.rol?.name === "Administrador" ? setDataUser(getDataUser) : window.location.href = regirectToLogin;
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
        <Route path="/controls" element={<Control />} />

        <Route path="/people" element={<Person setBreadcrumb={setBreadcrumb} />} />
        <Route path="/people/new" element={<NewPerson setBreadcrumb={setBreadcrumb} />} />
        <Route path="/people/edit" element={<EditPerson setBreadcrumb={setBreadcrumb} />} />

        <Route path="/roles" element={<Rol />} />

        <Route path="/states" element={<State />} />

        <Route path="/typeVehicles" element={<TypeVehicle setBreadcrumb={setBreadcrumb} />} />
        <Route path="/typeVehicles/new" element={<NewTypeVehicle setBreadcrumb={setBreadcrumb} />} />
        <Route path="/typeVehicles/edit" element={<EditTypeVehicle setBreadcrumb={setBreadcrumb} />} />

        <Route path="/users" element={<User setBreadcrumb={setBreadcrumb} />} />
        <Route path="/users/new" element={<NewUser setBreadcrumb={setBreadcrumb} />} />
        <Route path="/users/edit" element={<EditUser setBreadcrumb={setBreadcrumb}/>} />

        <Route path="/vehicles" element={<Vehicle setBreadcrumb={setBreadcrumb} />} />
        <Route path="/vehicles/new" element={<NewVehicle setBreadcrumb={setBreadcrumb} />} />
        <Route path="/vehicles/edit" element={<EditVehicle setBreadcrumb={setBreadcrumb} />} />

        <Route path='/delete' element={<Delete setBreadcrumb={setBreadcrumb} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>

  );
}

export default App;
