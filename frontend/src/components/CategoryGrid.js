import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CategoryGrid.css';
import PhotoCard from './PhotoCard';
import Lightbox from "../components/Lightbox";
import CreateItemCard from './CreateItemCard';
import axios from 'axios';

const BASE_URL = 'http://localhost:3003'; // zmena BASE_URL

function CategoryGrid() {
  const [displayOverlay, setDisplayOverlay] = useState("none");
  const [imgLink, setImgLink] = useState('');
  const [galleryDetail, setGalleryDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    handleGetGalleryDetail('your-path-here');
  }, []);

  const handleGetGalleryDetail = async (path) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/gallery/${path}`);
      setGalleryDetail(response.data);
      console.log('Gallery Detail:', response.data);
    } catch (error) {
      setError('Error fetching gallery detail');
      console.error('Error fetching gallery detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItemCardClick = () => {
    setDisplayOverlay("block");
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    setImgLink(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    setDisplayOverlay("none");
    let newPhotos = [...galleryDetail]; // Assuming the response data is an array
    newPhotos.push({ id: galleryDetail.length + 1, image: imgLink });
    setGalleryDetail(newPhotos);
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
          {galleryDetail.map((category, index) => (
            <PhotoCard myimage={category.image} key={index} />
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
  );
}

export default CategoryGrid;