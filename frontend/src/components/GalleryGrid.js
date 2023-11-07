import React, { useState, useEffect } from 'react';
import Card from './Card';
import './GalleryGrid.css';
import axios from 'axios';
import CreateItemCard from './CreateItemCard';

function GalleryGrid() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetGalleries = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3003/gallery');
      setGalleries(response.data.galleries);
    } catch (error) {
      setError('Error fetching galleries');
      console.error('Error fetching galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetGalleries();
  }, []);

  const handleOverlayDisplay = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const handleSubmit = async () => {
    if (categoryName !== '') {
      try {
        const response = await axios.post('http://localhost:3003/gallery', {
          name: categoryName,
        });
        setGalleries([...galleries, response.data]);
        setCategoryName('');
        setShowOverlay(false);
      } catch (error) {
        setError('Error creating gallery');
        console.error('Error creating gallery:', error);
      }
    }
  };

  return (
    <div>
      <div className="wrapper">
        <div className="create-info">
          <h1>Fotogaléria</h1>
          <p id="link-or-title">Kategórie</p>
        </div>
        <div className="grid-container">
          {galleries.map((gallery) => (
            <Card myimage={gallery.path} mytitle={gallery.name} key={gallery.path} />
          ))}
          {showOverlay && (
            <div className="card">
              <div className="card-title">{categoryName}</div>
              <div className="card-image">
                <img src="./public/img/pexels-city.jpg" alt={categoryName} />
              </div>
            </div>
          )}
          <CreateItemCard onClick={handleOverlayDisplay} />
        </div>
      </div>
      <div id="overlay" style={{ display: showOverlay ? 'block' : 'none' }}>
        <div className="card-l-design-width">
          <div className="form">
            <div className="title">
              <h3>Pridať kategóriu</h3>
              <p className="closeOverlay" style={{ cursor: 'pointer' }} onClick={handleCloseOverlay}>
                X
              </p>
            </div>
            <label className="input">
              <input
                className="input__field"
                id="categoryName"
                type="text"
                placeholder=" "
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <span className="input__label">Názov kategórie</span>
            </label>
            <button id="submitButton" type="submit" onClick={handleSubmit}>
              Pridať
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryGrid;