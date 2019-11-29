const express = require('express');
const app = express();

const userRoutes = require('./api/routes/users');
const mealRoutes = require('./api/routes/meal');
const seatsRoutes = require('./api/routes/seats');
const bookRoutes = require('./api/routes/book');

app.use('/users', userRoutes);
app.use('/meals', mealRoutes);
app.use('/seats', seatsRoutes);
app.use('/book', bookRoutes);

app.use('/', express.static('public'));


module.exports = app;
