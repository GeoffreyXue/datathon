import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import "./StatModal.css";

function StatModal(props) {

    return (
        <div className = "StatModal">
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Patient Statistics</Modal.Title>
                    <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                </Modal.Header>

                <Modal.Body>
                    Statistics
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

export default StatModal;

