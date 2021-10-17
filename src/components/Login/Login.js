import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from 'react-bootstrap/Spinner';

import { Redirect } from 'react-router';

import LoginContext from '../../LoginContext';

import "./Login.css";

// taken from https://serverless-stack.com/chapters/create-a-login-page.html

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [fetching, setFetching] = useState(false);
    const [showError, setShowError] = useState(false);

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    function login() {
        var data = {
            username: username,
            password: password
        };

        setFetching(true);
        setShowError(false);

        fetch("http://localhost:5000/validate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                console.log("login success");
                setLoggedIn(true);
                window.location.href = "http://localhost:3000/datathon/#/patients";
            }
            else {
                console.log("login fail");
                setShowError(true);
            }
            setFetching(false);
        })
        .catch((err) => {
            console.log(err);
            setFetching(false);
        });
    }

    return (
        <Container className="container-fluid">
            <Row>
            <Col className="d-flex flex-wrap">
                <Container>
                    <div className="Login">
                        <Form onSubmit={handleSubmit}>
                            <h1>Login</h1>
                            <Form.Group size="lg" controlId="email">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                            <Button className="LoginButton" variant="secondary" block size="lg" type="submit" disabled={!validateForm()} onClick={login}>
                                {fetching ? 
                                    <div>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        Loading... 
                                    </div> :
                                    <div>Login</div>
                                    }
                            </Button>
                        </Form>
                    </div>
                </Container>
            </Col>
            </Row>
            <Alert className="Alert" variant="danger" show={showError}>
                Login unsuccessful - please try again
            </Alert>
        </Container>
    );
}

export default Login;