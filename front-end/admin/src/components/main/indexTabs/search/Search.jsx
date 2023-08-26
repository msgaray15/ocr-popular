import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import DynamicTable from '../../../parcials/DynamicTable';
import ModalSearchVehicle from './ModalSearchVehicle';

const Search = () => {
    const [dataPerson, setdataPerson] = useState({ name: "Abraham Sarabia Sereno", identification: 1234567890 });
    const [placa, setPlaca] = useState("Buscar");
    const [vehicle, setVehicle] = useState({});
    const [show, setShow] = useState(false);
    const prueba = {
        columns: ["Fecha", "Placa", "Registro"],
        rows: [
            ["fecha 1", " Placa 1", "Regitro 1"],
            ["fecha 2", " Placa 2", "Regitro 2"],
            ["fecha 3", " Placa 3", "Regitro 3"]
        ]
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getVehicle = (item) => {
        setVehicle(item);
        setPlaca(item?.licensePlate);
    }

    const getControlFromIdVehicle = () =>{
        
    }

    return (
        <>
            <div className="row m-3">
                <div className="col-md-4">
                    <h3>Vehiculo</h3>
                    <Form>
                        <Form.Label className="ms-3">Placa:</Form.Label>
                        <Form.Group className="ms-4">
                            <Form.Control type="text" placeholder="Buscar" className="w-auto min-vw-50 d-inline" onClick={handleShow} value={placa}/>
                            <Button className="ms-3 align-top bg-success" onClick={handleShow}><i className="fa-solid fa-magnifying-glass"></i></Button>
                        </Form.Group>
                    </Form>
                    <div className="mt-4">
                        <h5>Datos Propietario</h5>
                        <div className="ms-3 mt-3">
                            <h6 >Nombre:</h6>
                            <h6 className="ms-4">{vehicle?.user?.person?.name}</h6>
                        </div>
                        <div className="ms-3 mt-3">
                            <h6 >Identificacion:</h6>
                            <h6 className="ms-4">{vehicle?.user?.person?.identification}</h6>
                        </div>
                    </div>

                </div>

                <div className="col-md-8">
                    <DynamicTable tableData={prueba} />
                </div>
            </div>
            <ModalSearchVehicle show={show} handleClose={handleClose} setVehicle={getVehicle} />
        </>
    );
}

export default Search;
