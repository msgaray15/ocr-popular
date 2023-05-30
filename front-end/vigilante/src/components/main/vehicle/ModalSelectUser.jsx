import { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import StackHeaderTable from '../../parcials/StackHeaderTable';
import { defaultPageSize } from '../../../service/tools';
import { getWithJWT } from '../../../service/methodAPI';
import Loading from '../../Loading';
import EmptyAnswer from '../../EmptyAnswer';
import StackHeaderTableWithSearchFormSelect from '../../parcials/StackHeaderTableWithSearchFormSelect';

const ModalSelectUser = ({ show, onHide, setBreadcrumb, setFormUser, formUser, setTextUser }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [changeInputSearch, setChangeInputSearch] = useState(false);
    const [dataFormSelect, setDataFormSelect] = useState([]);
    const listTypeSearch = [
        {
            key: "",
            value: "Seleccionar"
        },
        {
            key: "email",
            value: "Email"
        },
        {
            key: "idRol",
            value: "Rol"
        }
    ];
    const [form, setForm] = useState({
        page: 1,
        pageSize: defaultPageSize,
        typeSearch: listTypeSearch[0].key,
        textSearch: ""
    });
    const userRouter = "/api/user";
    const rolRouter = "/api/rol";

    useEffect(() => {
      
        getWithJWT(rolRouter, sessionStorage.getItem('token'))
            .then(response => {
                if (response.status === 200) {
                    setDataFormSelect(response.data.map((item) => {
                        return {
                            key: item.id,
                            value: item.name
                        }
                    }));
                } else {
                    console.log("Error");
                }
            })
            .catch(err => console.log(err));
    }, [form.page, form.pageSize]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "typeSearch") setChangeInputSearch(name === "typeSearch" && value === "idRol");
        name === "pageSize" ? setForm({ ...form, [name]: value, page: 1 }) : setForm({ ...form, [name]: value });
    };

    const getWithJWTWithParams = (formPage) => {
        setLoading(true);
        let routerWithParams = userRouter + "?page=" + formPage + "&pageSize=" + form.pageSize;
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
        setFormUser({ ...formUser, "idUser": id });
        setTextUser(personName + " - " + personIdentification)
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
                    Seleccionar Usuario
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mx-4 my-3">
                    {changeInputSearch ?
                        <StackHeaderTableWithSearchFormSelect title={"Usuarios"} pages={data?.pages} router={"/users"} setBreadcrumb={setBreadcrumb} handleChange={handleChange} formPageSize={form.pageSize} buttonSearch={buttonSearch} dataFormSelect={dataFormSelect} />
                        :
                        <StackHeaderTable title={"Usuarios"} pages={data?.pages} router={"/users"} setBreadcrumb={setBreadcrumb} handleChange={handleChange} formPageSize={form.pageSize} listTypeSearch={listTypeSearch} buttonSearch={buttonSearch} />
                    }
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
                                        <th>Correo</th>
                                        <th>Rol</th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {data?.list?.map((item, i) => {
                                        return (
                                            <tr key={i} className='tbody-select' onClick={() => tbodySelect(item.id, item.person.name, item.email)}>
                                                <td >{item.person.identification}</td>
                                                <td >{item.person.name}</td>
                                                <td >{item.email}</td>
                                                <td >{item.rol.name}</td>
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

export default ModalSelectUser;
