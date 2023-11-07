const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const fs = require('fs-extra');
const PORT = 3003;
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

let galleries = [];
const images = [];

const dataFilePath = './galleries.json';

fs.readFile(dataFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
  } else {
    galleries = JSON.parse(data);
  }
});

app.use(cors());
app.use(bodyParser.json());

app.post('/gallery', (req, res) => {
  const { name } = req.body;
  if (!name || name.includes('/')) {
    return res.status(400).send('Gallery name is required and cannot contain "/"');
  }
  const foundGallery = galleries.find(gallery => gallery.name === name);
  if (foundGallery) {
    return res.status(409).send('Gallery with this name already exists');
  }
  const gallery = {
    path: name,
    name: name,
    images: []
  };
  galleries.push(gallery);

  fs.writeFile(dataFilePath, JSON.stringify(galleries), (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send('Unknown error');
    }
    res.status(201).json(gallery);
  });
});


app.post('/gallery/:name', (req, res) => {
  const name = req.params.name;
  const data = req.body;

  const foundGallery = galleries.find(gallery => gallery.name === name);
  if (!foundGallery) {
    return res.status(404).send('Gallery not found');
  }

  foundGallery.images.push({ path: data.path, fullpath: data.fullpath, name: data.name, modified: data.modified });

  console.log('Príchozí údaje:', data);
  console.log('Pole images:', foundGallery.images);

  fs.writeFile(dataFilePath, JSON.stringify(galleries), (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send('Unknown error');
    }
  });

  res.status(200).send('Údaje boli úspešne pridané do poľa images.');
});

app.get('/gallery', (req, res) => {
  const response = {
    galleries: galleries.map(gallery => {
      return {
        path: gallery.path,
        name: gallery.name,
      };
    }),
  };

  res.status(200).json(response);
});

app.delete('/gallery/:path', (req, res) => {
  const { path } = req.params;
  const index = galleries.findIndex(gallery => gallery.path === path);
  if (index !== -1) {
    galleries.splice(index, 1);
    fs.writeFile(dataFilePath, JSON.stringify(galleries), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return res.status(500).json({ error: 'Unknown error' });
      }
      res.sendStatus(204);
    });
  } else {
    res.status(404).send('Gallery not found');
  }
});

app.get('/gallery/:path', (req, res) => {
  const { path } = req.params;
  const foundGallery = galleries.find(gallery => gallery.path === path);

  if (!foundGallery) {
    return res.status(404).send('Gallery not found');
  }

  res.status(200).json(foundGallery);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

