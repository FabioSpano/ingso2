const express = require('express');
const mealRoutes = express.Router();
const bodyParser = require('body-parser');

mealRoutes.use(bodyParser.urlencoded({ extended: true }));

const Meal = require('../models/meal');
const UtilDate = require('../util/utilDate');

/*mealRoutes.route('/')
	.get(async function(req, res) {
		try{
			let meals = await Meal.find({})
			if(meals != null){
				res.status(200);
				res.json([meals, {message: 'Meals found!'}]);
			}else{
				res.status(404);
				res.json({message: 'ERROR 404: No meals found!'});
			}
		}catch(error){
			res.status(500);
			res.json({message: 'ERROR 500: Local server error!'});
		}
	});*/

  mealRoutes.route('/')
  	.post(async function(req,res){
		try{
			var meal = new Meal();
			var saved = null;  
			meal.first = req.query.first;
			meal.second = req.query.second;
			meal.dessert = req.query.dessert;
			meal.date = req.query.date;
			if(meal.first != null && meal.second != null && meal.dessert != null && UtilDate.isValidDate(meal.date) && meal.date != null && Meal.findByDate(meal.date) == null)	
				saved = await meal.save();
			if(saved != null){
				res.status(201);
				res.json([{message: 'Meal correctly created'}]);
			}else{
				res.status(400);
				res.json({message: 'ERROR 400: Meal not created. There is a mistake in the syntax!'});
			}
		}catch(error){
			res.status(500);
			res.json({message: 'ERROR 500: Local server error!'});
		}
});

mealRoutes.route('/')
	.get(function(req,res){
		try{
			let meal = Meal.findByDate(req.query.meal_date);
			if(meal != null){
				res.status(200);
				res.json({meal, message: 'Meal correctly found!'});
			}else{
				res.status(404);
				res.json({message: 'ERROR 404: Meal not found'});
			}
		}catch(error){
			res.status(500);
			res.json({message: 'ERROR 500: Local server error!'});
		}
	});

mealRoutes.route('/')
	.delete(function (req, res) {
		try{
			if(Meal.delete()){
				res.status(200);
				res.json({message: 'All meals are cancelled'});
			}else{
				res.status(400);
				res.json({message: 'ERROR 404: All meals are already cancelled'});
			}
		}catch(error){
			res.status(500);
			res.json({message: 'ERROR 500: Local server error!'});
		}
	});

module.exports = mealRoutes;
