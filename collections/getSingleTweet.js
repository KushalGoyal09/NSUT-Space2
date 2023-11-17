const Tweet = require('../model/tweet');
const User = require('../model/user');
const Comments = require('../model/comments');
const asyncWrapper = require('../middleware/async-wrapper');

const getSingleTweet = asyncWrapper(async (req, res) => {
    const id = req.params.id;
    const singleTweet = await Tweet.findById(id).lean();
    const user = await User.findById(singleTweet.user);
    singleTweet.username = user.username;
    singleTweet.email = user.email;
    const comments = (await Comments.find({ _id: { $in: singleTweet.comments } })).reverse()
    res.json({ success: true, tweet: singleTweet, comments })
})

module.exports = getSingleTweet;