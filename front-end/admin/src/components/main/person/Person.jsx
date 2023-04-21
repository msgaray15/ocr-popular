import { useState, useEffect } from 'react';
import DynamicTable from '../../parcials/DynamicTable';
import StackHeaderTable from '../../parcials/StackHeaderTable';
import { defaultPageSize } from '../../../service/tools';
import { getWithJWT } from '../../../service/methodAPI';
import Loading from '../../Loading';
import EmptyAnswer from '../../EmptyAnswer';

const Person = ({ setBreadcrumb }) => {
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
    const tableStructure = {
        thead: ["Nombre", "Cedula", "Dirección", "Telefono"],
        tbody: ["name", "identification", "address", "phone"]
    };
    const peopleRouter = "/api/person";

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
        let routerWithParams = peopleRouter + "?page=" + formPage + "&pageSize=" + form.pageSize;
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
            <StackHeaderTable title={"Pesonas"} pages={data?.pages} router={"/people"} setBreadcrumb={setBreadcrumb} handleChange={handleChange} formPageSize={form.pageSize} listTypeSearch={listTypeSearch} buttonSearch={buttonSearch} />
            {loading ?
                <Loading />
                :
                data?.pages?.totalRecords === 0 ?
                    <EmptyAnswer />
                    :
                    <DynamicTable tableStructure={tableStructure} data={data?.list} router={"/people"} title={"Pesonas"} setBreadcrumb={setBreadcrumb} backRouter={peopleRouter} />
            }

        </div>
    );
}

export default Person;
