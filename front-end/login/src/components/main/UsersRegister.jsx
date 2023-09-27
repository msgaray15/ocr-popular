import { Button, Form, Card, Spinner, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { post } from '../../service/methodAPI';
import { emptyItemInTheForm } from '../../service/tools';

const Register = ({ person }) => {
    const idRolValue = process.env.REACT_APP_ID_ROL_STUDENT_USER_PATH;
    const [form, setForm] = useState({
        idPerson: person?.id,
        idRol: idRolValue,
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [messenger, setMessenger] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const userRouter = process.env.REACT_APP_BACK_END_USER_PATH;
    const dominioEmail = process.env.REACT_APP_DOMAIN_EMAIL;

    useEffect(() => {
        if (person === undefined) navigate("/peopleRegister");
    }, [])

    const handleChange = (event) => {
        if (messenger.length > 0) setMessenger([]);
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const validateInputEmail = (event) =>{
        if(event.key === "@"){
            setMessenger(["Es solo el usuario"]);
            event.preventDefault();
        } 
    }

    const validate = () => {
        let sout = [], emialComplete;
        if (emptyItemInTheForm(form)) sout.push("Ningun campo puede estar vacio");
        if (form.password.length !== 0 && form.confirmPassword.length !== 0) sout = validatePasswords(sout);
        if (form.email.length !== 0) {
            emialComplete = form.email + dominioEmail;
            validateEmail({ "email": emialComplete }, sout)
        };
    }

    const validateEmail = (email, sout) => {
        post(userRouter + "/existEmail", email)
            .then(response => {
                console.log(response);
                if (response.status === 200 && response.data) {
                    sout.push("El email ya existe")
                } else if(response.status === 500) {
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
        if (form.password !== form.confirmPassword) {
            sout.push("La contraseña y el confirmación de esta deben de ser iguales");
        } else {
            let auxSout = [];
            if (form.password.length < 8) auxSout.push(" - Minimo 8 caracteres");
            if (form.password.length > 16) auxSout.push(" - Maximo 15 caracteres");
            if (!(/^(?=.*[a-z])/).test(form.password)) auxSout.push("- Al menos una letra minúscula");
            if (!(/^(?=.*[A-Z])/).test(form.password)) auxSout.push("- Al menos una letra mayúscula");
            if (!(/^(?=.*\d)/).test(form.password)) auxSout.push("- Al menos un dígito");
            if (!(/^(?=.*[\u0021-\u002b\u003c-\u0040])/).test(form.password)) auxSout.push("- Al menos 1 caracter especial");
            if (auxSout.length > 0) {
                auxSout.unshift("La constraseña debe de contener: ");
                sout = sout.concat(auxSout);
            }
        }
        return sout;
    }


    const sendToUser = () => {
        setLoading(true)
        form.email = form.email + dominioEmail;
        post(userRouter, form)
            .then(response => {
                setLoading(false)
                response.status === 200 ? navigate("/") : setMessenger(["Error al enviar la información"]);
            })
    }


    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <Card className='w-50'>
                <Card.Header as="h5" className='bg-success text-center'>Estudiante</Card.Header>
                <Card.Body>
                    <Card.Title className='text-center'>Registrar</Card.Title>
                    <div className='d-flex flex-wrap justify-content-center'>
                        <div className='mx-3'>
                            <Form.Group className="mb-3">
                                <Form.Label>Identificación</Form.Label>
                                <Form.Control type="text" value={person?.identification} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <InputGroup className="inputEmailRegister">
                                    <Form.Control type="text" placeholder="example" name='email' onKeyPress={validateInputEmail} onChange={handleChange} />
                                    <InputGroup.Text>@unicesar.edu..</InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='mx-3'>
                            <Form.Group className="mb-3">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name='password' onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3 m-auto">
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
                        <Button variant="success primary mx-2" onClick={() => validate()}>Aceptar</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Register;
