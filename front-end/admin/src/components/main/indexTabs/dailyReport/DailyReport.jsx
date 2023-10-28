import { Form, Button} from 'react-bootstrap';
import DynamicTable from '../../../parcials/DynamicTable';
import { getWithJWT } from '../../../../service/methodAPI';
import { useState, useEffect } from 'react';
import Loading from '../../../Loading';
import { defaultPageSize } from '../../../../service/tools';
import EmptyAnswer from '../../../EmptyAnswer';
import PaginationTables from '../../../parcials/PaginationTables';

const DailyReport = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        page: 1,
        pageSize: defaultPageSize,
        typeSearch: "date",
        textSearch: ""
    });
    const [date, setDate] = useState({
        from: "",
        to: ""
    });
    const [countInput, setCountInput] = useState(0);
    const [countOut, setCountOut] = useState(0);
    const [loading, setLoading] = useState(false);

    const getFormatDateTimePart = (input) => input > 9 ? input : "0" + input;

    const getDataToday = () => {
        const dateTime = new Date();
        const dd = getFormatDateTimePart(dateTime.getDate());
        const mm = getFormatDateTimePart(dateTime.getMonth() + 1);
        const yyyy = dateTime.getFullYear();
        const hh = getFormatDateTimePart(dateTime.getHours());
        const MM = getFormatDateTimePart(dateTime.getMinutes());
        const ss = getFormatDateTimePart(dateTime.getSeconds());
        const dateFrom = yyyy + "-" + mm + "-" + dd + "T00:00:00";
        const dateTo = yyyy + "-" + mm + "-" + dd + "T" + hh + ":" + MM + ":" + ss;
        const dateFromBackend = dateFrom.replace("T", " ");
        const dateToBackend = dateTo.replace("T", " ");

        setDate({
            from: dateFrom,
            to: dateTo
        })

        return dateFromBackend + "_" + dateToBackend;
    }

    const tableStructure = {
        thead: ["Fecha", "Placa", "Usuario", "Registro"],
        tbody: ["date", ["vehicle", "licensePlate"], ["vehicle", "user", "person", "name"], ["state", "name"]]
    };
    const controlRouter = process.env.REACT_APP_BACK_END_CONTROL_PATH;
    const stateNameIn = process.env.REACT_APP_NAME_STATE_INPUT;
    const stateNameOut = process.env.REACT_APP_NAME_STATE_OUTPUT;
    const handleChange = (event) => {
        const { name, value } = event.target;
        name === "pageSize" ? setForm({ ...form, [name]: value, page: 1 }) : setForm({ ...form, [name]: value });
    };

    const handleChangeDate = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        setDate({ ...date, [name]: value });
    };

    useEffect(() => {
        buttonSearchDataToday();
    }, [form.page, form.pageSize]);

    const buttonSearchDataToday = () => {
        const valueTextSearch = getDataToday();
        getWithJWTWithParams({ ...form, textSearch: valueTextSearch });
        handleChange({
            target: {
                name: "textSearch",
                value: valueTextSearch
            }
        });
    }

    const buttonSearch = () => {
        let dateFromBackend = date.from.replace("T", " ");
        let dateToBackend = date.to.replace("T", " ");
        dateFromBackend = dateFromBackend.length === 19 ? dateFromBackend :  dateFromBackend + ":00";
        dateToBackend = dateToBackend.length === 19 ? dateToBackend :  dateToBackend + ":00";
        const valueTextSearch = dateFromBackend + "_" + dateToBackend;
        getWithJWTWithParams({ ...form, textSearch: valueTextSearch });
        handleChange({
            target: {
                name: "textSearch",
                value: valueTextSearch
            }
        });
    }

    const getWithJWTWithParams = (form) => {
        setLoading(true);
        let routerWithParams = controlRouter + "?page=" + form.page + "&pageSize=" + form.pageSize;
        if (form.textSearch.length > 0) routerWithParams = routerWithParams + "&typeSearch=" + form.typeSearch + "&search=" + form.textSearch;
        let sessionToken = sessionStorage.getItem('token');
        if (sessionToken === null) sessionToken = "Bearer " + (new URLSearchParams(window.location.search).get('access'));

        getWithJWT(routerWithParams, sessionToken)
            .then(response => {
                setLoading(false);
                if (response.status === 200) {
                    let data = response.data;
                    setData(data);
                    setCountInput(getCountStateFromData(data.list, stateNameIn));
                    setCountOut(getCountStateFromData(data.list, stateNameOut));
                } else {
                    setData({});
                    setCountInput(0);
                    setCountOut(0);
                    console.log("Error");
                }
            })
            .catch(err => console.log(err));
    }

    const getCountStateFromData = (data, state) => {
        return data.filter(item => item.state.name == state).length;
    }

    return (
        <div className="row py-4 flex-nowrap-content-center justify-content-evenly align-items-start">
            <div className="col-md-2 p-2 border rounded">
                <Form className='p-2 mt-2'>
                    <div className="d-flex justify-content-between align-items-start">
                        <Form.Label><h5>Fecha:</h5></Form.Label>
                        {data?.pages?.totalRecords > 0 ?
                            <PaginationTables handleChange={handleChange} pages={data?.pages} formPageSize={form.pageSize} />
                            :
                            ""
                        }
                    </div>
                    <Form.Group className="mb-3 mx-1">
                        <Form.Label>Desde</Form.Label>
                        <Form.Control type="datetime-local" className="ms-1" name="from" onChange={handleChangeDate} value={date.from} />
                    </Form.Group>
                    <Form.Group className="mb-3 mx-1">
                        <Form.Label>Hasta</Form.Label>
                        <Form.Control type="datetime-local" className="ms-1" name="to" onChange={handleChangeDate} value={date.to} />
                    </Form.Group>
                    <Form.Group className="m-4 d-flex justify-content-center">
                        <Button className="ms-3 align-top bg-success" onClick={() => buttonSearch()}><i className="fa-solid fa-magnifying-glass"></i></Button>
                        <Button className="ms-3 align-top bg-success" onClick={() => buttonSearchDataToday()}><i class="fa-solid fa-rotate-left"></i></Button>
                    </Form.Group>

                </Form>
                <div className="d-flex justify-content-evenly">
                    <div className="p-2 text-center">
                        <h3 className="text-success">{countInput}</h3>
                        <h5>Entradas</h5>
                    </div>
                    <div className="p-2 text-center">
                        <h3 className="text-success">{countOut}</h3>
                        <h5>Salidas</h5>
                    </div>
                </div>

            </div>

            <div className="col-md-9 p-2 border rounded">
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
