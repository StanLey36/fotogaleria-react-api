import React from 'react';

const PhotoCard = ({ myimage }) => {
  return (
    <div class="card image">
      <img id="category-image-item" src={myimage} alt="obrázok"/>
    </div>
  );
};

export default PhotoCard;