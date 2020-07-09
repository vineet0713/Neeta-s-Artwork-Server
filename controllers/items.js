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

exports.getItems = (request, response, next) => {
	const pageSize = +request.query.pageSize;
	const currentPage = +request.query.page;
	const itemQuery = Item.find();
	if (pageSize && currentPage) {
		itemQuery
			.sort({ createdAt: -1 })				// sorts items in descending order of creation time
			.skip(pageSize * (currentPage - 1))		// skips the first n items
			.limit(pageSize)						// only returns n items
	}
	let totalItems;
	Item.find().countDocuments()
		.then(itemCount => {
			totalItems = itemCount;
			return itemQuery;
		})
		.then(fetchedItems => {
			response.status(200).json({
				message: 'success!',
				items: fetchedItems,
				totalItems: totalItems,
			});
		})
		.catch(error => next(error));
};

exports.getItem = (request, response, next) => {
	const itemId = request.params.itemId;
	Item.findById(itemId)
		.then(fetchedItem => {
			response.status(200).json({
				message: 'success!',
				item: fetchedItem,
			});
		})
		.catch(error => next(error));
};