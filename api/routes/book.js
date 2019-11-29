const express = require('express');
const bookRoutes = express.Router();
const bodyParser = require('body-parser');

bookRoutes.use(bodyParser.urlencoded({ extended: true }));

const Seat = require('../models/seats');
const Book = require('../models/book');

bookRoutes.route('/:seatid')
    .post(async function(req,res){
        var seatid = req.params.seatid;
        var saved;
        var book = new Book();
        book.date = new Date();
        if (Book.findBySeat(seatid) && Seat.book(seatid)){
            book.seatid = seatid;
            saved = await book.save();
        }

        if(saved != null){
            res.status(201);
            res.json([{message: 'Seats correctly booked'}]);
        }
        else{
            res.status(404);
            res.json({message: 'ERROR 404: Seats does not exist or it is already booked!'});
        }
    });

module.exports = bookRoutes;
