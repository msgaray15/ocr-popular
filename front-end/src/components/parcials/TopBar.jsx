import { Container, Navbar,Dropdown, DropdownButton } from 'react-bootstrap';

const TopBar = () => {
    return (
        <Navbar className="bg-success">
            <Navbar.Brand className="ps-4 text-light"><h4>OCR-POPULAR</h4></Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="pe-4">
                    <DropdownButton
                        drop="start"
                        variant="success"
                        title={<i class="fa-solid fa-user fa-xl"></i>}
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
