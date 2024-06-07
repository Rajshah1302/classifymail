import React from 'react';
import './mailCard.css'
function Card({ name, description }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
}

export default Card;
