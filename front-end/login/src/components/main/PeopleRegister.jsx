import { Button, Form, Card, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { post } from '../../service/methodAPI';
import { emptyItemInTheForm } from '../../service/tools';

const Register = ({ setPerson }) => {
    const [form, setForm] = useState({
        identification: "",
        name: "",
        address: "",
        phone: ""
    });
    const [messenger, setMessenger] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const peopleRouter = process.env.REACT_APP_BACK_END_PERSON_PATH;

    const handleChange = (event) => {
        if (messenger.length > 0) setMessenger([]);
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const validate = () => {
        let sout = [];
        if (emptyItemInTheForm(form)) sout.push("Ningun campo puede estar vacio");
        if (form.identification.length !== 0) {
            validateIdentification({ "identification": form.identification }, sout)
        } else {
            setMessenger(sout);
        };
    }

    const validateIdentification = (identification, sout) => {
        post(peopleRouter + "/existIdentification", identification)
            .then(response => {
                if (response.status === 200 && response.data) sout.push("La identificación ya existe");
                sout.length > 0 ? setMessenger(sout) : sendToPeople();
            })
            .catch(e => {
                sout.push("Error al validar identificacion");
                setMessenger(sout);
            });
    }

    const sendToPeople = () => {
        setLoading(true)
        post(peopleRouter, form)
            .then(response => {
                if (response.status === 200) {
                    setPerson(response.data);
                    navigate("/usersRegister");
                }
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
                                <Form.Control type="text" placeholder="Ejem: 111111111" name='identification' onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control type="text" name='phone' placeholder="1234567890" onChange={handleChange} />
                            </Form.Group>
                        </div>
                        <div className='mx-3'>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" name='name' placeholder="Ejem: Andres" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Direccion</Form.Label>
                                <Form.Control type="text" name='address' placeholder="Ejem: Carrera ##, ciudad, departamento" onChange={handleChange} />
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
                    <div className='text-end mt-2'>
                        <Link to='/'><Button variant="success mx-2">Cancelar</Button></Link>
                        <Button variant="success mx-2" onClick={() => validate()}>Siguiente</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Register;
