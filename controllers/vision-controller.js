const express = require('express');
const router = express();

const Images = require('../models/vision');
const bodyParser = require('body-parser');
const auth = require('../services/auth');
const db = require('../db/config');

const vision = require('@google-cloud/vision')({
  projectId: 'ascendant-pixel-181913',
  keyFilename: './My First Project-4794867acf53.json'
});

// Get all names/images from funnyimages db

router.get('/users/profile',
  Images.findAll,
  (req, res) => {
    const img = {};
    img["Images"] = res.locals.allImages;
    // console.log(img);
    res.render('users/profile', img)
  }
);

router.post('/users/profile2',
  Images.save,
  (req, res) => {
    res.send('Saved to Database! Refresh to update list!');
    // res.json(res.locals.save);
  });

router.post('/users/profile', (req, res) => {
  // console.log('show me your body', req.body)
  vision.textDetection({
    source: {
      imageUri: req.body.url
    }
  })
    .then(result => {
      // console.log(result)
      console.log(result[0].textAnnotations[0].description);
      res.send('Rendered Text : ' + result[0].textAnnotations[0].description);
    })
    .catch((err => console.log(err)))
});


router.get('/users/profile2/:id',
  Images.delete,
  (req, res) => {
    // res.render('users/profile')
    // console.log(Images.delete)
    res.send('I deleted it')
  }
)

router.delete('/users/profile2/:id',
  Images.delete,
  (req, res) => {
    // res.json(res.locals.deleteImages);
    // res.send('deleted')
    res.send('hello')
  });

module.exports = router;