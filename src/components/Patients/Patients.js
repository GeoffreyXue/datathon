import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PatientCard from './PatientCard';

import "./Patient.css";

function Patients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setPatients([
        {
            name: "Geoffrey",
            stats: {
                age: 10,
                height: 94,
                weight: 365,
            }
        }
    ])
  }, [patients])

  function renderPatients() {
      
  }


  return (
    <Container>
        <Row>
            <h1 className='m-3'>
                Patients
                <hr/>
            </h1>
        </Row>
        <Row xs={1} md={3} className="g-4">
                <PatientCard name="Geoffrey Xue" location="Madison" age="18" weight="900" height="93"/>  
                <PatientCard/>
                <PatientCard/>
                <PatientCard/>
                <PatientCard/>
        </Row>
    </Container>
  );
}

export default Patients;