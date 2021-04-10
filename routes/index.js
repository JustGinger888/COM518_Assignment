const express = require('express');
const router = express.Router();

// Welcome Page
router.get('/', (req, res) => res.render('pages/welcome'));
router.get('/add', (req, res) => res.render('pages/addPointsOfInterest'));
router.get('/map', (req, res) => res.render('pages/map'));

module.exports = router;