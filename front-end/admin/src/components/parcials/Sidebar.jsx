import { Offcanvas, ListGroup, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';

const Sidebar = ({ show, onHide, setBreadcrumb }) => {
    const onClickOption = (breadcrumb) => {
        onHide();
        setBreadcrumb(breadcrumb)
    };

    return (
        <Offcanvas show={show} onHide={onHide}>
            <Offcanvas.Header closeButton className="bg-success py-2">
                <img
                    alt=""
                    src={logo}
                    width="40px"
                    height="30px"
                    className="d-inline-block align-top"
                />
                <Offcanvas.Title>
                    <Link to={'/'} onClick={() => onClickOption([{ route: "/", name: "Inicio" }])}><strong className="text-white">OCR-POPULAR</strong></Link>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Accordion flush={true}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><i className="fa-solid fa-person  fa-lg me-3 text-success"></i><h6 className='m-auto ms-0 text-success'>Personas</h6></Accordion.Header>
                        <Accordion.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Link to='/people' className="text-success" onClick={() => onClickOption([{ route: "/people", name: "Personas" }])}>
                                        <i className="fa-solid fa-list me-3"></i>Listar
                                    </Link>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Link to='/people/new' className="text-success" onClick={() => onClickOption([{ route: "/people", name: "Personas" }, { route: "/new", name: "Nuevo" }])}>
                                        <i className="fa-solid fa-plus me-3"></i>Crear
                                    </Link>
                                </ListGroup.Item>
                                <ListGroup.Item><Link to='/' ><i className="fa-solid fa-pen-to-square me-3"></i>Editar</Link></ListGroup.Item>
                                <ListGroup.Item><i className="fa-solid fa-trash me-3"></i>Eliminar</ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header><i className="fa-solid fa-address-book fa-lg me-3 text-success"></i><h6 className='m-auto ms-0 text-success'>Roles</h6></Accordion.Header>
                        <Accordion.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Link to='/roles' className="text-success" onClick={() => onClickOption([{ route: "/roles", name: "Roles" }])}>
                                        <i className="fa-solid fa-list me-3"></i>Listar
                                    </Link>
                                </ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header><i class="fa-solid fa-arrows-turn-to-dots me-3 text-success"></i><h6 className='m-auto ms-0 text-success'>Estados</h6></Accordion.Header>
                        <Accordion.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Link to='/states' className="text-success" onClick={() => onClickOption([{ route: "/states", name: "Estados" }])}>
                                        <i className="fa-solid fa-list me-3"></i>Listar
                                    </Link>
                                </ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header><i className="fa-solid fa-car  fa-lg me-3 text-success"></i><h6 className='m-auto ms-0 text-success'>Tipos de Vehiculos</h6></Accordion.Header>
                        <Accordion.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Link to='/typeVehicles' className="text-success" onClick={() => onClickOption([{ route: "/typeVehicles", name: "Tipos de Vehiculo" }])}>
                                        <i className="fa-solid fa-list me-3"></i>Listar
                                    </Link>
                                </ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header><i className="fa-solid fa-users fa-lg me-3 text-success"></i><h6 className='m-auto ms-0 text-success'>Usuarios</h6></Accordion.Header>
                        <Accordion.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Link to='/users' className="text-success" onClick={() => onClickOption([{ route: "/users", name: "Usuarios" }])}><i className="fa-solid fa-list me-3"></i>Listar</Link>
                                </ListGroup.Item>
                                <ListGroup.Item><Link to='/createUsersPerson'><i className="fa-solid fa-plus me-3"></i>Crear</Link></ListGroup.Item>
                                <ListGroup.Item><Link to='/'><i className="fa-solid fa-pen-to-square me-3"></i>Editar</Link></ListGroup.Item>
                                <ListGroup.Item><i className="fa-solid fa-trash me-3"></i>Eliminar</ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <Accordion.Header><i className="fa-solid fa-car  fa-lg me-3 text-success"></i><h6 className='m-auto ms-0 text-success'>Vehiculos</h6></Accordion.Header>
                        <Accordion.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Link to='/vehicles' className="text-success" onClick={() => onClickOption([{ route: "/vehicles", name: "Vehiculos" }])}>
                                        <i className="fa-solid fa-list me-3"></i>Listar
                                    </Link>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Link to='/vehicles/new' className="text-success" onClick={() => onClickOption([{ route: "/vehicles", name: "Vehiculos" }, { route: "/new", name: "Nuevo" }])}>
                                        <i className="fa-solid fa-plus me-3"></i>Crear
                                    </Link>
                                </ListGroup.Item>
                                <ListGroup.Item><Link to='/' ><i className="fa-solid fa-pen-to-square me-3"></i>Editar</Link></ListGroup.Item>
                                <ListGroup.Item><i className="fa-solid fa-trash me-3"></i>Eliminar</ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Sidebar;
