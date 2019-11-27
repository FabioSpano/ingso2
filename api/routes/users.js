//var uniqid = require('uniqid');
const express = require('express');
const router = express.Router();

var peopleMat = ['193325', '193310', '192228'];
var trovato = false;

router.get('/:studentId', (req, res, next) => {
	const mat = req.params.studentId;
	
	for(m of peopleMat){
		if(mat === m){
			trovato = true;
		}
	}

	if(trovato){
		res.status(200).json({
			message: 'StudentId found',
			id: mat
		});
		trovato = false;
	}else{
		res.status(404).json({
			message: 'StudentId not found',
		});
	}
	
});



module.exports = router;