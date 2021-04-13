const express = require('express');
const router = express.Router();

// Welcome Page
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/home', ensureAuthenticated, (req, res) =>
  res.render('pages/home', {
    user: req.user
  })
);

//router.get('/', (req, res) => res.render('pages/home'));
router.get('/region', ensureAuthenticated, (req, res) => res.render('pages/region'));
router.get('/add', ensureAuthenticated, (req, res) => res.render('pages/addPointsOfInterest'));
router.get('/map', ensureAuthenticated, (req, res) => res.render('pages/map'));

module.exports = router;