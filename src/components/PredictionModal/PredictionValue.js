import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner';
import CloseButton from 'react-bootstrap/CloseButton';
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Toast from 'react-bootstrap/Toast';
import "./PredictionModal.css";

import { CircularProgressbar } from "react-circular-progressbar";

import ScheduleForm from './../ScheduleForm/ScheduleForm';

function PredictionValue(props) {
    return (
        <CircularProgressbar
        value={props.chance * 100}
        text={`${props.chance * 100}%`}
        styles={{
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0,

            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "round",

            // Text size
            textSize: "16px",

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 2,

            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',

            // Colors
            pathColor: `rgba(200, 30, 30, ${props.chance})`,
            textColor: "#000",
            trailColor: "#e6b6b6",
            backgroundColor: "#3e98c7"
        }}
    />
    );
}

export default PredictionValue;

