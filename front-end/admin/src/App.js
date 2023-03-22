import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Index from './components/main/Index';
import Vehicle from './components/main/Vehicle';
import Sidebar from './components/parcials/Sidebar';
import TopBar from './components/parcials/TopBar';
import NotFound from './components/NotFound';
import DynamicBreadcrumb from './components/parcials/DynamicBreadcrumb';
import NewVehicle from './components/main/vehicle/NewVehicle';


  

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShowMenu = () => setShow(true);

  const [breadcrumb, setBreadcrumb] = useState([{route:"/",name:"Inicio"}]);
  
  return (
    <>
      <Sidebar show={show} onHide={handleClose} setBreadcrumb={setBreadcrumb}/>
      <TopBar handleShowMenu={handleShowMenu}/>
      <DynamicBreadcrumb breadcrumb={breadcrumb}/>
      <Routes>
        <Route exact path="/" element={ <Index/>}/>
        <Route path="/vehicles" element={ <Vehicle setBreadcrumb={setBreadcrumb}/>}/>
        <Route path="/vehicles/new" element={ <NewVehicle/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>

  );
}

export default App;
