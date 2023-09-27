import { useState, useEffect } from 'react';
import DynamicTable from '../../parcials/DynamicTable';
import StackHeaderTable from '../../parcials/StackHeaderTable';
import { defaultPageSize } from '../../../service/tools';
import { getWithJWT } from '../../../service/methodAPI';
import Loading from '../../Loading';
import EmptyAnswer from '../../EmptyAnswer';
import StackHeaderTableWithSearchFormSelect from '../../parcials/StackHeaderTableWithSearchFormSelect';

const User = ({ setBreadcrumb }) => {
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
    const tableStructure = {
        thead: ["Nombre", "Cedula", "Dirección", "Telefono", "Rol", "Email"],
        tbody: [["person", "name"], ["person", "identification"], ["person", "address"], ["person", "phone"], ["rol", "name"], "email"]
    };
    const userRouter = process.env.REACT_APP_BACK_END_USER_PATH;
    const rolRouter = process.env.REACT_APP_BACK_END_ROL_PATH;

    useEffect(() => {
        getWithJWTWithParams(form.page);
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
        let routerWithParams = userRouter + "?page=" + formPage + "&pageSize=" + form.pageSize;
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
                    <DynamicTable tableStructure={tableStructure} data={data?.list} router={"/users"} title={"Usuarios"} setBreadcrumb={setBreadcrumb} backRouter={userRouter} />
            }

        </div>
    );
}

export default User;
