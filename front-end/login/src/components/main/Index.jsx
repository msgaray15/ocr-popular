import { Button, Form, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { post } from '../../service/methodAPI';
import { emptyItemInTheForm, parseJwt } from '../../service/tools';

const Index = () => {
    const [messenger, setMessenger] = useState("");
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const loginRouter = "/api/v1/login";
    const regirectTo = {
        1: "http://localhost:3001/",
        2: "http://localhost:3002/"
    };

    const handleChange = (event) => {
        if (messenger.length > 0) setMessenger("");
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const validate = () => {
        if (emptyItemInTheForm(form)) {
            setMessenger("Ningun campo puede estar vacio")
        } else {
            sendToPeople();
        }
    }

    const sendToPeople = () => {
        setLoading(true)
        post(loginRouter, form)
            .then(response => {
                setLoading(false);
                if (response.status === 200) {
                    if (response.data.token.length > 0) {
                        setMessenger("");
                        redirectToRol(response.data.token);
                    } else {
                        setMessenger("Usuario o contraseña no son correctos");
                    }
                } else {
                    setMessenger("Error al conectar con el servicio");
                }
            })
            .catch(e => {
                setLoading(false);
                setMessenger("Error al conectar con el servicio");
            });
    }

    const redirectToRol = (dataUser) => {
        const rolUser = parseJwt(dataUser)?.data?.rol?.id;
        window.location.href = regirectTo[rolUser]+"?access="+dataUser.substring(7);
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <Card className='w-25'>
                <Card.Header as="h5" className='text-center'>OVA</Card.Header>
                <Card.Body>
                    <Card.Title className='text-center'>Iniciar Sesion</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" name='password' onChange={handleChange} />
                        </Form.Group>
                        <div className='mx-3 text-center'>
                            {messenger.length > 0 ?
                                <h6 className='text-danger'>{messenger}</h6>
                                :
                                ""
                            }
                            {loading ?
                                <Spinner animation="border" variant="info" />
                                :
                                ""
                            }
                        </div>
                        <Form.Group className="text-center mt-4">
                            <Button variant="primary" onClick={() => validate()}>Enviar</Button>
                        </Form.Group>
                        <Form.Group className="text-center mt-3">
                            <Link to='/peopleRegister' className='text-primary'>Registrarme</Link>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Index;
