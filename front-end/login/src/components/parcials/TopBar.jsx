import {Container, Navbar} from 'react-bootstrap';
import logo from '../../assets/images/logo.svg';

const TopBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Name
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
}

export default TopBar;
