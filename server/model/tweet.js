const mongoose = require('mongoose');
const User = require('./user');
const { Schema, model } = mongoose;

const tweetSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0,
        min: 0
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comments'
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (id) => {
                const userExist = await User.findById(id);
                return userExist !== null;
            },
            message: 'Please provide a valid user id'
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Tweet = model('Tweet', tweetSchema);

module.exports = Tweet;