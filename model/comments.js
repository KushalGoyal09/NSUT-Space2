const mongoose = require('mongoose');
const User = require('./user');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function (userid) {
                const userExist = await User.findById(userid);
                return userExist !== null;
            },
            message: "No user exist for the given userid"
        }
    },
    author: {
        type: String,
        required: true,
        validate: {
            validator: async function (username) {
                const userExist = await User.findOne({ username: username });
                return userExist !== null;
            },
            message: "No user exist for the given username"
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Comments = model('Comments', commentSchema);

module.exports = Comments;