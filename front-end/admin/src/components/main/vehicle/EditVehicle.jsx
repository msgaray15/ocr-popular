import { Button, Form, Card, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { put, getWithJWT } from '../../../service/methodAPI';
import { emptyItemInTheForm } from '../../../service/tools';

const EditVehicle = ({ setBreadcrumb }) => {
    const [id, setID] = useState();
    const [form, setForm] = useState({
        serial: "",
        idTypeVehicle: "",
        licensePlate: "",
        idUser: ""
    });
    const [user, setUser] = useState("");
    const [listTypeVehicle, setListTypeVehicle] = useState([]);
    const [messenger, setMessenger] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const vihicleRouter = "/api/vehicle";
    const typeVehicleRouter = "/api/typeVehicle";

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        id != null ? setID(id) : navigate("/vehicles");
        getWithJWT(vihicleRouter + "/" + id, sessionStorage.getItem('token'))
            .then(response => {
                if (response.status === 200) {
                    setUser(response.data.user.person.identification + " - " + response.data.user.person.name);
                    setForm({
                        serial: response.data.serial,
                        idTypeVehicle: response.data.typeVehicle.name,
                        licensePlate: response.data.licensePlate,
                        idUser: response.data.user.id
                    });
                }
            })
            .catch(e => setMessenger(["Error server"]));

        getWithJWT(typeVehicleRouter, sessionStorage.getItem('token'))
            .then(response => {
                if (response.status === 200) {
                    setListTypeVehicle(response.data);
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
        if (form.password.length === 0) delete form.password;
        if (!emptyItemInTheForm(form)) {
            sendToVehicle();
        } else {
            setMessenger(["Ningun campo puede estar vacio"]);
        }
    }

    const sendToVehicle = () => {
        setLoading(true)
        put(vihicleRouter + "/" + id, form, sessionStorage.getItem('token'))
            .then(response => {
                setLoading(false);
                response.status === 200 ? navigate(-1) : setMessenger(["Error server"]);
            })
            .catch(error => navigate(-1));
    }

    const onClickCancel = () => {
        setBreadcrumb([{ route: "/users", name: "Usuarios" }]);
        navigate("/vehicles");
    };

    return (
        <div className='d-flex justify-content-center align-items-center heightCenter_vh_75'>
            <Card className='w-50 border-0'>
                <Card.Body>
                    <Card.Title className='text-center mb-4'>Editar</Card.Title>
                    <div className='d-flex flex-wrap justify-content-center'>
                        <div className='mx-3'>
                            <Form.Group className="mb-3">
                                <Form.Label>Usuario</Form.Label>
                                <Link to={"/users/edit?id=" + form.idUser + "&returnParent=" + true} className="text-success"><i className="fa-solid fa-pen-to-square ms-3 text-success"></i></Link>
                                <Form.Control type="text" name='user' onChange={handleChange} value={user} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Serial</Form.Label>
                                <Form.Control type="text" name='serial' onChange={handleChange} value={form.serial} />
                            </Form.Group>
                        </div>
                        <div className='mx-3'>
                            <Form.Group className="mb-3">
                                <Form.Label>tipo de vehiculo</Form.Label>
                                <Form.Select name='idTypeVehicle' onChange={handleChange}>
                                    {listTypeVehicle?.map((item, i) => <option key={i} selected={item.id === form.idRol} value={item.id}>{item.name}</option>)}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Placa</Form.Label>
                                <Form.Control type="text" name='licensePlate' onChange={handleChange} value={form.licensePlate} />
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
        </div>
    );
}

export default EditVehicle;
