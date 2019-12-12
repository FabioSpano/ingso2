const express = require('express');
const reviewRoutes = express.Router();

const Review = require('../models/review');
const Meal = require('../models/meal');

const UtilDate = require('../util/utilDate');

reviewRoutes.route('/')
    .get(async function(req, res) {
        try{
            let reviews = await Review.find({})
            if(reviews != null){
                res.status(200);
                res.json([reviews, {message: 'Reviews found!'}]);
            }else{
                res.status(404);
                res.json({message: 'ERROR 404: No reviews found!'});
            }
        }
        catch{
            res.status(500);
            res.json({message: 'ERROR 500: Local server error!'});
        }

    });

reviewRoutes.route('/')
    .post(async function(req,res){
        try{
            var review = new Review();
            var saved = null;
            review.date = new Date();
            review.reviewText = req.query.review;
            review.mealDate = req.query.mealDate;
            if (review.reviewText != null && Meal.findByDate(review.mealDate) != null && UtilDate.isBefore(review.mealDate))
                saved = await review.save();            
            if(saved != null){
                res.status(201);
                res.json([{message: 'Review correctly created'}]);
            }else{
                res.status(400);
                res.json({message: 'ERROR 400: Review not created, probably no review written or the meal date is incorrect!'});
            }
        }
        catch{
            res.status(500);
            res.json({message: 'ERROR 500: Local server error!'});
        }
    });

reviewRoutes.route('/:review_id')
    .get(function(req,res){
        try{
            let review_id = Review.findMyReview(req.params.review_id);
            if(review_id != null){
                res.status(200);
                res.json({review_id, message: 'Review correctly found!'});
            }else{
                res.status(404);
                res.json({message: 'ERROR 404: Review not found'});
            }
        }
        catch{
            res.status(500);
            res.json({message: 'ERROR 500: Local server error!'});
        }

    });

reviewRoutes.route('/')
    .delete(function (req, res) {
        try{
            if(Review.delete()){
                res.status(200);
                res.json({message: 'All reviews are cancelled'});
            }else{
                res.status(404);
                res.json({message: 'ERROR 404: All reviews are already cancelled'});
            }
        }
        catch{
            res.status(500);
            res.json({message: 'ERROR 500: Local server error!'});
        }

    });

module.exports = reviewRoutes;