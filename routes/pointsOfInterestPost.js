const express = require('express');
const router = express.Router();
const pointsOfInterestPost = require('../services/pointsOfInterestPost');

/* POST programming language */
router.post('/', async function(req, res, next) {
  console.log(req.body);
    try {
      res.json(await pointsOfInterestPost.create(req.body));
    } catch (err) {
      console.error(`Error while creating points of interest`, err.message);
      next(err);
    }
  });
  
  module.exports = router;