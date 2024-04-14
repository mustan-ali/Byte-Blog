const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');


// Create a new post
router.post('/create', postController.newPost);


// Get a post
router.get('/:id', postController.getPost);


// Get all posts
router.get('/', postController.getAllPosts);


// Get posts by user
router.get('/user/:id', postController.getPostsByUser);


// Update a post
router.put('/:id', postController.updatePost);


// Delete a post
router.delete('/:id', postController.deletePost);


module.exports = router;