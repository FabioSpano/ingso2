const express = require('express');
const app = express();

const userRoutes = require('./api/routes/users');
const mealRoutes = require('./api/routes/meal');

app.use('/users', userRoutes);
app.use('/meals', mealRoutes);

app.use('/', express.static('public'));


module.exports = app;
