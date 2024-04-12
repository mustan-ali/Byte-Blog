const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    categories: {
        type: Array
    },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);