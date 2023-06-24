import { useState, useEffect } from 'react';
import DynamicTable from '../../parcials/DynamicTable';
import StackHeaderTable from '../../parcials/StackHeaderTable';
import { defaultPageSize } from '../../../service/tools';
import { getWithJWT } from '../../../service/methodAPI';
import Loading from '../../Loading';
import EmptyAnswer from '../../EmptyAnswer';
import StackHeaderTableWithSearchFormSelect from '../../parcials/StackHeaderTableWithSearchFormSelect';

const Control = () => {
    const [data, setData] = useState([]);
    const [dataFormSelect, setDataFormSelect] = useState([]);
    const [loading, setLoading] = useState(false);
    const [changeInputSearch, setChangeInputSearch] = useState(false);
    const listTypeSearch = [
        {
            key: "",
            value: "Seleccionar"
        },
        {
            key: "date",
            value: "Fecha"
        },
        {
            key: "idState",
            value: "Estado"
        },
        {
            key: "idVehicle",
            value: "Vehiculo"
        }
    ];
    const [form, setForm] = useState({
        page: 1,
        pageSize: defaultPageSize,
        typeSearch: listTypeSearch[0].key,
        textSearch: ""
    });
    const tableStructure = {
        thead: ["Fecha", "Estado", "Placa", "Serial", "tipo de vehiculo", "Usuario"],
        tbody: ["date", ["state", "name"], ["vehicle", "licensePlate"], ["vehicle", "serial"], ["vehicle", "typeVehicle","name"], ["vehicle", "user","person","name"]]
    };
    const controlRouter = "/api/control";
    const stateRouter = "/api/state";
    const vehicleRouter = "/api/vehicle";

    useEffect(() => {
        getWithJWTWithParams(form.page);
    }, [form.page, form.pageSize]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "typeSearch") {
            if (value === "idState") getWithJWTState();
            if (value === "idVehicle") getWithJWTVehicle();
            setChangeInputSearch(value === "idState" || value === "idVehicle");
        }
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

    const getWithJWTVehicle = () => {
        setDataFormSelect([]);
        getWithJWT(vehicleRouter, sessionStorage.getItem('token'))
            .then(response => {
                if (response.status === 200) {
                    if (response.data.list.length === 0){
                        setDataFormSelect([{
                            key: "",
                            value: "No hay data"
                        }]);
                    }else{
                        setDataFormSelect(response.data.list.map((item) => {
                            return {
                                key: item.id,
                                value: item.name
                            }
                        }));
                    }
                } else {
                    console.log("Error");
                }
            })
            .catch(err => console.log(err));
    }


    const getWithJWTState = () => {
        setDataFormSelect([]);
        getWithJWT(stateRouter, sessionStorage.getItem('token'))
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
    }

    const getWithJWTWithParams = (formPage) => {
        setLoading(true);
        let routerWithParams = controlRouter + "?page=" + formPage + "&pageSize=" + form.pageSize;
        if (form.textSearch.length > 0) routerWithParams = routerWithParams + "&typeSearch=" + form.typeSearch + "&search=" + form.textSearch;
        getWithJWT(routerWithParams, sessionStorage.getItem('token'))
            .then(response => {
                setLoading(false);
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    console.log("Error");
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="mx-4 my-3">
            {changeInputSearch ?
                <StackHeaderTableWithSearchFormSelect title={"Usuarios"} pages={data?.pages} router={"/users"} handleChange={handleChange} formPageSize={form.pageSize} buttonSearch={buttonSearch} dataFormSelect={dataFormSelect} />
                :
                <StackHeaderTable title={"Usuarios"} pages={data?.pages} router={"/users"} handleChange={handleChange} formPageSize={form.pageSize} listTypeSearch={listTypeSearch} buttonSearch={buttonSearch} />
            }
            {loading ?
                <Loading />
                :
                data?.pages?.totalRecords === 0 ?
                    <EmptyAnswer />
                    :
                    <DynamicTable tableStructure={tableStructure} data={data?.list} routerActions={"/users"} />
            }

        </div>
    );
}

export default Control;
