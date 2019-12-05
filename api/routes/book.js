const express = require('express');
const bookRoutes = express.Router();
const bodyParser = require('body-parser');

bookRoutes.use(bodyParser.urlencoded({ extended: true }));

const Seat = require('../models/seats');
const Book = require('../models/book');
const User = require('../models/users');

bookRoutes.route('/:user_mat/:seatid')
    .post(async function(req,res){
        var usermat = req.params.user_mat;
        if(User.findByMatricola(usermat)!=null){
            var seatid = req.params.seatid;
            var saved;
            var book = new Book();
            if (Book.findBySeat(seatid) && Seat.book(seatid)){
                book.seatid = seatid;
                book.date = new Date();
                book.user = usermat;
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
        }else{
            res.status(404);
			res.json({message: 'User not found'});
        }
    });
bookRoutes.route('/view')
    .get(async function(req, res) {
        let books = await Book.find({})
        if(books != null){
            res.status(200);
            res.json([books, {message: 'List of books found!'}]);
        }else{
            res.status(404);
            res.json({message: 'No books found!'});
        }
    })
bookRoutes.route('/:user_mat')
    .get(async function(req, res) {
        var usermat = req.params.user_mat;
        var books = Book.findByUser(usermat);
        if(books.length > 0){
            res.status(200);
            res.json([books, {message: 'List of books found!'}]);
        }else{
            res.status(404);
            res.json({message: 'No books found or user incorrect!'});
        }
    })
bookRoutes.route('/:bookID/:seatid')
    .put(async function(req, res) {
        var bookid = req.params.bookID;
        var seatid = requ.params.seatid;
        var success = false;
        if(Book.findByID(bookid)){
            if(Seat.book(seatid))   success = Book.change(bookid);
        }
        if(success){
            res.status(200);
            res.json([{message: 'Book changed!'}]);
        }else{
            res.status(404);
            res.json({message: 'Book not changed!'});
        }
    })

module.exports = bookRoutes;
