const express = require('express');
const router = express.Router();

const commentsController = require('./../controllers/comments');

// POST api/comment
router.post('/comment', commentsController.storeComment);

// GET api/comments
router.get('/comments/:itemId', commentsController.getComments);

module.exports = router;