import { useState, useEffect } from 'react';
import DynamicTable from '../../parcials/DynamicTable';
import StackHeaderTable from '../../parcials/StackHeaderTable';
import { defaultPageSize } from '../../../service/tools';
import { getWithJWT } from '../../../service/methodAPI';
import Loading from '../../Loading';
import EmptyAnswer from '../../EmptyAnswer';

const Vehicle = ({ setBreadcrumb }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const listTypeSearch = [
        {
            key: "",
            value: "Seleccionar"
        },
        {
            key: "serial",
            value: "Serial"
        },
        {
            key: "licensePlate",
            value: "Placa"
        }
    ];
    const [form, setForm] = useState({
        page: 1,
        pageSize: defaultPageSize,
        typeSearch: listTypeSearch[0].key,
        textSearch: ""
    });
    const tableStructure = {
        thead: ["Placa", "Serial", "Tipo de carro", "Usuario", "Identificacion", "Rol"],
        tbody: ["licensePlate", "serial", ["typeVehicle", "name"], ["user", "person", "name"], ["user", "person", "identification"], ["user","rol", "name"]]
    };
    const vehicleRouter = "/api/vehicle";

    useEffect(() => {
        getWithJWTWithParams(form.page);
    }, [form.page, form.pageSize]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        name === "pageSize" ? setForm({ ...form, [name]: value, page: 1 }) : setForm({ ...form, [name]: value });
    };

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
        let routerWithParams = vehicleRouter + "?page=" + formPage + "&pageSize=" + form.pageSize;
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
    }

    return (
        <div className="mx-4 my-3">
            <StackHeaderTable title={"Vehiculos"} pages={data?.pages} router={"/vehicles"} setBreadcrumb={setBreadcrumb} handleChange={handleChange} formPageSize={form.pageSize} listTypeSearch={listTypeSearch} buttonSearch={buttonSearch} />
            {loading ?
                <Loading />
                :
                data?.pages?.totalRecords === 0 ?
                    <EmptyAnswer />
                    :
                    <DynamicTable tableStructure={tableStructure} data={data?.list} router={"/vehicles"} title={"Vehiculos"} setBreadcrumb={setBreadcrumb} backRouter={vehicleRouter}/>
            }

        </div>
    );
}

export default Vehicle;
