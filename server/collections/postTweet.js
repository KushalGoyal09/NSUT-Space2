const asyncWrapper = require("../middleware/async-wrapper");
const Tweet = require("../model/tweet");
const User = require("../model/user");

const postTweet = asyncWrapper(async (req,res) => {
    const {text,user} = req.body;
    const tweet = await Tweet.create({text,user});
    await User.findByIdAndUpdate(user,{$push: {tweets:tweet}},{new:true});
    res.json(tweet);
})

module.exports = postTweet