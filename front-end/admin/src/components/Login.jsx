import {  useState, useRef, useEffect } from 'react';
import { Button, Form, FormControl, FormGroup, Modal } from "react-bootstrap";

const Login = () => {
    const [form, setForm] = useState({});
    const messenger = useRef();
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    //Función para obtener el token de autenticación
    const login = (e) => {
        //Evitar que el formulario haga submit
        e.preventDefault()
        //Llamar a la API para obtener el token de autenticación
        
    }

    return (
        <Modal
            show={true}
            backdrop="static"
            centered
        >
            <Modal.Header>
                <Modal.Title >Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => { login(e) }}>
                    <FormGroup controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <FormControl type="email" placeholder="Enter email" name="email" onChange={(e) => handleChange(e)} />
                    </FormGroup>
                    <FormGroup controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <FormControl type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
                    </FormGroup>
                    <FormGroup controlId="formBasicPassword">
                        <p Style={'color:red; margin-top:10px'} ref={messenger}></p>
                    </FormGroup>
                    <FormGroup className="m-4 text-center">
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                    </FormGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default Login;
