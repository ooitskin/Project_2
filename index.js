const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const volleyball = require('volleyball');

const visionController = require('./controllers/vision-controller');
const usersController = require('./controllers/users-controller');

// view configuration.
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// Important: mount express middleware BEFORE passport middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);

// body-parser setup.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(volleyball);

app.get('/', (req, res) => {
  res.render('index');
}) // uncomment this later

app.use('/', visionController);
app.use('/users', usersController);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
