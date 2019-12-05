const express = require('express');
const mealRoutes = express.Router();
const bodyParser = require('body-parser');

mealRoutes.use(bodyParser.urlencoded({ extended: true }));

const Meal = require('../models/meal');

mealRoutes.route('/')
	.get(async function(req, res) {
		let meals = await Meal.find({})
		if(meals != null){
			res.status(200);
			res.json([meals]);
			console.log('* MESSAGE: List of meals found!');
		}else{
			res.status(404);
			res.json({message: 'No meals found!'});
			console.log('* MESSAGE: No meals found!');
		}
	});

  mealRoutes.route('/:first/:second/:dessert/:date')
  	.post(async function(req,res){
  		var meal = new Meal();
  		meal.first = req.params.first;
  		meal.second = req.params.second;
        meal.dessert = req.params.dessert;
		meal.date = req.params.date;
  		saved = await meal.save();
  		if(saved != null){
  			res.status(201);
  			res.json([{message: 'Meal correctly created'}]);
				console.log('* MESSAGE: Meal correctly created!');
  		}else{
  			res.status(404);
  			res.json({message: 'ERROR 404: Meal not created!'});
				console.log('* MESSAGE: Meal not created!');
  		}
});

mealRoutes.route('/:meal_id')
	.get(function(req,res){
		let meal_id = Meal.findMyMeal(req.params.meal_id);
		if(meal_id != null){
			res.status(200);
			res.json({meal_id, message: 'Meal correctly found!'});
			console.log('* MESSAGE: Meal correctly found!');
		}else{
			res.status(404);
			res.json({message: 'Meal not found'});
			console.log('* MESSAGE: Meal not found!');
		}
	});

mealRoutes.route('/')
	.delete(function (req, res) {
		if(Meal.delete()){
			res.status(200);
			res.json({message: 'All meals are cancelled'});
			console.log('* MESSAGE: All meals are cancelled!');
		}else{
			res.status(404);
			res.json({message: 'ERROR 404: All meals are already cancelled'});
			console.log('* MESSAGE: All meals are already cancelled!');
		}
	});

module.exports = mealRoutes;
