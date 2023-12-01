import { useState, useEffect } from 'react';
import { Button, Toast } from 'react-bootstrap';
import '../../assets/css/video-react.css';
import VideoFeed from './VideoFeed';
import { get } from '../../service/methodAPI';

const Index = () => {
    const [data, setData] = useState({
        key: "warning",
        placa: "Buscando",
        state: "Buscando",
        date: "Buscando"
    });
    const [show, setShow] = useState(false);
    const message = [
        'The vehicle to enter does not belong to the campus!',
        'The vehicle to enter does not belong to the campus, but has already entered before!',
        'The vehicle to enter if it belongs to the campus'

    ];

    useEffect(() => {
        const interval = setInterval(() => {
            get("/api/control/control-vigilante")
                .then(response => {
                    if (response.status === 200) {
                        setData(response.data);
                    } else {
                        setData({
                            key: "warning",
                            placa: "Buscando",
                            state: "Buscando",
                            date: "Buscando"
                        });
                    }
                })
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const mensaje = () => {
        if (data.key === "success") {
            return "La placa: " + data.placa + ", Se encuentra registrada en l base de datos. Detalle,  estado: " + data.state + " fecha: " + data.date;
        } if (data.key === "danger") {
            return "La placa: " + data.placa + ", NO se encuentra registrada en l base de datos. Detalle,  estado: " + data.state + " fecha: " + data.date;
        } else {
            return "Buscando ...";
        }
    }

    return (
        <>
            <div className="my-5 d-flex flex-wrap justify-content-evenly align-items-stretch">
                <div className="col-md-9 p-2 border rounded">
                    <div className="mb-3">
                        <h4>Camara</h4>
                    </div>
                    <div className="position-relative">
                        <VideoFeed />
                        <Button className="z-1 m-3 semaforo rounded-circle position-absolute top-0 end-0" variant={data.key} onClick={() => setShow(true)}></Button>
                        <Toast className="z-2 position-absolute top-0 end-0" onClose={() => setShow(false)} show={show} delay={4000} autohide>
                            <Toast.Header>
                                <img
                                    src="holder.js/20x20?text=%20"
                                    className="rounded me-2"
                                    alt=""
                                />
                                <strong className="me-auto">{data.key}</strong>
                            </Toast.Header>
                            <Toast.Body>
                                <p>{
                                    mensaje()
                                }
                                </p>
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;
