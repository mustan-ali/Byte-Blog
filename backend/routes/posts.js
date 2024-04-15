const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middlewares/tokenVerification');


// Create a new post
router.post('/create', verifyToken, postController.newPost);


// Get a post
router.get('/:id', postController.getPost);


// Get all posts
router.get('/', postController.getAllPosts);


// Get posts by user
router.get('/user/:id', postController.getPostsByUser);


// Update a post
router.put('/:id', verifyToken, postController.updatePost);


// Delete a post
router.delete('/:id', verifyToken, postController.deletePost);


module.exports = router;