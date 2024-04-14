const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');


// Create a new comment
router.post('/create', commentController.newComment);


// Get comments by post
router.get('/:id', commentController.getPostComment);


// Update a comment
router.put('/:id', commentController.updateComment);


// Delete a comment
router.delete('/:id', commentController.deleteComment);


module.exports = router;