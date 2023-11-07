import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CategoryGrid.css';
import PhotoCard from './PhotoCard';
import Lightbox from "../components/Lightbox";
import CreateItemCard from './CreateItemCard';

function CategoryGrid() {

  const [displayOverlay, setDisplayOverlay] = useState("none");
  const [imgLink, setImgLink] = useState('');

  const photos = [
    {
      id: 1,
      image: '/img/pexels-gdtography-911738.jpg', 
    },
    {
      id: 2,
      image: '/img/pexels-gdtography-911758.jpg',
    },
    {
      id: 3,
      image: '/img/pexels-matheus-natan-3297593.jpg',
    },
    {
      id: 4,
      image: '/img/pexels-alexander-isreb-1797418.jpg',
    },
  ];

  const handleCreateItemCardClick = () => {
    setDisplayOverlay("block");
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    setImgLink(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    setDisplayOverlay("none");
    let newPhotos = photos.slice();
    newPhotos.push({ id: photos.length + 1, image: imgLink });
    // setPhotos(newPhotos); // if photos were a state
  };

  return (
    <div>
      <Lightbox style={{ display: "none" }} />
      <div className="wrapper">
        <div className="create-info">
          <h1>Fotogaléria</h1>
          <p id="link-or-title">
            <Link id="toHomeLink" to="/" style={{ padding: 10 }}>
              <img src="/img/Frame-3.png" alt='linkBack' width="16" height="16" />Architektúra
            </Link>
          </p>
        </div>
        <div className="grid-container">
          {photos.map((category) => (
            <PhotoCard myimage={category.image} key={category.id} />
          ))}
          <CreateItemCard onClick={handleCreateItemCardClick} />
        </div>
      </div>
      <div className="hero">
        <div id="overlay" style={{ display: displayOverlay }}>
          <div className="card-l-design-width">
            <div className="form">
              <div className="title">
                <h3>Pridať fotky</h3>
                <p className="closeOverlay">X</p>
              </div>
              <label htmlFor="input-file" id="drop-area">
                <input type="file" accept="images/*" id="input-file" hidden onChange={uploadImage} />
                <div id="img-view">
                  {imgLink ? (
                    <div id="img-view-content" style={{ backgroundImage: `url(${imgLink})`, border: 'none' }}>
                      {/* Display image here */}
                    </div>
                  ) : (
                    <div id="img-view-content">
                      <img src="/img/icon.png" alt='' />
                      <p>Sem presunte fotky</p>
                      <span>alebo</span>
                      <p className="chooseImages">Vyberte súbory</p>
                    </div>
                  )}
                </div>
              </label>
              <button id="submitButton" type="submit" onClick={handleSubmit}>Pridať</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryGrid;
