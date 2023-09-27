import { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import StackHeaderTable from '../../parcials/StackHeaderTable';
import { defaultPageSize } from '../../../service/tools';
import { getWithJWT } from '../../../service/methodAPI';
import Loading from '../../Loading';
import EmptyAnswer from '../../EmptyAnswer';

const ModalSelectPerson = ({ show, onHide, setBreadcrumb, setFormUser, formUser, setTextPerson }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const listTypeSearch = [
        {
            key: "",
            value: "Seleccionar"
        },
        {
            key: "identification",
            value: "Cedula"
        },
        {
            key: "name",
            value: "Nombre"
        },
        {
            key: "phone",
            value: "Telefono"
        }
    ];
    const [form, setForm] = useState({
        page: 1,
        pageSize: defaultPageSize,
        typeSearch: listTypeSearch[0].key,
        textSearch: ""
    });
    const peopleRouter = process.env.REACT_APP_BACK_END_PEOPLE_PATH;

    useEffect(() => {
        getWithJWTWithParams(form.page);
    }, [form.page, form.pageSize]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        name === "pageSize" ? setForm({ ...form, [name]: value, page: 1 }) : setForm({ ...form, [name]: value });
    };

    const getWithJWTWithParams = (formPage) => {
        setLoading(true);
        let routerWithParams = peopleRouter + "?page=" + formPage + "&pageSize=" + form.pageSize;
        if (form.textSearch.length > 0) routerWithParams = routerWithParams + "&typeSearch=" + form.typeSearch + "&search=" + form.textSearch;
        getWithJWT(routerWithParams, sessionStorage.getItem('token'))
            .then(response => {
                setLoading(false);
                if (response.status === 200) {
                    console.log(response.data);
                    setData(response.data);
                } else {
                    console.log("Error");
                }
            })
            .catch(err => console.log(err));
    }

    const buttonSearch = () => {
        getWithJWTWithParams(1);
        handleChange({
            target: {
                name: "page",
                value: 1
            }
        });
    }

    const tbodySelect = (id, personName, personIdentification) => {
        setFormUser({ ...formUser, "idPerson": id });
        setTextPerson(personName + " - " + personIdentification)
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Seleccionar persona
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mx-4 my-3">
                    <StackHeaderTable title={"Pesonas"} pages={data?.pages} router={"/people"} setBreadcrumb={setBreadcrumb} handleChange={handleChange} formPageSize={form.pageSize} listTypeSearch={listTypeSearch} buttonSearch={buttonSearch} />
                    {loading ?
                        <Loading />
                        :
                        data?.pages?.totalRecords === 0 ?
                            <EmptyAnswer />
                            :
                            <Table striped className='mt-3 text-center'>
                                <thead>
                                    <tr>
                                        <th>Identificacion</th>
                                        <th>Nombre</th>
                                        <th>Telefono</th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {data?.list?.map((item, i) => {
                                        return (
                                            <tr key={i} className='tbody-select' onClick={() => tbodySelect(item.id, item.name, item.identification)}>
                                                <td >{item.identification}</td>
                                                <td >{item.name}</td>
                                                <td >{item.phone}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                    }

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalSelectPerson;
