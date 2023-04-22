import { Button, Form, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { put, getWithJWT } from '../../../service/methodAPI';
import { emptyItemInTheForm } from '../../../service/tools';

const EditTypeVehicle = ({ setBreadcrumb }) => {
    const [id, setID] = useState();
    const [form, setForm] = useState({
        name: ""
    });
    const [messenger, setMessenger] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const typeVehicleRouter = "/api/typeVehicle";

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        id != null ? setID(id) : navigate("/typeVehicle");
        getWithJWT(typeVehicleRouter + "/" + id, sessionStorage.getItem('token'))
            .then(response => {
                if (response.status === 200) {
                    setForm({
                        name: response.data.name
                    });
                }
            })
            .catch(e => setMessenger(["Error server"]));
    }, []);


    const handleChange = (event) => {
        if (messenger.length > 0) setMessenger([]);
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const validate = () => {
        if (!emptyItemInTheForm(form)) {
            sendToTypeVehicle();
        } else {
            setMessenger(["Ningun campo puede estar vacio"]);
        }
    }

    const sendToTypeVehicle = () => {
        setLoading(true)
        put(typeVehicleRouter + "/" + id, form, sessionStorage.getItem('token'))
            .then(response => {
                setLoading(false);
                setBreadcrumb([{ route: "/typeVehicles", name: "Tipos de Vehiculo" }]);
                response.status === 200 ? navigate("/typeVehicles") : setMessenger(["Error server"]);
            })
    }

    const onClickCancel = () => {
        setBreadcrumb([{ route: "/typeVehicles", name: "Tipos de Vehiculos" }]);
        navigate("/typeVehicles");
    };
    return (
        <div className='d-flex justify-content-center align-items-center heightCenter_vh_75'>
            <Card className='w-50 border-0'>
                <Card.Body>
                    <Card.Title className='text-center mb-4'>Registrar</Card.Title>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" name='name' placeholder="Ejem: tipo A" onChange={handleChange} value={form.name} />
                    </Form.Group>
                    <div className='mx-3 text-center'>
                        {messenger.map((item, i) => <h6 key={i} className='text-danger'>{item}</h6>)}
                        {loading ?
                            <Spinner animation="border" variant="info" />
                            :
                            ""
                        }
                    </div>
                    <div className='text-end mt-3'>
                        <Button variant="success mx-2" onClick={() => onClickCancel()}>Cancelar</Button>
                        <Button variant="success mx-2" onClick={() => validate()}>Guardar</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default EditTypeVehicle;
