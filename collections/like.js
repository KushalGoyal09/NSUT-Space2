const asyncWrapper = require("../middleware/async-wrapper");
const Like = require("../model/like");
const Tweet = require("../model/tweet");

const like = asyncWrapper(async (req, res) => {
    const tweetid = req.params.id;
    const { userid } = req.body;
    const like = await Like.findOne({ userid, tweetid });
    let likes = 0;
    if (like) {
        await Like.findByIdAndDelete(like._id);
        await Tweet.findByIdAndUpdate(tweetid, { $inc: { likes: -1 } })
        likes = -1;
    } else {
        await Like.create({ tweetid, userid });
        await Tweet.findByIdAndUpdate(tweetid, { $inc: { likes: 1 } })
        likes = 1;
    }
    return res.json({ success: true, likes });
})

module.exports = like;