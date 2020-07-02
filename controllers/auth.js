const User = require('./../models/user');

const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

exports.signup = (request, response, next) => {
	User.findOne({ username: request.body.username })
		.then(user => {
			if (user) {
				const error = new Error('User already exists!');
				error.statusCode = 409;
				throw error;
			}
			return bcrypt.hash(request.body.password, 10);
		})
		.then(hashedPassword => {
			const user = new User({
				username: request.body.username,
				password: hashedPassword,
			});
			return user.save();
		})
		.then(result => {
			response.status(201).json({
				message: 'Sucessfully created new user.',
			});
		})
		.catch(error => next(error));
};

exports.login = (request, response, next) => {
	let loadedUser;
	User.findOne({ username: request.body.username })
		.then(user => {
			if (!user) {
				const error = new Error('Could not find user with specified username.');
				error.statusCode = 401;
				throw error;
			}
			loadedUser = user;
			return bcrypt.compare(request.body.password, user.password);
		})
		.then(passwordMatches => {
			if (!passwordMatches) {
				const error = new Error('Invalid password.');
				error.statusCode = 401;
				throw error;
			}
			const payload = {
				userId: loadedUser._id,
				username: loadedUser.username,
			};
			const expiration = { expiresIn: '1h' };
			// Creates a new token for authenticated users to be stored on the client
			const token = jsonwebtoken.sign(payload, process.env.SECRET_KEY, expiration);
			const loadedUserId = loadedUser._id.toString();
			response.status(200).json({
				token: token,
				expiresIn: 3600,	// duration (in seconds) until the token expires
				userId: loadedUserId,
				isAdmin: (loadedUserId === process.env.ADMIN_ID),
			});
		})
		.catch(error => next(error));
};