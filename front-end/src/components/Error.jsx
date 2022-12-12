import error from '../assets/img/404.png';

const Error = () => {
    return (
        <div className="container-fluid">
            <div className="text-center mb-4" >
                <div className="card-body d-flex align-items-center justify-content-center" Style={'height:75vh'}>
                    <div>
                        <img className="card-img " Style={'max-width:200px;margin:auto'} src={error} />
                        <p>En construccion jeje</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error;
