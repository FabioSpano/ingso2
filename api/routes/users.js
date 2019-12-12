const express = require('express');
const usersRoutes = express.Router();

const User = require('../models/users');
const UtilEmail = require ('../util/utilEmail')

usersRoutes.route('/')
	.get(async function(req, res) {
		try{
			let users = await User.find({})
			if(users != null){
				res.status(200);
				res.json([users, {message: 'List of users found!'}]);
			}else{
				res.status(404);
				res.json({message: 'No users found!'});
			}
		}catch(error){
			res.status(500);
			res.json({message: 'ERROR 500: Local server error!'});
		}
	});
usersRoutes.route('/')
	.post(async function(req,res){
		try{
			var user = new User();
			var mat = req.query.mat;
			user.email = req.query.email;
			var saved = null;

			if(mat != null && user.email != null && UtilEmail.validateEmail(user.email))		
				saved = await user.save(mat);
			if(saved != null){
				res.status(201);
				res.json([saved , {message: 'User correctly created'}]);
			}else{
				res.status(400);
				res.json({message: 'ERROR 400: User not created maybe for a mistake in the query params!'});
			}
		}catch(error){
			res.status(500);
			res.json({message: 'ERROR 500: Local server error!'});
		}
	});
usersRoutes.route('/')
	.delete(function (req, res) {
		try{
			if(User.delete()){
				res.status(200);
				res.json({message: 'All users are cancelled'});
			}else{
				res.status(404);
				res.json({message: 'ERROR 404: All users are already cancelled'});
			}
		}catch(error){
			res.status(500);
			res.json({message: 'ERROR 500: Local server error!'});
		}
	});

usersRoutes.route('/:user_mat')
	.get(function(req,res){
		try{
			let users_m = User.findByMatricola(req.params.user_mat);
			if(users_m != null){
				res.status(200);
				res.json([users_m, {message: 'User correctly found!'}])
			}else{
				res.status(404);
				res.json({message: 'ERROR 404: User not found'});
			}
		}catch(error){
			res.status(500);
			res.json({message: 'ERROR 500: Local server error!'});
		}
	})
	.delete(function(req,res){
		try{
			if(User.remove(req.params.user_mat)){
				res.status(200);
				res.json({message: 'Successfully deleted'});
			}else{
				res.status(404);
				res.json({message: 'ERROR 404: Invalid matricola'});
			}
		}catch(error){
			res.status(500);
			res.json({message: 'ERROR 500: Local server error!'});
		}
	});
usersRoutes.route('/')
	.put(async function(req,res){
		try{
			let matchingUser = User.findByMatricola(req.query.mat);
			if(matchingUser != null && UtilEmail.validateEmail(req.query.email) && req.query.email != null){
				User.change(req.query.mat,
					req.query.email || matchingUser.email)
				res.status(201);
				res.json({message: 'User correctly modified!'})
			}else{
				res.status(400);
				res.json({message: 'ERROR 400: User not found!'});
			}
		}catch(error){
			res.status(500);
			res.json({message: 'ERROR 500: Local server error!'});
		}
	});

module.exports = usersRoutes;