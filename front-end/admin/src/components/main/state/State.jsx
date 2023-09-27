import { useState, useEffect } from 'react';
import DynamicTable from '../../parcials/DynamicTable';
import { getWithJWT } from '../../../service/methodAPI';
import Loading from '../../Loading';
import EmptyAnswer from '../../EmptyAnswer';

const State = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const tableStructure = {
        thead: ["Nombre"],
        tbody: ["name"]
    };
    const stateRouter = process.env.REACT_APP_BACK_END_STATE_PATH;

    useEffect(() => {
        getWithJWTWithParams();
    }, []);

    const getWithJWTWithParams = () => {
        setLoading(true);
        getWithJWT(stateRouter, sessionStorage.getItem('token'))
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
            {loading ?
                <Loading />
                :
                data.length === 0 ?
                    <EmptyAnswer />
                    :
                    <DynamicTable tableStructure={tableStructure} data={data}/>
            }

        </div>
    );
}

export default State;
