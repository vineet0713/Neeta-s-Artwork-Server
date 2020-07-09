const express = require('express');
const router = express.Router();

const itemsController = require('./../controllers/items');

// POST api/item
router.post('/item', itemsController.storeItem);

// GET api/items
router.get('/items', itemsController.getItems);

// GET api/item
router.get('/item/:itemId', itemsController.getItem);

module.exports = router;