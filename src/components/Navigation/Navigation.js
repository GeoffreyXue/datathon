import {useState, useContext} from 'react';

import icon from '../../images/icon.svg';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import LoginContext from './../../LoginContext';


function Navigation() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
            <img
                src={icon}
                width='35'
                height='35'
                className="d-inline-block align-top"
                alt='lifeline'
            />
            <Navbar.Brand style={{height: '40px', lineHeight: '40px', textAlign: 'center'}}>LIFΞLIИΞ</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                {loggedIn ? 
                <Nav className="me-auto">
                    <Nav.Link href="/datathon/#patients">Patients</Nav.Link>
                    <Nav.Link href="/datathon/#calendar">Calendar</Nav.Link>
                    <Nav.Link href="/datathon/#experimental">Experimental</Nav.Link>
                </Nav> 
                : null}
                <Nav>
                    {loggedIn ? 
                    <Nav.Link href="/datathon/#">Logout</Nav.Link> :
                    <Nav.Link href="/datathon/#login">Login</Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
