const express = require('express');
const router = express.Router();
const pointsOfInterestRecommend = require('../services/pointsOfInterestRecommend');

/* GET points Of Interest. */
router.get('/:ID', async function(req, res, next) {
  console.log(req.params.ID);
  try {
    res.json(await pointsOfInterestRecommend.increment(req.query.page, req.params.ID));
  } catch (err) {
    console.error(`Error while getting points of interest`, err.message);
    next(err);
  }
});

module.exports = router;