import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { Calendar as Cal, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import events from "./events";

import "./Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = momentLocalizer(moment)

function Calendar() {

    return (
        <Container className="Calendar">
            <Row>
                <h1 className='m-3'>
                    Calendar
                    <hr/>
                </h1>
                
            </Row>
            <Row>
                <Cal
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600, width: '100%' }}
                />
            </Row>
        </Container>
    );
}

export default Calendar;