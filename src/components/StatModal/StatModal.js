import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CloseButton from 'react-bootstrap/CloseButton';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import "./StatModal.css";

import 'bootstrap/dist/css/bootstrap.min.css';

function StatModal(props) {
    const [plots, setPlots] = useState([]);
    const [fetching, setFetching] = useState(false);

    const [selectedPlot, setSelectedPlot] = useState(0);

    function backPage() {
        setSelectedPlot(selectedPlot - 1);
    }

    function nextPage() {
        setSelectedPlot(selectedPlot + 1);
    }

    function getStats() {
        var data = {
            person: props.patient.Name
        };

        setFetching(true);
        setPlots([]);

        fetch("http://localhost:5000/plots", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((res) => {
            res.forEach((base64) => {
                // console.log(base64);
                setPlots(plots => [...plots, 'data:image/png;base64,' + base64]);
            })
            console.log(res.length);
            console.log(plots);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setFetching(false);
        });
    }

    useEffect(() => {
        if (props.show) {
            getStats();
        }
    }, [props.show])

    return (
        <div className = "StatModal">
            <Modal show={props.show} onHide={props.handleClose} dialogClassName="modal-90w">
                <Modal.Header>
                    <Modal.Title>Patient Statistics</Modal.Title>
                    <CloseButton  onClick={props.handleClose}/>
                </Modal.Header>

                <Modal.Body>
                    <div>
                    {fetching ? <Spinner animation="border" /> :
                        <Container>
                            <img className="StatImage" src={plots[selectedPlot]}/>
                            <div className="Pagination">
                            {selectedPlot > 0 ? 
                                <Button className="Back" variant="outline-dark" onClick={backPage}>
                                    Back
                                </Button> : <div/>
                            }
                            {selectedPlot < plots.length - 1 ? 
                                <Button className="Next" variant="outline-dark" onClick={nextPage}>
                                    Next
                                </Button> : null
                            }
                            </div>
                        </Container>
                    }
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default StatModal;

