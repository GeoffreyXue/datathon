import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import banana from "../../images/banana.jpg";

import "./Patient.css";

function PatientCard(props) {

    return (
        <div className = "PatientCard">
            <Card>
                <Card.Img className='CardImage' variant="top" src={banana}/>
                <hr/>
                <Card.Body>
                    <Card.Title>{props.name ?? "Example"}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Age: {props.age ?? 20}</ListGroup.Item>
                        <ListGroup.Item>Height: {props.height ?? 160} in</ListGroup.Item>
                        <ListGroup.Item>Weight: {props.weight ?? 150} lb</ListGroup.Item>
                    </ListGroup>
                    
                    <Button className="Prediction" block size="lg">
                        Run Prediction
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default PatientCard;

