const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const verifyToken = require('../middlewares/tokenVerification');


// Create a new comment
router.post('/create', verifyToken, commentController.newComment);


// Get comments by post
router.get('/:id', commentController.getPostComment);


// Update a comment
router.put('/:id', verifyToken, commentController.updateComment);


// Delete a comment
router.delete('/:id', verifyToken, commentController.deleteComment);


module.exports = router;