import React from 'react';
import './Card.css';

const Card = ({ title, children }) => {
    return (
        <div className="card-container">
        <div className="card-body">
            <h2>{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Card;
