const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schemaObject = {
	username: {
		type: String,
		required: true,
		unique: true,	// this is NOT a validator!
	},
	password: {
		type: String,
		required: true,
	},
};

const userSchema = mongoose.Schema(schemaObject).plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);