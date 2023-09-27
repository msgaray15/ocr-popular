import { useState, useEffect } from 'react';
import DynamicTable from '../../parcials/DynamicTable';
import { getWithJWT } from '../../../service/methodAPI';
import Loading from '../../Loading';
import EmptyAnswer from '../../EmptyAnswer';
import { Link } from 'react-router-dom';

const TypeVehicle = ( {setBreadcrumb }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const tableStructure = {
        thead: ["Nombre"],
        tbody: ["name"]
    };
    const typeVehicleRouter = process.env.REACT_APP_BACK_END_TYPE_VEHICLE_PATH;

    useEffect(() => {
        getWithJWTWithParams();
    }, []);

    const getWithJWTWithParams = () => {
        setLoading(true);
        getWithJWT(typeVehicleRouter, sessionStorage.getItem('token'))
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
            <div className='text-end me-3'><Link to={"/typeVehicles/new"} onClick={() => setBreadcrumb([{ route: "/typeVehicles", name: "Tipos de Vehiculos" }, { route: "/new", name: "Nuevo" }])}><i className="fa-solid fa-plus ms-3 text-success"></i></Link></div>
            {loading ?
                <Loading />
                :
                data.length === 0 ?
                    <EmptyAnswer />
                    :
                    <DynamicTable tableStructure={tableStructure} data={data} router={"/typeVehicles"} title={"Tipos de Vehiculos"} setBreadcrumb={setBreadcrumb} backRouter={typeVehicleRouter}/>
            }

        </div>
    );
}

export default TypeVehicle;
