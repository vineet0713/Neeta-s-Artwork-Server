const Item = require('./../models/item');

exports.storeItem = (request, response, next) => {
	const itemToStore = new Item({
		title: request.body.title,
		imagePath: request.body.imagePath,
	});
	itemToStore.save()
		.then(itemPost => response.status(201).json({ message: 'success!' }))
		.catch(error => next(error));
};