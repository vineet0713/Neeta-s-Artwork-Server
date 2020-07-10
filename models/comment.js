const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaObject = {
	content: {
		type: String,
		required: true,
	},
	item: {
		type: Schema.Types.ObjectId,
		ref: 'Item',
		required: true,
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
};
const schemaOptions = {
	timestamps: true,
};

const commentSchema = new Schema(schemaObject, schemaOptions);
module.exports = mongoose.model('Comment', commentSchema);