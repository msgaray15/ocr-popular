import { useState } from 'react';
import { Player } from 'video-react';
import { Button, Toast } from 'react-bootstrap';
import '../../assets/css/video-react.css';

const Index = () => {
    const [variant, setVariant] = useState("warning");
    const [show, setShow] = useState(false);
    const message = [
        'The vehicle to enter does not belong to the campus!',
        'The vehicle to enter does not belong to the campus, but has already entered before!',
        'The vehicle to enter if it belongs to the campus'

    ];
    const trafficLights = [
        'danger',
        'warning',
        'success'

    ]
    return (
        <>
            <div className="my-5 d-flex flex-wrap justify-content-evenly align-items-stretch">
                <div className="col-md-8 p-3 border rounded">
                    <div className="mb-3">
                        <h4>Camara (Nombre)</h4>
                    </div>
                    <div className="position-relative">
                        <Player autoPlay>
                            <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
                        </Player>
                        <Button className="m-3 semaforo rounded-circle position-absolute top-0 end-0" variant={variant} onClick={() => setShow(true)}></Button>
                        <Toast className="position-absolute top-0 end-0" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                            <Toast.Header>
                                <img
                                    src="holder.js/20x20?text=%20"
                                    className="rounded me-2"
                                    alt=""
                                />
                                <strong className="me-auto">Bootstrap</strong>
                            </Toast.Header>
                            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
                        </Toast>
                    </div>
                </div>
                <div className="col-md-3 p-3 border rounded">
                    <h3>Vehiculo</h3>
                    <div className="mt-4">
                        <h5>Datos Propietario</h5>
                        <div className="ms-3 mt-3">
                            <h6 >Nombre:</h6>
                            <h6 className="ms-4"></h6>
                        </div>
                        <div className="ms-3 mt-3">
                            <h6 >Identificacion:</h6>
                            <h6 className="ms-4"></h6>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Index;
