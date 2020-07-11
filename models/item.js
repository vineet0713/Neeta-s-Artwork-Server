const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaObject = {
	title: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	imagePath: {
		type: String,
		required: true,
	},
};
const schemaOptions = {
	timestamps: true,
};

const itemSchema = new Schema(schemaObject, schemaOptions);
module.exports = mongoose.model('Item', itemSchema);