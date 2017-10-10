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
  Images.findById,
  Images.delete,
  (req, res) => {
    res.render('users/profile2')
  }
);

// router.delete('/users/profile2/:id',

//   Images.findById,
//   Images.delete,
//   (req, res) => {
//     console.log('in the delete')

//     // res.json(res.locals.deleteImages);
//     res.send('deleted')
//   });

router.delete('/users/profile2/:id', (req, res, next) => {
  db.none(
    'DELETE FROM funnyimages WHERE id = $1', [req.params.id])
    .then((result) => {
      // res.locals.deleteImages;
      res.status(200)
        .json({
          status: 'success'
        })
      // next();
    })
    .catch(err => console.log(err));
});

module.exports = router;