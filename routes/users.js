const express = require('express');

const {
	createUser,
	getAllUsers,
	getNonBlockedUsers,
	getSingleUser,
	getBlockedUsers,
	updateUser,
	blockUser,
	deleteUser,
	searchContact
} = require('../db/connect-db.js');
const userRouter = express.Router();



userRouter.get('/', (req, res) => {
	getAllUsers()
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			console.error(error);
		});
});
userRouter.get('/search?', (req, res) => {
	let { error } = joi.validate(req.query, searcSchema);
	if (!error) {
			searchContact(req.query.q)
			.then(data => {
				res.status(200).json(data);
			})
			.catch(error => {
				res.status(404).json(error);
			});
	} else {
		res.status(400).json(error[0]);
	}
});
userRouter.get('/:id', (req, res) => {
	getSingleUser(req.params.id)
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			res.status(400).json(error);
		});
});

userRouter.get('/blocked', (req, res) => {
	getBlockedUsers()
		.then(data => {
			data.length === 0 ? res.status(200).json('no blocked user') : res.status(200).json(data);
		})
		.catch(error => {
			console.error(error);
		});
});
userRouter.post('/', (req, res) => {
	const validated = joi.validate(req.body, postSchema, { abortEarly: false });
	const { error } = validated;
	if (error) {
		let errors = error.details.reduce((errors, error) => {
			return errors + ' \n' + error.message;
		}, ' ');
		res.status(400).send(errors);
	} else {
		let { firstName, lastName, gender, phone, email } = req.body;
		createUser(firstName, lastName, email, phone, gender)
			.then(data => {
				res.status(200).json(data);
			})
			.catch(error => {
				res.send(error);
			});
	}
});
userRouter.put('/update/:id', (req, res) => {
	const validated = joi.validate(req.body, updateSchema, { abortEarly: false });
	const { error } = validated;
	if (error) {
		let errors = error.details.reduce((errors, error) => {
			return errors + ' \n' + error.message;
		}, ' ');
		return res.status(400).send(errors);
	} else {
		updateUser(req.params.id, req.body)
			.then(data => {
				res.status(200).json(data);
			})
			.catch(error => {
				res.json(error);
			});
	}
});
userRouter.put('/block/:id', (req, res) => {
	blockUser(req.params.id)
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			res.json(error);
		});
});
userRouter.get('/nonblockedusers', (req, res) => {
	getNonBlockedUsers()
		.then(data => {
			data.length === 0 ? res.status(200).json('no nonblocked user') : res.status(200).json(data);
		})
		.catch(error => {
			res.json(error);
		});
});
userRouter.delete('/delete/:id', (req, res) => {
	deleteUser(req.params.id)
		.then(data => {
			res.status(200).json({ deletedUser: data, id: req.params.id });
		})
		.catch(error => {
			res.json(error);
		});
});


module.exports = userRouter;
