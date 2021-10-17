import React, { useState, useContext } from "react";

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import "./Experimental.css";

// taken from https://serverless-stack.com/chapters/create-a-login-page.html


function Experimental() {
    const [type, setType] = useState('Heart Disease');

    function renderExperiment() {
        switch(type) {
            case 'Heart Disease':
                return <iframe 
                className="Experimental"
                width="100%" 
                frameborder="no" 
                src="https://ruohezhou.shinyapps.io/shiny-prac/"
                />
            case 'Breast Cancer':
                return <iframe 
                className="Experimental"
                width="100%" 
                frameborder="no" 
                src="https://ruohezhou.shinyapps.io/breast_cancer_prediction/"
                />
            default:
                return <div>This has not been implemented yet. Check back for updates!</div>
        }
    }

    return (
        <Container>
            <br/>
            <Row>
                <DropdownButton
                variant="outline-dark"
                title={type}
                >
                    <Dropdown.Item eventKey='Heart Disease' onSelect={setType}>Heart Disease</Dropdown.Item>
                    <Dropdown.Item eventKey='Breast Cancer' onSelect={setType}>Breast Cancer</Dropdown.Item>
                    <Dropdown.Item eventKey='Influenza' onSelect={setType}>Influenza</Dropdown.Item>
                    <Dropdown.Item eventKey='Sepsis' onSelect={setType}>Sepsis</Dropdown.Item>
                </DropdownButton>
                {renderExperiment()}
            </Row>
        </Container>

    );
}

export default Experimental;