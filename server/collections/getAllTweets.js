const Tweet = require('../model/tweet');
const User = require('../model/user');
const asyncWrapper = require('../middleware/async-wrapper');

const getAllTweets = asyncWrapper(async (req, res) => {
    const tweets = await Tweet.find().sort({date:-1}).lean();
    for (const tweet of tweets) {
        const userInfo = await User.findById(tweet.user, "username email").lean();
        if(userInfo) {
            tweet.username = userInfo.username;
            tweet.email = userInfo.email;
        }
    }
    res.json(tweets);
})

module.exports = getAllTweets;