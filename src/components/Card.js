import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ myimage, mytitle }) => {
  return (
    <Link to="/About" className="card">
      <div className='card'>
        <img src="/img/default-image.png" alt={myimage} />
        <span>0 fotiek</span>
        <div className="card_body">
          <p className="card_title">{mytitle}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;