import { useState, useEffect } from 'react';
import { Button, Modal, Form, ListGroup } from 'react-bootstrap';
import { getWithJWT } from '../../../../service/methodAPI';
import Loading from '../../../Loading';
import EmptyAnswer from '../../../EmptyAnswer';

const ModalSearchVehicle = ({ show, handleClose, setVehicle }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        page: 1,
        pageSize: 10,
        typeSearch: "licensePlate",
        textSearch: ""
    });
    const vehicleRouter = process.env.REACT_APP_BACK_END_VEHICLE_PATH;;
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    useEffect(() => {
        setLoading(true);
        let routerWithParams = vehicleRouter + "?page=" + form.page + "&pageSize=" + form.pageSize;
        if (form.textSearch.length > 0) routerWithParams = routerWithParams + "&typeSearch=" + form.typeSearch + "&search=" + form.textSearch;
        getWithJWT(routerWithParams, sessionStorage.getItem('token'))
            .then(response => {
                setLoading(false);
                if (response.status === 200) {
                    console.log("response.data: ", response.data);
                    setData(response.data);
                } else {
                    console.log("Error");
                }
            })
            .catch(err => console.log(err));
    }, [form.textSearch]);

    const selectItem = (item) =>{
        setVehicle(item);
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body className="mt-3 mx-3">
                <Form>
                    <Form.Group className="mb-3 mx-4" >
                        <Form.Control type="email" placeholder="Buscar" name="textSearch" onChange={handleChange}/>
                    </Form.Group>
                </Form>
                <h6 className="mb-3 text-success">Vehiculos</h6>
                {loading ?
                    <Loading />
                    :
                    data?.pages?.totalRecords === 0 ?
                        <EmptyAnswer />
                        :
                        <ListGroup variant="flush">
                            {
                                data?.list?.map((item, i) =>
                                    <ListGroup.Item key={i} className="mb-2 border rounded d-flex justify-content-between list-group-item-action" onClick={() => selectItem(item)}>
                                        <small>{item.licensePlate + " - " + item.user.person.name}</small>
                                        <i className="fa-solid fa-external-link-alt"></i>
                                    </ListGroup.Item>)
                            }
                        </ListGroup>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalSearchVehicle;

