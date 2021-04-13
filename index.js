const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const pointsOfInterestRouter = require('./routes/pointsOfInterest');
const pointsOfInterestRegionRouter = require('./routes/pointsOfInterestRegion');
const pointsOfInterestPostRouter = require('./routes/pointsOfInterestPost');
const pointsOfInterestRecommendRouter = require('./routes/pointsOfInterestRecommend');
const pointsOfInterestReviewRouter = require('./routes/pointsOfInterestReview');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = process.env.mongoURI || require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'SuperSecret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/authFlow.js'));

app.use('/poi', pointsOfInterestRouter);

app.use('/poi/region', pointsOfInterestRegionRouter);

app.use('/poi/post', pointsOfInterestPostRouter);

app.use('/poi/recommend', pointsOfInterestRecommendRouter);

app.use('/poi/review', pointsOfInterestReviewRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});


  return;
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});