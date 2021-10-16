import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

// import 'react-bootstrap/dist/css/bootstrap.min.css';

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
        <Navbar.Brand>Datathon Testing</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/datathon">Home</Nav.Link>
            <Nav.Link href="/datathon/#projects">Projects</Nav.Link>
            <Nav.Link href="/datathon/#team">Team</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default Navigation;
