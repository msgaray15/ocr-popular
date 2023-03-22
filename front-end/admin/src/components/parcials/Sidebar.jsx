import { Offcanvas, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = ({show, onHide, setBreadcrumb}) => {
    const onClickOption = (breadcrumb) => {
        onHide();
        setBreadcrumb([breadcrumb])
    };

    return (
        <Offcanvas show={show} onHide={onHide}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><Link to={'/'} onClick={onHide}><strong className="text-success">OCR-POPULAR</strong></Link></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item >
                        <i class="fa-solid fa-car fa-lg me-3"></i>
                        <Link to={'/vehicles'} className="text-success" onClick={()=>onClickOption({route:"/vehicles",name:"Vehiculos"})}>Vehiculos</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <i class="fa-solid fa-users fa-lg me-3"></i>
                        <Link to={'/users'} className="text-success" onClick={()=>onClickOption({route:"/users",name:"Vehiculos"})}>Usuarios</Link>
                    </ListGroup.Item>
                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Sidebar;
