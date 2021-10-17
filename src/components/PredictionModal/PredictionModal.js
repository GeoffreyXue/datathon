import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CloseButton from 'react-bootstrap/CloseButton';
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Toast from 'react-bootstrap/Toast';
import "./PredictionModal.css";

function PredictionModal(props) {
    const [show, setShow] = useState(false);

    function sendAlert() {
        setShow(true);
    }

    return (
        <div className = "PredictionModal">
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Predictions</Modal.Title>
                    <CloseButton onClick={props.handleClose} />
                </Modal.Header>

                <Modal.Body>
                    Prediction Models go here
                    <ListGroup variant="flush">
                        <ListGroup.Item>Age: {props.patient.age ?? 20}</ListGroup.Item>
                        <ListGroup.Item>Height: {props.patient.height ?? 160} in</ListGroup.Item>
                        <ListGroup.Item>Weight: {props.patient.weight ?? 150} lb</ListGroup.Item>
                    </ListGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={sendAlert}>Alert</Button>
                    <Button variant="primary">Schedule</Button>
                </Modal.Footer>
                <div className="Toast">
                    <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
                        <Toast.Header>
                            <strong className="mr-auto">Sent Message</strong>
                        </Toast.Header>
                        <Toast.Body>Successfully sent email to {props.patient.Name}.</Toast.Body>
                    </Toast>
                </div>

            </Modal>
        </div>
    );
}

export default PredictionModal;

