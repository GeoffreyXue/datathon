import {useState, useContext} from 'react';

import {Redirect} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import LoginContext from './../../LoginContext';


function Navigation() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
            <Navbar.Brand>Healthcare Webapp</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                {loggedIn ? 
                <Nav className="me-auto">
                    <Nav.Link href="/datathon/#patients">Patients</Nav.Link>
                    <Nav.Link href="/datathon/#calendar">Calendar</Nav.Link>
                    <Nav.Link href="/datathon/#interactive">Interactive</Nav.Link>
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
