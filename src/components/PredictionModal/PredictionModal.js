import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import "./PredictionModal.css";

function PredictionModal(props) {

    return (
        <div className = "PredictionModal">
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Predictions</Modal.Title>
                    <Button variant="secondary" onClick={props.handleClose}>Close</Button>
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
                    <Button variant="danger">Alert</Button>
                    <Button variant="primary">Schedule</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PredictionModal;

