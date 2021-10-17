import React, { useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import PatientCard from './PatientCard';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./Patients.css";

function Patients() {
    const [patients, setPatients] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(true);

    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        getPatients();
    }, [])

    function getPatients() {
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
            if (res.length == 0) {
                setPage(1);
                getPatients();
                return;
            }
            setPatients(res);
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
                <h1 className='m-3'>
                    Patients
                    <hr/>
                </h1>
            </Row>
            <Row xs={1} md={3} className="PatientSet g-4">
                {fetching ? <Spinner animation="border" /> :
                patients.map((patient, index) => (
                    <PatientCard key={index} patient={patient}/>
                ))}
            </Row>
            <Row>
                <div className="Pagination">
                    {page > 1 ? 
                        <Button className="Back" variant="outline-secondary" block size="lg" onClick={backPage}>
                            Back
                        </Button> : <div/>
                    }
                    {hasMorePages ? 
                        <Button className="Next" variant="outline-secondary" block size="lg" onClick={nextPage}>
                            Next
                        </Button> : null
                    }
                </div>
            </Row>
        </Container>
    );
}

export default Patients;