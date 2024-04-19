const User = require('../models/User');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
require('dotenv').config()


const newComment = async (req, res) => {
    try {
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    }
    catch (err) {
        res.status(500).json(err)
    }
}


const getPostComment = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.id });
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json(error);
    }
}


const updateComment = async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedComment);
    }
    catch (error) {
        res.status(500).json(error);
    }
}


const deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("Comment has been deleted");
    }
    catch (error) {
        res.status(500).json(error);
    }
}


module.exports = { newComment, getPostComment, updateComment, deleteComment };