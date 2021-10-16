import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { Calendar as Cal, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import "./Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)

const myEventsList = [];

function Calendar() {

    

    return (
        <Container>
            <Row>
                <h1 className='m-3'>
                    Calendar
                    <hr/>
                </h1>
                
            </Row>
            <Row className="m-3">
                <Cal
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                />
            </Row>
        </Container>
    );
}

export default Calendar;