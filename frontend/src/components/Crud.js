import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:3003';

function Crud() {
  const [galleries, setGalleries] = useState([]);
  const [newGalleryName, setNewGalleryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [image,setImage] = useState('');
  
  const [galleryDetail, setGalleryDetail] = useState(null);

  const handleCreateGallery = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/gallery`, {
        name: newGalleryName,
      });
      setGalleries([...galleries, response.data]);
      setNewGalleryName('');
    } catch (error) {
      setError('Error creating gallery');
      console.error('Error creating gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetGalleries = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/gallery`);
      setGalleries(response.data.galleries);
    } catch (error) {
      setError('Error fetching galleries');
      console.error('Error fetching galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGallery = async (path) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/gallery/${path}`);
      setGalleries(galleries.filter((gallery) => gallery.path !== path));
    } catch (error) {
      setError(`Error deleting gallery with path ${path}`);
      console.error(`Error deleting gallery with path ${path}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const fileInput = document.getElementById('yourInputFieldId');

  const sendFileToServer = (inputValue, file) => {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${BASE_URL}/gallery/${inputValue}`;

    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=--boundary',
      },
    })
      .then((response) => {
        console.log(formData);
        console.log('Súbor bol úspešne odoslaný:', response);
      })
      .catch((error) => {
        console.error('Chyba pri odosielaní súboru:', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = event.target.elements.input.value;
    const file = fileInput.files[0]; // získanie prvého vybraného súboru
    sendFileToServer(inputValue, file);
  };

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

  function handleImage(e){
    console.log(e.target.files);
    setImage(e.target.files[0])
  }

  return (
    <div className="divv">
      <h1>Gallery List</h1>
      <form onSubmit={handleCreateGallery}>
        <input
          type="text"
          value={newGalleryName}
          onChange={(e) => setNewGalleryName(e.target.value)}
        />
        <button className="postBtn" type="submit">
          Create Gallery
        </button>
      </form>

      <button className="getBtn" onClick={handleGetGalleries}>
        Get Galleries
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              <th>Category title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {galleries.map((gallery) => (
              <tr key={gallery.path}>
                <td>{gallery.name}</td>
                <td className="buttons">
                  <button
                    className="deleteBtn"
                    onClick={() => handleDeleteGallery(gallery.path)}
                  >
                    Delete
                  </button>
                  <button
                    className="getBtn"
                    onClick={() => handleGetGalleryDetail(gallery.path)}
                  >
                    Get
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" name="input" />
        <input type="file" id='yourInputFieldId' name='file' onChange={handleImage} />
        <button type="submit">Odoslať</button>
      </form>

      {galleryDetail && (
        <div className="table-wrapper">
          <h2>Gallery Detail</h2>
          <table className="fl-table">
            <thead>
              <tr>
                <th>Path</th>
                <th>Name</th>
                <th>Images</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{galleryDetail.path}</td>
                <td>{galleryDetail.name}</td>
                <td>
                  <ul>
                    {galleryDetail.images.map((image, index) => (
                      <li key={index}>{image.path}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Crud;