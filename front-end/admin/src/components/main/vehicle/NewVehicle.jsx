import { Button, Form, Card, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { postWithJWT, getWithJWT } from '../../../service/methodAPI';
import { emptyItemInTheForm } from '../../../service/tools';
import ModalSelectUser from './ModalSelectUser';

const NewVehicle = ({ setBreadcrumb }) => {

    const [form, setForm] = useState({
        serial: "",
        idTypeVehicle: "",
        licensePlate: "",
        idUser: ""
    });
    const [listTipoVehicle, setListTipoVehicle] = useState([]);
    const [textUser, setTextUser] = useState("Seleccionar");
    const [modalShow, setModalShow] = useState(false);
    const [messenger, setMessenger] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const vehicleRouter = process.env.REACT_APP_BACK_END_VEHICLE_PATH;
    const tipoVehicleRouter = process.env.REACT_APP_BACK_END_TYPE_VEHICLE_PATH;

    useEffect(() => {
        getWithJWT(tipoVehicleRouter, sessionStorage.getItem('token'))
            .then(response => {
                if (response.status === 200) {
                    setListTipoVehicle(response.data);
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
            sendToVehicles();
        } else {
            setMessenger(["Ningun campo puede estar vacio"]);
        }
    }

    const sendToVehicles = () => {
        setLoading(true);
        postWithJWT(vehicleRouter, form, sessionStorage.getItem('token'))
            .then(response => {
                setLoading(false);
                if (response.status === 200) {
                    setBreadcrumb([{ route: "/Vehicles", name: "Vehiculos" }]);
                    navigate("/Vehicles");
                } else {
                    setMessenger(["Error server"]);
                }
            })
            .catch(e => setMessenger(["Error server"]));
    }


    const onClickCancel = () => {
        setBreadcrumb([{ route: "/Vehicles", name: "Vehiculos" }]);
        navigate("/Vehicles");
    };

    return (
        <div className='d-flex justify-content-center align-items-center heightCenter_vh_75'>
            <Card className='w-50 border-0'>
                <Card.Body>
                    <Card.Title className='text-center mb-4'>Registrar</Card.Title>
                    <div className='d-flex flex-wrap justify-content-center'>
                        <div className='mx-3'>
                            <Form.Group className="mb-3">
                                <Form.Label>Número de serie</Form.Label>
                                <Form.Control type="text" placeholder="Ejem: 1A2B3C" name='serial' onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de Vehiculo</Form.Label>
                                <Link to={"/typeVehicles/new?returnParent=" + true} className="text-success"><i className="fa-solid fa-plus ms-3 text-success"></i></Link>
                                <Form.Select name='idTypeVehicle' onChange={handleChange}>
                                    <option key={0} value={""}>Seleccionar</option>
                                    {listTipoVehicle?.map((item, i) => <option key={i} value={item.id}>{item.name}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className='mx-3'>
                            <Form.Group className="mb-3">
                                <Form.Label>Placa</Form.Label>
                                <Form.Control type="text" name='licensePlate' placeholder="Ejem: AAA-000" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Usuario</Form.Label>
                                <Link to={"/users/new?returnParent=" + true} className="text-success"><i className="fa-solid fa-plus ms-3 text-success"></i></Link>
                                <Form.Control type="text" name='idUser' onClick={() => setModalShow(true)} value={textUser} />
                            </Form.Group>
                        </div>
                    </div>
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
            <ModalSelectUser
                show={modalShow}
                onHide={() => setModalShow(false)}
                setFormUser={setForm}
                formUser={form}
                setTextUser={setTextUser}
            />
        </div>
    );
}

export default NewVehicle;
