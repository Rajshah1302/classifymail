import React from 'react';
import './mailDetails.css';

function CardDetails({ name, description, onClose }) {
  return (
    <div className="card-details">
      <button onClick={onClose}>Close</button>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
}

export default CardDetails;
