import React from 'react';
import './mailCard.css'
function Card({ name, description,type }) {
  return (
    <div className="card">
      <div style={{display:'flex',justifyContent:'space-between'}}>
      <h2>{name}</h2>

      {type && <h2 className={type.toLowerCase()}>{type}</h2>}
      </div>
      <p>{description}</p>
    </div>
  );
}

export default Card;
