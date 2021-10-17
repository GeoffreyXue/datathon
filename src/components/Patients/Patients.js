import React, { useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PatientCard from './PatientCard';

import "./Patients.css";

function Patients() {
    const [type, setType] = useState('Heart Disease');
    const [patients, setPatients] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(true);

    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        getPatients();
    }, [])

    function getPatients() {
        if (fetching) {
            return;
        }

        var data = {
            pages: page
        };

        setFetching(true);

        fetch("http://localhost:5000/page", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.final == true) {
                setHasMorePages(false);
            }
            setPatients(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setFetching(false);
        });
    }

    function backPage() {
        setPage(page - 1);
        getPatients();
    }

    function nextPage() {
        setPage(page + 1);
        getPatients();
    }

    return (
        <Container>
            <Row>
                <div className="Split">
                    <h1 className='m-3'>
                        Patients
                        <hr/>
                    </h1>
                    <div className="Dropdown">
                        <DropdownButton
                        variant="outline-dark"
                        title={type}
                        >
                            <Dropdown.Item eventKey='Heart Disease' onSelect={setType}>Heart Disease</Dropdown.Item>
                            <Dropdown.Item eventKey='Breast Cancer' onSelect={setType}>Breast Cancer</Dropdown.Item>
                            <Dropdown.Item eventKey='Influenza' onSelect={setType}>Influenza</Dropdown.Item>
                            <Dropdown.Item eventKey='Sepsis' onSelect={setType}>Sepsis</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
            </Row>
            
                {fetching ? <Spinner animation="border" /> :
                <>
                <Row className="PatientSet g-4">
                    {patients.map((patient, index) => (
                        <PatientCard key={index} patient={patient}/>
                    ))}
                </Row>
                <Row>
                    <div className="Pagination">
                        {page > 1 ? 
                            <Button className="Back" variant="outline-dark" onClick={backPage}>
                                Back
                            </Button> : <div/>
                        }
                        {hasMorePages ? 
                            <Button className="Next" variant="outline-dark" onClick={nextPage}>
                                Next
                            </Button> : null
                        }
                    </div>
                </Row>
                </>
                }
        </Container>
    );
}

export default Patients;