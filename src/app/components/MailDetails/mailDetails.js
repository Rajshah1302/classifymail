import React from "react";
import "./mailDetails.css";
import { Modal } from "@mui/material";
function CardDetails({ name, description, onClose }) {
  return (
    <div className="card-details container ">
      <div>
        <button
          onClick={onClose}
          style={{
            maxWidth: "90px",
            fontSize: "30px",
            lineHeight: "1",
            boxShadow: "none",
            cursor: "pointer",
          }}
        >
          X
        </button>
        <h1>Mail Details</h1>
        <h2 className="m-5">From: {name}</h2>
        <p>Description: {description}</p>
      </div>
    </div>
  );
}

export default CardDetails;
