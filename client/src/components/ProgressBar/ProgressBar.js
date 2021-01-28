import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ duration = 30 }) => (
  <div className="progressBarWrapper">
    <div className="progressBarBackground">
      <div
        className="progressBar"
        style={{ animationDuration: `${duration}s` }}
      />
    </div>
  </div>
);

export default ProgressBar;
