import { Navbar, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';

const TopBar = ({ handleShowMenu, nameUser }) => {
    const navigate = useNavigate();

    const onClickSingOff = () => {
        sessionStorage.removeItem('token');
        navigate("/");
        window.location.reload();
    }

    return (
        <Navbar className="bg-success p-0" sticky="top">
            <Navbar.Brand className="ps-4 text-light" onClick={handleShowMenu}><Link to={'/'}><strong className="text-white">OCR-POPULAR</strong></Link></Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="p-0 pe-4">
                    <DropdownButton
                        align="end"
                        variant="success"
                        title={nameUser}
                    >
                        <Dropdown.Item eventKey="2">Perfil</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Configuracion</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="1" onClick={() => onClickSingOff()}>Cerrar Sesion</Dropdown.Item>
                    </DropdownButton>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default TopBar;
