const Comment = require('./../models/comment');

exports.storeComment = (request, response, next) => {
	const commentToStore = new Comment({
		content: request.body.content,
		item: request.body.itemId,
		creator: request.body.creatorId,
	});
	commentToStore.save()
		.then(comment => response.status(201).json({ message: 'success!' }))
		.catch(error => next(error));
};

exports.getComments = (request, response, next) => {
	Comment.find({ item: request.params.itemId }).sort({ createdAt: -1 }).populate('creator')
		.then(result => {
			const fetchedComments = result.map(c => {
				const comment = c._doc;
				// assigns only the creator's username (not id or hashed password)
				const creatorUsername = comment.creator._doc.username;
				comment.creator = creatorUsername;
				return comment;
			});
			response.status(200).json({
				message: 'success!',
				comments: fetchedComments,
			});
		})
		.catch(error => next(error));
};