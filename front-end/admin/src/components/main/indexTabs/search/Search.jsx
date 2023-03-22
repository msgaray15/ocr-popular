import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import DynamicTable from '../../../parcials/DynamicTable';

const Search = () => {
    const [dataPerson, setdataPerson] = useState({ name: "Abraham Sarabia Sereno", identification: 1234567890 });

    const prueba = {
        columns: ["Fecha", "Placa", "Registro"],
        rows: [
            ["fecha 1", " Placa 1", "Regitro 1"],
            ["fecha 2", " Placa 2", "Regitro 2"],
            ["fecha 3", " Placa 3", "Regitro 3"]
        ]
    }

    return (
        <div className="row m-3">
            <div className="col-md-4">
                <h3>Vehiculo</h3>
                <Form>
                    <Form.Label className="ms-3">Placa:</Form.Label>
                    <Form.Group className="ms-4">
                        <Form.Control type="text" placeholder=" Ejem: AAA000" className="w-auto min-vw-50 d-inline" />
                        <Button className="ms-3 align-top bg-success"><i className="fa-solid fa-magnifying-glass"></i></Button>
                    </Form.Group>
                </Form>
                <div className="mt-4">
                    <h5>Datos Propietario</h5>
                    <div className="ms-3 mt-3">
                        <h6 >Nombre:</h6>
                        <h6 className="ms-4">{dataPerson.name}</h6>
                    </div>
                    <div className="ms-3 mt-3">
                        <h6 >Identificacion:</h6>
                        <h6 className="ms-4">{dataPerson.identification}</h6>
                    </div>
                </div>

            </div>

            <div className="col-md-8">
                <DynamicTable tableData={prueba} />
            </div>
        </div>
    );
}

export default Search;
