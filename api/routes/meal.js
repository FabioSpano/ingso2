const express = require('express');
const mealRoutes = express.Router();
const bodyParser = require('body-parser');

mealRoutes.use(bodyParser.urlencoded({ extended: true }));

const Meal = require('../models/meal');

mealRoutes.route('/view')
	.get(async function(req, res) {
		let meals = await Meal.find({})
		if(meals != null){
			res.status(200);
			res.json([meals, {message: 'List of meals found!'}]);
		}else{
			res.status(404);
			res.json({message: 'No meals found!'});
		}
	});

  mealRoutes.route('/insert')
  	.post(async function(req,res){
  		var meal = new Meal();
  		meal.first = req.body.first;
  		meal.second = req.body.second;
      meal.dessert = req.body.dessert;
  		saved = await meal.save();
  		if(saved != null){
  			res.status(201);
  			res.json([saved , {message: 'User correctly created'}]);
  		}else{
  			res.status(404);
  			res.json({message: 'ERROR 404: User not created!'});
  		}
});

module.exports = mealRoutes;
