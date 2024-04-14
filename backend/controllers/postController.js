const User = require('../models/User');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
require('dotenv').config()


const newPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }
    catch (error) {
        res.status(500).json(error);
    }
}


const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json(error);
    }
}


const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json(error);
    }
}


const getPostsByUser = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.id });
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json(error);
    }
}


const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(500).json(error);
    }
}


const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Post has been deleted");
    }
    catch (error) {
        res.status(500).json(error);
    }
}


module.exports = { newPost, getPost, getAllPosts, getPostsByUser, updatePost, deletePost };