const User = require('../models/User');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');
require('dotenv').config()


const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    }
    catch (error) {
        res.status(500).json(error);
    }
}


const updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json(error);
    }
}


const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({ userId: req.params.id });
        await Post.deleteMany({ userId: req.params.id });

        res.status(200).json("User has been deleted");
    }
    catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { getUser, updateUser, deleteUser };