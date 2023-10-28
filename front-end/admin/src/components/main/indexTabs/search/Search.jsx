import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import DynamicTable from '../../../parcials/DynamicTable';
import ModalSearchVehicle from './ModalSearchVehicle';
import Loading from '../../../Loading';
import { defaultPageSize } from '../../../../service/tools';
import EmptyAnswer from '../../../EmptyAnswer';
import PaginationTables from '../../../parcials/PaginationTables';
import { getWithJWT } from '../../../../service/methodAPI';

const Search = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        page: 1,
        pageSize: defaultPageSize,
        typeSearch: "idVehicle",
        textSearch: undefined
    });
    const [placa, setPlaca] = useState("Buscar");
    const [vehicle, setVehicle] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const tableStructure = {
        thead: ["Fecha", "Estado", "Placa", "Serial", "tipo de vehiculo"],
        tbody: ["date", ["state", "name"], ["vehicle", "licensePlate"], ["vehicle", "serial"], ["vehicle", "typeVehicle", "name"]]
    };

    const controlRouter = process.env.REACT_APP_BACK_END_CONTROL_PATH;

    useEffect(() => {
        getWithJWTWithParams();
    }, [form.page, form.pageSize, form.textSearch]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        name === "pageSize" ? setForm({ ...form, [name]: value, page: 1 }) : setForm({ ...form, [name]: value });
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getVehicle = (item) => {
        setVehicle(item);
        setPlaca(item?.licensePlate);
        setForm({ ...form, textSearch: item?.id });
    }

    const getWithJWTWithParams = () => {
        setLoading(true);
        let routerWithParams = controlRouter + "?page=" + form.page + "&pageSize=" + form.pageSize;
        if (form.textSearch) routerWithParams = routerWithParams + "&typeSearch=" + form.typeSearch + "&search=" + form.textSearch;
        let sessionToken = sessionStorage.getItem('token');
        if (sessionToken === null) sessionToken = "Bearer " + (new URLSearchParams(window.location.search).get('access'));

        getWithJWT(routerWithParams, sessionToken)
            .then(response => {
                setLoading(false);
                if (response.status === 200) {
                    let data = response.data;
                    setData(data);
                } else {
                    setData({});
                    console.log("Error");
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <div className="row py-4 flex-nowrap-content-center justify-content-evenly align-items-start">
                <div className="col-md-2 p-4 border rounded">
                    <h3>Vehiculo</h3>
                    <Form>
                        <Form.Label className="ms-3">Placa:</Form.Label>
                        <Form.Group className="ms-4">
                            <Form.Control type="text" placeholder="Buscar" onClick={handleShow} value={placa} />
                        </Form.Group>
                    </Form>
                    <div className="mt-4">
                        <h5>Datos Propietario</h5>
                        <div className="ms-3 mt-3">
                            <h6 >Nombre:</h6>
                            <h6 className="ms-4">{vehicle?.user?.person?.name}</h6>
                        </div>
                        <div className="ms-3 mt-3">
                            <h6 >Identificacion:</h6>
                            <h6 className="ms-4">{vehicle?.user?.person?.identification}</h6>
                        </div>
                    </div>

                </div>

                <div className="col-md-9 p-2 border rounded">
                    <div className="d-flex justify-content-end">
                        {data?.pages?.totalRecords > 0 ?
                            <PaginationTables handleChange={handleChange} pages={data?.pages} formPageSize={form.pageSize} />
                            :
                            ""
                        }
                    </div>
                    {loading ?
                        <Loading />
                        :
                        data?.pages?.totalRecords === 0 ?
                            <EmptyAnswer />
                            :
                            <DynamicTable tableStructure={tableStructure} data={data?.list} />
                    }
                </div>
            </div>
            <ModalSearchVehicle show={show} handleClose={handleClose} setVehicle={getVehicle} />
        </>
    );
}

export default Search;
