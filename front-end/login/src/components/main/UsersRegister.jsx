import { Button, Form, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { post } from '../../service/methodAPI';
import { emptyItemInTheForm } from '../../service/tools';

const Register = ({ person }) => {
    const [form, setForm] = useState({
        idPerson: person?.id,
        idRol: 2,
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [messenger, setMessenger] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const userRouter = "/api/v1/users";

    useEffect(() => {
        if (person == undefined) navigate("/peopleRegister");
    }, [])

    const handleChange = (event) => {
        if (messenger.length > 0) setMessenger([]);
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const validate = () => {
        let sout = [];
        if (emptyItemInTheForm(form)) sout.push("Ningun campo puede estar vacio");
        if (form.password.length != 0 && form.confirmPassword.length != 0) sout = validatePasswords(sout);
        if (form.email.length != 0) validateEmail({ "email": form.email }, sout);
    }

    const validateEmail = (email, sout) => {
        post(userRouter + "/existEmail", email)
            .then(response => {
                console.log(response);
                if (response.status === 200 && response.data) {
                    sout.push("El email ya existe")
                } else if (response.status === 500) {
                    sout.push("Error al validar Correo")
                }
                sout.length > 0 ? setMessenger(sout) : sendToUser();
            })
            .catch(e => {
                sout.push("Error al validar correo");
                setMessenger(sout);
            });
    }

    const validatePasswords = (sout) => {
        if (form.password != form.confirmPassword) {
            sout.push("La contraseña y el confirmación de esta deben de ser iguales");
        } else {
            let auxSout = [];
            if (form.password.length < 8) auxSout.push(" - Minimo 8 caracteres");
            if (form.password.length > 16) auxSout.push(" - Maximo 15 caracteres");
            if (!(/^(?=.*[a-z])/).test(form.password)) auxSout.push("- Al menos una letra minúscula");
            if (!(/^(?=.*[A-Z])/).test(form.password)) auxSout.push("- Al menos una letra mayúscula");
            if (!(/^(?=.*\d)/).test(form.password)) auxSout.push("- Al menos un dígito");
            if (!(/^(?=.*[\u0021-\u002b\u003c-\u0040])/).test(form.password)) auxSout.push("- Al menos 1 caracter especial");
            if (auxSout.length > 0){
                auxSout.unshift("La constraseña debe de contener: ");
                sout = sout.concat(auxSout);
            }
        }
        return sout;
    }


    const sendToUser = () => {
        setLoading(true)
        post(userRouter, form)
            .then(response => {
                setLoading(false)
                response.status === 200 ? navigate("/") : setMessenger(["Error al enviar la información"]);
            })
    }


    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <Card className='w-50'>
                <Card.Header as="h5" className='text-center'>Estudiante</Card.Header>
                <Card.Body>
                    <Card.Title className='text-center'>Registrar</Card.Title>
                    <div className='d-flex flex-wrap justify-content-center'>
                        <div className='mx-3'>
                            <Form.Group className="mb-3">
                                <Form.Label>Identificación</Form.Label>
                                <Form.Control type="text" value={person?.identification} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="email" placeholder="Ejem:  example@example.com" name='email' onChange={handleChange} />
                            </Form.Group>
                        </div>
                        <div className='mx-3'>
                            <Form.Group className="mb-3">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name='password' onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Confirmar contraseña</Form.Label>
                                <Form.Control type="password" name='confirmPassword' onChange={handleChange} />
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
                    <div className='text-end'>
                        <Button variant="primary mx-2" onClick={() => validate()}>Aceptar</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Register;
