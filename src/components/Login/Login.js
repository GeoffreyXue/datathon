import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Redirect } from 'react-router';

import LoginContext from '../../LoginContext';

import "./Login.css";

// taken from https://serverless-stack.com/chapters/create-a-login-page.html

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loggedIn, setLoggedIn] = useContext(LoginContext);
const [loginSuccess, setLoginSuccess] = useState(false);

function validateForm() {
    return email.length > 0 && password.length > 0;
}

function handleSubmit(event) {
    event.preventDefault();
}

function login() {
    console.log("LOGGING IN");
    setLoggedIn(true);
    setLoginSuccess(true);
}

return (
    <Container className="container-fluid">
        {loginSuccess ? <Redirect to="/patients" /> : null}
        <Row>
        <Col className="d-flex flex-wrap">
            <Container>
                <div className="Login">
                    <Form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </Form.Group>
                        <Button className="LoginButton" block size="lg" type="submit" disabled={!validateForm()} onClick={login}>
                        Login
                        </Button>
                    </Form>
                </div>
            </Container>
        </Col>
        </Row>
    </Container>
);
}

export default Login;