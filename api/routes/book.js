const express = require('express');
const bookRoutes = express.Router();
const bodyParser = require('body-parser');

bookRoutes.use(bodyParser.urlencoded({ extended: true }));

const Seat = require('../models/seats');
const Book = require('../models/book');
const User = require('../models/users');

bookRoutes.route('/:user_mat')
    .post(async function(req,res){
        try{
            var usermat = req.params.user_mat;
            if(User.findByMatricola(usermat)!=null){
                var seatid = req.query.seatid;
                var saved = null;
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
                    res.status(400);
                    res.json({message: 'ERROR 400: Seats does not exist or it is already booked!'});
                }
            }else{
                res.status(404);
                res.json({message: 'ERROR 404: User not found'});
            }
        }catch(error){
			res.status(500);
			res.json({message: 'ERROR 500: Local server error!'});
		}
    });
bookRoutes.route('/')
    .get(async function(req, res) {
        try{
            let books = await Book.find({})
            if(books != null){
                res.status(200);
                res.json([books, {message: 'List of books found!'}]);
            }else{
                res.status(404);
                res.json({message: 'ERROR 404: No books found!'});
            }
        }catch(error){
			res.status(500);
			res.json({message: 'ERROR 500: Local server error!'});
		}
    });
bookRoutes.route('/:user_mat')
    .get(async function(req, res) {
        try{
            var usermat = req.params.user_mat;
            var books = Book.findByUser(usermat);
            if(books.length > 0){
                res.status(200);
                res.json([books, {message: 'List of books found!'}]);
            }else{
                res.status(404);
                res.json({message: 'ERROR 404: No books found or user incorrect!'});
            }
        }catch(error){
			res.status(500);
			res.json({message: 'ERROR 500: Local server error!'});
		}
    });
bookRoutes.route('/:bookID')
    .put(async function(req, res) {
        try{
            var bookid = req.params.bookID;
            var seatid = req.query.seatid;
            var success = false;
            if(Book.findByID(bookid)){
                var seatBefore = -1;
                if(Seat.book(seatid))   seatBefore = Book.change(bookid, seatid);
                if(seatBefore != -1)  success = Seat.unbook(seatBefore);
            }
            if(success){
                res.status(200);
                res.json([{message: 'Book changed!'}]);
            }else{
                res.status(404);
                res.json({message: 'ERROR 404: Book not changed!'});
            }
        }catch(error){
			res.status(500);
			res.json({message: 'ERROR 500: Local server error!'});
		}
    });

module.exports = bookRoutes;
