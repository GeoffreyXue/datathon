import React, { useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import PatientCard from './PatientCard';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./Patients.css";

function Patients() {
    const [patients, setPatients] = useState({});
    const [page, setPage] = useState(0);
    const [hasMorePages, setHasMorePages] = useState(true);

    function getPatients() {
        
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
                <PatientCard name="Geoffrey Xue" location="Madison" age="18" weight="900" height="93"/>  
                <PatientCard/>
                <PatientCard/>
            </Row>
            <Row>
                <div className="Pagination">
                    {page > 0 ? 
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