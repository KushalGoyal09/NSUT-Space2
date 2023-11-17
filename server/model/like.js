const mongoose = require('mongoose');
const User = require('./user');
const Tweet = require('./tweet');
const {Schema,model} = mongoose;

const likeSchema = new Schema({
    userid : {
        type: Schema.Types.ObjectId,
        required: true,
        validate: {
            validator: async function (id) {
                const userExist = await User.findById(id);
                return userExist !== null;
            },
            message: "No user exist for given userid"
        }
    },
    tweetid: {
        type: Schema.Types.ObjectId,
        required: true,
        validate: {
            validator: async function(id) {
                const tweetExist = Tweet.findById(id);
                return tweetExist !== null;
            },
            message: "No tweet exist for given tweetid"
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }
})


const Like = model('Like', likeSchema);

module.exports = Like;