import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner';
import CloseButton from 'react-bootstrap/CloseButton';
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Toast from 'react-bootstrap/Toast';
import "./PredictionModal.css";

import PredictionValue from "./PredictionValue";

import ScheduleForm from './../ScheduleForm/ScheduleForm';

function PredictionModal(props) {
    const [schedule, setSchedule] = useState(false);
    const [show, setShow] = useState(false);
    const [sendingEmail, setSendingEmail] = useState(false);

    const [fetching, setFetching] = useState(false);


    function sendAlert() {
        setSendingEmail(true);
        setTimeout(() => {
            setSendingEmail(false);
            setShow(true);
        }, 2000);
    }

    function toggleSchedule() {
        setSchedule(!schedule);
    }

    return (
        <div className = "PredictionModal">
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Predictions</Modal.Title>
                    <CloseButton onClick={props.handleClose} />
                </Modal.Header>

                <Modal.Body>
                    <div className="Predictions">
                        <div className="Prediction">
                            <div>Heart Disease</div>
                            <PredictionValue chance={props.patient.probability} />
                        </div>
                        <div className="Prediction">
                            <div>Breast Cancer</div>
                            <PredictionValue chance={Math.random()} />
                        </div>
                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={sendAlert}>
                        {sendingEmail ? 
                            <div>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                &nbsp;
                                Sending Email... 
                            </div> :
                            <div>Alert Patient</div>
                        }
                    </Button>
                    <Button variant="primary" onClick={toggleSchedule}>{!schedule ? <>Schedule</> : <>↓</>}</Button>
                </Modal.Footer>
                {schedule ?
                <Modal.Body>
                    <ScheduleForm />
                </Modal.Body> :
                null
                }
                <Modal.Body>
                </Modal.Body>
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

