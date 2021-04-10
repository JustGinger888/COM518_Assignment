const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const pointsOfInterestRouter = require('./routes/pointsOfInterest');
const pointsOfInterestRegionRouter = require('./routes/pointsOfInterestRegion');
const pointsOfInterestPostRouter = require('./routes/pointsOfInterestPost');
const pointsOfInterestRecommendRouter = require('./routes/pointsOfInterestRecommend');

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/', require('./routes/index.js'));

app.use('/poi', pointsOfInterestRouter);

app.use('/poi/region', pointsOfInterestRegionRouter);

app.use('/poi/post', pointsOfInterestPostRouter);

app.use('/poi/recommend', pointsOfInterestRecommendRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});


  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});