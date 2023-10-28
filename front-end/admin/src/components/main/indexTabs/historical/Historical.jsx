import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Form, Button, Offcanvas } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getWithJWT } from '../../../../service/methodAPI';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const Historical = () => {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [dateFromLabel, setDateFromLabel] = useState();
    const [dateFrom, setDateFrom] = useState();
    const [hhLimite, setHhLimite] = useState(23);
    const [dateToday, setDateToday] = useState("");
    const [form, setForm] = useState({
        page: 1,
        pageSize: 10000,
        typeSearch: "date",
        textSearch: ""
    });
    const [loading, setLoading] = useState(false);
    const labels = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    const controlRouter = process.env.REACT_APP_BACK_END_CONTROL_PATH;
    const stateNameIn = process.env.REACT_APP_NAME_STATE_INPUT;
    const stateNameOut = process.env.REACT_APP_NAME_STATE_OUTPUT;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    useEffect(() => {
        buttonSearchDataToday();
    }, []);

    const getFormatDateTimePart = (input) => input > 9 ? input : "0" + input;
    const getDataToday = () => {
        const dateTime = new Date();
        const dd = getFormatDateTimePart(dateTime.getDate());
        const mm = getFormatDateTimePart(dateTime.getMonth() + 1);
        const yyyy = dateTime.getFullYear();
        const dateFrom = yyyy + "-" + mm + "-" + dd + " 00:00:00";
        const dateTo = yyyy + "-" + mm + "-" + dd + " 23:59:59";

        setDateToday(yyyy + "-" + mm + "-" + dd);
        setDateFromLabel(yyyy + "-" + mm + "-" + dd + " (00 - 23) Horas");
        setDateFrom(yyyy + "-" + mm + "-" + dd)

        return dateFrom + "_" + dateTo;
    }

    const getHoraLimite = () => {
        const dateTime = new Date();
        const hh = dateTime.getHours();
        setHhLimite(hh);
    }

    const handleChangeDate = (event) => {
        const { name, value } = event.target;
        setDateFrom(value);
    };

    const buttonSearchDataToday = () => {
        const valueTextSearch = getDataToday();
        getHoraLimite();
        getWithJWTWithParams({ ...form, textSearch: valueTextSearch });
        handleChange({
            target: {
                name: "textSearch",
                value: valueTextSearch
            }
        });
        handleClose();
    }

    const buttonSearch = () => {
        let dateFromBackend = dateFrom + " 00:00:00";
        let dateToBackend = dateFrom + " 23:59:59";
        const valueTextSearch = dateFromBackend + "_" + dateToBackend;
        dateToday === dateFrom ? getHoraLimite() : setHhLimite(23);
        getWithJWTWithParams({ ...form, textSearch: valueTextSearch });
        handleChange({
            target: {
                name: "textSearch",
                value: valueTextSearch
            }
        });
        handleClose();
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
                    console.log("Data historial: ", data);
                    setData(data);
                } else {
                    setData({});
                    console.log("Error");
                }
            })
            .catch(err => console.log(err));
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                position: 'bottom',
                text: dateFromLabel,
            }
        },
    };

    const getListHoraStateFromData = (data, state) => {
        const dataList = data?.filter(item => item.state.name == state);
        let line = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        dataList?.forEach((item) => {
            const hhMMss = item.date.split(' ')[1];
            const hh = hhMMss.split(':')[0];
            const valueLineIndex = line[parseInt(hh, 10)];
            line.splice(hh, 1, valueLineIndex + 1);
        })

        line.splice(hhLimite + 1);

        return line;
    }

    const dataLine = {
        labels: labels,
        datasets: [{
            label: 'Entrada',
            data: getListHoraStateFromData(data.list, stateNameIn),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }, {
            label: 'Salida',
            data: getListHoraStateFromData(data.list, stateNameOut),
            fill: false,
            borderColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.1
        }]
    };
    return (
        <div className='m-2 heightCenter_vh_83 d-flex justify-content-center align-items-center position-relative'>
            <Button className="me-5 align-top bg-success position-absolute top-0 end-0" onClick={handleShow}><i className="fa-solid fa-magnifying-glass"></i></Button>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Body>
                    <Form className='p-2 mt-2'>
                        <Form.Group className="mb-3 mx-1">
                            <Form.Label>Fecha:</Form.Label>
                            <Form.Control type="date" className="ms-1" name="from" max={dateToday} onChange={handleChangeDate} value={dateFrom} />
                        </Form.Group>
                        <Form.Group className="m-4 d-flex justify-content-center">
                            <Button className="ms-3 align-top bg-success" onClick={() => buttonSearch()}><i className="fa-solid fa-magnifying-glass"></i></Button>
                            <Button className="ms-3 align-top bg-success" onClick={() => buttonSearchDataToday()}><i class="fa-solid fa-rotate-left"></i></Button>
                        </Form.Group>

                    </Form>
                </Offcanvas.Body>
            </Offcanvas>

            <Line options={options} data={dataLine} />
        </div>
    );
}

export default Historical;
