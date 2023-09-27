import { Button, Form, Card, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { put, getWithJWT } from '../../../service/methodAPI';
import { emptyItemInTheForm } from '../../../service/tools';

const EditUser = ({ setBreadcrumb }) => {
    const [id, setID] = useState();
    const [returnParent, setReturnParent] = useState(false);
    const [form, setForm] = useState({
        idPerson: "",
        idRol: "",
        email: "",
        password: ""
    });
    const [person, setPerson] = useState("");
    const [listRol, setListRol] = useState([]);
    const [messenger, setMessenger] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const userRouter = process.env.REACT_APP_BACK_END_USER_PATH;
    const rolRouter = process.env.REACT_APP_BACK_END_ROL_PATH;

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const returnParent = urlParams.get('returnParent');
        if (returnParent != null) setReturnParent(returnParent);
        id != null ? setID(id) : navigate("/users");
        getWithJWT(userRouter + "/" + id, sessionStorage.getItem('token'))
            .then(response => {
                if (response.status === 200) {
                    setPerson(response.data.person.identification + " - " + response.data.person.name);
                    setForm({
                        ...form,
                        idPerson: response.data.person.id,
                        idRol: response.data.rol.id,
                        email: response.data.email
                    });
                }
            })
            .catch(e => setMessenger(["Error server"]));

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
        if (form.password.length === 0) delete form.password;
        if (!emptyItemInTheForm(form)) {
            sendToUser();
        } else {
            setMessenger(["Ningun campo puede estar vacio"]);
        }
    }

    const sendToUser = () => {
        setLoading(true)
        put(userRouter + "/" + id, form, sessionStorage.getItem('token'))
            .then(response => {
                setLoading(false);
                response.status === 200 ? navigate(-1) : setMessenger(["Error server"]);
            })
            .catch(error =>navigate(-1));
    }

    const onClickCancel = () => {
        if(!returnParent) setBreadcrumb([{ route: "/users", name: "Usuarios" }]);
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
                                <Form.Label>Persona</Form.Label>
                                <Link to={"/people/edit?id=" + form.idPerson + "&returnParent=" + true} className="text-success"><i className="fa-solid fa-pen-to-square ms-3 text-success"></i></Link>
                                <Form.Control type="text" name='idPerson' placeholder="1234567890" onChange={handleChange} value={person} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="text" name='email' placeholder="1234567890" onChange={handleChange} value={form.email} />
                            </Form.Group>
                        </div>
                        <div className='mx-3'>
                            <Form.Group className="mb-3">
                                <Form.Label>Rol</Form.Label>
                                <Form.Select name='idRol' onChange={handleChange}>
                                    {listRol?.map((item, i) => <option key={i} selected={item.id === form.idRol} value={item.id}>{item.name}</option>)}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="text" name='password' onChange={handleChange} value={form.password} />
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

export default EditUser;
