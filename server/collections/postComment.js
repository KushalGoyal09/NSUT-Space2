const Comments = require("../model/comments");
const Tweet = require("../model/tweet");
const User = require("../model/user");
const asyncWrapper = require("../middleware/async-wrapper");

const postComment = asyncWrapper(async (req, res) => {
    const tweetid = req.params.id;
    const { userid, username, text } = req.body;
    const comment = await Comments.create({ text, author: username, userid });
    await Tweet.findByIdAndUpdate(tweetid, { $push: { comments: comment } });    
    res.json({success: true, comment})
})

module.exports = postComment