const User = require('../models/users');
const router = require('express').Router();
const passport = require('passport');

const auth = require('../services/auth');

// Sign up page.

router.get('/new', (req, res) => {
  res.render('users/new');
});

// Post to create new user (params are username/password).

router.post('/',
  passport.authenticate(
    'local-signup', {
      failureRedirect: '/users/new',
      successRedirect: '/users/profile'
    }
  )
);

// Post to login (params are username/password).

router.post('/login',
  passport.authenticate(
    'local-login', {
      failureRedirect: '/',
      successRedirect: '/users/profile'
    }
  ));


router.get(
  '/profile',
  // Middleware (that we wrote) ensuring that if the user is not
  // authenticated, he or she will be redirected to the login screen.
  auth.restrict,
  User.findByEmailMiddleware,
  (req, res) => {
    console.log('in handler for users/profile');
    console.log('req.user:');
    console.log(req.user);
    res.render('users/profile', { user: res.locals.userData });
  }
);

// Logout.

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
