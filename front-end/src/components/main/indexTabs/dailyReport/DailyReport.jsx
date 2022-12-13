import { Form, Button } from 'react-bootstrap';
import DynamicTable from '../../../parcials/DynamicTable';

const DailyReport = () => {
    const prueba = {
        columns: ["Fecha", "Placa", "Registro"],
        rows:[
            ["fecha 1", " Placa 1", "Regitro 1"],
            ["fecha 2", " Placa 2", "Regitro 2"],
            ["fecha 3", " Placa 3", "Regitro 3"]
        ]
    }
    return (
        <div className="m-3">
            <Form>
                <Form.Group className="mb-3 text-center">
                    <Form.Control type="text" placeholder=" Ejem: AAA000" className="w-auto min-vw-50 d-inline" />
                    <Button className="ms-3 align-top bg-success"><i className="fa-solid fa-magnifying-glass"></i></Button>
                </Form.Group>
            </Form>
            <DynamicTable tableData={prueba} />
        </div>
    );
}

export default DailyReport;
