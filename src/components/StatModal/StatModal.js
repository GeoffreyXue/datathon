import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import "./StatModal.css";

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
                    <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                </Modal.Header>

                <Modal.Body>
                    Statistics
                    <div>
                    {fetching ? <Spinner animation="border" /> :
                        <Container>
                            <Row>
                                <img src={plots[selectedPlot]}/>
                            </Row>
                            <div className="Pagination">
                            {selectedPlot > 0 ? 
                                <Button className="Back" variant="outline-secondary" block size="lg" onClick={backPage}>
                                    Back
                                </Button> : <div/>
                            }
                            {selectedPlot < plots.length - 1 ? 
                                <Button className="Next" variant="outline-secondary" block size="lg" onClick={nextPage}>
                                    Next
                                </Button> : null
                            }
                            </div>
                        </Container>
                    }
                    </div>
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

