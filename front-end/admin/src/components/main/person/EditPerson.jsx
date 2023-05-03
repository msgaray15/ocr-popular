import { Button, Form, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { put, getWithJWT } from '../../../service/methodAPI';
import { emptyItemInTheForm } from '../../../service/tools';

const EditPerson = ({ setBreadcrumb }) => {
    const [id, setID] = useState();
    const [returnParent, setReturnParent] = useState(false);
    const [form, setForm] = useState({
        identification: "",
        name: "",
        address: "",
        phone: ""
    });
    const [messenger, setMessenger] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const peopleRouter = "/api/person";

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const returnParent = urlParams.get('returnParent');
        if (returnParent != null) setReturnParent(returnParent);
        id != null ? setID(id) : navigate("/people");
        getWithJWT(peopleRouter + "/" + id, sessionStorage.getItem('token'))
            .then(response => {
                if (response.status === 200) {
                    setForm({
                        identification: response.data.identification,
                        name: response.data.name,
                        address: response.data.address,
                        phone: response.data.phone
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
            sendToPeople();
        } else {
            setMessenger(["Ningun campo puede estar vacio"]);
        }
    }

    const sendToPeople = () => {
        setLoading(true)
        put(peopleRouter + "/" + id, form, sessionStorage.getItem('token'))
            .then(response => {
                setLoading(false);
                if(!returnParent) setBreadcrumb([{ route: "/people", name: "Personas" }]);
                response.status === 200 ? navigate(-1) : setMessenger(["Error server"]);
            });
    }

    const onClickCancel = () => {
        if(!returnParent) setBreadcrumb([{ route: "/people", name: "Personas" }]);
        navigate(-1);
    };

    return (
        <div className='d-flex justify-content-center align-items-center heightCenter_vh_75'>
            <Card className='w-50 border-0'>
                <Card.Body>
                    <Card.Title className='text-center mb-4'>Editar</Card.Title>
                    <div className='d-flex flex-wrap justify-content-center'>
                        <div className='mx-3'>
                            <Form.Group className="mb-3">
                                <Form.Label>Identificación</Form.Label>
                                <Form.Control type="text" placeholder="Ejem: 111111111" name='identification' onChange={handleChange} value={form.identification} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control type="text" name='phone' placeholder="1234567890" onChange={handleChange} value={form.phone} />
                            </Form.Group>
                        </div>
                        <div className='mx-3'>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" name='name' placeholder="Ejem: Andres" onChange={handleChange} value={form.name} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Direccion</Form.Label>
                                <Form.Control type="text" name='address' placeholder="Ejem: Carrera ##, ciudad, departamento" onChange={handleChange} value={form.address} />
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

export default EditPerson;
