import { Button, Form, Card, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { postWithJWT, getWithJWT } from '../../../service/methodAPI';
import { emptyItemInTheForm } from '../../../service/tools';
import ModalSelectPerson from './ModalSelectPerson';

const NewUser = ({ setBreadcrumb }) => {
    const [form, setForm] = useState({
        idPerson: "",
        idRol: "",
        email: "",
        password: ""
    });
    const [listRol, setListRol] = useState([]);
    const [textPerson, setTextPerson] = useState("Seleccionar");
    const [modalShow, setModalShow] = useState(false);
    const [messenger, setMessenger] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const userRouter = "/api/user";
    const rolRouter = "/api/rol";

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const idPerson = urlParams.get('idPerson');
        if (idPerson != null); setForm({ ...form, "idPerson": idPerson });
        const personIdentification = urlParams.get('personIdentification');
        const personName = urlParams.get('personName');
        if (personIdentification != null && personName != null) setTextPerson(personName + " - " + personIdentification);
        getWithJWT(rolRouter, sessionStorage.getItem('token'))
            .then(response => {
                if (response.status === 200) {
                    setListRol(response.data);
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
            sendToUser();
        } else {
            setMessenger(["Ningun campo puede estar vacio"]);
        }
    }

    const sendToUser = () => {
        setLoading(true)
        postWithJWT(userRouter, form, sessionStorage.getItem('token'))
            .then(response => {
                setLoading(false);
                if (response.status === 200) {
                    setBreadcrumb([{ route: "/users", name: "Usuarios" }]);
                    navigate("/users");
                } else {
                    setMessenger(["Error server"]);
                }
            })
            .catch(e => setMessenger(["Error server"]));
    }

    const onClickCancel = () => {
        setBreadcrumb([{ route: "/users", name: "Usuarios" }]);
        navigate("/users");
    };

    return (
        <div className='d-flex justify-content-center align-items-center heightCenter_vh_75'>
            <Card className='w-50 border-0'>
                <Card.Body>
                    <Card.Title className='text-center mb-4'>Editar</Card.Title>
                    <div className='d-flex flex-wrap justify-content-center'>
                        <div className='mx-3'>
                            <Form.Group className="mb-3">
                                <Form.Label>Persona</Form.Label>
                                <Link to={"/people/new?returnParent=" + true} className="text-success"><i className="fa-solid fa-plus ms-3 text-success"></i></Link>
                                <Form.Control type="text" name='idPerson' onClick={() => setModalShow(true)} value={textPerson} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="email" name='email' placeholder="example@unicesar.edu.co" onChange={handleChange} />
                            </Form.Group>
                        </div>
                        <div className='mx-3'>
                            <Form.Group className="mb-3">
                                <Form.Label>Rol</Form.Label>
                                <Form.Select name='idRol' onChange={handleChange}>
                                    <option key={0} value={""}>Seleccionar</option>
                                    {listRol?.map((item, i) => <option key={i} value={item.id}>{item.name}</option>)}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="text" name='password' onChange={handleChange} />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='mx-3 text-center'>
                        {messenger?.map((item, i) => <h6 key={i} className='text-danger'>{item}</h6>)}
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
            <ModalSelectPerson
                show={modalShow}
                onHide={() => setModalShow(false)}
                setFormUser={setForm}
                formUser={form}
                setTextPerson={setTextPerson}
            />
        </div>
    );
}

export default NewUser;
