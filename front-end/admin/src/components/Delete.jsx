import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Spinner, Modal} from 'react-bootstrap';
import { delet } from '../service/methodAPI';

const Delete = ({ setBreadcrumb }) => {
    const [id, setID] = useState();
    const [text, setText] = useState("");
    const [router, setRouter] = useState("");
    const [name, setName] = useState("");
    const [backRouter, setBackRouter] = useState("");
    const [messenger, setMessenger] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const entity = urlParams.get('entity');
        const router = urlParams.get('router');
        const backRouter = urlParams.get('backRouter');
        id != null && entity != null && router != null && backRouter != null ? setID(id) : navigate("/");
        setText(entity.substring(0, entity.length - 1) + " con el id " + id);
        setName(entity);
        setRouter(router);
        setBackRouter(backRouter);
        setBreadcrumb([{ route: "/", name: "" }]);
    }, []);

    const onClickOK = () => {
        setLoading(true);
        delet(backRouter + "/" + id, sessionStorage.getItem('token'))
        .then(response => {
            response.status === 200 ? onClick(): setMessenger("Error al borrar");
            setLoading(false);
        })
        .catch(e => setMessenger("Error server"));
    }

    const onClick = () => {
        setBreadcrumb([{ route: router, name: name }]);
        navigate(router);
    }
    return (
        <Modal
            show={true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter" className='text-success'>
                    Elimiar
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Estas seguro de Elimar: <br />
                    <pre className='d-inline'>&#09;</pre>{text}
                </p>
                <div className='mx-3 text-center'>
                        <h6 className='text-danger'>{messenger}</h6>
                        {loading ?
                            <Spinner animation="border" variant="info" />
                            :
                            ""
                        }
                    </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='bg-success border-success' onClick={() => onClick()}>Cancelar</Button>
                <Button className='bg-success border-success' onClick={() => onClickOK()}>Aceptar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Delete;
