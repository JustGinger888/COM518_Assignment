const express = require('express');
const router = express.Router();
const pointsOfInterest = require('../services/pointsOfInterest');

/* GET points Of Interest. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await pointsOfInterest.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting points of interest`, err.message);
    next(err);
  }
});

module.exports = router;