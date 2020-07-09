const express = require('express');
const router = express.Router();

const itemsController = require('./../controllers/items');

// POST api/item
router.post('/item', itemsController.storeItem);

module.exports = router;