import loading from '../assets/img/loading.gif';

const Loading = () => {
    return (
        <div className="container-fluid">
            <div className="text-center mb-4" >
                <div className="card-body d-flex align-items-center justify-content-center" Style={'height:70vh'}>
                    <img src={loading}  />
                </div>
            </div>
        </div>
    );
}

export default Loading;
