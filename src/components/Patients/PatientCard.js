import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import PredictionModal from "./../PredictionModal/PredictionModal";
import StatModal from './../StatModal/StatModal';

import banana from "../../images/banana.jpg";

import './PatientCard.css';


function PatientCard(props) {

    var patient = props.patient ?? {};

    const [pShow, setPShow] = useState(false);

    const handlePClose = () => setPShow(false);
    const handlePShow = () => setPShow(true);

    const [sShow, setSShow] = useState(false);

    const handleSClose = () => setSShow(false);
    const handleSShow = () => setSShow(true);

    return (
        <div className = "PatientCard">
            <Card border="secondary" style={{ borderWidth: '5px' }}>
                <Card.Img className='CardImage' variant="top" src={banana}/>
                <hr/>
                <Card.Body>
                    <Card.Title>{patient.name ?? "Example"}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Age: {patient.age ?? 20}</ListGroup.Item>
                        <ListGroup.Item>Height: {patient.height ?? 160} in</ListGroup.Item>
                        <ListGroup.Item>Weight: {patient.weight ?? 150} lb</ListGroup.Item>
                    </ListGroup>
                    
                    <div className="ButtonGrouping">
                        <Button className="Stats" block size="lg" onClick={handleSShow}>
                            Get Stats
                        </Button>
                        <Button className="Prediction" block size="lg" onClick={handlePShow}>
                            Run Prediction
                        </Button>
                    </div>

                </Card.Body>
            </Card>
            <PredictionModal patient={patient} show={pShow} handleClose={handlePClose}/>
            <StatModal patient={patient} show={sShow} handleClose={handleSClose}/>
        </div>
    );
}

export default PatientCard;

