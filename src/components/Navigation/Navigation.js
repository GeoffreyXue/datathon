import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
        <Navbar.Brand>Healthcare Webapp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/datathon/#patients">Patients</Nav.Link>
                <Nav.Link href="/datathon/#calendar">Calendar</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="/datathon/#">Login</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default Navigation;
