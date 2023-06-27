import { Form, Button,Card } from 'react-bootstrap';
import DynamicTable from '../../../parcials/DynamicTable';
import { useState, useEffect } from 'react';

const DailyReport = () => {
    const [fecha, setFecha] = useState("");
    const prueba = {
        columns: ["Fecha", "Placa", "Registro"],
        rows: [
            ["fecha 1", " Placa 1", "Regitro 1"],
            ["fecha 2", " Placa 2", "Regitro 2"],
            ["fecha 3", " Placa 3", "Regitro 3"]
        ]
    }

    useEffect(() => {
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1;
        let textMonth = month > 10 ? month : "0" + month;
        console.log("textMonth: ", textMonth);
        let year = today.getFullYear();
        
    }, []);

    return (
        <div className="row m-3 flex-nowrap-content-center">
            <div className="col-md-4 m-3 p-3 border rounded">
                <Form>
                    <Form.Label className="ms-3">Fecha:</Form.Label>
                    <Form.Group className="ms-4">
                        <Form.Control type="text" placeholder=" Ejem: AAA000" className="w-auto min-vw-50 d-inline" />
                        <Button className="ms-3 align-top bg-success"><i className="fa-solid fa-magnifying-glass"></i></Button>
                    </Form.Group>
                </Form>
                <div className="mt-4">
                    <h5>Datos Propietario</h5>
                    <div className="ms-3 mt-3">
                        <h6 >Nombre:</h6>
                    </div>
                    <div className="ms-3 mt-3">
                        <h6 >Identificacion:</h6>
                    </div>
                </div>

            </div>

            <div className="col-md-7 m-3 p-3 border rounded">
                <DynamicTable tableData={prueba} />
            </div>
        </div>
    );
}

export default DailyReport;
