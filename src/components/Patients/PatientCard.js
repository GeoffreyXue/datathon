import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import PredictionModal from "./../PredictionModal/PredictionModal";

import banana from "../../images/banana.jpg";

import "./Patient.css";

function PatientCard(props) {

    var patient = props.patient ?? {};

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className = "PatientCard">
            <Card>
                <Card.Img className='CardImage' variant="top" src={banana}/>
                <hr/>
                <Card.Body>
                    <Card.Title>{patient.name ?? "Example"}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Age: {patient.age ?? 20}</ListGroup.Item>
                        <ListGroup.Item>Height: {patient.height ?? 160} in</ListGroup.Item>
                        <ListGroup.Item>Weight: {patient.weight ?? 150} lb</ListGroup.Item>
                    </ListGroup>
                    
                    <Button className="Prediction" block size="lg" onClick={handleShow}>
                        Run Prediction
                    </Button>
                </Card.Body>
            </Card>

            <PredictionModal patient={patient} show={show} handleClose={handleClose}/>
        </div>
    );
}

export default PatientCard;

