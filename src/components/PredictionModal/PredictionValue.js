import React from "react";
import "./PredictionModal.css";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function PredictionValue(props) {
    return (
        <CircularProgressbar
        value={Math.round(props.chance * 10000) / 100}
        text={`${Math.round(props.chance * 10000) / 100}%`}
        styles={buildStyles({
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
        })}
    />
    );
}

export default PredictionValue;

