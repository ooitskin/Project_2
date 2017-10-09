const axios = require('axios');
const bodyParser = require('body-parser');
const db = require('../db/config');

const Images = {};

function numericParam(reqParams, parameterName) {
  if (typeof parameterName !== 'string') {
    throw new Error('parameterName must be a string!')
  }
  const paramString = reqParams[parameterName];
  if (paramString === undefined) {
    throw new Error(parameterName + ' is undefined!');
  }
  const param = Number(paramString);
  if (isNaN(param)) {
    throw new Error('param is not a number! paramString: ' + paramString);
  }
  return param;
}

Images.findAll = (req, res, next) => {
  db.manyOrNone(
    'SELECT * FROM funnyimages'
  ).then(data => {
    //console.log(data);
    res.locals.allImages = data;
    next();
  })
    .catch(err => {
      console.log('Error.')
    });
};

Images.findById = (req, res, next) => {
  const { id } = parseInt(req.params);
  db.one(
    `SELECT * FROM funnyimages WHERE id = $1`, [id]
  ).then((data) => {
    // res.locals.data = data;
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Got One Image'
      })
      .catch(err => {
        console.log('Error.')
      })
  })
}

Images.save = (req, res, next) => {
  const { image } = req.body;
  // console.log('params', req.body);
  db.one(
    `INSERT INTO funnyimages (image) VALUES ($1) RETURNING *`, [image])
    .then(save => {
      res.locals.save = save;
      next();
    })
    .catch(err => {
      console.log('Error.')
    });
};

Images.delete = (req, res, next) => {
  const  { id } = parseInt(req.params);
  db.none(
    `DELETE FROM funnyimages WHERE id = $1`, [id])
    .then((result) => {
      // res.locals.deleteImages;
      res.status(200)
        .json({
          status: 'success'
        })
      // next();
    })
    .catch(err => console.log(err));
};

module.exports = Images;