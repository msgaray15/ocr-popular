import { Navbar,Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TopBar = ({handleShowMenu}) => {
    return (
        <Navbar className="bg-success p-0">
            <Navbar.Brand className="ps-4 text-light" onClick={handleShowMenu}><Link to={'/'}><strong className="text-white">OCR-POPULAR</strong></Link></Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="p-0 pe-4">
                    <DropdownButton
                        drop="start"
                        variant="success"
                        title={<i class="fa-solid fa-user fa-lg"></i>}
                    >
                        <Dropdown.Item eventKey="2">Perfil</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Configuracion</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="1">Cerrar Sesion</Dropdown.Item>
                    </DropdownButton>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default TopBar;
