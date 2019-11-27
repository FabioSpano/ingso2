//var uniqid = require('uniqid');
const express = require('express');
const usersRoutes = express.Router();
const bodyParser = require('body-parser');

usersRoutes.use('../', express.static('public'));

usersRoutes.use(bodyParser.urlencoded({ extended: true }));

const User = require('../models/users');

usersRoutes.route('/view')
	.get(async function(req, res) {
		let users = await User.find({})
		if(users != null){
			res.status(200);
			res.json([users, {message: 'List of users found!'}]);
		}else{
			res.status(404);
			res.json({message: 'No users found!'});
		}
	})
usersRoutes.route('/insert')
	.post(async function(req,res){
		var user = new User();
		user.email = req.body.email;

		saved = await user.save();
		if(saved != null){
			res.status(201);
			res.json([saved , {message: 'User correctly created'}]);
		}else{
			res.status(404);
			res.json({message: 'ERROR 404: User not created!'});
		}
	})
usersRoutes.route('/delete')
	.delete(function (req, res) {
		if(User.delete()){
			res.status(200);
			res.json({message: 'All users are cancelled'});
		}else{
			res.status(404);
			res.json({message: 'ERROR 404: All users are already cancelled'});
		}
	})

usersRoutes.route('/:user_mat')
	.get(function(req,res){
		let users_m = User.findByMatricola(req.params.user_mat);
		if(users_m != null){
			res.status(200);
			res.json({message: 'User correctly found!'})
		}else{
			res.status(404);
			res.json({message: 'User not found'});
		}
	})
	.delete(function(req,res){
		if(User.remove(req.params.user_mat)){
			res.status(200);
			res.json({message: 'Successfully deleted'});
		}else{
			res.status(404);
			res.json({message: 'Invalid matricola'});
		}
	})
	.put(async function(req,res){
		let matchingUser = User.findByMatricola(req.params.user_mat);
		if(matchingUser != null){
			User.change(req.params.user_mat,
				req.body.email || matchingUser.email)
			res.status(200);
			res.json({message: 'User correctly modified!'})
		}else{
			res.status(404);
			res.json({message: 'Error! User not found!'});
		}
	})

module.exports = usersRoutes;