const express = require('express');
const router = express.Router();
const pointsOfInterestRegion = require('../services/pointsOfInterestRegion');

/* GET points Of Interest. */
router.get('/:region', async function(req, res, next) {
  console.log(req.params.region);
  try {
    res.json(await pointsOfInterestRegion.getMultiple(req.query.page, req.params.region));
  } catch (err) {
    console.error(`Error while getting points of interest`, err.message);
    next(err);
  }
});

module.exports = router;