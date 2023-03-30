import { useState, useEffect } from 'react';
import DynamicTable from '../../parcials/DynamicTable';
import StackHeaderTable from '../../parcials/StackHeaderTable';

const Vehicle = ({setBreadcrumb }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const listTypeSearch = [
        {
            key: "identification",
            value: "Cedula"
        },
        {
            key: "name",
            value: "Nombre"
        }
    ];
    const [form, setForm] = useState({
        typeSearch: listTypeSearch[0].key,
        textSearch: ""
    });
    const tableStructure = {
        thead: ["Nombre", "Cedula", "Tipo de Documento", "Dirección", "Telefono"],
        tbody: ["name", "identification", ["identificacionType", "abbreviation"], "address", "phone"]
    };
    const peopleRouter = "/api/people";

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(event.target);
        setForm({ ...form, [name]: value });
    };

    const buttonSearch = () => {
        //getWithJWTWithParams();
    }
    /*
    const getWithJWTWithParams = () => {
        setLoading(true);
        let routerWithParams = peopleRouter;
        if (form.textSearch.length > 0) routerWithParams = routerWithParams + "?typeSearch=" + form.typeSearch + "&search=" + form.textSearch;
        getWithJWT(routerWithParams, sessionStorage.getItem('token'))
            .then(response => {
                setLoading(false);
                if (response.status === 200) {
                    setData(response.data.data);
                    setCountRecordsDB(response.data.countRecordsDB);
                } else {
                    console.log("Error");
                }
            })
            .catch(err => console.log(err));
    }
    */

    return (
        <div className="mx-4 my-3">
            <StackHeaderTable title={"Vehiculos"} router={"/vehicles"} setBreadcrumb={setBreadcrumb} handleChange={handleChange} listTypeSearch={listTypeSearch} buttonSearch={buttonSearch} />
            <DynamicTable tableStructure={tableStructure} data={data} routerActions={"/vehicles"}/>
        </div>
    );
}

export default Vehicle;
