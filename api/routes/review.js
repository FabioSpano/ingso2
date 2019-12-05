const express = require('express');
const reviewRoutes = express.Router();
const bodyParser = require('body-parser');

reviewRoutes.use(bodyParser.urlencoded({ extended: true }));

const Review = require('../models/review');

reviewRoutes.route('/view')
    .get(async function(req, res) {
        let reviews = await Review.find({})
        if(reviews != null){
            res.status(200);
            res.json([reviews]);
            console.log('* MESSAGE: List of reviews found!');
        }else{
            res.status(404);
            res.json({message: 'No reviews found!'});
            console.log('* MESSAGE: No reviews found!');
        }
    });

reviewRoutes.route('/insert/:review')
    .post(async function(req,res){
        var review = new Review();
        review.review = req.params.review;
        saved = await review.save();
        if(saved != null){
            res.status(201);
            res.json([{message: 'Review correctly created'}]);
            console.log('* MESSAGE: Review correctly created!');
        }else{
            res.status(404);
            res.json({message: 'ERROR 404: Review not created!'});
            console.log('* MESSAGE: Review not created!');
        }
    });

reviewRoutes.route('/:review_id')
    .get(function(req,res){
        let review_id = Review.findMyReview(req.params.review_id);
        if(review_id != null){
            res.status(200);
            res.json({review_id, message: 'Review correctly found!'});
            console.log('* MESSAGE: Review correctly found!');
        }else{
            res.status(404);
            res.json({message: 'Review not found'});
            console.log('* MESSAGE: Review not found!');
        }
    });

reviewRoutes.route('/delete')
    .delete(function (req, res) {
        if(Review.delete()){
            res.status(200);
            res.json({message: 'All reviews are cancelled'});
            console.log('* MESSAGE: All reviews are cancelled!');
        }else{
            res.status(404);
            res.json({message: 'ERROR 404: All reviews are already cancelled'});
            console.log('* MESSAGE: All reviews are already cancelled!');
        }
    });

module.exports = reviewRoutes;
