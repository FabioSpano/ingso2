const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const userRoutes = require('./api/routes/users');
const mealRoutes = require('./api/routes/meal');
const seatsRoutes = require('./api/routes/seats');
const bookRoutes = require('./api/routes/book');
const reviewRoutes = require('./api/routes/review');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/meals', mealRoutes);
app.use('/api/v1/seats', seatsRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/reviews', reviewRoutes);

app.use('/', express.static('public'));


module.exports = app;
