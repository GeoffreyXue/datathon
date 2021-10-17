import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from 'react-bootstrap/Spinner';
import DateTimePicker from 'react-datetime-picker';


function ScheduleForm() {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [title, setTitle] = useState("");

    const [fetching, setFetching] = useState(false);
    const [buttonTitle, setButtonTitle] = useState("Schedule");

    function validateForm() {
        return startTime != null > 0 && endTime != null && title.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        // schedule();
        setFetching(true);
        setTimeout(() => {
            setFetching(false);
            setButtonTitle("✓");
            setTimeout(() => {
                setButtonTitle("Schedule")
            }, 1500);
        }, 2000);
    }

    function schedule() {
        var data = {
            startTime: startTime,
            endTime: endTime,
            title: title
        };

        fetch("http://localhost:5000/TODO", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setFetching(false);
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Schedule</h1>
            <Form.Group size="lg" controlId="start">
            <Form.Label style={{display: 'block'}}>Start Time</Form.Label>
            <DateTimePicker
                onChange={setStartTime}
                value={startTime}
            />
            </Form.Group>
            <Form.Group size="lg" controlId="end">
            <Form.Label style={{display: 'block'}}>End Time</Form.Label>
            <DateTimePicker
                onChange={setEndTime}
                value={endTime}
            />
            </Form.Group>
            <Form.Group size="lg" controlId="title">
            <Form.Label>Meeting Title</Form.Label>
            <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            </Form.Group>
            <Button className="ScheduleButton" variant="dark" block size="lg" type="submit" disabled={!validateForm()}>
                {fetching ? 
                    <div>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        &nbsp;
                        Scheduling... 
                    </div> :
                    <div>{buttonTitle}</div>
                    }
            </Button>
        </Form>
    );
}

export default ScheduleForm;