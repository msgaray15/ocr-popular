import { Form, Button, Card, Spinner } from 'react-bootstrap';
import DynamicTable from '../../../parcials/DynamicTable';
import { getWithJWT } from '../../../../service/methodAPI';
import { useState, useEffect } from 'react';
import Loading from '../../../Loading';
import { defaultPageSize } from '../../../../service/tools';
import EmptyAnswer from '../../../EmptyAnswer';
import PaginationTables from '../../../parcials/PaginationTables';

const DailyReport = () => {
    const [data, setData] = useState([]);
    const [countInput, setCountInput] = useState(0);
    const [countOut, setCountOut] = useState(0);
    const [loading, setLoading] = useState(false);

    const getDataToday = () => {
        let today = new Date();
        let day = today.getDate();
        let textDay= day > 10 ? day : "0" + day;
        let month = today.getMonth() + 1;
        let textMonth = month > 10 ? month : "0" + month;
        let year = today.getFullYear();
        return year + "/" + textMonth + "/" + textDay;
    }

    const [form, setForm] = useState({
        page: 1,
        pageSize: defaultPageSize,
        typeSearch: "date",
        textSearch: getDataToday()
    });
    const tableStructure = {
        thead: ["Fecha", "Placa", "Usuario", "Registro"],
        tbody: ["date", ["vehicle", "licensePlate"], ["vehicle", "user", "person", "name"], ["state", "name"]]
    };
    const controlRouter = "/api/control";
    const handleChange = (event) => {
        const { name, value } = event.target;
        name === "pageSize" ? setForm({ ...form, [name]: value, page: 1 }) : setForm({ ...form, [name]: value });
    };

    useEffect(() => {
        getWithJWTWithParams(form.page);
    }, [form.page, form.pageSize]);

    const buttonSearchDataToday = () => {
        handleChange({
            target: {
                name: "textSearch",
                value: getDataToday()
            }
        });
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

    const getWithJWTWithParams = (formPage) => {
        setLoading(true);
        let routerWithParams = controlRouter + "?page=" + formPage + "&pageSize=" + form.pageSize;
        if (form.textSearch.length > 0) routerWithParams = routerWithParams + "&typeSearch=" + form.typeSearch + "&search=" + form.textSearch;
        getWithJWT(routerWithParams, sessionStorage.getItem('token'))
            .then(response => {
                setLoading(false);
                if (response.status === 200) {
                    let data = response.data;
                    setData(data);
                    setCountInput(getCountStateFromData(data.list, "input"));
                    setCountOut(getCountStateFromData(data.list, "out"));
                } else {
                    console.log("Error");
                }
            })
            .catch(err => console.log(err));
    }

    const getCountStateFromData = (data, state) => {
        return data.filter(item => item.state.name == state).length;
    }

    return (
        <div className="row m-3 flex-nowrap-content-center justify-content-evenly align-items-start">
            <div className="col-md-4 m-3 p-3 border rounded">
                <Form>
                    <div className="py-2 d-flex justify-content-between align-items-start">
                        <Form.Label><h5>Fecha:</h5></Form.Label>
                        {data?.pages?.totalRecords > 0 ?
                            <PaginationTables handleChange={handleChange} pages={data?.pages} formPageSize={form.pageSize} />
                            :
                            ""
                        }
                    </div>
                    <Form.Group className="ms-4 d-flex">
                        <div className="border rounded p-1">
                            <input type="text" name="textSearch" className="inputTypeTextRepresentDate" onChange={handleChange} value={form.textSearch} />
                            <input type="datetime-local" className="inputTypeDate" />
                        </div>
                        <Button className="ms-3 align-top bg-success" onClick={() => buttonSearch()}><i className="fa-solid fa-magnifying-glass"></i></Button>
                        <Button className="ms-3 align-top bg-success" onClick={() => buttonSearchDataToday()}><i class="fa-solid fa-rotate-left"></i></Button>
                    </Form.Group>
                </Form>
                <div className="mt-3 d-flex justify-content-evenly">
                    <div className="p-4 text-center">
                        <h3 className="text-success">{countInput}</h3>
                        <h5>Entradas</h5>
                    </div>
                    <div className="p-4 text-center">
                        <h3 className="text-success">{countOut}</h3>
                        <h5>Salidas</h5>
                    </div>
                </div>

            </div>

            <div className="col-md-7 m-3 px-3 border rounded">
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
    );
}

export default DailyReport;
