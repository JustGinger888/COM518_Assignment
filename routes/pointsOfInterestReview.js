const express = require('express');
const router = express.Router();
const pointsOfInterestReview = require('../services/pointsOfInterestReview');

/* POST programming language */
router.post('/', async function(req, res, next) {
  console.log(req.body);
    try {
      res.json(await pointsOfInterestReview.create(req.body));
    } catch (err) {
      console.error(`Error while creating points of interest`, err.message);
      next(err);
    }
  });
  
  module.exports = router;